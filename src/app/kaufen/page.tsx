import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Maximize, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import ParallaxImage from "@/components/ParallaxImage";
import TiltCard from "@/components/TiltCard";
import { SectionHeading, ButtonLink } from "@/components/ui";
import CtaBanner from "@/components/CtaBanner";
import { JsonLd } from "@/components/StructuredData";
import { projects, flagshipProject } from "@/lib/projects";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Unsere Referenzen & Immobilienprojekte",
  description:
    "Erfolgreich vermittelte Wohnungen, Häuser und Neubauprojekte in Zürich, an der Goldküste und am Zürichsee. Entdecken Sie die Referenzen der Optimal Immobilien AG.",
  alternates: { canonical: "/kaufen" },
};

const statusStyles: Record<string, string> = {
  Verfügbar: "bg-ink/85 text-white",
  "In Vermarktung": "bg-gold text-ink",
  Reserviert: "bg-gold/90 text-ink",
  Verkauft: "bg-graphite/80 text-white",
  "Erfolgreich vermittelt": "bg-graphite/80 text-white",
  "Referenzprojekt": "bg-gold text-ink",
};

export default function KaufenPage() {
  const others = projects.filter((p) => !p.flagship);

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", url: "/" },
          { name: "Immobilien", url: "/kaufen" },
        ])}
      />

      <PageHero
        eyebrow="Unsere Referenzen"
        image="/projekte/attika-kueche-seeblick.jpg"
        imageAlt="Exklusive Immobilie mit Seesicht am Zürichsee"
        crumbs={[
          { name: "Start", href: "/" },
          { name: "Projekte", href: "/kaufen" },
        ]}
        title={
          <>
            Unsere Projekte in{" "}
            <span className="italic text-gold">Zürich & am See</span>
          </>
        }
        subtitle="Ein Überblick über unsere erfolgreich vermittelten Wohnungen, Häuser und Neubauprojekte in den besten Lagen der Region Zürich."
      >
        <ButtonLink href="/#bewertung" variant="gold">
          Immobilie bewerten lassen
        </ButtonLink>
      </PageHero>

      {/* Flagship */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-lux">
          <Reveal>
            <Link
              href={`/kaufen/${flagshipProject.slug}`}
              className="group grid grid-cols-1 overflow-hidden border border-line bg-white lg:grid-cols-2"
            >
              <div className="relative aspect-[4/3] w-full lg:aspect-auto">
                <ParallaxImage
                  src={flagshipProject.image}
                  alt={flagshipProject.title}
                />
                <span
                  className={`absolute left-5 top-5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] z-10 ${statusStyles[flagshipProject.status] || "bg-ink text-white"}`}
                >
                  {flagshipProject.status}
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="flex items-center gap-2 text-sm text-graphite/60">
                  <MapPin className="h-4 w-4 text-gold" /> {flagshipProject.location}
                </div>
                <h2 className="mt-3 font-serif text-3xl text-ink md:text-4xl">
                  {flagshipProject.title}
                </h2>
                <p className="mt-4 leading-relaxed text-graphite/75">
                  {flagshipProject.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-sm text-graphite/70">
                  <span className="flex items-center gap-2">
                    <BedDouble className="h-4 w-4 text-graphite/40" /> {flagshipProject.rooms} Zimmer
                  </span>
                  <span className="flex items-center gap-2">
                    <Maximize className="h-4 w-4 text-graphite/40" /> {flagshipProject.area} m²
                  </span>
                  <span className="font-semibold text-ink">{flagshipProject.price}</span>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                  Projekt ansehen <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Other listings */}
      <section className="bg-sand py-16 md:py-24">
        <div className="container-lux">
          <SectionHeading
            eyebrow="Weitere Projekte"
            title="Erfolgreich vermittelt"
            intro="Ein Auszug aus unseren vergangenen Projekten und Mandaten."
          />
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 perspective-[2000px]">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 90}>
                <TiltCard className="group flex h-full flex-col bg-white">
                  <Link href={`/kaufen/${p.slug}`} className="flex h-full flex-col">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <span
                        className={`absolute left-4 top-4 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider z-10 ${statusStyles[p.status] || "bg-ink text-white"}`}
                      >
                        {p.status}
                      </span>
                    </div>
                    <div className="flex flex-grow flex-col p-7">
                      <div className="flex items-center gap-2 text-sm text-graphite/55">
                        <MapPin className="h-4 w-4" /> {p.location}
                      </div>
                      <h3 className="mt-2 font-serif text-2xl text-ink transition-colors group-hover:text-gold-deep">
                        {p.title}
                      </h3>
                      <div className="mt-auto flex items-center gap-x-6 gap-y-2 border-t border-line pt-5 text-sm text-graphite/70">
                        <span className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-graphite/40" /> {p.rooms} Zi.</span>
                        <span className="flex items-center gap-2"><Maximize className="h-4 w-4 text-graphite/40" /> {p.area} m²</span>
                        <span className="ml-auto font-semibold text-ink">{p.price}</span>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Nicht das Richtige dabei?"
        subtitle="Erteilen Sie uns einen Suchauftrag, wir finden auch off market das passende Objekt für Sie."
      />
    </main>
  );
}
