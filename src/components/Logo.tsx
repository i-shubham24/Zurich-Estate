import Link from "next/link";

type LogoProps = {
  tone?: "onDark" | "onLight";
  className?: string;
};

/**
 * Brand lockup rendered as text + SVG monogram (scales crisply, adapts to
 * dark/light headers). Mirrors the "OI" champagne-on-slate identity.
 */
export default function Logo({ tone = "onDark", className = "" }: LogoProps) {
  const wordColor = tone === "onDark" ? "text-white" : "text-ink";
  const subColor = tone === "onDark" ? "text-white/60" : "text-graphite/70";

  return (
    <Link
      href="/"
      aria-label="Optimal Immobilien AG – Startseite"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="15" cy="20" r="11" stroke="#b8935e" strokeWidth="2" />
        <line x1="30" y1="9" x2="30" y2="31" stroke="#b8935e" strokeWidth="2" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-sans text-[0.95rem] font-semibold tracking-[0.28em] ${wordColor}`}
        >
          OPTIMAL
        </span>
        <span
          className={`mt-1 font-sans text-[0.6rem] font-medium tracking-[0.3em] ${subColor}`}
        >
          IMMOBILIEN AG
        </span>
      </span>
    </Link>
  );
}
