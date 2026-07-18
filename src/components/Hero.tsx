"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, Mail } from "lucide-react";
import { HERO_TAGLINE } from "@/lib/content";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

const LINES = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: "Iván Gallego Vela" },
  { prompt: true, text: "cat role.ts" },
  {
    prompt: false,
    text: 'const rol = "Full Stack Developer · Laravel · React / Next.js";',
  },
];

function useTypewriter(lines: typeof LINES) {
  const [rendered, setRendered] = useState<string[]>(lines.map(() => ""));
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setRendered(lines.map((l) => l.text));
      setDone(true);
      return;
    }

    let li = 0;
    let ci = 0;
    let raf: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (li >= lines.length) {
        setDone(true);
        return;
      }
      const full = lines[li].text;
      ci++;
      // Snapshot indices: li/ci mutate below before React flushes the
      // updater, so the closure must not read the live (advanced) values.
      const curLi = li;
      const curCi = ci;
      setRendered((prev) => {
        const next = [...prev];
        next[curLi] = full.slice(0, curCi);
        return next;
      });
      if (ci >= full.length) {
        li++;
        ci = 0;
        raf = setTimeout(tick, 260);
      } else {
        raf = setTimeout(tick, 34);
      }
    };
    raf = setTimeout(tick, 500);
    return () => clearTimeout(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { rendered, done };
}

export default function Hero() {
  const { rendered, done } = useTypewriter(LINES);
  // Only the line currently being typed shows a caret.
  const activeLine = done
    ? -1
    : LINES.findIndex((l, i) => rendered[i].length < l.text.length);

  // Pausa el render 3D cuando el hero sale de pantalla (ahorra GPU al hacer scroll).
  const sectionRef = useRef<HTMLElement>(null);
  const [heroActive, setHeroActive] = useState(true);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setHeroActive(e.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden pt-24"
    >
      {/* backdrop layers */}
      <div className="grid-bg absolute inset-0 -z-30 opacity-[0.35]" aria-hidden />
      <div
        className="absolute inset-0 -z-30"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 50% at 70% 30%, rgba(34,197,94,0.10), transparent 70%), radial-gradient(50% 40% at 20% 80%, rgba(56,189,248,0.08), transparent 70%)",
        }}
      />
      {/* 3D atom */}
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-20 w-full opacity-50 md:w-[58%] md:opacity-90">
        <HeroScene active={heroActive} />
      </div>
      {/* legibility scrim over the 3D layer */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, var(--color-bg) 0%, color-mix(in oklab, var(--color-bg) 70%, transparent) 42%, transparent 72%), linear-gradient(0deg, var(--color-bg) 2%, transparent 30%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-bright bg-surface-2/50 px-3.5 py-1.5 font-mono text-xs text-fg-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Disponible para nuevos proyectos
          </div>

          {/* terminal window */}
          <div className="card overflow-hidden shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2 border-b border-border bg-bg-elev/80 px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-rose/80" />
              <span className="h-3 w-3 rounded-full bg-amber/80" />
              <span className="h-3 w-3 rounded-full bg-accent/80" />
              <span className="ml-3 font-mono text-xs text-fg-dim">
                ivan@dev: ~/cv — zsh
              </span>
            </div>
            <div className="space-y-1.5 p-5 font-mono text-sm sm:text-[15px]">
              {LINES.map((l, i) => (
                <p
                  key={i}
                  className={
                    l.prompt
                      ? "text-fg-muted"
                      : i === 1
                        ? "text-xl font-bold text-fg sm:text-2xl"
                        : "text-accent-bright"
                  }
                >
                  {l.prompt && <span className="text-accent">$ </span>}
                  <span className="whitespace-pre-wrap">{rendered[i]}</span>
                  {i === activeLine && (
                    <span className="ml-[3px] inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-accent align-baseline animate-blink" />
                  )}
                </p>
              ))}
            </div>
          </div>

          <h1 className="sr-only">
            Iván Gallego Vela — Full Stack Developer, Laravel y React / Next.js
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {HERO_TAGLINE}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-mono text-sm font-semibold text-bg transition-all hover:bg-accent-bright hover:shadow-[var(--shadow-glow)]"
            >
              <Mail size={16} aria-hidden />
              Contactar
            </a>
            <a
              href="#experiencia"
              className="inline-flex items-center gap-2 rounded-lg border border-border-bright bg-surface/40 px-5 py-3 font-mono text-sm text-fg transition-all hover:border-accent hover:text-accent-bright"
            >
              Ver experiencia
              <ArrowDown size={16} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
