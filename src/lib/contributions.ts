import { supabase, isSupabaseConfigured } from "./supabase";
import { loadLocalContributions } from "./storage";
import { invokeJennyAccess } from "./auth";
import type { ContributionRecord } from "../types";
import { DEPOSITIONS, type Deposition } from "../data";

const CONTRIBUTION_FUNCTION = "contribution-pipeline";

export type ContributionMediaRequest = {
  type: "photo" | "video";
  mimeType: string;
  sizeBytes: number;
};

export type ContributionUploadPlan = {
  id: string;
  type: "photo" | "video";
  path: string;
  token: string;
};

export type PendingContribution = {
  contributionId: string;
  submissionToken: string | null;
  uploads: ContributionUploadPlan[];
  complete: boolean;
};

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

export function getSeedDepositions(): Deposition[] {
  return DEPOSITIONS;
}

export function getLocalDepositions(): Deposition[] {
  if (isSupabaseConfigured) return [];
  return loadLocalContributions().map((record) => toDeposition(record));
}

function toDeposition(record: ContributionRecord): Deposition {
  const firstLine = record.message?.split("\n")[0] ?? "";
  return {
    name: record.contributorName,
    link: record.contributorLink ?? "Témoin — versé via /participate",
    date: new Date(record.createdAt).toLocaleDateString("fr-FR") + " — versée à l'instant",
    quote:
      firstLine.length > 0
        ? firstLine.length > 92
          ? firstLine.slice(0, 92) + "…"
          : firstLine
        : record.photoUrl
          ? "Pièce photographique versée au dossier."
          : record.videoLabel ?? "Enregistrement versé au dossier.",
    full: record.message ?? "Le témoin a préféré les images aux mots. Le greffe approuve.",
    photo: record.photoUrl,
    videoLabel: record.videoLabel,
  };
}

async function contributionErrorMessage(
  response: Response | undefined,
  error: unknown
): Promise<string> {
  const context =
    error && typeof error === "object" && "context" in error
      ? (error as { context?: unknown }).context
      : undefined;
  const source = response ?? (context instanceof Response ? context : undefined);
  if (!source) return "Le service de contribution est injoignable";

  try {
    const body = (await source.clone().json()) as { error?: unknown };
    if (typeof body.error === "string" && body.error.trim()) return body.error;
  } catch {
    // Fall through to a controlled status-based message.
  }

  if (source.status === 404) return "Le service de contribution n’est pas encore déployé";
  if (source.status === 403) return "Ce site n’est pas autorisé à envoyer des contributions";
  if (source.status === 429) return "Trop de tentatives — réessayez plus tard";
  return "Le service de contribution est indisponible";
}

async function invokeContributionPipeline<T>(
  action: "create" | "finalize",
  payload: Record<string, unknown>
): Promise<T> {
  if (!isSupabaseConfigured || !supabase) throw new Error("Supabase non configuré");
  const { data, error, response } = await supabase.functions.invoke(CONTRIBUTION_FUNCTION, {
    body: { action, ...payload },
  });
  if (error) throw new Error(await contributionErrorMessage(response, error));
  return data as T;
}

/** Creates an atomic pending submission and returns exact path-bound Storage upload tokens. */
export async function createPendingContribution(input: {
  name: string;
  message: string | null;
  media: ContributionMediaRequest[];
}): Promise<PendingContribution> {
  const response = await invokeContributionPipeline<PendingContribution>("create", input);
  if (
    typeof response.contributionId !== "string" ||
    !Array.isArray(response.uploads) ||
    typeof response.complete !== "boolean" ||
    (response.uploads.length > 0 && typeof response.submissionToken !== "string")
  ) {
    throw new Error("Réponse de contribution invalide");
  }
  return response;
}

/** Finalizes a submission only after the Edge Function has verified every uploaded object. */
export async function finalizePendingContribution(
  contributionId: string,
  submissionToken: string
): Promise<void> {
  const response = await invokeContributionPipeline<{ ok: boolean }>("finalize", {
    contributionId,
    submissionToken,
  });
  if (!response.ok) throw new Error("La contribution n'a pas pu être finalisée");
}

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

export async function fetchApprovedDepositions(): Promise<Deposition[]> {
  try {
    return await fetchPrivateDepositions("approved");
  } catch {
    return [];
  }
}

export async function fetchPendingDepositions(): Promise<Deposition[]> {
  try {
    return await fetchPrivateDepositions("pending");
  } catch {
    return [];
  }
}

/** Public fallback content exists only when Supabase is not configured. */
export function getAllPublicDepositions(): Deposition[] {
  return [...getLocalDepositions(), ...getSeedDepositions()];
}

export async function approveContribution(contributionId: string): Promise<void> {
  if (!isSupabaseConfigured) throw new Error("Supabase non configuré");
  const response = await invokeJennyAccess<{ ok: boolean }>("approve-contribution", {
    contributionId,
  });
  if (!response.ok) throw new Error("Échec de l'approbation");
}
