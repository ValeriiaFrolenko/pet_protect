-- Admin role, admin write access to animals and events, photo storage,
-- and admin decisions on adoption requests.

-- 1. Admins -----------------------------------------------------------------

create table public.admins (
    user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.admins enable row level security;

-- A user can see only their own row, which is enough to find out whether they are an admin.
-- Nobody can insert, update or delete rows through the API: admins are added with SQL.
create policy "users read own admin row"
    on public.admins
    for select
    to authenticated
    using (user_id = (select auth.uid()));

create function public.is_admin()
    returns boolean
    language sql
    stable
    security definer
    set search_path = ''
as $$
select exists (
    select 1 from public.admins where user_id = (select auth.uid())
);
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- 2. Animals and events: write access for admins only -------------------------

create policy "admins insert animals"
    on public.animals for insert to authenticated
    with check (public.is_admin());

create policy "admins update animals"
    on public.animals for update to authenticated
    using (public.is_admin())
    with check (public.is_admin());

create policy "admins delete animals"
    on public.animals for delete to authenticated
    using (public.is_admin());

create policy "admins insert events"
    on public.events for insert to authenticated
    with check (public.is_admin());

create policy "admins update events"
    on public.events for update to authenticated
    using (public.is_admin())
    with check (public.is_admin());

create policy "admins delete events"
    on public.events for delete to authenticated
    using (public.is_admin());

-- 3. Adoption requests: requester email and admin decisions -------------------

alter table public.adoption_requests
    add column requester_email text not null default '';

-- The email is taken from the token, so a user cannot send a fake one.
create or replace function public.reserve_animal_on_request()
    returns trigger
    language plpgsql
    security definer
    set search_path = ''
as $$
begin
    if auth.uid() is null then
        raise exception 'Authentication required' using errcode = '42501';
    end if;

    new.requester_email := coalesce(auth.jwt() ->> 'email', '');

    update public.animals
    set status = 'reserved'
    where id = new.animal_id and status = 'available';

    if not found then
        raise exception 'Animal is not available' using errcode = 'P0001';
    end if;

    return new;
end;
$$;

create policy "admins read all adoption requests"
    on public.adoption_requests
    for select
    to authenticated
    using (public.is_admin());

create policy "admins decide pending adoption requests"
    on public.adoption_requests
    for update
    to authenticated
    using (public.is_admin() and status = 'pending')
    with check (public.is_admin() and status in ('approved', 'rejected'));

-- Approved: the animal is adopted. Rejected: the animal is available again.
-- Only the status may change.
create function public.settle_animal_on_decision()
    returns trigger
    language plpgsql
    security definer
    set search_path = ''
as $$
begin
    if (new.animal_id, new.user_id, new.message, new.requester_email, new.created_at)
        is distinct from
       (old.animal_id, old.user_id, old.message, old.requester_email, old.created_at) then
        raise exception 'Only the status can be changed' using errcode = '42501';
    end if;

    update public.animals
    set status = case new.status when 'approved' then 'adopted' else 'available' end
    where id = new.animal_id and status = 'reserved';

    return new;
end;
$$;

create trigger adoption_request_decision_settles_animal
    before update on public.adoption_requests
    for each row
    when (old.status = 'pending' and new.status in ('approved', 'rejected'))
    execute function public.settle_animal_on_decision();

-- 4. Photo storage: everyone reads, only admins write -------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos', 'photos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "admins upload photos"
    on storage.objects for insert to authenticated
    with check (bucket_id = 'photos' and public.is_admin());

create policy "admins update photos"
    on storage.objects for update to authenticated
    using (bucket_id = 'photos' and public.is_admin())
    with check (bucket_id = 'photos' and public.is_admin());

create policy "admins delete photos"
    on storage.objects for delete to authenticated
    using (bucket_id = 'photos' and public.is_admin());
