import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import Magnetic from "@/components/Magnetic";

/** Uppercase champagne eyebrow with a gold rule. */
export function Eyebrow({
  children,
  tone = "onLight",
  className = "",
}: {
  children: ReactNode;
  tone?: "onLight" | "onDark";
  className?: string;
}) {
  return (
    <span
      className={`eyebrow flex items-center gap-3 ${
        tone === "onDark" ? "text-gold-bright" : "text-gold-deep"
      } ${className}`}
    >
      <span className="h-px w-8 bg-gold" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "onLight",
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "onLight" | "onDark";
  align?: "left" | "center";
  className?: string;
}) {
  const titleColor = tone === "onDark" ? "text-white" : "text-ink";
  const introColor = tone === "onDark" ? "text-white/65" : "text-graphite/80";
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <div className={align === "center" ? "flex justify-center" : ""}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={`mt-5 font-serif text-3xl leading-[1.12] md:text-4xl lg:text-[2.9rem] ${titleColor}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed ${introColor}`}>{intro}</p>
      )}
    </div>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "dark" | "ghost" | "outline";
  className?: string;
  icon?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "gold",
  className = "",
  icon = true,
}: ButtonLinkProps) {
  const base =
    "group inline-flex items-center justify-center gap-3 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300";
  const styles: Record<string, string> = {
    gold: "bg-gold text-ink hover:bg-gold-bright",
    dark: "bg-ink text-white hover:bg-slate",
    outline: "border border-current text-ink hover:bg-ink hover:text-white",
    ghost: "border border-white/30 text-white hover:bg-white hover:text-ink",
  };
  return (
    <Magnetic>
      <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
        <span>{children}</span>
        {icon && (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        )}
      </Link>
    </Magnetic>
  );
}

export function Stat({
  value,
  label,
  tone = "onLight",
}: {
  value: string;
  label: string;
  tone?: "onLight" | "onDark";
}) {
  return (
    <div>
      <div
        className={`font-serif text-3xl md:text-4xl lg:text-5xl ${
          tone === "onDark" ? "text-white" : "text-ink"
        }`}
      >
        {value}
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
