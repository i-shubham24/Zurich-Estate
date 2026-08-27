import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import { Eyebrow, ButtonLink } from "@/components/ui";
import ValuationCta from "@/components/ValuationCta";
import CtaBanner from "@/components/CtaBanner";
import { JsonLd } from "@/components/StructuredData";
import { locations } from "@/lib/locations";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

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
                  {items.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/immobilienmakler/${loc.slug}`}
                      className="group flex items-center justify-between border border-line bg-white p-6 transition-all duration-300 hover:border-gold hover:shadow-[var(--shadow-luxe)]"
                    >
                      <div>
                        <h2 className="font-serif text-xl text-ink">
                          Immobilienmakler {loc.name}
                        </h2>
                        <p className="mt-1 text-sm text-graphite/60">PLZ {loc.plz}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
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
