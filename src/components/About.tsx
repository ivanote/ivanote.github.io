import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const FACTS = [
  {
    k: "01",
    title: "Ciclo completo",
    text: "API, base de datos, frontend y despliegue. No delego capas: entiendo el sistema entero.",
  },
  {
    k: "02",
    title: "Laravel + React",
    text: "Backend Laravel sobre microservicios y frontends con React, Next.js y TypeScript.",
  },
  {
    k: "03",
    title: "IA en el flujo",
    text: "Claude Code, MCP y agentes como herramienta diaria, sin perder el control del código.",
  },
];

export default function About() {
  return (
    <section id="sobre-mi" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading index="01" title="Sobre mí" />

        <Reveal>
          <p className="text-balance text-2xl font-medium leading-snug text-fg sm:text-[32px] sm:leading-[1.3]">
            Construyo software{" "}
            <span className="text-gradient">de principio a fin</span> — y lo
            hago porque me gusta que cada pieza encaje.
          </p>
        </Reveal>

        <Reveal delay={90}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-[17px]">
            Full Stack Developer con 6 años de experiencia. Diseño la API, modelo
            la base de datos, construyo el frontend y lo despliego con Docker y
            CI/CD. También mantengo aplicaciones legacy sin romper lo que ya
            funciona.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border-bright bg-border sm:grid-cols-3">
          {FACTS.map((f, i) => (
            <Reveal key={f.k} delay={i * 100}>
              <div className="h-full bg-surface p-6 transition-colors hover:bg-bg-elev">
                <span className="font-mono text-xs text-accent">{f.k}</span>
                <h3 className="mt-3 font-mono text-sm font-semibold text-fg">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                  {f.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
