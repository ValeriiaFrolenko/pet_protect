-- A user can have only one pending adoption request at a time.
-- If this fails on existing data, cancel the duplicate pending requests first.
create unique index adoption_requests_one_pending_per_user
    on public.adoption_requests (user_id)
    where status = 'pending';

-- A user can cancel their own pending request.
create policy "users cancel own pending adoption requests"
    on public.adoption_requests
    for update
    to authenticated
    using (user_id = auth.uid() and status = 'pending')
    with check (user_id = auth.uid() and status = 'cancelled');

-- When a request is cancelled, the animal becomes available again.
-- Only the status may change: animal and owner are immutable here.
create function public.release_animal_on_cancel()
    returns trigger
    language plpgsql
    security definer
    set search_path = ''
as $$
begin
    if new.animal_id <> old.animal_id or new.user_id <> old.user_id then
        raise exception 'Only the status can be changed' using errcode = '42501';
    end if;

    update public.animals
    set status = 'available'
    where id = new.animal_id and status = 'reserved';

    return new;
end;
$$;

create trigger adoption_request_releases_animal
    before update on public.adoption_requests
    for each row
    when (old.status = 'pending' and new.status = 'cancelled')
    execute function public.release_animal_on_cancel();
