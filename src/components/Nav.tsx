"use client";

import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";

const LINKS = [
  { href: "#sobre-mi", label: "sobre-mí" },
  { href: "#experiencia", label: "experiencia" },
  { href: "#stack", label: "stack" },
  { href: "#formacion", label: "formación" },
  { href: "#waterpolo", label: "waterpolo" },
  { href: "#contacto", label: "contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a
          href="#top"
          className="font-mono text-sm font-bold tracking-tight text-fg"
          aria-label="Inicio"
        >
          <span className="text-accent">~/</span>ivan-gallego
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline font-mono text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="/CV-Ivan-Gallego.pdf"
            download
            className="hidden items-center gap-2 rounded-lg border border-border-bright bg-surface-2/60 px-3.5 py-2 font-mono text-xs font-medium text-fg transition-all hover:border-accent hover:text-accent-bright sm:inline-flex"
          >
            <Download size={14} aria-hidden />
            CV.pdf
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-bright text-fg md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg-elev/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-mono text-sm text-fg-muted transition-colors hover:bg-surface hover:text-fg"
                >
                  <span className="text-accent">→ </span>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/CV-Ivan-Gallego.pdf"
                download
                className="mt-1 flex items-center gap-2 rounded-lg border border-border-bright px-3 py-3 font-mono text-sm text-accent-bright"
              >
                <Download size={15} /> Descargar CV.pdf
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
