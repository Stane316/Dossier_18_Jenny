-- R2 — Private access secrets must live only in Edge Function secrets.
-- Remove the obsolete database placeholder from projects that ran 001_initial.sql.

delete from public.experience_settings
where key = 'private_token';
