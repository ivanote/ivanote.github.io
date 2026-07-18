"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowDown, Waves } from "lucide-react";
import { WATERPOLO } from "@/lib/content";

export default function Waterpolo() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const maxShiftRef = useRef(0);

  const [sectionH, setSectionH] = useState<number | undefined>(undefined);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) {
      setSectionH(undefined);
      if (trackRef.current) trackRef.current.style.transform = "";
      return;
    }
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    let raf = 0;

    // Higher factor = slower horizontal travel per unit of vertical scroll.
    const SPEED_FACTOR = 1.85;

    const measure = () => {
      const vw = window.innerWidth;
      const shift = Math.max(0, track.scrollWidth - vw);
      maxShiftRef.current = shift;
      setSectionH(shift * SPEED_FACTOR + window.innerHeight);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const total = section.offsetHeight - window.innerHeight;
        const rect = section.getBoundingClientRect();
        const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
        track.style.transform = `translate3d(${-(p * maxShiftRef.current)}px,0,0)`;
      });
    };

    measure();
    onScroll();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const IntroPanel = (
    <div className="flex h-full w-[86vw] shrink-0 flex-col justify-center pr-4 sm:w-[38vw] sm:min-w-[420px]">
      <p className="mb-3 font-mono text-sm text-cyan">
        <span className="text-fg-dim">05.</span> ./waterpolo
      </p>
      <h2 className="text-balance text-4xl font-bold leading-tight tracking-tight text-fg sm:text-5xl">
        {WATERPOLO.title}
      </h2>
      <p className="mt-5 max-w-md text-base leading-relaxed text-fg-muted sm:text-lg">
        {WATERPOLO.intro}
      </p>
      {!reduced && (
        <p className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-fg-dim">
          <ArrowRight size={14} className="text-cyan" aria-hidden />
          desplázate para recorrer
        </p>
      )}
    </div>
  );

  const OutroPanel = (
    <div className="flex h-full w-[86vw] shrink-0 flex-col justify-center pr-8 sm:w-[34vw] sm:min-w-[360px]">
      <Waves size={28} className="mb-4 text-cyan" aria-hidden />
      <p className="text-2xl font-semibold leading-snug text-fg sm:text-3xl">
        {WATERPOLO.outro}
      </p>
      <a
        href="#contacto"
        className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg border border-border-bright bg-surface/40 px-5 py-3 font-mono text-sm text-fg transition-all hover:border-accent hover:text-accent-bright"
      >
        ¿Hablamos?
        <ArrowRight size={16} aria-hidden />
      </a>
    </div>
  );

  const Photos = WATERPOLO.photos.map((p, i) => (
    <figure
      key={p.src}
      className="group relative h-[64svh] shrink-0 overflow-hidden rounded-2xl border border-border-bright/50 shadow-[var(--shadow-card)] sm:h-[76svh]"
      style={{ aspectRatio: `${p.w} / ${p.h}`, maxHeight: `${Math.round(p.h * 1.4)}px` }}
    >
      <Image
        src={p.src}
        alt={`Iván Gallego Vela · waterpolo — ${p.tag}`}
        fill
        sizes="(max-width: 640px) 85vw, 48vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        priority={i < 2}
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, transparent 55%, rgba(10,15,30,0.15) 72%, rgba(10,15,30,0.85) 100%)",
        }}
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <span className="inline-flex rounded-full border border-cyan/40 bg-cyan/10 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-cyan backdrop-blur">
          {p.tag}
        </span>
      </figcaption>
      <span className="absolute right-3 top-3 font-mono text-[11px] text-fg/70">
        {String(i + 1).padStart(2, "0")}/{String(WATERPOLO.photos.length).padStart(2, "0")}
      </span>
    </figure>
  ));

  // Shared background: color-graded pool water.
  const Backdrop = (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <Image
        src="/waterpolo/w4.jpg"
        alt=""
        fill
        sizes="100vw"
        className="scale-110 object-cover opacity-30 blur-2xl"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(10,15,30,0.92) 0%, rgba(10,15,30,0.6) 40%, rgba(56,189,248,0.18) 75%, rgba(34,197,94,0.16) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 120%, rgba(56,189,248,0.15), transparent 60%)",
        }}
      />
      {/* caustics-like moving sheen */}
      {!reduced && (
        <div
          className="absolute -inset-x-1/2 top-0 h-full opacity-20 animate-float"
          style={{
            background:
              "repeating-linear-gradient(115deg, transparent 0 40px, rgba(255,255,255,0.05) 40px 44px)",
          }}
        />
      )}
    </div>
  );

  // Reduced-motion / fallback: native horizontal scroll, no pinning.
  if (reduced) {
    return (
      <section
        id="waterpolo"
        ref={sectionRef}
        className="relative scroll-mt-20 overflow-hidden py-24"
      >
        {Backdrop}
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8">
          <div className="snap-start">{IntroPanel}</div>
          {WATERPOLO.photos.map((_, i) => (
            <div key={i} className="snap-start">
              {Photos[i]}
            </div>
          ))}
          <div className="snap-start">{OutroPanel}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="waterpolo"
      ref={sectionRef}
      className="relative scroll-mt-20"
      style={{ height: sectionH ? `${sectionH}px` : undefined }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {Backdrop}
        <div
          ref={trackRef}
          className="flex items-center gap-5 pl-5 pr-[10vw] will-change-transform sm:gap-7 sm:pl-8"
        >
          {IntroPanel}
          {Photos}
          {OutroPanel}
        </div>

        {/* progress hint */}
        <div className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-[11px] text-fg-muted sm:hidden">
          <ArrowDown size={12} aria-hidden /> desliza
        </div>
      </div>
    </section>
  );
}
