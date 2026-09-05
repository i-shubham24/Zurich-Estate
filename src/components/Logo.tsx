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
        src="/brand/real-logo-transparent.png"
        alt="Optimal Immobilien AG"
        width={916}
        height={220}
        priority
        className="h-[50px] w-auto object-contain md:h-[60px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] brightness-[1.2] contrast-[1.3]"
        sizes="300px"
      />
    </Link>
  );
}
