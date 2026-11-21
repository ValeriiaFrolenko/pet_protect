create table public.sponsorships (
                                     id bigint generated always as identity primary key,
                                     animal_id bigint not null references public.animals (id) on delete cascade,
                                     user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
                                     monthly_amount numeric(8, 2) not null check (monthly_amount > 0),
                                     active boolean not null default true,
                                     created_at timestamptz not null default now()
);

create unique index sponsorships_one_active_per_user_and_animal
    on public.sponsorships (animal_id, user_id)
    where active;

alter table public.sponsorships enable row level security;

create policy "users read own sponsorships"
  on public.sponsorships
  for select
                 to authenticated
                 using (user_id = auth.uid());

create policy "users create own sponsorships"
  on public.sponsorships
  for insert
  to authenticated
  with check (user_id = auth.uid() and active);

create policy "users update own sponsorships"
  on public.sponsorships
  for update
                        to authenticated
                        using (user_id = auth.uid())
      with check (user_id = auth.uid());