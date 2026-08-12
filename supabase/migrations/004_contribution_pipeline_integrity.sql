-- RECOVERY R3 — contribution pipeline integrity
-- Public clients no longer write database rows or Storage objects directly.
-- A rate-limited Edge Function creates atomic submissions and issues path-bound upload tokens.

alter table public.contributions
  add column if not exists submission_complete boolean not null default true,
  add column if not exists submission_token_hash text;

alter table public.media_assets
  add column if not exists upload_status text not null default 'ready';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'contributions_submission_token_hash_check'
      and conrelid = 'public.contributions'::regclass
  ) then
    alter table public.contributions
      add constraint contributions_submission_token_hash_check
      check (submission_token_hash is null or char_length(submission_token_hash) = 64);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'media_assets_upload_status_check'
      and conrelid = 'public.media_assets'::regclass
  ) then
    alter table public.media_assets
      add constraint media_assets_upload_status_check
      check (upload_status in ('pending', 'ready'));
  end if;
end
$$;

create index if not exists idx_contributions_complete_status
  on public.contributions (submission_complete, status, created_at desc);

create index if not exists idx_media_assets_upload_status
  on public.media_assets (contribution_id, upload_status);

create table if not exists public.contribution_rate_limits (
  fingerprint text primary key,
  window_started_at timestamptz not null default now(),
  attempts integer not null default 1 check (attempts > 0),
  updated_at timestamptz not null default now()
);

alter table public.contribution_rate_limits enable row level security;
revoke all on public.contribution_rate_limits from public, anon, authenticated;

create or replace function public.claim_contribution_slot(
  p_fingerprint text,
  p_limit integer default 5,
  p_window_seconds integer default 3600
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_attempts integer;
  cutoff timestamptz := now() - make_interval(secs => p_window_seconds);
begin
  if char_length(p_fingerprint) < 32 or p_limit < 1 or p_window_seconds < 60 then
    return false;
  end if;

  insert into public.contribution_rate_limits as limits (
    fingerprint, window_started_at, attempts, updated_at
  ) values (
    p_fingerprint, now(), 1, now()
  )
  on conflict (fingerprint) do update set
    window_started_at = case
      when limits.window_started_at <= cutoff then now()
      else limits.window_started_at
    end,
    attempts = case
      when limits.window_started_at <= cutoff then 1
      else least(limits.attempts + 1, 32767)
    end,
    updated_at = now()
  returning attempts into current_attempts;

  return current_attempts <= p_limit;
end;
$$;

create or replace function public.create_contribution_submission(
  p_contributor_id uuid,
  p_contribution_id uuid,
  p_name text,
  p_message text,
  p_submission_token_hash text,
  p_media jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  item jsonb;
  item_id uuid;
  item_type text;
  item_path text;
  item_mime text;
  item_size integer;
  media_count integer;
begin
  if char_length(trim(p_name)) not between 1 and 80 then
    raise exception 'invalid contributor name';
  end if;

  if p_message is not null and char_length(p_message) > 2000 then
    raise exception 'invalid message';
  end if;

  if jsonb_typeof(coalesce(p_media, '[]'::jsonb)) <> 'array' then
    raise exception 'invalid media payload';
  end if;

  media_count := jsonb_array_length(coalesce(p_media, '[]'::jsonb));
  if media_count > 2 then
    raise exception 'too many media assets';
  end if;

  if nullif(trim(coalesce(p_message, '')), '') is null and media_count = 0 then
    raise exception 'empty contribution';
  end if;

  if media_count > 0 and (p_submission_token_hash is null or char_length(p_submission_token_hash) <> 64) then
    raise exception 'invalid submission token';
  end if;

  insert into public.contributors (id, name, link)
  values (p_contributor_id, trim(p_name), null);

  insert into public.contributions (
    id, contributor_id, message, status, submission_complete, submission_token_hash
  ) values (
    p_contribution_id,
    p_contributor_id,
    nullif(trim(coalesce(p_message, '')), ''),
    'pending',
    media_count = 0,
    case when media_count > 0 then p_submission_token_hash else null end
  );

  for item in select value from jsonb_array_elements(coalesce(p_media, '[]'::jsonb)) loop
    item_id := (item ->> 'id')::uuid;
    item_type := item ->> 'type';
    item_path := item ->> 'storage_path';
    item_mime := item ->> 'mime_type';
    item_size := (item ->> 'size_bytes')::integer;

    if item_type not in ('photo', 'video') then
      raise exception 'invalid media type';
    end if;

    if item_type = 'photo' and (
      item_mime not in ('image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif')
      or item_size <= 0 or item_size > 10485760
    ) then
      raise exception 'invalid photo';
    end if;

    if item_type = 'video' and (
      item_mime not in ('video/mp4', 'video/quicktime', 'video/webm', 'video/x-m4v')
      or item_size <= 0 or item_size > 104857600
    ) then
      raise exception 'invalid video';
    end if;

    if item_path !~ (
      '^contributions/' || p_contribution_id::text || '/' ||
      case when item_type = 'photo' then 'photos' else 'videos' end || '/' ||
      item_id::text || '\.[a-z0-9]+$'
    ) then
      raise exception 'invalid storage path';
    end if;

    insert into public.media_assets (
      id, contribution_id, type, storage_path, mime_type, size_bytes, upload_status
    ) values (
      item_id, p_contribution_id, item_type, item_path, item_mime, item_size, 'pending'
    );
  end loop;

  if (
    select count(distinct type) from public.media_assets
    where contribution_id = p_contribution_id
  ) <> media_count then
    raise exception 'duplicate media type';
  end if;

  return p_contribution_id;
end;
$$;

-- Retain the non-reversible token hash after completion so finalization remains
-- idempotent if the browser loses the successful response and retries.
create or replace function public.finalize_contribution_submission(
  p_contribution_id uuid,
  p_submission_token_hash text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  perform 1
  from public.contributions
  where id = p_contribution_id
    and submission_token_hash = p_submission_token_hash
  for update;

  if not found then
    return false;
  end if;

  update public.media_assets
  set upload_status = 'ready'
  where contribution_id = p_contribution_id;

  update public.contributions
  set submission_complete = true
  where id = p_contribution_id;

  return true;
end;
$$;

revoke all on function public.claim_contribution_slot(text, integer, integer) from public, anon, authenticated;
revoke all on function public.create_contribution_submission(uuid, uuid, text, text, text, jsonb) from public, anon, authenticated;
revoke all on function public.finalize_contribution_submission(uuid, text) from public, anon, authenticated;

grant execute on function public.claim_contribution_slot(text, integer, integer) to service_role;
grant execute on function public.create_contribution_submission(uuid, uuid, text, text, text, jsonb) to service_role;
grant execute on function public.finalize_contribution_submission(uuid, text) to service_role;

-- Remove every direct anonymous write path. Signed upload tokens issued by the Edge Function
-- authorize only their exact generated object path in the private bucket.
drop policy if exists "Allow anon insert contributors" on public.contributors;
drop policy if exists "Allow anon insert contributions pending" on public.contributions;
drop policy if exists "Allow anon insert media" on public.media_assets;
drop policy if exists "Allow anon upload birthday-media" on storage.objects;
