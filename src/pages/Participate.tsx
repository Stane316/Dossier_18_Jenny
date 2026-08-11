/**
 * /participate — Contributor experience (Phase C)
 * C.2 — Form validation polish : field-level errors, instant file feedback, char count color, a11y
 */
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Reveal } from "../hooks";
import { Stamp } from "../components/Chrome";
import { PawIcon, ReelIcon } from "../components/icons";
import { validateContribution, canSubmit, validatePhotoFile, validateVideoFile, getFieldErrors } from "../lib/validation";
import { createPreviewUrl, revokePreviewUrl, saveLocalContribution } from "../lib/storage";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { buildStoragePath, extFromMime } from "../lib/storage";
import { ZodError } from "zod";

export default function Participate() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const can = canSubmit({ message: msg, photo, video });
  const photoInstantError = validatePhotoFile(photo);
  const videoInstantError = validateVideoFile(video);
  const nameLenError = name.length > 80 ? "Nom trop long (80 max)" : null;
  const msgLen = msg.length;
  const msgCountColor = msgLen > 2000 ? "text-ember" : msgLen > 1800 ? "text-brass" : "text-fog";

  const clearFieldError = (field: string) => setFieldErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });

  const handlePhotoChange = (f: File | null) => {
    setPhoto(f);
    clearFieldError("photo");
    if (photoUrl) revokePreviewUrl(photoUrl);
    if (f) {
      const instant = validatePhotoFile(f);
      if (instant) setFieldErrors((p) => ({ ...p, photo: instant }));
      setPhotoUrl(createPreviewUrl(f));
      const reader = new FileReader();
      reader.onload = () => setPhotoDataUrl(reader.result as string);
      reader.readAsDataURL(f);
    } else {
      setPhotoUrl(null);
      setPhotoDataUrl(null);
    }
  };

  const handleVideoChange = (f: File | null) => {
    setVideo(f);
    clearFieldError("video");
    if (f) {
      const instant = validateVideoFile(f);
      if (instant) setFieldErrors((p) => ({ ...p, video: instant }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGlobalError(null);
    setFieldErrors({});

    try {
      validateContribution({ name, message: msg, photo, video });
    } catch (err) {
      if (err instanceof ZodError) {
        const map = getFieldErrors(err);
        // Separate global vs field
        const global = map["message"] && !msg.trim() && !photo && !video ? map["message"] : null;
        if (global) setGlobalError(global);
        setFieldErrors(map);
        setShakeKey((k) => k + 1);
        return;
      }
      throw err;
    }

    if (photoInstantError || videoInstantError || nameLenError) {
      setGlobalError("Corrige les erreurs indiquées avant d'envoyer.");
      setShakeKey((k) => k + 1);
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      const rec = {
        id: `local-${Date.now()}`,
        contributorName: name.trim() || "Témoin anonyme",
        message: msg.trim() || undefined,
        photoUrl: photoDataUrl ?? photoUrl ?? undefined,
        videoLabel: video ? `Vidéo jointe — ${(video.size / 1048576).toFixed(1)} Mo` : undefined,
        createdAt: new Date().toISOString(),
        status: "pending" as const,
      };
      saveLocalContribution(rec);
      nav("/thanks", { state: { local: true, name: rec.contributorName } });
      return;
    }

    try {
      setUploading(true);
      setProgress(10);
      const { data: contributor, error: cErr } = await supabase.from("contributors").insert({ name: name.trim() || "Témoin anonyme", link: null }).select().single();
      if (cErr) throw new Error(cErr.message);
      setProgress(30);
      const { data: contribution, error: contribErr } = await supabase.from("contributions").insert({ contributor_id: contributor.id, message: msg.trim() || null, status: "pending" }).select().single();
      if (contribErr) throw new Error(contribErr.message);
      setProgress(50);
      if (photo) {
        const assetId = crypto.randomUUID();
        const path = buildStoragePath(contribution.id, assetId, "photo", extFromMime(photo.type));
        const { error: upErr } = await supabase.storage.from("birthday-media").upload(path, photo, { contentType: photo.type, upsert: false });
        if (upErr) throw new Error(`Photo: ${upErr.message}`);
        await supabase.from("media_assets").insert({ id: assetId, contribution_id: contribution.id, type: "photo", storage_path: path, mime_type: photo.type, size_bytes: photo.size });
      }
      setProgress(75);
      if (video) {
        const assetId = crypto.randomUUID();
        const path = buildStoragePath(contribution.id, assetId, "video", extFromMime(video.type));
        const { error: upErr } = await supabase.storage.from("birthday-media").upload(path, video, { contentType: video.type, upsert: false });
        if (upErr) throw new Error(`Vidéo: ${upErr.message}`);
        await supabase.from("media_assets").insert({ id: assetId, contribution_id: contribution.id, type: "video", storage_path: path, mime_type: video.type, size_bytes: video.size });
      }
      setProgress(100);
      saveLocalContribution({ id: contribution.id, contributorName: name.trim() || "Témoin anonyme", message: msg.trim() || undefined, photoUrl: photoDataUrl ?? photoUrl ?? undefined, videoLabel: video ? `Vidéo jointe — ${(video.size / 1048576).toFixed(1)} Mo` : undefined, createdAt: new Date().toISOString(), status: "pending" });
      nav("/thanks", { state: { supabase: true } });
    } catch (err: unknown) {
      const msgE = err instanceof Error ? err.message : "Erreur d'envoi";
      setGlobalError(msgE + " — vous pouvez réessayer.");
      setShakeKey((k) => k + 1);
    } finally { setUploading(false); }
  };

  const inputBase = "w-full border bg-transparent px-3.5 py-3 font-mono text-[13px] text-bone placeholder:text-bone/35 transition-colors focus:outline-none";
  const inputOk = "border-bone/30 focus:border-ember";
  const inputErr = "border-blood bg-blood/5 focus:border-blood";
  const labelCls = "mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-fog";

  return (
    <section className="px-5 py-24 md:px-12 md:py-28 lg:px-20">
      <Reveal className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.28em]">
          <span className="text-ember">Partie publique</span>
          <span className="h-px flex-1 bg-ember/25" aria-hidden="true" />
          <span className="text-fog">Appel à témoins</span>
        </div>
        <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-black leading-[0.9] text-bone">
          Déposer une pièce <span className="italic text-ember">à conviction</span>
        </h1>
        <p className="mt-6 max-w-2xl font-mono text-[12px] leading-relaxed text-bone/70">
          Témoin de la vie de Jenny ? Versez votre preuve au dossier : un message, une photo, une vidéo — ou les trois. Le greffe accepte tout, sauf le vide et le rose. Votre dépôt sera examiné avant d'être versé au dossier privé de Jenny.
        </p>
        {!isSupabaseConfigured && (
          <p className="mt-4 inline-flex items-center gap-2 border border-brass/30 bg-brass/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-brass">
            Mode démo : stockage local (Supabase non configuré) — vos pièces restent visibles dans ce navigateur.
          </p>
        )}
      </Reveal>

      <Reveal delay={120} className="mx-auto mt-10 max-w-5xl">
        <div id="deposer" className="relative scroll-mt-24 border-2 border-blood bg-ink p-7 text-bone shadow-[10px_10px_0_rgba(110,11,30,0.35)] md:p-10">
          <Stamp rot={5} className="absolute -top-4 right-6 bg-ink px-3 text-[10px]">Formulaire officiel — réf. J-18/08-13</Stamp>

          <form onSubmit={handleSubmit} noValidate className="mt-4 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="p-name" className={labelCls}>Votre nom <span className="text-bone/40">(ou alias de témoin)</span></label>
                <input
                  id="p-name"
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); clearFieldError("name"); }}
                  placeholder="Ex. : la voisine du chaton"
                  aria-invalid={Boolean(fieldErrors.name || nameLenError)}
                  aria-describedby={fieldErrors.name || nameLenError ? "p-name-error" : undefined}
                  className={`${inputBase} ${fieldErrors.name || nameLenError ? inputErr : inputOk}`}
                  autoComplete="name"
                  disabled={uploading}
                  maxLength={80}
                />
                {(fieldErrors.name || nameLenError) && <p id="p-name-error" role="alert" className="mt-2 font-mono text-[11px] text-ember">{fieldErrors.name ?? nameLenError}</p>}
                <p className="mt-1 text-right font-mono text-[9px] tracking-[0.14em] text-fog">{name.length} / 80</p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label htmlFor="p-photo" className={labelCls}>Photo <span className="text-bone/40">(max 10 Mo)</span></label>
                  <label htmlFor="p-photo" className={`flex h-[46px] cursor-pointer items-center justify-center border border-dashed px-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${fieldErrors.photo || photoInstantError ? "border-blood text-ember bg-blood/10" : "border-bone/35 text-bone/60 hover:border-ember hover:text-ember"}`}>
                    {photo ? photo.name.slice(0, 18) : "Joindre une photo"}
                  </label>
                  <input id="p-photo" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" className="sr-only" disabled={uploading} onChange={(e) => handlePhotoChange(e.target.files?.[0] ?? null)} aria-invalid={Boolean(fieldErrors.photo || photoInstantError)} />
                  {(fieldErrors.photo || photoInstantError) && <p role="alert" className="mt-2 font-mono text-[11px] leading-snug text-ember">{fieldErrors.photo ?? photoInstantError}</p>}
                  {photo && !photoInstantError && !fieldErrors.photo && (
                    <div className="mt-2 flex items-center justify-between gap-2 border border-bone/20 bg-coal/30 px-2 py-1">
                      <span className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-bone/70">{(photo.size/1048576).toFixed(1)} Mo — {photo.type || "image"}</span>
                      <button type="button" onClick={() => { handlePhotoChange(null); const el = document.getElementById('p-photo') as HTMLInputElement | null; if (el) el.value = ''; }} className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-ember underline decoration-ember/40 underline-offset-4 hover:text-blood">Retirer</button>
                    </div>
                  )}
                  {photoUrl && !photoInstantError && !fieldErrors.photo && (
                    <div className="relative mt-3 group">
                      <img src={photoUrl} alt="Aperçu photo" className="h-20 w-full border border-bone/20 object-cover" />
                      <button type="button" onClick={() => { handlePhotoChange(null); const el = document.getElementById('p-photo') as HTMLInputElement | null; if (el) el.value = ''; }} className="absolute right-1 top-1 bg-ink/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-bone opacity-0 transition-opacity group-hover:opacity-100 hover:text-ember focus:opacity-100" aria-label="Retirer la photo">✕ Retirer</button>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="p-video" className={labelCls}>Vidéo <span className="text-bone/40">(max 100 Mo)</span></label>
                  <label htmlFor="p-video" className={`flex h-[46px] cursor-pointer items-center justify-center border border-dashed px-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${fieldErrors.video || videoInstantError ? "border-blood text-ember bg-blood/10" : "border-bone/35 text-bone/60 hover:border-ember hover:text-ember"}`}>
                    {video ? video.name.slice(0, 18) : "Joindre une vidéo"}
                  </label>
                  <input id="p-video" type="file" accept="video/mp4,video/quicktime,video/webm,video/x-m4v" className="sr-only" disabled={uploading} onChange={(e) => handleVideoChange(e.target.files?.[0] ?? null)} aria-invalid={Boolean(fieldErrors.video || videoInstantError)} />
                  {(fieldErrors.video || videoInstantError) && <p role="alert" className="mt-2 font-mono text-[11px] leading-snug text-ember">{fieldErrors.video ?? videoInstantError}</p>}
                  {video && !videoInstantError && !fieldErrors.video && (
                    <div className="mt-2 flex items-center justify-between gap-2 border border-bone/20 bg-coal/30 px-2 py-1">
                      <span className="flex items-center gap-1.5 truncate font-mono text-[9px] uppercase tracking-[0.14em] text-bone/70"><ReelIcon className="h-3 w-3 text-blood" />{(video.size / 1048576).toFixed(1)} Mo — {video.type}</span>
                      <button type="button" onClick={() => { handleVideoChange(null); const el = document.getElementById('p-video') as HTMLInputElement | null; if (el) el.value = ''; }} className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-ember underline decoration-ember/40 underline-offset-4 hover:text-blood">Retirer</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="p-msg" className={labelCls}>Votre message pour Jenny <span className="text-bone/40">(optionnel si photo ou vidéo)</span></label>
              <textarea
                id="p-msg"
                rows={5}
                value={msg}
                onChange={(e) => { setMsg(e.target.value); clearFieldError("message"); }}
                placeholder="Racontez un souvenir, une preuve, un aveu. Le dossier garde tout."
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? "p-msg-error" : undefined}
                className={`${inputBase} resize-none ${fieldErrors.message ? inputErr : inputOk}`}
                maxLength={2000}
                disabled={uploading}
              />
              <div className="mt-1 flex items-center justify-between">
                <span className="font-mono text-[11px] text-ember" role={fieldErrors.message ? "alert" : undefined}>{fieldErrors.message ?? ""}</span>
                <span className={`font-mono text-[9px] uppercase tracking-[0.14em] ${msgCountColor}`}>{msgLen} / 2000 {msgLen > 1800 && msgLen <= 2000 ? "— presque plein" : msgLen > 2000 ? "— trop long" : ""}</span>
              </div>
            </div>

            {uploading && (
              <div className="border border-ember/30 bg-coal/50 p-4" role="status" aria-live="polite">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-fog"><span>Versement en cours…</span><span className="text-ember">{progress}%</span></div>
                <div className="mt-2 h-[2px] bg-blood/15"><div className="thread-fill h-full transition-all duration-300" style={{ width: `${progress}%` }} /></div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-5">
              <button type="submit" disabled={uploading || !can || Boolean(photoInstantError || videoInstantError)} className="btn-stamp border border-ember/60 bg-blood px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-parch disabled:cursor-not-allowed disabled:opacity-50">
                {uploading ? "Versement…" : "Verser la pièce au dossier"}
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">Règle du greffe : message <span className="text-ember">ou</span> photo <span className="text-ember">ou</span> vidéo — jamais rien.</p>
            </div>

            {(globalError || fieldErrors.message) && (
              <p key={shakeKey} role="alert" className="deny-shake border-l-2 border-blood pl-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ember">
                {globalError ?? fieldErrors.message}
              </p>
            )}
          </form>

          <div className="mt-8 flex items-center gap-2 border-t border-dashed border-bone/15 pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-fog">
            <PawIcon className="h-3.5 w-3.5 text-blood/60" /> Les pièces sont examinées avant d'être versées au dossier privé de Jenny.
          </div>
        </div>
      </Reveal>
    </section>
  );
}
