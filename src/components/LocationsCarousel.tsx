"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, ChevronLeft, ChevronRight, Waves, Building2, Trees, Mountain } from "lucide-react";
import { useRef } from "react";
import { type Location } from "@/lib/locations";

function getBgIcon(loc: Location) {
  if (loc.regionLabel.includes("Stadt")) return Building2;
  if (loc.lakeside || loc.regionLabel.includes("Seeufer") || loc.regionLabel.includes("Goldküste")) return Waves;
  if (loc.regionLabel.includes("Oberland")) return Mountain;
  return Trees;
}

export default function LocationsCarousel({ items }: { items: Location[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Scroll Buttons */}
      <div className="absolute -top-16 right-0 hidden items-center gap-2 md:flex">
        <button
          onClick={scrollLeft}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-gold"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={scrollRight}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-gold"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-8 scrollbar-hide sm:mx-0 sm:w-full sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((loc) => {
          const BgIcon = getBgIcon(loc);
          return (
            <Link
              key={loc.slug}
              href={`/immobilienmakler/${loc.slug}`}
              className="group relative flex h-[220px] w-[85vw] min-w-[280px] max-w-[320px] shrink-0 snap-start flex-col justify-between overflow-hidden border border-line bg-white p-6 transition-all duration-300 hover:border-gold hover:shadow-[var(--shadow-luxe)] sm:w-[320px]"
            >
              {/* subtle sand wash + dot grid */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sand/35 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.032]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #b8935e 1px, transparent 0)", backgroundSize: "22px 22px" }} />
              <div className="pointer-events-none absolute right-3 top-12 opacity-[0.05]" style={{ width: "160px", height: "90px", backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='90' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 45 Q 40 15 80 45 T 160 45' stroke='%23b8935e' stroke-width='1.1' fill='none'/%3E%3Cpath d='M0 65 Q 40 35 80 65 T 160 65' stroke='%23b8935e' stroke-width='1.1' fill='none'/%3E%3C/svg%3E")` }} />
              <div className="pointer-events-none absolute bottom-3 right-3 opacity-[0.09] transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-[0.14]">
                <BgIcon className="h-48 w-48 text-gold" strokeWidth={1.15} />
              </div>
              <span className="pointer-events-none absolute left-0 top-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />

              <div className="relative z-10 flex items-start justify-between">
                <MapPin className="h-5 w-5 text-gold" />
                <ArrowUpRight className="h-5 w-5 text-graphite/40 transition-all group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <div className="relative z-10 mt-8">
                <div className="text-xs uppercase tracking-[0.16em] text-gold-deep">
                  {loc.regionLabel}
                </div>
                <h3 className="mt-1 font-serif text-xl text-ink">
                  Immobilienmakler {loc.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
      
      {/* scrollbar-hide defined in globals.css */}
    </div>
  );
}
