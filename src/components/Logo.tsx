import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  tone?: "onDark" | "onLight";
  className?: string;
  fill?: string;
};

export default function Logo({ tone = "onDark", className = "", fill }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Optimal Immobilien AG, Startseite"
      className={`group inline-flex items-center shrink-0 ${className}`}
    >
      <div
        className="h-[65px] w-[270px] md:h-[75px] md:w-[312px] bg-gold"
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
