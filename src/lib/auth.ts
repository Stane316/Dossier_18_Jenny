import { config } from "./config";
import { loadJennyToken, saveJennyToken } from "./storage";

/**
 * Lightweight private access for Jenny — Phase 7 §08.2 Option A (secret route + token)
 * - Token is VITE_JENNY_TOKEN (non-secret in client, but obscure URL)
 * - Server-side validation would be ideal; here we do client gate + Supabase RLS for approved only
 * - For production, add server function or Supabase edge validation
 */

export function isJennyAuthenticated(): boolean {
  const stored = loadJennyToken();
  return stored === config.jenny.token;
}

export function authenticateJenny(input: string): boolean {
  const ok = input.trim() === config.jenny.token;
  if (ok) saveJennyToken(input.trim());
  return ok;
}

export function getJennyToken(): string {
  return config.jenny.token;
}
