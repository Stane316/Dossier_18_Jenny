import { useEffect, useRef } from "react";
import { LETTER_PARAGRAPHS, LETTER_SIGNATURE, VERDICT_SENTENCE } from "../data";
import { Reveal, useInView, useReducedMotion } from "../hooks";
import { SealIcon } from "./icons";

/* Braises montantes — canvas léger, déclenché uniquement à l'écran */
type Ember = {
  x: number;
  y: number;
  r: number;
  vy: number;
  sway: number;
  swaySp: number;
  a: number;
  gold: boolean;
};

function EmbersField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (anywhere = false): Ember => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 12,
      r: 0.8 + Math.random() * 1.8,
      vy: 0.25 + Math.random() * 0.55,
      sway: Math.random() * Math.PI * 2,
      swaySp: 0.008 + Math.random() * 0.014,
      a: 0.2 + Math.random() * 0.5,
      gold: Math.random() < 0.24,
    });

    const embers: Ember[] = Array.from({ length: 34 }, () => spawn(true));
    let raf = 0;
    let running = false;

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of embers) {
        p.y -= p.vy;
        p.sway += p.swaySp;
        p.x += Math.sin(p.sway) * 0.3;
        if (p.y < -14 || p.x < -14 || p.x > w + 14) Object.assign(p, spawn());
        const life = Math.max(0, Math.min(1, (h - p.y) / (h * 0.9)));
        ctx.globalAlpha = p.a * life;
        ctx.fillStyle = p.gold ? "#C9A227" : "#E8404A";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) return null;
  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}

export default function Verdict() {
  const { ref: slamRef, inView: slammed } = useInView<HTMLDivElement>(0.45);

  return (
    <section id="verdict" data-chapter="VI — Verdict" className="relative overflow-hidden">
      {/* Lueur de braise au sol */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_75%_70%_at_50%_100%,rgba(200,16,46,0.14),transparent_70%)]"
        aria-hidden="true"
      />
      <EmbersField />

      {/* Le verdict */}
      <div
        ref={slamRef}
        className={`relative px-5 pb-20 pt-28 text-center md:px-12 md:pt-40 ${slammed ? "shake-once" : ""}`}
      >
        <Reveal className="mx-auto flex max-w-xl items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-fog">
          <SealIcon className="h-4 w-4 text-blood" />
          Le jury — composé de tous les témoins ci-dessus — a délibéré
        </Reveal>

        <Reveal delay={150}>
          <h2 className="mt-8 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-black italic text-bone">
            Le verdict
          </h2>
        </Reveal>

        <div className="mt-10 flex justify-center" aria-live="polite">
          <span className="relative inline-block">
            <span
              className={`stamp px-8 py-4 text-[clamp(2.6rem,9vw,6rem)] leading-none md:px-14 ${
                slammed ? "stamp-animate" : "opacity-0"
              }`}
              style={{ "--stamp-rot": "-7deg", borderWidth: "5px" } as React.CSSProperties}
            >
              Coupable
            </span>
          </span>
        </div>

        <Reveal delay={200}>
          <p className="mt-10 font-display text-[clamp(1.4rem,3vw,2.2rem)] font-semibold italic leading-snug text-ember">
            d'être irremplaçable.
          </p>
          <p className="mx-auto mt-6 max-w-xl font-mono text-[12px] leading-relaxed text-bone/70">
            {VERDICT_SENTENCE}
          </p>
        </Reveal>
      </div>

      {/* Pièce jointe — la lettre */}
      <div className="relative px-5 pb-28 pt-10 md:px-12 md:pb-40">
        <img
          src="/images/papillon-or.jpg"
          alt=""
          aria-hidden="true"
          className="butterfly-float pointer-events-none absolute -top-6 right-4 z-10 hidden w-28 mix-blend-screen md:right-24 md:block md:w-40"
        />

        <Reveal className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="evidence-tape -rotate-2 px-4 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.24em]">
              Pièce jointe — lecture obligatoire
            </span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto max-w-3xl rotate-[-0.6deg] border border-ink/15 bg-parch p-7 text-ink shadow-[0_30px_80px_rgba(4,2,3,0.55)] md:p-12">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(201,162,39,0.1),transparent_60%)]"
              aria-hidden="true"
            />
            <div className="relative space-y-6 font-hand text-[1.5rem] leading-[1.35] md:text-[1.75rem]">
              {LETTER_PARAGRAPHS.map((p, i) => (
                <Reveal key={i} delay={i * 160} as="p" className={i === 0 ? "text-blood" : ""}>
                  {p}
                </Reveal>
              ))}
              <Reveal delay={LETTER_PARAGRAPHS.length * 160} as="p" className="text-right font-semibold text-ink/80">
                {LETTER_SIGNATURE}
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
