import { supabase, isSupabaseConfigured } from "./supabase";
import { loadLocalContributions } from "./storage";
import { invokeJennyAccess } from "./auth";
import type { ContributionRecord } from "../types";
import { DEPOSITIONS, type Deposition } from "../data";

/**
 * Contributions aggregation — Phase C/D
 * Merges:
 * - Seed depositions (data.ts)
 * - Local contributions (localStorage fallback)
 * - Supabase approved contributions (if configured & Jenny authenticated)
 *
 * For public view, only seed + local are shown (pending not yet approved).
 * For Jenny private view, Supabase approved will be merged via fetchApprovedDepositions().
 */

export function getSeedDepositions(): Deposition[] {
  return DEPOSITIONS;
}

export function getLocalDepositions(): Deposition[] {
  const locals = loadLocalContributions();
  return locals.map((r) => toDeposition(r));
}

function toDeposition(r: ContributionRecord): Deposition {
  const firstLine = r.message?.split("\n")[0] ?? "";
  return {
    name: r.contributorName,
    link: r.contributorLink ?? "Témoin — versé via /participate",
    date: new Date(r.createdAt).toLocaleDateString("fr-FR") + " — versée à l'instant",
    quote:
      firstLine.length > 0
        ? firstLine.length > 92
          ? firstLine.slice(0, 92) + "…"
          : firstLine
        : r.photoUrl
          ? "Pièce photographique versée au dossier."
          : r.videoLabel ?? "Enregistrement versé au dossier.",
    full: r.message ?? "Le témoin a préféré les images aux mots. Le greffe approuve.",
    photo: r.photoUrl,
    videoLabel: r.videoLabel,
  };
}

/** Create contributor + contribution (pending) — D.1 helper */
export async function createPendingContribution(input: {
  name: string;
  message: string | null;
}): Promise<{ contributorId: string; contributionId: string }> {
  if (!isSupabaseConfigured || !supabase) throw new Error("Supabase non configuré");
  const { data: contributor, error: cErr } = await supabase
    .from("contributors")
    .insert({ name: input.name, link: null })
    .select()
    .single();
  if (cErr) throw new Error(cErr.message);
  const { data: contribution, error: contribErr } = await supabase
    .from("contributions")
    .insert({ contributor_id: contributor.id, message: input.message, status: "pending" })
    .select()
    .single();
  if (contribErr) throw new Error(contribErr.message);
  return { contributorId: contributor.id, contributionId: contribution.id };
}

type PrivateContribution = {
  id: string;
  message: string | null;
  created_at: string;
  contributor_name: string;
  media: Array<{
    type: "photo" | "video";
    url: string;
    mime_type: string;
  }>;
};

type PrivateContributionResponse = {
  contributions: PrivateContribution[];
};

function privateContributionToDeposition(
  row: PrivateContribution,
  status: "approved" | "pending"
): Deposition {
  const photoUrl = row.media.find((asset) => asset.type === "photo")?.url;
  const videoUrl = row.media.find((asset) => asset.type === "video")?.url;
  const hasPhoto = Boolean(photoUrl);
  const hasVideo = Boolean(videoUrl);
  const pending = status === "pending";

  return {
    id: row.id,
    name: row.contributor_name || "Témoin",
    link: pending ? "En attente de modération" : "Contribution approuvée — dossier privé",
    date: new Date(row.created_at).toLocaleDateString("fr-FR"),
    quote: row.message
      ? row.message.split("\n")[0].slice(0, 92)
      : hasPhoto
        ? pending
          ? "Photo en attente"
          : "Photo approuvée — scellée au dossier."
        : hasVideo
          ? pending
            ? "Vidéo en attente"
            : "Vidéo approuvée — scellée au dossier."
          : pending
            ? "Pièce en attente"
            : "Pièce approuvée.",
    full:
      row.message ??
      (pending
        ? "Pièce média en attente de validation."
        : "Pièce média approuvée — visible dans le dossier privé."),
    photo: photoUrl,
    videoLabel: hasVideo
      ? pending
        ? "Vidéo — en attente"
        : "Vidéo — lecture privée disponible"
      : undefined,
    videoUrl,
    status,
  };
}

async function fetchPrivateDepositions(
  status: "approved" | "pending"
): Promise<Deposition[]> {
  if (!isSupabaseConfigured) return [];
  const response = await invokeJennyAccess<PrivateContributionResponse>(
    "list-contributions",
    { status }
  );
  if (!Array.isArray(response.contributions)) return [];
  return response.contributions.map((row) => privateContributionToDeposition(row, status));
}

/** Fetch approved contributions and short-lived media URLs through the protected Edge Function. */
export async function fetchApprovedDepositions(): Promise<Deposition[]> {
  try {
    return await fetchPrivateDepositions("approved");
  } catch {
    return [];
  }
}

/** Fetch pending contributions through the same server-verified private session. */
export async function fetchPendingDepositions(): Promise<Deposition[]> {
  try {
    return await fetchPrivateDepositions("pending");
  } catch {
    return [];
  }
}

/** All depositions for public / landing (seed + local) */
export function getAllPublicDepositions(): Deposition[] {
  return [...getLocalDepositions(), ...getSeedDepositions()];
}

/** Pending → approved through the server-verified private Edge Function. */
export async function approveContribution(contributionId: string): Promise<void> {
  if (!isSupabaseConfigured) throw new Error("Supabase non configuré");
  const response = await invokeJennyAccess<{ ok: boolean }>("approve-contribution", {
    contributionId,
  });
  if (!response.ok) throw new Error("Échec de l'approbation");
}
