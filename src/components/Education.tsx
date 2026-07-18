import { GraduationCap } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { EDUCATION } from "@/lib/content";

export default function Education() {
  return (
    <section id="formacion" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="04" title="Formación" />

        <div className="grid gap-4 md:grid-cols-3">
          {EDUCATION.map((e, i) => (
            <Reveal key={e.title} delay={i * 90}>
              <div className="card card-hover flex h-full flex-col p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-bright bg-surface-2/60 text-accent-bright">
                    <GraduationCap size={17} aria-hidden />
                  </span>
                  <span className="font-mono text-sm text-fg-dim">{e.year}</span>
                </div>
                <h3 className="text-[15px] font-semibold leading-snug text-fg">
                  {e.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-accent">{e.school}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
