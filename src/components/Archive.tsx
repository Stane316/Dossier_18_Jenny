import { CLOSING_LINE, DOSSIER_REF, TOKEN_COLORS, TOKEN_MOTION } from "../data";
import { Reveal } from "../hooks";
import { SectionHead, Stamp } from "./Chrome";
import { PawIcon } from "./icons";

export default function Archive() {
  return (
    <>
      {/* ── SCREEN 07 — CLÔTURE ─────────────────────────────── */}
      <section
        id="cloture"
        data-chapter="VII — Affaire classée"
        className="relative px-5 py-28 md:px-12 md:py-44 lg:px-20"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(110,11,30,0.16),transparent_70%)]"
          aria-hidden="true"
        />

        <Reveal className="mx-auto mb-12 flex max-w-5xl items-center gap-4 font-mono text-[10px] uppercase tracking-[0.28em]">
          <span className="text-ember">Pièce VII</span>
          <span className="h-px flex-1 bg-ember/25" aria-hidden="true" />
          <span className="text-fog">Clôture</span>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto max-w-3xl border border-ember/25 bg-coal/70 p-9 text-center shadow-[0_30px_80px_rgba(4,2,3,0.6)] md:p-16">
            <div className="absolute -top-5 right-6 md:right-10">
              <Stamp animate rot={8} className="bg-ink px-4 py-2 text-base md:text-xl">
                Classée — pour toujours
              </Stamp>
            </div>

            <h2 className="font-display text-[clamp(2.8rem,7vw,5rem)] font-black italic leading-[0.95] text-bone">
              Affaire classée.
            </h2>
            <p className="mx-auto mt-7 max-w-md font-mono text-[13px] leading-relaxed text-bone/75">
              Le dossier est archivé. Les pièces restent.
              <br />
              Les gens restent.
            </p>
            <p className="mx-auto mt-6 max-w-lg font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-ember">
              {CLOSING_LINE}
            </p>

            {/* Traversée de pattes — la signature du sujet */}
            <div className="mt-10 flex items-end justify-center gap-5 md:gap-8" aria-hidden="true">
              {[
                { r: -22, o: 0.35, s: "h-4 w-4" },
                { r: 14, o: 0.5, s: "h-5 w-5" },
                { r: -8, o: 0.65, s: "h-6 w-6" },
                { r: 18, o: 0.8, s: "h-7 w-7" },
                { r: -14, o: 0.95, s: "h-8 w-8" },
              ].map((p, i) => (
                <Reveal key={i} delay={300 + i * 140}>
                  <PawIcon
                    className={`${p.s} text-blood`}
                    style={{ opacity: p.o, rotate: `${p.r}deg` }}
                  />
                </Reveal>
              ))}
            </div>

            <div className="mt-11 flex flex-wrap items-center justify-center gap-6">
              <a
                href="#couverture"
                className="btn-stamp inline-flex items-center gap-3 border border-ember/60 bg-blood px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-parch"
              >
                Reconstituer la scène
              </a>
              <a
                href="#deposer"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/65 underline decoration-blood/60 underline-offset-8 transition-colors hover:text-ember"
              >
                Verser une dernière pièce
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={240} className="mt-10 text-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-fog/70">
            Fin de la transmission — 13.08 — réf. {DOSSIER_REF}
          </p>
        </Reveal>
      </section>

      {/* ── SCREEN 08 — ANNEXE : SOURCE DE VÉRITÉ VISUELLE ─── */}
      <section
        id="annexe"
        data-chapter="VIII — Annexe"
        className="paper-surface px-5 py-24 text-ink md:px-12 md:py-32 lg:px-20"
      >
        <SectionHead
          dark={false}
          num="VIII"
          tag="Pour l'équipe d'implémentation"
          title={
            <>
              Annexe A — <span className="italic text-blood">système visuel</span>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
          {/* Couleurs */}
          <Reveal>
            <h3 className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-blood">
              01 — Couleurs
            </h3>
            <ul className="space-y-3.5">
              {TOKEN_COLORS.map((c) => (
                <li key={c.name} className="flex items-center gap-3.5">
                  <span
                    className="h-10 w-10 shrink-0 border border-ink/25"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-[11px] font-bold tracking-[0.14em]">
                      {c.name} <span className="font-normal text-ink/55">{c.hex}</span>
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink/55">{c.usage}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Typographie & formes */}
          <Reveal delay={120}>
            <h3 className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-blood">
              02 — Typographie & formes
            </h3>
            <div className="space-y-6 border-l border-ink/20 pl-6">
              <div>
                <p className="font-display text-5xl font-black leading-none">Jenny.</p>
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/55">
                  Fraunces — display · noir 900 · italique pour l'émotion
                </p>
              </div>
              <div>
                <p className="font-mono text-lg font-semibold tracking-[0.14em]">DOSSIER N°18</p>
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/55">
                  IBM Plex Mono — PV, tampons, métadonnées
                </p>
              </div>
              <div>
                <p className="font-hand text-4xl leading-none">Méminou,</p>
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/55">
                  Caveat — dépositions & lettre, tout ce qui est écrit à la main
                </p>
              </div>
              <p className="font-mono text-[10px] leading-relaxed text-ink/65">
                Rayons : 0–2 px, angulaire (langue « dossier »). Ombres : dures, 4–10 px,
                lie-de-vin. Filets : 1 px, doubles pour les tampons, pointillés pour les fiches.
              </p>
            </div>
          </Reveal>

          {/* Mouvement */}
          <Reveal delay={240}>
            <h3 className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-blood">
              03 — Mouvement
            </h3>
            <table className="w-full text-left">
              <tbody>
                {TOKEN_MOTION.map((m) => (
                  <tr key={m.name} className="border-b border-dashed border-ink/20 align-top">
                    <td className="py-3 pr-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em]">
                      {m.name}
                      <span className="block font-normal text-blood">{m.value}</span>
                    </td>
                    <td className="py-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-ink/55">
                      {m.use}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 font-mono text-[10px] leading-relaxed text-ink/65">
              Easings : (0.22, 0.61, 0.36, 1) pour le standard, (0.16, 1, 0.3, 1) pour le
              dramatique. Silences : un temps de pause après chaque tampon. Surprise : le
              verdict uniquement. <b>prefers-reduced-motion : tout est respecté.</b>
            </p>
          </Reveal>
        </div>

        {/* Notes de direction */}
        <div className="mt-16 grid gap-8 border-t-2 border-ink/70 pt-10 md:grid-cols-3">
          <Reveal>
            <h4 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-blood">
              Décisions respectées
            </h4>
            <ul className="space-y-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-ink/70">
              <li>— Rouge & noir. Jamais de rose (banni par tampon).</li>
              <li>— Chaton : suspect principal. Lapin : juste derrière, officiellement.</li>
              <li>— Date pivot : 13 août, inscrite dans la réf. du dossier.</li>
              <li>— Contributions : message ou photo ou vidéo. Jamais vide.</li>
              <li>— La vidéo traitée en scène, pas en galerie.</li>
            </ul>
          </Reveal>
          <Reveal delay={110}>
            <h4 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-blood">
              Questions ouvertes
            </h4>
            <ul className="space-y-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-ink/70">
              <li>— Substituer les bandes de démonstration par les vidéos réelles.</li>
              <li>— Remplacer les dépositions d'exemple par les vraies.</li>
              <li>— Sceller la pièce A-06 et choisir l'heure exacte d'ouverture.</li>
              <li>— Générer le token d'accès privé à l'expérience Jenny.</li>
            </ul>
          </Reveal>
          <Reveal delay={220}>
            <h4 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-blood">
              Proposed change
            </h4>
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-ink/70">
              Aucune. L'architecture documentée (Phases 1–7) est intégralement respectée.
              La 3D WebGL n'est pas retenue pour ce prototype : le tilt DOM, le fil rouge
              SVG et les braises canvas portent la profondeur sans dépendance technique.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
