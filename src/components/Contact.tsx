import { Mail, Phone, MapPin, Download, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { PROFILE } from "@/lib/content";

function Linkedin({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.75V1.75C24 .78 23.2 0 22.22 0z" />
    </svg>
  );
}

const CHANNELS = [
  {
    icon: Mail,
    label: "email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
  },
  {
    icon: Phone,
    label: "teléfono",
    value: PROFILE.phone,
    href: `tel:${PROFILE.phoneHref}`,
  },
  {
    icon: Linkedin,
    label: "linkedin",
    value: PROFILE.linkedinLabel,
    href: PROFILE.linkedin,
  },
  {
    icon: MapPin,
    label: "ubicación",
    value: PROFILE.location,
    href: null,
  },
];

export default function Contact() {
  return (
    <section
      id="contacto"
      className="relative scroll-mt-20 overflow-hidden py-24 sm:py-28"
    >
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(34,197,94,0.10), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="mb-3 font-mono text-sm text-accent prompt">
            git commit -m &quot;hablemos&quot;
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-fg sm:text-5xl">
            ¿Construimos algo <span className="text-gradient">juntos</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
            Estoy abierto a nuevos retos como Full Stack Developer. Si buscas a
            alguien que domine el ciclo completo, escríbeme.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-mono text-sm font-semibold text-bg transition-all hover:bg-accent-bright hover:shadow-[var(--shadow-glow)]"
            >
              <Mail size={16} aria-hidden />
              Enviar email
            </a>
            <a
              href="/CV-Ivan-Gallego.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-border-bright bg-surface/40 px-6 py-3.5 font-mono text-sm text-fg transition-all hover:border-accent hover:text-accent-bright"
            >
              <Download size={16} aria-hidden />
              Descargar CV
            </a>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mx-auto mt-12 grid max-w-2xl gap-3 sm:grid-cols-2">
            {CHANNELS.map((c) => {
              const inner = (
                <div className="card card-hover flex items-center gap-3 p-4 text-left">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-bright bg-surface-2/60 text-accent-bright">
                    <c.icon size={17} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-fg-dim">
                      {c.label}
                    </div>
                    <div className="truncate text-sm text-fg">{c.value}</div>
                  </div>
                  {c.href && (
                    <ArrowUpRight
                      size={16}
                      className="ml-auto shrink-0 text-fg-dim"
                      aria-hidden
                    />
                  )}
                </div>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={`${c.label}: ${c.value}`}
                >
                  {inner}
                </a>
              ) : (
                <div key={c.label}>{inner}</div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
