import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  tone?: "onDark" | "onLight";
  className?: string;
};

export default function Logo({ tone = "onDark", className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Optimal Immobilien AG, Startseite"
      className={`group inline-flex items-center ${className}`}
    >
      <Image
        src="/brand/optimal-logo-transparent.png"
        alt="Optimal Immobilien AG"
        width={916}
        height={220}
        priority
        className="h-[36px] w-auto object-contain brightness-[1.08] contrast-[1.05] drop-shadow-[0_1px_8px_rgba(208,174,120,0.18)] md:h-[40px]"
        sizes="200px"
      />
    </Link>
  );
}
