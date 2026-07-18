"use client";

import { useEffect, useRef, useState } from "react";
import { METRICS } from "@/lib/content";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        if (reduce) {
          setVal(target);
          return;
        }
        const dur = 1100;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
        {METRICS.map((m) => (
          <div
            key={m.label}
            className="bg-bg-elev/60 px-6 py-8 text-center backdrop-blur transition-colors hover:bg-surface/60"
          >
            <div className="font-mono text-4xl font-extrabold text-gradient sm:text-5xl">
              <CountUp target={Number(m.value)} suffix={m.suffix} />
            </div>
            <div className="mt-2 text-sm text-fg-muted">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
