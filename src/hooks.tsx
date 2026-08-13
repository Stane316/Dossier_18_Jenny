import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

/* ── Préférence de mouvement réduite ── */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const cb = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, []);
  return reduced;
}

/* ── Progression normalisée d'une section dans le viewport ── */
export function useSectionProgress<T extends HTMLElement>(disabled = false) {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(disabled ? 1 : 0);

  useEffect(() => {
    if (disabled) {
      setProgress(1);
      return;
    }

    const element = ref.current;
    if (!element) return;

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const travel = rect.height + window.innerHeight;
        const next = travel > 0
          ? Math.min(1, Math.max(0, (window.innerHeight - rect.top) / travel))
          : 0;

        setProgress((current) => Math.abs(current - next) > 0.001 ? next : current);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [disabled]);

  return { ref, progress };
}

/* ── Révélation au scroll (une seule fois) ── */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Wrapper de révélation déclaratif ── */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "p" | "figure" | "li" | "header" | "span" | "blockquote" | "article";
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <Tag
      ref={ref as never}
      data-reveal
      className={`${className} ${inView ? "is-in" : ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ── Machine à écrire séquentielle ── */
export function useTypewriter(lines: string[], start: boolean, speed = 16, pause = 320) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState({ line: 0, chars: 0, done: false });

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setProgress({ line: lines.length, chars: 0, done: true });
      return;
    }
    let line = 0;
    let chars = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (line >= lines.length) {
        setProgress({ line, chars, done: true });
        return;
      }
      const current = lines[line];
      chars += 1 + Math.floor(Math.random() * 2);
      if (chars >= current.length) {
        setProgress({ line, chars: current.length, done: false });
        line += 1;
        chars = 0;
        timeout = setTimeout(tick, pause);
      } else {
        setProgress({ line, chars, done: false });
        timeout = setTimeout(tick, speed);
      }
    };
    timeout = setTimeout(tick, 400);
    return () => clearTimeout(timeout);
  }, [start, reduced, lines, speed, pause]);

  return progress;
}

/* ── Tilt 3D léger sur cartes (DOM/CSS uniquement) ── */
export function useTilt<T extends HTMLElement>(max = 5) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia("(hover: hover)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--tilt-x", `${(-py * max).toFixed(2)}deg`);
        el.style.setProperty("--tilt-y", `${(px * max).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max]);
  return ref;
}
