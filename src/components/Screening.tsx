import { useEffect, useRef, useState } from "react";
import { RECORDINGS } from "../data";
import { Reveal, useReducedMotion } from "../hooks";
import { SectionHead } from "./Chrome";
import { PauseIcon, PlayIcon, ReelIcon } from "./icons";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Screening() {
  const [activeId, setActiveId] = useState(RECORDINGS[0].id);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [t, setT] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rec = RECORDINGS.find((r) => r.id === activeId) ?? RECORDINGS[0];

  /* Lecture uniquement quand la salle est visible — économie & politesse */
  useEffect(() => {
    const el = playerRef.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) v.play().catch(() => setPlaying(false));
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => setT(v.currentTime);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("timeupdate", onTime);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("timeupdate", onTime);
    };
  }, [activeId]);

  const activeLine = rec.transcript.reduce((acc, l, i) => (t >= l.at ? i : acc), -1);
  const frames = Math.floor((t % 1) * 25);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => undefined);
    else v.pause();
  };

  return (
    <section id="projection" data-chapter="V — Salle de projection" className="relative px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_18%,rgba(232,64,74,0.07),transparent_65%)]"
        aria-hidden="true"
      />

      <SectionHead
        num="V"
        tag="Enregistrements saisis"
        title={
          <>
            Salle de <span className="italic text-ember">projection</span>
          </>
        }
      />

      <Reveal className="-mt-6 mb-12 max-w-3xl md:-mt-8">
        <p className="font-mono text-[12px] leading-relaxed text-bone/70">
          Les vidéos jointes au dossier ne sont pas de simples pièces : ce sont des scènes
          reconstituées. Lumière éteinte, son monté. Le greffe transcrit en direct.
        </p>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Projecteur */}
        <Reveal>
          <div ref={playerRef} className="border border-ash bg-deep shadow-[0_24px_60px_rgba(4,2,3,0.6)]">
            {/* Ardoise de tournage */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 border-b border-ash px-4 py-3 font-mono text-[9px] uppercase tracking-[0.22em] text-fog md:text-[10px]">
              <ReelIcon className="h-4 w-4 text-ember" />
              <span className="text-bone">
                Enregistrement {rec.id} <span className="text-fog">{rec.label}</span>
              </span>
              <span className="hidden sm:inline">{rec.camera}</span>
              <span className="ml-auto flex items-center gap-2 text-ember">
                <span className={`h-2 w-2 rounded-full bg-ember ${playing ? "rec-dot" : "opacity-30"}`} aria-hidden="true" />
                {playing ? "REC" : "PAUSE"}
              </span>
            </div>

            <div className="scanlines screen-flicker relative">
              <video
                key={rec.id}
                ref={videoRef}
                src={rec.src}
                poster={rec.poster}
                muted={muted}
                loop
                playsInline
                preload="metadata"
                className="aspect-video w-full bg-deep object-cover"
              />
            </div>

            {/* Pupitre de contrôle */}
            <div className="flex items-center gap-4 border-t border-ash px-4 py-3">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Mettre en pause" : "Lancer la lecture"}
                className="flex h-10 w-10 items-center justify-center border border-ember/50 bg-blood/15 text-ember transition-colors hover:bg-blood hover:text-parch"
              >
                {playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  const v = videoRef.current;
                  if (!v) return;
                  v.muted = !v.muted;
                  setMuted(v.muted);
                }}
                className="border border-bone/25 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/70 transition-colors hover:border-ember hover:text-ember"
              >
                {muted ? "Son : coupé" : "Son : direct"}
              </button>
              <span className="ml-auto font-mono text-[10px] tracking-[0.2em] text-ember/90 tabular-nums">
                TC 00:00:{pad(Math.floor(t))}:{pad(frames)}
              </span>
            </div>
          </div>

          {/* Pellicule — sélection des enregistrements */}
          <div className="mt-6 grid grid-cols-3 gap-3" role="tablist" aria-label="Choisir un enregistrement">
            {RECORDINGS.map((r) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={r.id === activeId}
                onClick={() => {
                  setActiveId(r.id);
                  setT(0);
                }}
                className={`group relative overflow-hidden border text-left transition-all duration-300 ${
                  r.id === activeId
                    ? "border-ember shadow-[0_0_0_1px_rgba(232,64,74,0.5)]"
                    : "border-ash opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={r.poster}
                  alt=""
                  loading="lazy"
                  className={`aspect-video w-full object-cover transition-all duration-500 ${
                    r.id === activeId ? "" : "grayscale contrast-110"
                  }`}
                />
                <span className="absolute inset-x-0 bottom-0 bg-deep/85 px-2 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-bone/85 md:text-[9px]">
                  {r.id} — {r.label}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Transcription */}
        <Reveal delay={140}>
          <aside className="flex h-full flex-col border border-ash bg-coal/70 p-6">
            <div className="flex items-center justify-between border-b border-dashed border-ember/25 pb-3">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-ember">
                Transcription
              </h3>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-fog">PV sonore</span>
            </div>
            <ol className="mt-5 space-y-4">
              {rec.transcript.map((line, i) => (
                <li
                  key={line.text}
                  className={`border-l-2 pl-4 font-mono text-[11px] leading-relaxed transition-all duration-500 ${
                    i === activeLine
                      ? "border-ember bg-blood/10 text-bone"
                      : i < activeLine
                        ? "border-ember/30 text-bone/55"
                        : "border-ash text-fog/60"
                  }`}
                >
                  {line.text}
                </li>
              ))}
            </ol>
            <p className="mt-auto pt-6 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-fog/70">
              Les enregistrements réels des témoins remplaceront ces bandes de démonstration
              à l'ouverture du dossier.
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
