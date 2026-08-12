-- CONTRIBUTOR STABILITY — idempotent media finalization
-- Keeps only the SHA-256 submission-token hash after success so a contributor
-- can safely retry when the final response was lost after database completion.

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

revoke all on function public.finalize_contribution_submission(uuid, text)
from public, anon, authenticated;

grant execute on function public.finalize_contribution_submission(uuid, text)
to service_role;
