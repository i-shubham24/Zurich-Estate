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
        className="h-[36px] w-auto object-contain md:h-[40px] drop-shadow-md"
        style={{
          filter: "brightness(0) saturate(100%) invert(73%) sepia(43%) saturate(541%) hue-rotate(6deg) brightness(95%) contrast(88%)"
        }}
        sizes="200px"
      />
    </Link>
  );
}
