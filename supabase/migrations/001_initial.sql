-- JENNY EXPERIENCE — Initial schema
-- Phase 7 §07 Database Model + §06 Storage + §08 Security (RLS)
-- Run in Supabase Dashboard → SQL Editor

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ── contributors ──────────────────────────────────────────────
create table public.contributors (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  link text,
  created_at timestamptz not null default now()
);

-- ── contributions ─────────────────────────────────────────────
create table public.contributions (
  id uuid primary key default gen_random_uuid(),
  contributor_id uuid not null references public.contributors(id) on delete cascade,
  message text check (char_length(message) <= 2000),
  status text not null default 'pending' check (status in ('pending','approved','rejected','archived')),
  created_at timestamptz not null default now(),
  -- Ensure at least message or media (media check via trigger or app-level, keep flexible)
  constraint message_or_media_later check (true)
);

create index idx_contributions_status on public.contributions(status);
create index idx_contributions_created_at on public.contributions(created_at desc);

-- ── media_assets ──────────────────────────────────────────────
create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  contribution_id uuid not null references public.contributions(id) on delete cascade,
  type text not null check (type in ('photo','video')),
  storage_path text not null unique,
  mime_type text not null,
  size_bytes int not null check (size_bytes > 0),
  created_at timestamptz not null default now()
);

create index idx_media_contribution on public.media_assets(contribution_id);

-- ── experience_settings ───────────────────────────────────────
create table public.experience_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.experience_settings (key, value) values
  ('private_token', '"JENNY_18_CHANGEME"'::jsonb),
  ('is_open', 'true'::jsonb)
on conflict do nothing;

-- ── RLS ───────────────────────────────────────────────────────
alter table public.contributors enable row level security;
alter table public.contributions enable row level security;
alter table public.media_assets enable row level security;
alter table public.experience_settings enable row level security;

-- Contributors: anyone can insert (public form), no select/update/delete via anon
create policy "Allow anon insert contributors"
  on public.contributors for insert to anon with check (true);

-- Contributions: anon can insert pending, no select unless approved via service role
-- For demo, allow anon to insert; reads are done via service_role or approved filter
create policy "Allow anon insert contributions pending"
  on public.contributions for insert to anon with check (status = 'pending');

-- Only service_role can read all; anon cannot read contributions (privacy)
-- If you want Jenny to read approved via anon + token, create a view/function or use service_role via edge function
-- For now, block anon select:
create policy "Block anon select contributions"
  on public.contributions for select to anon using (false);

-- Media assets: anon can insert (after contribution), no select
create policy "Allow anon insert media"
  on public.media_assets for insert to anon with check (true);
create policy "Block anon select media"
  on public.media_assets for select to anon using (false);

-- experience_settings: no anon access
create policy "Block anon settings"
  on public.experience_settings for all to anon using (false);

-- ── Storage bucket ────────────────────────────────────────────
-- Create bucket via Dashboard → Storage → New bucket: birthday-media (private, not public)
-- Then set policies:

-- Note: storage.objects policies must be created after bucket exists.
-- Run this AFTER creating bucket `birthday-media` as private:

-- Allow anon to upload to birthday-media/contributions/*
-- insert into storage.buckets (id, name, public) values ('birthday-media','birthday-media', false) on conflict do nothing;

-- create policy "Allow anon upload birthday-media"
--   on storage.objects for insert to anon
--   with check (bucket_id = 'birthday-media' and (storage.foldername(name))[1] = 'contributions');

-- create policy "Allow service_role read all"
--   on storage.objects for select to service_role using (bucket_id = 'birthday-media');

-- Service role bypasses RLS and can read everything for Jenny experience via edge function / server.
