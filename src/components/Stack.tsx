"use client";

import { useState, type CSSProperties } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { STACK } from "@/lib/content";
import { TECH_LOGOS, LOGO_VIEWBOX, type TechLogo } from "@/lib/logos";

// Logos oficiales destacados (paths de simple-icons en logos.ts).
const FEATURED = [
  "laravel",
  "react",
  "nextdotjs",
  "typescript",
  "php",
  "tailwindcss",
  "vuedotjs",
  "mysql",
  "docker",
  "git",
];

const LOGOS = FEATURED.map((k) => TECH_LOGOS.find((l) => l.key === k)!).filter(
  Boolean
);

export default function Stack() {
  const [hovered, setHovered] = useState<TechLogo | null>(null);

  return (
    <section
      id="stack"
      className="relative scroll-mt-20 overflow-hidden py-24 sm:py-28"
    >
      <div className="dot-bg absolute inset-0 -z-10 opacity-40" aria-hidden />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          title="Stack técnico"
          subtitle="Las tecnologías con las que trabajo cada día. Pasa el ratón por encima."
        />

        {/* Rejilla de logos oficiales */}
        <Reveal>
          <div className="relative mb-14 overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface/40 to-bg-elev/20 p-6 sm:p-10">
            {/* glow ambiental */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-40 -z-0"
              aria-hidden
              style={{
                background:
                  "radial-gradient(60% 100% at 50% 0%, rgba(34,197,94,0.10), transparent 70%)",
              }}
            />

            <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
              {LOGOS.map((logo, i) => (
                <Reveal key={logo.key} delay={i * 45}>
                  <button
                    type="button"
                    onMouseEnter={() => setHovered(logo)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(logo)}
                    onBlur={() => setHovered(null)}
                    aria-label={logo.label}
                    style={{ "--brand": logo.color } as CSSProperties}
                    className="group flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-2xl border bg-surface-2/60 transition-all duration-300 [transition-timing-function:var(--ease-out-expo)] [border-color:var(--brand)] [box-shadow:0_0_22px_-6px_var(--brand)] md:border-border-bright md:bg-surface/60 md:[box-shadow:none] md:hover:-translate-y-1.5 md:hover:bg-surface-2/60 md:hover:[border-color:var(--brand)] md:hover:[box-shadow:0_14px_44px_-14px_var(--brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <svg
                      viewBox={`0 0 ${LOGO_VIEWBOX} ${LOGO_VIEWBOX}`}
                      className="h-11 w-11 [color:var(--brand)] transition-all duration-300 md:text-fg-muted md:group-hover:scale-110 md:group-hover:[color:var(--brand)] sm:h-12 sm:w-12"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d={logo.path} />
                    </svg>
                    <span className="font-mono text-[11px] text-fg transition-colors md:text-fg-dim md:group-hover:text-fg">
                      {logo.label}
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>

            {/* caption terminal */}
            <div className="relative mt-6 font-mono text-[11px] text-fg-dim">
              <span className="text-accent">$</span>{" "}
              {hovered ? (
                <span className="text-accent-bright">
                  focus --tech={hovered.label}
                </span>
              ) : (
                <span>stack --logos=oficiales --count={LOGOS.length}</span>
              )}
            </div>
          </div>
        </Reveal>

        {/* categorized breakdown */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map((group, i) => (
            <Reveal key={group.key} delay={(i % 3) * 80}>
              <div className="card card-hover h-full p-5">
                <div className="mb-4 flex items-center gap-2 font-mono text-sm">
                  <span className="text-accent">{"//"}</span>
                  <span className="font-semibold text-fg">{group.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
