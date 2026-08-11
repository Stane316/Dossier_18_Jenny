-- D.1 — Storage policies for birthday-media bucket
-- Run AFTER 001_initial.sql and AFTER creating bucket `birthday-media` (private)
-- This migration ensures RLS for storage.objects and pending→approved flow

-- Ensure bucket exists as private (if not created via Dashboard)
insert into storage.buckets (id, name, public)
values ('birthday-media', 'birthday-media', false)
on conflict (id) do update set public = false;

-- Clean existing policies if re-run
drop policy if exists "Allow anon upload birthday-media" on storage.objects;
drop policy if exists "Allow authenticated read birthday-media" on storage.objects;
drop policy if exists "Allow service_role read birthday-media" on storage.objects;
drop policy if exists "Allow anon read birthday-media" on storage.objects;

-- 1. Allow anon to INSERT into birthday-media/contributions/* (for /participate)
create policy "Allow anon upload birthday-media"
on storage.objects for insert to anon
with check (
  bucket_id = 'birthday-media'
  and (storage.foldername(name))[1] = 'contributions'
);

-- 2. Allow anon to SELECT only if needed for preview? Keep blocked for privacy.
-- For private media, SELECT is blocked for anon — Jenny will use signed URLs via service_role or authenticated
create policy "Block anon read birthday-media"
on storage.objects for select to anon
using (false);

-- 3. Allow service_role to read all (for Jenny private experience via edge function / server)
create policy "Allow service_role read birthday-media"
on storage.objects for select to service_role
using (bucket_id = 'birthday-media');

-- 4. Allow service_role to delete (for moderation)
create policy "Allow service_role delete birthday-media"
on storage.objects for delete to service_role
using (bucket_id = 'birthday-media');

-- 5. Optional: allow authenticated (if you add auth) to read approved only — not needed for anon flow
-- create policy "Allow authenticated read approved"
-- on storage.objects for select to authenticated
-- using (bucket_id = 'birthday-media');

-- Verify
select policyname, roles, cmd from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname like '%birthday-media%';
