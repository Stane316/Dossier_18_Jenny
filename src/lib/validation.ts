import { z } from "zod";
import { LIMITS } from "./config";

/**
 * Validation — Phase 7 §10.2 & §36
 * Rule: message OR photo OR video must be present.
 * Photos/videos validated by MIME + size.
 */

export const contributionSchema = z
  .object({
    name: z
      .string()
      .max(80, "Nom trop long (80 max)")
      .optional()
      .transform((v) => (v?.trim() ? v.trim() : undefined)),
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
        (f) => !f || f.size <= LIMITS.photoMaxBytes,
        `Photo trop lourde (max ${LIMITS.photoMaxBytes / 1024 / 1024} Mo)`
      )
      .refine(
        (f) => !f || (LIMITS.photoAccept as readonly string[]).includes(f.type) || f.type.startsWith("image/"),
        "Format photo non supporté (JPEG, PNG, WebP)"
      ),
    video: z
      .instanceof(File)
      .nullable()
      .optional()
      .refine(
        (f) => !f || f.size <= LIMITS.videoMaxBytes,
        `Vidéo trop lourde (max ${LIMITS.videoMaxBytes / 1024 / 1024} Mo)`
      )
      .refine(
        (f) => !f || (LIMITS.videoAccept as readonly string[]).includes(f.type) || f.type.startsWith("video/"),
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
  name?: string;
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
