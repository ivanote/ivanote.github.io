import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { EXPERIENCE } from "@/lib/content";

const N = EXPERIENCE.length;

export default function Experience() {
  return (
    <section id="experiencia" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          title="Experiencia"
          subtitle="Seis años de recorrido, del último commit al primero."
        />

        <ol className="relative">
          {/* running line */}
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-border-bright to-transparent sm:left-[9px]"
            aria-hidden
          />

          {EXPERIENCE.map((job, i) => (
            <li
              key={job.company}
              className="relative pb-16 pl-10 last:pb-0 sm:pb-20 sm:pl-14"
            >
              {/* node — fuera del Reveal para anclarse al <li>, no al transform */}
              <span
                className={`absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border sm:h-[19px] sm:w-[19px] ${
                  job.current
                    ? "border-accent bg-accent/20"
                    : "border-border-bright bg-surface"
                }`}
                aria-hidden
              >
                {job.current ? (
                  <>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40" />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </>
                ) : (
                  <span className="h-1 w-1 rounded-full bg-fg-dim" />
                )}
              </span>

              <Reveal delay={i * 90}>
                {/* cabecera del bloque: fecha como tag de commit, pegada a la empresa */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-border-bright bg-surface-2/50 px-2.5 py-1 font-mono text-[11px] text-fg-muted">
                    <span className="text-accent">◆</span>
                    {job.period}
                  </span>
                  {job.current && (
                    <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-accent-bright">
                      actual
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-xl font-bold leading-tight text-fg sm:text-2xl">
                  {job.company}
                </h3>
                <p className="mt-0.5 font-mono text-sm text-accent-bright">
                  {job.role}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {job.points.map((pt, j) => (
                    <li
                      key={j}
                      className="flex gap-2 text-[14px] leading-relaxed text-fg-muted"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {job.stack.map((t) => (
                    <span key={t} className="chip !text-[11px] !px-2 !py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-2 text-center">
          <p className="font-mono text-xs text-fg-dim">
            <span className="text-accent">$</span> git log --oneline
            <span className="ml-2 text-fg-muted">→ {N} etapas · 6 años en producción</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
