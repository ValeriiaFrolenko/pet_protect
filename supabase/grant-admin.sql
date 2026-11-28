-- Makes an existing user an admin. Run it in the SQL Editor (or with psql).
-- The user must have signed in to the site at least once, so a row exists in auth.users.
-- Replace the email with the Google account that signs in to the site.
insert into public.admins (user_id)
select id from auth.users where email = 'your-email@example.com'
on conflict do nothing;
