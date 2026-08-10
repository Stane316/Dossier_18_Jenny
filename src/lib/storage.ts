/**
 * Storage & local persistence — Phase B/D foundation
 * - Generates non-predictable paths per Phase 7 §06
 * - Provides localStorage fallback when Supabase not configured
 * - Handles blob URL lifecycle
 */

import type { ContributionRecord } from "../types";

const LOCAL_KEY = "jenny:contributions";
const TOKEN_KEY = "jenny:token";

/** Generate storage path: contributions/{uuid}/photos/{id}.ext */
export function buildStoragePath(
  contributionId: string,
  assetId: string,
  type: "photo" | "video",
  ext: string
): string {
  const folder = type === "photo" ? "photos" : "videos";
  return `contributions/${contributionId}/${folder}/${assetId}.${ext}`;
}

export function extFromMime(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/webm": "webm",
  };
  return map[mime] ?? (mime.split("/")[1] ?? "bin");
}

/** LocalStorage fallback — keeps demo functional without backend */
export function saveLocalContribution(rec: ContributionRecord) {
  try {
    const existing = loadLocalContributions();
    existing.unshift(rec);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(existing));
  } catch {
    /* quota exceeded — ignore, contribution still shown in session */
  }
}

export function loadLocalContributions(): ContributionRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearLocalContributions() {
  localStorage.removeItem(LOCAL_KEY);
}

/** Jenny token persistence (private access) */
export function saveJennyToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function loadJennyToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
export function clearJennyToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/** Create blob URL and track for revocation */
export function createPreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}
export function revokePreviewUrl(url: string | null | undefined) {
  if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
}

