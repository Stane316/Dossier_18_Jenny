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

    // Resolve signed URLs for photos (limit to first photo per contribution for performance)
    const depositions: Deposition[] = [];
    for (const row of rows) {
      const hasPhoto = row.media_assets?.some((m) => m.type === "photo");
      const hasVideo = row.media_assets?.some((m) => m.type === "video");
      let photoUrl: string | undefined = undefined;
      if (hasPhoto) {
        const photoAsset = row.media_assets.find((m) => m.type === "photo");
        if (photoAsset?.storage_path) {
          const signed = await getSignedUrl(photoAsset.storage_path, 3600);
          if (signed) photoUrl = signed;
        }
      }
      depositions.push({
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
        videoLabel: hasVideo ? "Vidéo — disponible en privé (signed URL)" : undefined,
      });
    }
    return depositions;
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
