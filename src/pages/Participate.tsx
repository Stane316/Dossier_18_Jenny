/**
 * /participate — Contributor experience (Phase C foundation)
 * Isolated form with full validation (message OR photo OR video), preview, upload states.
 * For Phase B, this is a functional skeleton wiring validation + local persistence.
 * Supabase upload will be completed in Phase D.
 */
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Reveal } from "../hooks";
import { Stamp } from "../components/Chrome";
import { PawIcon, ReelIcon } from "../components/icons";
import { validateContribution, canSubmit } from "../lib/validation";
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
  const [error, setError] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const can = canSubmit({ message: msg, photo, video });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      validateContribution({ name, message: msg, photo, video });
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.issues[0]?.message ?? "Contribution invalide");
        setShakeKey((k) => k + 1);
        return;
      }
      throw err;
    }

    // If Supabase not configured, use local fallback (Phase B pragmatic delivery)
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
      // keep blob URL alive for /thanks preview via session — don't revoke yet
      nav("/thanks", { state: { local: true, name: rec.contributorName } });
      return;
    }

    // Supabase path — create contribution + upload assets
    try {
      setUploading(true);
      setProgress(10);

      // 1. Create contributor
      const { data: contributor, error: cErr } = await supabase
        .from("contributors")
        .insert({ name: name.trim() || "Témoin anonyme", link: null })
        .select()
        .single();
      if (cErr) throw new Error(cErr.message);
      setProgress(30);

      // 2. Create contribution (pending)
      const { data: contribution, error: contribErr } = await supabase
        .from("contributions")
        .insert({
          contributor_id: contributor.id,
          message: msg.trim() || null,
          status: "pending",
        })
        .select()
        .single();
      if (contribErr) throw new Error(contribErr.message);
      setProgress(50);

      // 3. Upload photo if present
      if (photo) {
        const assetId = crypto.randomUUID();
        const path = buildStoragePath(contribution.id, assetId, "photo", extFromMime(photo.type));
        const { error: upErr } = await supabase.storage
          .from("birthday-media")
          .upload(path, photo, { contentType: photo.type, upsert: false });
        if (upErr) throw new Error(`Photo: ${upErr.message}`);
        await supabase.from("media_assets").insert({
          id: assetId,
          contribution_id: contribution.id,
          type: "photo",
          storage_path: path,
          mime_type: photo.type,
          size_bytes: photo.size,
        });
      }
      setProgress(75);

      // 4. Upload video if present
      if (video) {
        const assetId = crypto.randomUUID();
        const path = buildStoragePath(contribution.id, assetId, "video", extFromMime(video.type));
        const { error: upErr } = await supabase.storage
          .from("birthday-media")
          .upload(path, video, { contentType: video.type, upsert: false });
        if (upErr) throw new Error(`Vidéo: ${upErr.message}`);
        await supabase.from("media_assets").insert({
          id: assetId,
          contribution_id: contribution.id,
          type: "video",
          storage_path: path,
          mime_type: video.type,
          size_bytes: video.size,
        });
      }

      setProgress(100);
      // also save locally for instant feedback
      saveLocalContribution({
        id: contribution.id,
        contributorName: name.trim() || "Témoin anonyme",
        message: msg.trim() || undefined,
        photoUrl: photoDataUrl ?? photoUrl ?? undefined,
        videoLabel: video ? `Vidéo jointe — ${(video.size / 1048576).toFixed(1)} Mo` : undefined,
        createdAt: new Date().toISOString(),
        status: "pending",
      });
      nav("/thanks", { state: { supabase: true } });
    } catch (err: unknown) {
      const msgE = err instanceof Error ? err.message : "Erreur d'envoi";
      setError(msgE + " — vous pouvez réessayer.");
      setShakeKey((k) => k + 1);
    } finally {
      setUploading(false);
    }
  };

  const inputCls =
    "w-full border border-bone/30 bg-transparent px-3.5 py-3 font-mono text-[13px] text-bone placeholder:text-bone/35 transition-colors focus:border-ember focus:outline-none";

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
          Témoin de la vie de Jenny ? Versez votre preuve au dossier : un message, une photo, une
          vidéo — ou les trois. Le greffe accepte tout, sauf le vide et le rose. Votre dépôt sera
          examiné avant d'être versé au dossier privé de Jenny.
        </p>
        {!isSupabaseConfigured && (
          <p className="mt-4 inline-flex items-center gap-2 border border-brass/30 bg-brass/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-brass">
            Mode démo : stockage local (Supabase non configuré) — vos pièces restent visibles dans ce navigateur.
          </p>
        )}
      </Reveal>

      <Reveal delay={120} className="mx-auto mt-10 max-w-5xl">
        <div
          id="deposer"
          className="relative scroll-mt-24 border-2 border-blood bg-ink p-7 text-bone shadow-[10px_10px_0_rgba(110,11,30,0.35)] md:p-10"
        >
          <Stamp rot={5} className="absolute -top-4 right-6 bg-ink px-3 text-[10px]">
            Formulaire officiel — réf. J-18/08-13
          </Stamp>

          <form onSubmit={handleSubmit} noValidate className="mt-4 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="p-name"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-fog"
                >
                  Votre nom <span className="text-bone/40">(ou alias de témoin)</span>
                </label>
                <input
                  id="p-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex. : la voisine du chaton"
                  className={inputCls}
                  autoComplete="name"
                  disabled={uploading}
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="p-photo"
                    className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-fog"
                  >
                    Photo <span className="text-bone/40">(optionnel)</span>
                  </label>
                  <label
                    htmlFor="p-photo"
                    className="flex h-[46px] cursor-pointer items-center justify-center border border-dashed border-bone/35 px-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-bone/60 transition-colors hover:border-ember hover:text-ember"
                  >
                    {photo ? photo.name.slice(0, 18) : "Joindre une photo"}
                  </label>
                  <input
                    id="p-photo"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    disabled={uploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null;
                      setPhoto(f);
                      if (photoUrl) revokePreviewUrl(photoUrl);
                      if (f) {
                        setPhotoUrl(createPreviewUrl(f));
                        const reader = new FileReader();
                        reader.onload = () => setPhotoDataUrl(reader.result as string);
                        reader.readAsDataURL(f);
                      } else {
                        setPhotoUrl(null);
                        setPhotoDataUrl(null);
                      }
                    }}
                  />
                  {photoUrl && (
                    <img
                      src={photoUrl}
                      alt="Aperçu photo"
                      className="mt-3 h-20 w-full border border-bone/20 object-cover"
                    />
                  )}
                </div>
                <div>
                  <label
                    htmlFor="p-video"
                    className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-fog"
                  >
                    Vidéo <span className="text-bone/40">(recommandé)</span>
                  </label>
                  <label
                    htmlFor="p-video"
                    className="flex h-[46px] cursor-pointer items-center justify-center border border-dashed border-bone/35 px-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-bone/60 transition-colors hover:border-ember hover:text-ember"
                  >
                    {video ? video.name.slice(0, 18) : "Joindre une vidéo"}
                  </label>
                  <input
                    id="p-video"
                    type="file"
                    accept="video/*"
                    className="sr-only"
                    disabled={uploading}
                    onChange={(e) => setVideo(e.target.files?.[0] ?? null)}
                  />
                  {video && (
                    <span className="mt-3 inline-flex items-center gap-1.5 border border-bone/20 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/70">
                      <ReelIcon className="h-3.5 w-3.5 text-blood" />
                      {(video.size / 1048576).toFixed(1)} Mo
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="p-msg"
                className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-fog"
              >
                Votre message pour Jenny{" "}
                <span className="text-bone/40">(optionnel si photo ou vidéo)</span>
              </label>
              <textarea
                id="p-msg"
                rows={5}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Racontez un souvenir, une preuve, un aveu. Le dossier garde tout."
                className={inputCls + " resize-none"}
                maxLength={2000}
                disabled={uploading}
              />
              <span className="mt-1 block text-right font-mono text-[9px] uppercase tracking-[0.14em] text-fog">
                {msg.length} / 2000
              </span>
            </div>

            {uploading && (
              <div className="border border-ember/30 bg-coal/50 p-4">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                  <span>Versement en cours…</span>
                  <span className="text-ember">{progress}%</span>
                </div>
                <div className="mt-2 h-[2px] bg-blood/15">
                  <div
                    className="thread-fill h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={uploading || !can}
                className="btn-stamp border border-ember/60 bg-blood px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-parch disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploading ? "Versement…" : "Verser la pièce au dossier"}
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                Règle du greffe : message <span className="text-ember">ou</span> photo{" "}
                <span className="text-ember">ou</span> vidéo — jamais rien.
              </p>
            </div>

            {error && (
              <p
                key={shakeKey}
                role="alert"
                className="deny-shake border-l-2 border-blood pl-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ember"
              >
                {error}
              </p>
            )}
          </form>

          <div className="mt-8 flex items-center gap-2 border-t border-dashed border-bone/15 pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-fog">
            <PawIcon className="h-3.5 w-3.5 text-blood/60" />
            Les pièces sont examinées avant d'être versées au dossier privé de Jenny.
          </div>
        </div>
      </Reveal>
    </section>
  );
}
