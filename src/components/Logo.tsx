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
        className="h-[36px] w-[150px] md:h-[40px] md:w-[166px]"
        style={{
          backgroundColor: "#b8935e",
          WebkitMask: "url('/brand/optimal-logo-transparent.png') no-repeat left center / contain",
          mask: "url('/brand/optimal-logo-transparent.png') no-repeat left center / contain"
        }}
        aria-label="Optimal Immobilien AG"
      />
    </Link>
  );
}
