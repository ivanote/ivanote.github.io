"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MousePointer2 } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { STACK } from "@/lib/content";
import type { TechLogo } from "@/lib/logos";

const TechScene = dynamic(() => import("./three/TechScene"), { ssr: false });

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
          subtitle="Modelos 3D reales de las tecnologías con las que trabajo cada día. Arrastra para girarlas y pasa el ratón por encima."
        />

        {/* 3D interactive canvas */}
        <Reveal>
          <div className="relative mb-14 h-[380px] w-full cursor-grab overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface/40 to-bg-elev/20 active:cursor-grabbing sm:h-[480px]">
            <TechScene onHover={setHovered} />

            {/* hint */}
            <div className="pointer-events-none absolute right-4 top-4 hidden items-center gap-1.5 rounded-full border border-border-bright/60 bg-bg/60 px-3 py-1.5 font-mono text-[11px] text-fg-muted backdrop-blur sm:flex">
              <MousePointer2 size={12} aria-hidden />
              arrastra para rotar
            </div>

            {/* live caption */}
            <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-[11px] text-fg-dim">
              <span className="text-accent">$</span>{" "}
              {hovered ? (
                <span className="text-accent-bright">
                  focus --tech={hovered.label}
                </span>
              ) : (
                <span>render --engine=three.js --live</span>
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
