import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import ArticleCard from "@/components/ArticleCard";
import { SectionHeading } from "@/components/ui";
import CtaBanner from "@/components/CtaBanner";
import { JsonLd } from "@/components/StructuredData";
import { guides } from "@/lib/guides";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Immobilien-Ratgeber Zürich, Marktwissen & Experten-Tipps",
  description:
    "Marktberichte, Verkaufs-Tipps und Quartier-Guides für Eigentümer in Zürich. Fundiertes Immobilienwissen von Optimal Immobilien AG.",
  alternates: { canonical: "/ratgeber" },
};

export default function RatgeberPage() {
  const [featured, ...rest] = guides;

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", url: "/" },
          { name: "Ratgeber", url: "/ratgeber" },
        ])}
      />

      <PageHero
        eyebrow="Ratgeber & Wissen"
        image="/projekte/erdgeschoss-wohnbereich.jpg"
        imageAlt="Modernes Wohnen in Zürich"
        crumbs={[
          { name: "Start", href: "/" },
          { name: "Ratgeber", href: "/ratgeber" },
        ]}
        title={
          <>
            Immobilien-Ratgeber <span className="italic text-gold"><Typewriter text="Zürich" /></span>
          </>
        }
        subtitle="Marktberichte, Experten-Tipps für den Verkauf und exklusive Einblicke in die Zürcher Quartiere."
      />

      {/* Featured */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-lux">
          <Reveal>
            <Link
              href={`/ratgeber/${featured.slug}`}
              className="group grid grid-cols-1 overflow-hidden border border-line bg-white md:grid-cols-2"
            >
              <div className="relative aspect-[3/2] overflow-hidden md:aspect-auto">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  quality={82}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="flex items-center gap-4 text-xs uppercase tracking-[0.14em]">
                  <span className="bg-sand px-3 py-1 font-semibold text-gold-deep">{featured.category}</span>
                  <span className="flex items-center gap-1 text-graphite/50">
                    <Clock className="h-3.5 w-3.5" /> {featured.readTime}
                  </span>
                </div>
                <h2 className="mt-5 font-serif text-3xl leading-tight text-ink md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-relaxed text-graphite/75">{featured.excerpt}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                  Artikel lesen <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-sand py-16 md:py-24">
        <div className="container-lux">
          <SectionHeading eyebrow="Alle Beiträge" title="Aus dem Ratgeber" />
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((g, i) => (
              <Reveal key={g.slug} delay={(i % 3) * 80}>
                <ArticleCard
                  href={`/ratgeber/${g.slug}`}
                  image={g.image}
                  title={g.title}
                  category={g.category}
                  excerpt={g.excerpt}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
