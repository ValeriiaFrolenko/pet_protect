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

update public.animals
set status = 'reserved'
where id = new.animal_id and status = 'available';

if not found then
    raise exception 'Animal is not available' using errcode = 'P0001';
end if;

return new;
end;
$$;