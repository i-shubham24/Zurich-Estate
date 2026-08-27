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
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold hover:text-gold"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={scrollRight}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold hover:text-gold"
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
              <div className="absolute -bottom-8 -right-8 opacity-[0.03] transition-transform duration-500 group-hover:scale-110 group-hover:opacity-[0.05] pointer-events-none">
                <BgIcon className="h-48 w-48 text-ink" strokeWidth={1} />
              </div>

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
      
      {/* Hide scrollbar with inline style for webkit */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </div>
  );
}
