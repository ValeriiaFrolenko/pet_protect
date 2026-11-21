create table public.events (
                               id bigint generated always as identity primary key,
                               title text not null,
                               description text not null default '',
                               starts_at timestamptz not null,
                               location text not null,
                               lat double precision,
                               lng double precision,
                               cover_url text,
                               created_at timestamptz not null default now()
);

alter table public.events enable row level security;

create policy "events are readable by everyone"
  on public.events
  for select
                 to anon, authenticated
                 using (true);