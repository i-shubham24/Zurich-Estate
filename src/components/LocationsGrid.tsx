import Link from "next/link";
import { ArrowUpRight, MapPin, Waves, Building2, Trees, Mountain } from "lucide-react";
import Reveal from "./Reveal";
import { locations as allLocations, type Location } from "@/lib/locations";

function getBgIcon(loc: Location) {
  if (loc.regionLabel.includes("Stadt")) return Building2;
  if (loc.lakeside || loc.regionLabel.includes("Seeufer") || loc.regionLabel.includes("Goldküste")) return Waves;
  if (loc.regionLabel.includes("Oberland")) return Mountain;
  return Trees;
}

export default function LocationsGrid({
  items = allLocations,
  columns = 4,
}: {
  items?: Location[];
  columns?: 3 | 4;
}) {
  const cols = columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <div className={`grid grid-cols-1 gap-4 ${cols}`}>
      {items.map((loc, i) => {
        const BgIcon = getBgIcon(loc);
        return (
          <Reveal key={loc.slug} delay={(i % 4) * 70}>
            <Link
              href={`/immobilienmakler/${loc.slug}`}
              className="group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden border border-line bg-white p-6 transition-all duration-300 hover:border-gold hover:shadow-[var(--shadow-luxe)]"
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
          </Reveal>
        );
      })}
    </div>
  );
}
