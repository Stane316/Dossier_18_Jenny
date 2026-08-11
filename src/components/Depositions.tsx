import { useEffect, useState, type FormEvent } from "react";
import { DEPOSITIONS, type Deposition } from "../data";
import { Reveal } from "../hooks";
import { SectionHead, Stamp } from "./Chrome";
import { ReelIcon } from "./icons";
import { getAllPublicDepositions, fetchApprovedDepositions, fetchPendingDepositions, approveContribution } from "../lib/contributions";
import { saveLocalContribution } from "../lib/storage";
import { isSupabaseConfigured } from "../lib/supabase";
import { validateContribution, validatePhotoFile, validateVideoFile, getFieldErrors } from "../lib/validation";
import { ZodError } from "zod";
import type { UploadState } from "../types";

function DepositionCard({ d, i, isNew = false, onApprove }: { d: Deposition; i: number; isNew?: boolean; onApprove?: (id: string) => void }) {
  const [open, setOpen] = useState(isNew);
  const isPending = d.status === "pending";
  return (
    <Reveal
      delay={Math.min(i, 5) * 90}
      as="article"
      className={`relative border p-6 shadow-[7px_7px_0_rgba(23,16,19,0.14)] transition-transform duration-300 hover:-translate-y-1 md:p-7 ${isPending ? "border-brass/50 bg-amber-50" : "border-ink/20 bg-parch"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={`font-mono text-[9px] uppercase tracking-[0.28em] ${isPending ? "text-brass" : "text-blood"}`}>{isPending ? "En attente — modération" : "Témoin entendu"}</span>
          <h3 className="mt-1 font-display text-2xl font-bold text-ink">{d.name}</h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/55">{d.link}</p>
        </div>
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/45">{d.date}</span>
      </div>

      <blockquote className="mt-5 font-hand text-[1.55rem] leading-[1.25] text-ink md:text-[1.7rem]">« {d.quote} »</blockquote>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {d.photo && <img src={d.photo} alt={`Photo jointe par ${d.name}`} className="h-20 w-20 border border-ink/25 object-cover" />}
        {d.videoUrl ? (
          <a href={d.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border border-ink/30 bg-ink px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-parch hover:bg-blood">
            <ReelIcon className="h-3.5 w-3.5 text-brass" />Voir la vidéo (privé)
          </a>
        ) : d.videoLabel ? (
          <span className="inline-flex items-center gap-1.5 border border-ink/30 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/75">
            <ReelIcon className="h-3.5 w-3.5 text-blood" />{d.videoLabel}
          </span>
        ) : null}
        {isPending && d.id && onApprove && (
          <button type="button" onClick={() => onApprove(d.id!)} className="ml-auto border border-brass bg-brass px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink hover:bg-amber-600">Approuver</button>
        )}
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-blood underline decoration-blood/50 underline-offset-4 transition-colors hover:text-ink">
          {open ? "Réduire la déposition" : "Lire la déposition complète"}
        </button>
      </div>

      <div className={`fold-grid ${open ? "open" : ""}`}>
        <div>
          <p className="mt-5 border-t border-dashed border-ink/25 pt-5 font-display text-[15px] leading-relaxed text-ink/85">{d.full}</p>
          <div className="mt-4 flex justify-end"><Stamp animate rot={7} className="text-[10px]">Certifié sincère</Stamp></div>
        </div>
      </div>
    </Reveal>
  );
}

function ContributeForm({ onAdd }: { onAdd: (d: Deposition) => void }) {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [success, setSuccess] = useState(false);

  const photoInstantError = validatePhotoFile(photo);
  const videoInstantError = validateVideoFile(video);
  const nameLenError = name.length > 80 ? "Nom trop long (80 max)" : null;
  const msgLen = msg.length;
  const msgCountColor = msgLen > 2000 ? "text-ember" : msgLen > 1800 ? "text-brass" : "text-bone/50";
  const isBusy = uploadState === "validating" || uploadState === "processing";
  const stateLabel: Record<UploadState, string> = {
    idle: "Prêt à verser",
    validating: "Validation en cours…",
    uploading: "Versement…",
    processing: "Traitement…",
    success: "Versé — prêt",
    error: "Échec — à réessayer",
  };

  const clearFieldError = (field: string) => setFieldErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });

  const handlePhoto = (f: File | null) => {
    setPhoto(f);
    clearFieldError("photo");
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    if (f) {
      const instant = validatePhotoFile(f);
      if (instant) setFieldErrors((p) => ({ ...p, photo: instant }));
      setPhotoUrl(URL.createObjectURL(f));
      const reader = new FileReader();
      reader.onload = () => setPhotoDataUrl(reader.result as string);
      reader.readAsDataURL(f);
    } else {
      setPhotoUrl(null);
      setPhotoDataUrl(null);
    }
  };

  const handleVideo = (f: File | null) => {
    setVideo(f);
    clearFieldError("video");
    if (f) {
      const instant = validateVideoFile(f);
      if (instant) setFieldErrors((p) => ({ ...p, video: instant }));
    }
  };

  const doSubmit = async () => {
    setGlobalError(null);
    setFieldErrors({});
    setUploadState("validating");
    await new Promise((r) => setTimeout(r, 150));
    try {
      validateContribution({ name, message: msg, photo, video });
    } catch (err) {
      if (err instanceof ZodError) {
        const map = getFieldErrors(err);
        const global = map["message"] && !msg.trim() && !photo && !video ? map["message"] : null;
        if (global) setGlobalError(global);
        setFieldErrors(map);
        setShakeKey((k) => k + 1);
        setUploadState("error");
        return;
      }
      throw err;
    }
    if (photoInstantError || videoInstantError || nameLenError) {
      setGlobalError("Corrige les erreurs indiquées avant d'envoyer.");
      setShakeKey((k) => k + 1);
      setUploadState("error");
      return;
    }
    setUploadState("processing");
    await new Promise((r) => setTimeout(r, 200));
    const firstLine = msg.trim().split(/\n/)[0] ?? "";
    const dep: Deposition = {
      name: name.trim() || "Témoin anonyme",
      link: "Témoin ajouté au dossier — en direct",
      date: "versée à l'instant",
      quote: firstLine.length > 0 ? (firstLine.length > 92 ? firstLine.slice(0, 92) + "…" : firstLine) : photo ? "Pièce photographique versée au dossier. Le greffe hoche la tête." : "Enregistrement vidéo versé au dossier. Le greffe sort les mouchoirs.",
      full: msg.trim() || "Le témoin a préféré les images aux mots. Le greffe approuve : certaines preuves parlent d'elles-mêmes.",
      photo: photoDataUrl ?? photoUrl ?? undefined,
      videoLabel: video ? `Vidéo jointe — ${(video.size / 1048576).toFixed(1)} Mo` : undefined,
    };
    onAdd(dep);
    saveLocalContribution({ id: `local-${Date.now()}`, contributorName: dep.name, contributorLink: dep.link, message: msg.trim() || undefined, photoUrl: dep.photo, videoLabel: dep.videoLabel, createdAt: new Date().toISOString(), status: "pending" });
    setName(""); setMsg(""); setPhoto(null); setVideo(null);
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(null); setPhotoDataUrl(null);
    setGlobalError(null); setSuccess(true);
    setUploadState("success");
    await new Promise((r) => setTimeout(r, 400));
    setUploadState("idle");
    window.setTimeout(() => setSuccess(false), 7000);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (uploadState === "validating" || uploadState === "processing") return;
    await doSubmit();
  };

  const handleRetry = async () => {
    setGlobalError(null);
    await doSubmit();
  };

  const inputBase = "w-full border bg-transparent px-3.5 py-3 font-mono text-[13px] text-bone placeholder:text-bone/35 transition-colors focus:outline-none";
  const inputOk = "border-bone/30 focus:border-ember";
  const inputErr = "border-blood bg-blood/5 focus:border-blood";

  return (
    <div id="deposer" className="relative scroll-mt-24 border-2 border-blood bg-ink p-7 text-bone shadow-[10px_10px_0_rgba(110,11,30,0.35)] md:p-10">
      <Stamp rot={5} className="absolute -top-4 right-6 bg-ink px-3 text-[10px]">Formulaire officiel</Stamp>
      <h3 className="font-display text-3xl font-black text-bone md:text-4xl">Déposer une pièce <span className="italic text-ember">à conviction</span></h3>
      <p className="mt-4 max-w-2xl font-mono text-[12px] leading-relaxed text-bone/70">Témoin de la vie de Jenny ? Versez votre preuve au dossier : un message, une photo, une vidéo — ou les trois. Le greffe accepte tout, sauf le vide et le rose.</p>

      <form onSubmit={submit} noValidate className="mt-8 grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="dep-name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-fog">Votre nom <span className="text-bone/40">(ou alias)</span></label>
            <input id="dep-name" type="text" value={name} onChange={(e) => { setName(e.target.value); clearFieldError("name"); }} placeholder="Ex. : la voisine du chaton" aria-invalid={Boolean(fieldErrors.name || nameLenError)} className={`${inputBase} ${fieldErrors.name || nameLenError ? inputErr : inputOk}`} autoComplete="name" maxLength={80} disabled={isBusy} />
            {(fieldErrors.name || nameLenError) && <p role="alert" className="mt-2 font-mono text-[11px] text-ember">{fieldErrors.name ?? nameLenError}</p>}
            <p className="mt-1 text-right font-mono text-[9px] tracking-[0.14em] text-fog">{name.length} / 80</p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="dep-photo" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-fog">Photo <span className="text-bone/40">(max 10 Mo)</span></label>
              <label htmlFor="dep-photo" className={`flex h-[46px] cursor-pointer items-center justify-center border border-dashed px-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${fieldErrors.photo || photoInstantError ? "border-blood text-ember bg-blood/10" : "border-bone/35 text-bone/60 hover:border-ember hover:text-ember"}`}>{photo ? photo.name.slice(0, 18) : "Joindre une photo"}</label>
              <input id="dep-photo" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" className="sr-only" disabled={isBusy} onChange={(e) => handlePhoto(e.target.files?.[0] ?? null)} aria-invalid={Boolean(fieldErrors.photo || photoInstantError)} />
              {(fieldErrors.photo || photoInstantError) && <p role="alert" className="mt-2 font-mono text-[11px] leading-snug text-ember">{fieldErrors.photo ?? photoInstantError}</p>}
              {photo && !photoInstantError && !fieldErrors.photo && (
                <div className="mt-2 flex items-center justify-between gap-2 border border-bone/20 bg-ink/40 px-2 py-1">
                  <span className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-bone/70">{(photo.size/1048576).toFixed(1)} Mo — {photo.type || "image"}</span>
                  <button type="button" onClick={() => { handlePhoto(null); const el = document.getElementById('dep-photo') as HTMLInputElement | null; if (el) el.value = ''; }} className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-ember underline decoration-ember/40 underline-offset-4 hover:text-blood">Retirer</button>
                </div>
              )}
              {photoUrl && !photoInstantError && !fieldErrors.photo && (
                <div className="relative mt-3 group">
                  <img src={photoUrl} alt="Aperçu" className="h-20 w-full border border-bone/20 object-cover" />
                  <button type="button" onClick={() => { handlePhoto(null); const el = document.getElementById('dep-photo') as HTMLInputElement | null; if (el) el.value = ''; }} className="absolute right-1 top-1 bg-ink/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-bone opacity-0 transition-opacity group-hover:opacity-100 hover:text-ember focus:opacity-100" aria-label="Retirer la photo">✕ Retirer</button>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="dep-video" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-fog">Vidéo <span className="text-bone/40">(max 100 Mo)</span></label>
              <label htmlFor="dep-video" className={`flex h-[46px] cursor-pointer items-center justify-center border border-dashed px-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${fieldErrors.video || videoInstantError ? "border-blood text-ember bg-blood/10" : "border-bone/35 text-bone/60 hover:border-ember hover:text-ember"}`}>{video ? video.name.slice(0, 18) : "Joindre une vidéo"}</label>
              <input id="dep-video" type="file" accept="video/mp4,video/quicktime,video/webm,video/x-m4v" className="sr-only" disabled={isBusy} onChange={(e) => handleVideo(e.target.files?.[0] ?? null)} aria-invalid={Boolean(fieldErrors.video || videoInstantError)} />
              {(fieldErrors.video || videoInstantError) && <p role="alert" className="mt-2 font-mono text-[11px] leading-snug text-ember">{fieldErrors.video ?? videoInstantError}</p>}
              {video && !videoInstantError && !fieldErrors.video && (
                <div className="mt-2 flex items-center justify-between gap-2 border border-bone/20 bg-ink/40 px-2 py-1">
                  <span className="flex items-center gap-1.5 truncate font-mono text-[9px] uppercase tracking-[0.14em] text-bone/70"><ReelIcon className="h-3 w-3 text-blood" />{(video.size/1048576).toFixed(1)} Mo — {video.type}</span>
                  <button type="button" onClick={() => { handleVideo(null); const el = document.getElementById('dep-video') as HTMLInputElement | null; if (el) el.value = ''; }} className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-ember underline decoration-ember/40 underline-offset-4 hover:text-blood">Retirer</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="dep-msg" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-fog">Votre message pour Jenny <span className="text-bone/40">(optionnel si photo/vidéo)</span></label>
          <textarea id="dep-msg" rows={4} value={msg} onChange={(e) => { setMsg(e.target.value); clearFieldError("message"); }} placeholder="Racontez un souvenir, une preuve, un aveu. Le dossier garde tout." aria-invalid={Boolean(fieldErrors.message)} className={`${inputBase} resize-none ${fieldErrors.message ? inputErr : inputOk}`} maxLength={2000} disabled={isBusy} />
          <div className="mt-1 flex items-center justify-between"><span className="font-mono text-[11px] text-ember" role={fieldErrors.message ? "alert" : undefined}>{fieldErrors.message ?? ""}</span><span className={`font-mono text-[9px] uppercase tracking-[0.14em] ${msgCountColor}`}>{msgLen} / 2000 {msgLen > 1800 && msgLen <= 2000 ? "— presque plein" : ""}</span></div>
        </div>

        {uploadState !== "idle" && (
          <div className={`border p-3 ${uploadState === "error" ? "border-blood bg-blood/10" : "border-ember/30 bg-coal/50"}`} role="status" aria-live="polite">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
              <span className={uploadState === "error" ? "text-ember" : "text-fog"}>{stateLabel[uploadState]}</span>
              {uploadState === "success" && <span className="text-brass">✓</span>}
            </div>
            {uploadState === "error" && globalError && (
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <p className="font-mono text-[11px] leading-snug text-ember">{globalError}</p>
                <button type="button" onClick={handleRetry} className="border border-ember/50 bg-blood/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ember hover:bg-blood hover:text-parch">Réessayer</button>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-5">
          <button type="submit" disabled={isBusy || Boolean(photoInstantError || videoInstantError)} className="btn-stamp border border-ember/60 bg-blood px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-parch disabled:cursor-not-allowed disabled:opacity-50">
            {uploadState === "validating" ? "Validation…" : uploadState === "processing" ? "Traitement…" : uploadState === "success" ? "Versé ✓" : "Verser la pièce au dossier"}
          </button>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">Règle du greffe : message <span className="text-ember">ou</span> photo <span className="text-ember">ou</span> vidéo — jamais rien.</p>
        </div>

        {uploadState === "error" && globalError && <p key={shakeKey} role="alert" className="deny-shake border-l-2 border-blood pl-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ember">{globalError}</p>}
        {success && uploadState !== "error" && <p role="status" className="border-l-2 border-brass pl-4 font-mono text-[11px] uppercase tracking-[0.14em] text-brass">Pièce versée — merci, témoin. Votre déposition apparaît ci-dessus et sera visible pour Jenny.</p>}
      </form>
    </div>
  );
}

export default function Depositions({ privateMode = false }: { privateMode?: boolean }) {
  const [extra, setExtra] = useState<Deposition[]>([]);
  const [approved, setApproved] = useState<Deposition[]>([]);
  const [pending, setPending] = useState<Deposition[]>([]);
  const [loadingPrivate, setLoadingPrivate] = useState(false);

  useEffect(() => {
    const persisted = getAllPublicDepositions();
    const seedNames = new Set(DEPOSITIONS.map((d) => d.name + d.quote));
    const locals = persisted.filter((d) => !seedNames.has(d.name + d.quote));
    if (locals.length > 0) setExtra(locals);
  }, []);

  useEffect(() => {
    if (!privateMode || !isSupabaseConfigured) return;
    let cancelled = false;
    setLoadingPrivate(true);
    Promise.all([fetchApprovedDepositions(), fetchPendingDepositions()])
      .then(([appr, pend]) => {
        if (!cancelled) {
          setApproved(appr);
          setPending(pend);
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingPrivate(false);
      });
    return () => { cancelled = true; };
  }, [privateMode]);

  const handleApprove = async (id: string) => {
    try {
      await approveContribution(id);
      const item = pending.find((p) => p.id === id);
      if (item) {
        setPending((prev) => prev.filter((p) => p.id !== id));
        setApproved((prev) => [{ ...item, status: "approved", link: "Contribution approuvée — dossier privé" }, ...prev]);
      }
    } catch (e) {
      console.error(e);
      alert("Échec approbation — la session privée ou le service est indisponible");
    }
  };

  const handleAdd = (d: Deposition) => setExtra((prev) => [d, ...prev]);
  const allPublic = [...extra, ...DEPOSITIONS];
  const allPrivate = privateMode ? [...pending, ...approved, ...extra, ...DEPOSITIONS] : allPublic;
  const all = allPrivate;
  return (
    <section id="temoins" data-chapter="IV — Dépositions" className="paper-surface px-5 py-24 text-ink md:px-12 md:py-36 lg:px-20">
      <SectionHead dark={false} num="IV" tag={privateMode ? "Dossier privé — Jenny" : "Sous serment d'amitié"} title={<>Dépositions <span className="italic text-blood">{privateMode ? "privées" : "des témoins"}</span></>} />
      <Reveal className="mb-14 -mt-6 max-w-3xl md:-mt-8">
        <p className="font-mono text-[12px] leading-relaxed text-ink/70">
          {privateMode ? "Ici, Jenny découvre les vraies dépositions approuvées — avec photos/vidéos via URLs signées temporaires. Les pièces en attente peuvent être approuvées ici." : "Les proches du sujet ont été entendus, un par un, avec du café et beaucoup de rires. Chaque témoin pouvait verser un message, une photo, une vidéo — ou les trois. Cliquez pour lire chaque déposition en entier. Le parjure est puni d'un câlin obligatoire."}
        </p>
        {privateMode && isSupabaseConfigured && loadingPrivate && <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">Chargement des pièces privées…</p>}
        {privateMode && isSupabaseConfigured && !loadingPrivate && pending.length > 0 && <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-brass">{pending.length} en attente — approuve pour les rendre visibles à Jenny</p>}
        {privateMode && isSupabaseConfigured && !loadingPrivate && approved.length > 0 && <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-blood">{approved.length} approuvée{approved.length>1?"s":""} — visible via signed URL</p>}
        {!privateMode && extra.length > 0 && <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-blood">{extra.length} pièce{extra.length>1?"s":""} locale{extra.length>1?"s":""} chargée{extra.length>1?"s":""} — visible dans ce navigateur (mode démo).</p>}
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2 md:gap-7">{all.map((d, i) => <DepositionCard key={(d.id ?? d.name) + d.date + i} d={d} i={i} isNew={privateMode ? (d.status === "pending" || i < pending.length) : i < extra.length} onApprove={privateMode ? handleApprove : undefined} />)}</div>
      <div className="mt-16 md:mt-20"><ContributeForm onAdd={handleAdd} /></div>
    </section>
  );
}
