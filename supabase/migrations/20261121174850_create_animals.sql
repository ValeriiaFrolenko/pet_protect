create table public.animals (
                                id bigint generated always as identity primary key,
                                name text not null,
                                species text not null check (species in ('dog', 'cat', 'other')),
                                breed text,
                                age_months int check (age_months >= 0),
                                sex text check (sex in ('male', 'female')),
                                description text not null default '',
                                photo_url text not null,
                                status text not null default 'available'
                                    check (status in ('available', 'reserved', 'adopted')),
                                created_at timestamptz not null default now()
);

alter table public.animals enable row level security;

create policy "animals are readable by everyone"
  on public.animals
  for select
                 to anon, authenticated
                 using (true);