import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DEPOSITIONS, type Deposition } from "../data";
import { Reveal } from "../hooks";
import { SectionHead, Stamp } from "./Chrome";
import { ReelIcon } from "./icons";
import { getAllPublicDepositions, fetchApprovedDepositions, fetchPendingDepositions, approveContribution } from "../lib/contributions";
import { isSupabaseConfigured } from "../lib/supabase";

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

function ContributionCta() {
  return (
    <div id="deposer" className="relative scroll-mt-24 border-2 border-blood bg-ink p-7 text-bone shadow-[10px_10px_0_rgba(110,11,30,0.35)] md:p-10">
      <Stamp rot={5} className="absolute -top-4 right-6 bg-ink px-3 text-[10px]">
        Formulaire officiel
      </Stamp>
      <h3 className="font-display text-3xl font-black text-bone md:text-4xl">
        Déposer une pièce <span className="italic text-ember">à conviction</span>
      </h3>
      <p className="mt-4 max-w-2xl font-mono text-[12px] leading-relaxed text-bone/70">
        Le versement sécurisé utilise un formulaire unique : validation serveur, stockage privé
        et examen avant toute apparition dans le dossier de Jenny.
      </p>
      <Link
        to="/participate"
        className="btn-stamp mt-7 inline-flex border border-ember/60 bg-blood px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-parch"
      >
        Ouvrir le formulaire sécurisé →
      </Link>
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
      <div className="mt-16 md:mt-20"><ContributionCta /></div>
    </section>
  );
}
