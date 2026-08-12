import { z } from "zod";
import { LIMITS } from "./config";

/**
 * Validation — Phase 7 §10.2 & §36
 * Rule: message OR photo OR video must be present.
 * Photos/videos validated by MIME + size.
 */

export type ContributionMediaKind = "photo" | "video";

const MIME_ALIASES: Record<string, string> = {
  "image/jpg": "image/jpeg",
  "image/pjpeg": "image/jpeg",
  "image/heic-sequence": "image/heic",
  "image/heif-sequence": "image/heif",
  "video/mov": "video/quicktime",
  "video/m4v": "video/x-m4v",
};

const EXTENSION_MIMES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  heic: "image/heic",
  heif: "image/heif",
  mp4: "video/mp4",
  mov: "video/quicktime",
  webm: "video/webm",
  m4v: "video/x-m4v",
};

/**
 * Browsers, especially mobile share sheets, can expose a valid image/video with
 * an empty or aliased MIME. Normalize known aliases and use the extension only
 * when the browser supplies no useful MIME. The Edge Function repeats this
 * validation and remains authoritative.
 */
export function contributionFileMime(
  file: Pick<File, "name" | "type">,
  kind: ContributionMediaKind
): string | null {
  const rawMime = file.type.trim().toLowerCase().split(";", 1)[0];
  const normalizedMime = MIME_ALIASES[rawMime] ?? rawMime;
  const accepted = kind === "photo" ? LIMITS.photoAccept : LIMITS.videoAccept;
  if ((accepted as readonly string[]).includes(normalizedMime)) return normalizedMime;

  if (normalizedMime && normalizedMime !== "application/octet-stream") return null;
  const extension = file.name.toLowerCase().match(/\.([a-z0-9]+)$/)?.[1] ?? "";
  const inferredMime = EXTENSION_MIMES[extension];
  return inferredMime && (accepted as readonly string[]).includes(inferredMime)
    ? inferredMime
    : null;
}

export const contributionSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Indique ton nom ou un alias de témoin.")
      .max(80, "Nom trop long (80 max)"),
    message: z
      .string()
      .max(LIMITS.messageMaxChars, `Message trop long (${LIMITS.messageMaxChars} max)`)
      .optional()
      .transform((v) => (v?.trim() ? v.trim() : undefined)),
    photo: z
      .instanceof(File)
      .nullable()
      .optional()
      .refine(
        (f) => !f || (f.size > 0 && f.size <= LIMITS.photoMaxBytes),
        `Photo vide ou trop lourde (max ${LIMITS.photoMaxBytes / 1024 / 1024} Mo)`
      )
      .refine(
        (f) => !f || Boolean(contributionFileMime(f, "photo")),
        "Format photo non supporté (JPEG, PNG, WebP, HEIC)"
      ),
    video: z
      .instanceof(File)
      .nullable()
      .optional()
      .refine(
        (f) => !f || (f.size > 0 && f.size <= LIMITS.videoMaxBytes),
        `Vidéo vide ou trop lourde (max ${LIMITS.videoMaxBytes / 1024 / 1024} Mo)`
      )
      .refine(
        (f) => !f || Boolean(contributionFileMime(f, "video")),
        "Format vidéo non supporté (MP4, MOV, WebM)"
      ),
  })
  .superRefine((data, ctx) => {
    const hasMessage = Boolean(data.message && data.message.trim().length > 0);
    const hasPhoto = Boolean(data.photo);
    const hasVideo = Boolean(data.video);
    if (!hasMessage && !hasPhoto && !hasVideo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Une contribution vide ne peut être versée — message, photo ou vidéo requis.",
        path: ["message"],
      });
    }
  });

export type ContributionValidated = z.infer<typeof contributionSchema>;

/** Validate input, returns typed result or throws ZodError */
export function validateContribution(input: {
  name: string;
  message?: string;
  photo?: File | null;
  video?: File | null;
}) {
  return contributionSchema.parse(input);
}

/** Lightweight check without throwing — for UI disable state */
export function canSubmit(input: {
  message?: string;
  photo?: File | null;
  video?: File | null;
}): boolean {
  const hasMessage = Boolean(input.message && input.message.trim().length > 0);
  const hasPhoto = Boolean(input.photo);
  const hasVideo = Boolean(input.video);
  return hasMessage || hasPhoto || hasVideo;
}

/** Helpers for field-level instant feedback (C.2) */
export function validatePhotoFile(file: File | null): string | null {
  if (!file) return null;
  if (file.size <= 0) return "La photo sélectionnée est vide.";
  if (file.size > LIMITS.photoMaxBytes) return `Photo trop lourde — ${(file.size / 1048576).toFixed(1)} Mo (max ${LIMITS.photoMaxBytes / 1048576} Mo)`;
  if (!contributionFileMime(file, "photo"))
    return `Format photo non supporté (${file.type || "type non fourni par le navigateur"}) — JPEG, PNG, WebP ou HEIC attendus`;
  return null;
}

export function validateVideoFile(file: File | null): string | null {
  if (!file) return null;
  if (file.size <= 0) return "La vidéo sélectionnée est vide.";
  if (file.size > LIMITS.videoMaxBytes) return `Vidéo trop lourde — ${(file.size / 1048576).toFixed(1)} Mo (max ${LIMITS.videoMaxBytes / 1048576} Mo)`;
  if (!contributionFileMime(file, "video"))
    return `Format vidéo non supporté (${file.type || "type non fourni par le navigateur"}) — MP4, MOV, WebM attendus`;
  return null;
}

export function getFieldErrors(err: z.ZodError): Record<string, string> {
  const map: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? "global");
    if (!map[key]) map[key] = issue.message;
  }
  return map;
}
