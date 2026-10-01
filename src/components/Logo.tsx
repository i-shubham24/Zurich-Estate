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
          filter:
            'drop-shadow(0 1px 3px rgba(0,0,0,0.55)) drop-shadow(0 2px 10px rgba(0,0,0,0.40))',
        }}
      />
    </Link>
  );
}
