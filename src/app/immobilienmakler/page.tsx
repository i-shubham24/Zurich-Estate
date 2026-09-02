import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Waves, Building2, Trees, Mountain } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import { Eyebrow, ButtonLink } from "@/components/ui";
import ValuationCta from "@/components/ValuationCta";
import CtaBanner from "@/components/CtaBanner";
import { JsonLd } from "@/components/StructuredData";
import { locations, type Location } from "@/lib/locations";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

function getRegionIcon(loc: Location) {
  if (loc.regionLabel.includes("Stadt")) return Building2;
  if (loc.lakeside || loc.regionLabel.includes("Seeufer") || loc.regionLabel.includes("Goldküste")) return Waves;
  if (loc.regionLabel.includes("Oberland")) return Mountain;
  return Trees;
}

export const metadata: Metadata = {
  title: "Standorte, Immobilienmakler in Zürich & Umgebung",
  description:
    "Optimal Immobilien AG ist Ihr Immobilienmakler in Zürich, an der Goldküste, am Zürichsee und im Unterland. Finden Sie Ihren Standort und verkaufen Sie provisionsfrei.",
  alternates: { canonical: "/immobilienmakler" },
};

// Group locations by region, preserving dataset order
function groupByRegion() {
  const map = new Map<string, typeof locations>();
  for (const loc of locations) {
    const arr = map.get(loc.regionLabel) ?? [];
    arr.push(loc);
    map.set(loc.regionLabel, arr);
  }
  return Array.from(map.entries());
}

export default function StandortePage() {
  const groups = groupByRegion();

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", url: "/" },
          { name: "Standorte", url: "/immobilienmakler" },
        ])}
      />

      <PageHero
        eyebrow="Standorte"
        image="/projekte/residenz-aussenansicht-2.jpg"
        imageAlt="Immobilien in Zürich und an der Goldküste"
        crumbs={[
          { name: "Start", href: "/" },
          { name: "Standorte", href: "/immobilienmakler" },
        ]}
        title={
          <>
            Ihr Immobilienmakler in{" "}
            <span className="italic text-gold"><Typewriter text="Zürich & Umgebung" /></span>
          </>
        }
        subtitle={`Lokale Marktkenntnis entscheidet über den Preis. Wählen Sie Ihre Gemeinde, wir verkaufen Ihre Immobilie provisionsfrei zum Fixpreis von ${site.fixedPrice}.`}
      >
        <ButtonLink href="/#bewertung" variant="gold">
          Kostenlose Bewertung
        </ButtonLink>
      </PageHero>

      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux space-y-16">
          {groups.map(([region, items], gi) => (
            <Reveal key={region} delay={gi * 60}>
              <div>
                <div className="flex items-center gap-4">
                  <Eyebrow>{region}</Eyebrow>
                  <span className="h-px flex-grow bg-line" />
                </div>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((loc) => {
                    const BgIcon = getRegionIcon(loc);
                    return (
                    <Link
                      key={loc.slug}
                      href={`/immobilienmakler/${loc.slug}`}
                      className="group relative flex items-center justify-between overflow-hidden border border-line bg-white p-6 transition-all duration-300 hover:border-gold hover:shadow-[var(--shadow-luxe)]"
                    >
                      {/* subtle sand wash */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sand/40 via-transparent to-transparent opacity-60" />
                      {/* faint dot grid — very subtle */}
                      <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #b8935e 1px, transparent 0)", backgroundSize: "22px 22px" }} />
                      {/* region icon — contained, not clipped */}
                      <div className="pointer-events-none absolute bottom-3 right-3 text-gold/70 opacity-[0.09] transition-all duration-500 group-hover:opacity-[0.14] group-hover:scale-[1.03]">
                        <BgIcon className="h-[76px] w-[76px]" strokeWidth={1.25} />
                      </div>
                      {/* top gold accent */}
                      <span className="pointer-events-none absolute left-0 top-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.14em] text-gold-deep/70">
                          <MapPin className="h-3 w-3" /> {loc.regionLabel}
                        </div>
                        <h2 className="mt-1 font-serif text-xl text-ink">
                          Immobilienmakler {loc.name}
                        </h2>
                        <p className="mt-1 text-sm text-graphite/60">PLZ {loc.plz}</p>
                      </div>
                      <ArrowRight className="relative z-10 h-5 w-5 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
                    </Link>
                  )})}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ValuationCta />
      <CtaBanner />
    </main>
  );
}
