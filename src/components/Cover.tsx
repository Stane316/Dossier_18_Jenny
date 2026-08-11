import type { CSSProperties } from "react";
import { COVER_META, WARNING_STRIP } from "../data";
import { Stamp } from "./Chrome";
import { ArrowDownIcon, PawIcon } from "./icons";

/* Sceau circulaire rotatif — cire rouge du dossier */
function WaxSeal() {
  return (
    <div className="seal-spin relative h-36 w-36 text-blood" aria-hidden="true">
      <svg viewBox="0 0 144 144" className="h-full w-full">
        <defs>
          <path id="seal-circle" d="M72,72 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0" />
        </defs>
        <circle cx="72" cy="72" r="69" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.85" />
        <circle cx="72" cy="72" r="44" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <text fill="currentColor" fontSize="10.5" fontFamily="'IBM Plex Mono', monospace" letterSpacing="3.2">
          <textPath href="#seal-circle">DIX-HUIT ANS • BAC OBTENU • 13 AOÛT • AFFAIRE JENNY •</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-black italic">
        N°18
      </span>
    </div>
  );
}

export default function Cover({ privateMode = false }: { privateMode?: boolean }) {
  const rise = (d: number) => ({ "--rise-delay": `${d}ms` }) as CSSProperties;

  return (
    <section
      id="couverture"
      data-chapter="I — Couverture"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-5 pb-36 pt-28 md:px-12 lg:px-20"
    >
      {/* Lueur rouge d'ouverture + emblème félin */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_18%_30%,rgba(200,16,46,0.17),transparent_60%)]"
        aria-hidden="true"
      />
      <img
        src="/images/emblem-cat.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-[62%] object-cover opacity-45 mix-blend-screen [mask-image:linear-gradient(to_left,black_45%,transparent_95%)] md:w-[52%]"
      />

      {/* Bandeau supérieur du dossier */}
      <div
        className="rise-in absolute inset-x-0 top-12 flex items-center justify-between border-b border-ember/20 px-5 py-2.5 font-mono text-[9px] uppercase tracking-[0.3em] text-fog md:top-12 md:px-12 md:text-[10px] lg:px-20"
        style={rise(80)}
      >
        <span>République de ceux qui t'aiment — Division des affaires extraordinaires</span>
        <span className="hidden sm:block">Réf. J-18/08-13</span>
      </div>

      <div className="relative grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Colonne titre */}
        <div>
          <div className="rise-in mb-6 flex flex-wrap items-center gap-4" style={rise(180)}>
            <Stamp rot={-7} className="text-xs md:text-sm">Confidentiel</Stamp>
            {privateMode && <Stamp rot={5} className="bg-brass text-ink text-xs border-brass">Dossier privé — Jenny</Stamp>}
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
              Dossier ouvert le 13 août — ne pas classer
            </span>
          </div>

          <h1 className="rise-in" style={rise(300)}>
            <span className="block font-display text-[clamp(1.3rem,2.6vw,2rem)] font-semibold italic tracking-wide text-ember">
              Dossier N°18 — l'affaire
            </span>
            <span className="block font-display text-[clamp(4.2rem,13vw,10rem)] font-black leading-[0.85] tracking-tight text-bone">
              Jenny<span className="text-blood">.</span>
            </span>
          </h1>

          <p
            className="rise-in mt-7 max-w-xl font-mono text-[13px] leading-relaxed text-bone/75 md:text-sm"
            style={rise(440)}
          >
            18 ans. Un bac. Quelques chatons. Une enquête ouverte par ceux qui t'aiment —
            pour établir, preuves à l'appui, un fait déjà su de tous : personne ne compte
            comme toi.
          </p>

          <div className="rise-in mt-10 flex flex-wrap items-center gap-6" style={rise(580)}>
            <a
              href="#rapport"
              className="btn-stamp inline-flex items-center gap-3 border border-ember/60 bg-blood px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-parch md:text-[13px]"
            >
              Ouvrir le dossier
              <ArrowDownIcon className="h-4 w-4" />
            </a>
            <a
              href="#deposer"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/65 underline decoration-blood/60 underline-offset-8 transition-colors hover:text-ember"
            >
              Vous êtes témoin ? Déposer une pièce
            </a>
          </div>
        </div>

        {/* Fiche d'identification */}
        <div className="rise-in relative" style={rise(520)}>
          <div className="border border-ember/25 bg-coal/80 p-6 shadow-[8px_8px_0_rgba(110,11,30,0.35)] md:p-8">
            <div className="mb-2 flex items-center justify-between border-b border-dashed border-ember/30 pb-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ember">
                Fiche d'identification
              </span>
              <PawIcon className="h-4 w-4 text-blood" />
            </div>
            <dl>
              {COVER_META.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-b border-dotted border-ember/15 py-2.5 last:border-0"
                >
                  <dt className="shrink-0 font-mono text-[9px] uppercase tracking-[0.22em] text-fog">
                    {row.label}
                  </dt>
                  <dd className="text-right font-mono text-[12px] text-bone/90">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-fog/80">
              Signes d'ADN félin détectés — enquête en cours
            </p>
          </div>
        </div>
      </div>

      {/* Traces de pattes menant au dossier */}
      <div className="pointer-events-none absolute bottom-32 left-[7%] hidden flex-col gap-5 md:flex" aria-hidden="true">
        <PawIcon className="rise-in h-5 w-5 -rotate-[24deg] text-blood/45" style={rise(800)} />
        <PawIcon className="rise-in h-6 w-6 rotate-[14deg] translate-x-8 text-blood/60" style={rise(950)} />
        <PawIcon className="rise-in h-7 w-7 -rotate-[10deg] translate-x-3 text-blood/80" style={rise(1100)} />
      </div>

      {/* Sceau de cire */}
      <div className="rise-in absolute bottom-24 right-10 hidden lg:block" style={rise(760)}>
        <WaxSeal />
      </div>

      {/* Marquee d'avertissement */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-ember/25 bg-wine/15 py-3">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {WARNING_STRIP.map((w) => (
                <span
                  key={w + dup}
                  className="flex items-center gap-6 pr-6 font-mono text-[9px] uppercase tracking-[0.32em] text-ember/85 md:text-[10px]"
                >
                  {w}
                  <PawIcon className="h-3.5 w-3.5 text-blood/70" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
