import { supabase, isSupabaseConfigured } from "./supabase";
import { loadLocalContributions } from "./storage";
import { getSignedUrl } from "./storage";
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

/** Fetch approved contributions from Supabase (Jenny private) — D.1 with signed URLs */
export async function fetchApprovedDepositions(): Promise<Deposition[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from("contributions")
      .select(
        `
        id, message, created_at,
        contributors ( name ),
        media_assets ( type, storage_path, mime_type )
      `
      )
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    const rows = data as unknown as Array<{
      id: string;
      message: string | null;
      created_at: string;
      contributors: { name: string } | null;
      media_assets: Array<{ type: string; storage_path: string; mime_type: string }>;
    }>;

    const depositions: Deposition[] = [];
    for (const row of rows) {
      const hasPhoto = row.media_assets?.some((m) => m.type === "photo");
      const hasVideo = row.media_assets?.some((m) => m.type === "video");
      let photoUrl: string | undefined = undefined;
      let videoUrl: string | undefined = undefined;
      if (hasPhoto) {
        const photoAsset = row.media_assets.find((m) => m.type === "photo");
        if (photoAsset?.storage_path) {
          const signed = await getSignedUrl(photoAsset.storage_path, 3600);
          if (signed) photoUrl = signed;
        }
      }
      if (hasVideo) {
        const videoAsset = row.media_assets.find((m) => m.type === "video");
        if (videoAsset?.storage_path) {
          const signed = await getSignedUrl(videoAsset.storage_path, 3600);
          if (signed) videoUrl = signed;
        }
      }
      depositions.push({
        id: row.id,
        name: row.contributors?.name ?? "Témoin",
        link: "Contribution approuvée — dossier privé",
        date: new Date(row.created_at).toLocaleDateString("fr-FR"),
        quote: row.message
          ? row.message.split("\n")[0].slice(0, 92)
          : hasPhoto
            ? "Photo approuvée — scellée au dossier."
            : hasVideo
              ? "Vidéo approuvée — scellée au dossier."
              : "Pièce approuvée.",
        full: row.message ?? "Pièce média approuvée — visible dans la salle de projection privée.",
        photo: photoUrl,
        videoLabel: hasVideo ? (videoUrl ? "Vidéo — lecture privée disponible" : "Vidéo — en cours de traitement") : undefined,
        videoUrl,
        status: "approved",
      });
    }
    return depositions;
  } catch {
    return [];
  }
}

/** Fetch pending contributions (for admin / Jenny moderation) — D.2 */
export async function fetchPendingDepositions(): Promise<Deposition[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from("contributions")
      .select(
        `
        id, message, created_at,
        contributors ( name ),
        media_assets ( type, storage_path, mime_type )
      `
      )
      .eq("status", "pending")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    const rows = data as unknown as Array<{
      id: string;
      message: string | null;
      created_at: string;
      contributors: { name: string } | null;
      media_assets: Array<{ type: string; storage_path: string; mime_type: string }>;
    }>;
    const out: Deposition[] = [];
    for (const row of rows) {
      const hasPhoto = row.media_assets?.some((m) => m.type === "photo");
      const hasVideo = row.media_assets?.some((m) => m.type === "video");
      let photoUrl: string | undefined;
      let videoUrl: string | undefined;
      if (hasPhoto) {
        const a = row.media_assets.find((m) => m.type === "photo");
        if (a?.storage_path) photoUrl = (await getSignedUrl(a.storage_path, 3600)) ?? undefined;
      }
      if (hasVideo) {
        const a = row.media_assets.find((m) => m.type === "video");
        if (a?.storage_path) videoUrl = (await getSignedUrl(a.storage_path, 3600)) ?? undefined;
      }
      out.push({
        id: row.id,
        name: row.contributors?.name ?? "Témoin",
        link: "En attente de modération",
        date: new Date(row.created_at).toLocaleDateString("fr-FR"),
        quote: row.message ? row.message.split("\n")[0].slice(0, 92) : hasPhoto ? "Photo en attente" : hasVideo ? "Vidéo en attente" : "Pièce en attente",
        full: row.message ?? "Pièce média en attente de validation.",
        photo: photoUrl,
        videoLabel: hasVideo ? "Vidéo — en attente" : undefined,
        videoUrl,
        status: "pending",
      });
    }
    return out;
  } catch {
    return [];
  }
}

/** All depositions for public / landing (seed + local) */
export function getAllPublicDepositions(): Deposition[] {
  return [...getLocalDepositions(), ...getSeedDepositions()];
}

/** Pending → Approved flow helper (for admin via Dashboard or future /admin) */
export async function approveContribution(contributionId: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error("Supabase non configuré");
  const { error } = await supabase.from("contributions").update({ status: "approved" }).eq("id", contributionId);
  if (error) throw new Error(error.message);
}
