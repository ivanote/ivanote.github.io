import { PROFILE } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 sm:flex-row sm:px-8">
        <p className="font-mono text-xs text-fg-dim">
          <span className="text-accent">$</span> echo &quot;© {new Date().getFullYear()} {PROFILE.fullName}&quot;
        </p>
        <p className="font-mono text-xs text-fg-dim">
          Next.js · React Three Fiber · Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
