create table public.adoption_requests (
                                          id bigint generated always as identity primary key,
                                          animal_id bigint not null references public.animals (id) on delete cascade,
                                          user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
                                          message text not null default '',
                                          status text not null default 'pending'
                                              check (status in ('pending', 'approved', 'rejected', 'cancelled')),
                                          created_at timestamptz not null default now()
);

create unique index adoption_requests_one_pending_per_animal
    on public.adoption_requests (animal_id)
    where status = 'pending';

alter table public.adoption_requests enable row level security;

create policy "users read own adoption requests"
  on public.adoption_requests
  for select
                 to authenticated
                 using (user_id = auth.uid());

create policy "users create own pending adoption requests"
  on public.adoption_requests
  for insert
  to authenticated
  with check (user_id = auth.uid() and status = 'pending');

create function public.reserve_animal_on_request()
    returns trigger
    language plpgsql
security definer
set search_path = ''
as $$
begin
update public.animals
set status = 'reserved'
where id = new.animal_id and status = 'available';

if not found then
    raise exception 'Animal is not available' using errcode = 'P0001';
end if;

return new;
end;
$$;

create trigger adoption_request_reserves_animal
    before insert on public.adoption_requests
    for each row execute function public.reserve_animal_on_request();