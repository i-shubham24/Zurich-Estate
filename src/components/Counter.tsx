"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/** Split "CHF 12'000" / "3.8 %" / "480+" into prefix, number, suffix. */
function parseValue(value: string) {
  const m = value.match(/^(\D*)([\d'’.,]+)(.*)$/);
  if (!m) return { prefix: "", num: 0, suffix: "", decimals: 0 };
  const prefix = m[1];
  const numRaw = m[2];
  const suffix = m[3];
  const cleaned = numRaw.replace(/['’\s]/g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  const dm = cleaned.match(/\.(\d+)$/);
  return { prefix, num: isNaN(num) ? 0 : num, suffix, decimals: dm ? dm[1].length : 0 };
}

/** Format a number with Swiss thousands separator (') and fixed decimals. */
function formatNumber(n: number, decimals: number) {
  const fixed = n.toFixed(decimals);
  const [int, dec] = fixed.split(".");
  const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  return dec ? `${withSep}.${dec}` : withSep;
}

export default function Counter({
  value,
  label,
  tone = "onLight",
}: {
  value: string;
  label: string;
  tone?: "onLight" | "onDark";
}) {
  const { prefix, num, suffix, decimals } = parseValue(value);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  // Initialised to the final number so SSR / no-JS shows the real value.
  const [display, setDisplay] = useState(num);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, num, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, num]);

  return (
    <div ref={ref}>
      <div
        className={`font-serif text-3xl md:text-4xl lg:text-5xl ${
          tone === "onDark" ? "text-white" : "text-ink"
        }`}
      >
        {prefix}
        {formatNumber(display, decimals)}
        {suffix}
      </div>
      <div
        className={`mt-2 text-xs uppercase tracking-[0.16em] ${
          tone === "onDark" ? "text-white/55" : "text-graphite/70"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
