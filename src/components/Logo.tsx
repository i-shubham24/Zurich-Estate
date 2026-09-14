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
      <div
        className="h-[75px] w-[310px] md:h-[90px] md:w-[375px] bg-gold drop-shadow-md"
        style={{
          WebkitMaskImage: 'url(/brand/real-logo-transparent.png)',
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center left',
          maskImage: 'url(/brand/real-logo-transparent.png)',
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center left',
        }}
      />
    </Link>
  );
}
