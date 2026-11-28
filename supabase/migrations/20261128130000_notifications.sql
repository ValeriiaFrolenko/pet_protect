-- In-app notifications for adoption decisions.

create table public.notifications (
    id bigint generated always as identity primary key,
    user_id uuid not null references auth.users (id) on delete cascade,
    animal_id bigint not null references public.animals (id) on delete cascade,
    type text not null check (type in ('approved', 'rejected')),
    read_at timestamptz,
    created_at timestamptz not null default now()
);

create index notifications_user_id_created_at_idx
    on public.notifications (user_id, created_at desc);

alter table public.notifications enable row level security;

-- A user reads only their own notifications.
create policy "users read own notifications"
    on public.notifications
    for select
    to authenticated
    using (user_id = (select auth.uid()));

-- A user can only mark their own notifications as read: no other column may change.
create policy "users mark own notifications read"
    on public.notifications
    for update
    to authenticated
    using (user_id = (select auth.uid()))
    with check (user_id = (select auth.uid()));

create function public.guard_notification_update()
    returns trigger
    language plpgsql
as $$
begin
    if (new.user_id, new.animal_id, new.type, new.created_at)
        is distinct from
       (old.user_id, old.animal_id, old.type, old.created_at) then
        raise exception 'Only read_at can be changed' using errcode = '42501';
    end if;

    return new;
end;
$$;

create trigger notifications_guard_update
    before update on public.notifications
    for each row
    execute function public.guard_notification_update();

-- Nobody inserts or deletes notifications through the API: only the decision trigger below does.
revoke insert, delete on public.notifications from authenticated;

-- Extend the existing decision trigger to create a notification for the requester.
create or replace function public.settle_animal_on_decision()
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

    insert into public.notifications (user_id, animal_id, type)
    values (new.user_id, new.animal_id, new.status);

    return new;
end;
$$;

-- Lets the client subscribe to new rows via Supabase Realtime.
alter publication supabase_realtime add table public.notifications;
