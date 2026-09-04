import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowRight, Check, TrendingUp } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading, Eyebrow, ButtonLink } from "@/components/ui";
import ValuationCta from "@/components/ValuationCta";
import CtaBanner from "@/components/CtaBanner";
import FaqAccordion from "@/components/FaqAccordion";
import { JsonLd } from "@/components/StructuredData";
import { getLocation, getNearby, locationSlugs } from "@/lib/locations";
import { site, SITE_URL } from "@/lib/site";
import { localBusinessJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return locationSlugs.map((ort) => ({ ort }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ort: string }>;
}): Promise<Metadata> {
  const { ort } = await params;
  const loc = getLocation(ort);
  if (!loc) return {};
  const title = `Immobilienmakler ${loc.name}, provisionsfrei verkaufen`;
  const description = `${loc.headline}: Verkaufen Sie Ihre Immobilie in ${loc.name} provisionsfrei zum Fixpreis von ${site.fixedPrice}. Kostenlose Bewertung von Optimal Immobilien AG.`;
  return {
    title,
    description,
    alternates: { canonical: `/immobilienmakler/${loc.slug}` },
    openGraph: {
      title: `${title} | Optimal Immobilien AG`,
      description,
      url: `${SITE_URL}/immobilienmakler/${loc.slug}`,
      images: loc.heroImage ? [{ url: loc.heroImage, width: 1200, height: 630, alt: `Immobilienmakler ${loc.name}` }] : undefined,
      locale: "de_CH",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Optimal Immobilien AG`,
      description,
      images: loc.heroImage ? [loc.heroImage] : undefined,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ ort: string }>;
}) {
  const { ort } = await params;
  const loc = getLocation(ort);
  if (!loc) notFound();

  const nearby = getNearby(loc);

  const fallbackImages = [
    "/projekte/residenz-aussenansicht-1.jpg",
    "/projekte/attika-wohnen-1.jpg",
    "/projekte/residenz-aussenansicht-2.jpg",
  ];
  const fallbackImage = fallbackImages[loc.slug.length % fallbackImages.length];

  return (
    <main>
      <JsonLd
        data={[
          localBusinessJsonLd(loc),
          faqJsonLd(loc.faq),
          breadcrumbJsonLd([
            { name: "Startseite", url: "/" },
            { name: "Standorte", url: "/immobilienmakler" },
            { name: loc.name, url: `/immobilienmakler/${loc.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={loc.regionLabel}
        image={loc.heroImage ?? fallbackImage}
        imageAlt={`Immobilienmakler ${loc.name}, Optimal Immobilien AG - ${loc.name} Stadtansicht`}
        crumbs={[
          { name: "Start", href: "/" },
          { name: "Standorte", href: "/immobilienmakler" },
          { name: loc.name, href: `/immobilienmakler/${loc.slug}` },
        ]}
        title={
          <>
            Immobilienmakler <span className="italic text-gold">{loc.name}</span>
          </>
        }
        subtitle={`Provisionsfrei verkaufen zum Fixpreis von ${site.fixedPrice}, mit einem Makler, der ${loc.name} und den lokalen Markt genau kennt.`}
      >
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-[var(--shadow-luxe)]">
            <span className="h-2 w-2 rounded-full bg-ink/20" /> Fixpreis {site.fixedPrice} · 0 % Provision
          </span>
          <span className="hidden text-xs uppercase tracking-[0.16em] text-white/60 md:inline">Alle Leistungen inklusive</span>
        </div>
        <ButtonLink href="/#bewertung" variant="gold">
          Kostenlose Bewertung
        </ButtonLink>
        <ButtonLink href="#markt" variant="ghost">
          Markt in {loc.name}
        </ButtonLink>
      </PageHero>

      {/* Highlight bar - CHF 12k on every city page */}
      <div className="bg-gold py-3">
        <div className="container-lux flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center text-sm font-semibold tracking-[0.04em] text-ink md:justify-between">
          <span className="inline-flex items-center gap-2"><Check className="h-4 w-4" /> Fixpreis {site.fixedPrice} statt 2–3 % Provision</span>
          <span className="hidden h-4 w-px bg-ink/15 md:block" />
          <span>Provision 0 % · Transparenz 100 %</span>
          <span className="hidden h-4 w-px bg-ink/15 md:block" />
          <span>Ihre Ersparnis bleibt bei Ihnen</span>
        </div>
      </div>

      {/* Intro */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-lux grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={`Ihr Makler in ${loc.name}`}
              title={loc.headline}
              intro={loc.intro}
            />
            <p className="mt-6 max-w-2xl leading-relaxed text-graphite/80">{loc.whyHere}</p>
          </Reveal>

          <Reveal delay={120}>
            <div className="border border-line bg-white p-8">
              <Eyebrow>Auf einen Blick</Eyebrow>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between border-b border-line pb-4">
                  <dt className="text-graphite/60">Region</dt>
                  <dd className="font-semibold text-ink">{loc.regionLabel}</dd>
                </div>
                <div className="flex justify-between border-b border-line pb-4">
                  <dt className="text-graphite/60">Postleitzahl</dt>
                  <dd className="font-semibold text-ink">{loc.plz}</dd>
                </div>
                <div className="flex justify-between border-b border-line pb-4">
                  <dt className="text-graphite/60">Verkaufsmodell</dt>
                  <dd className="font-semibold text-ink">Fixpreis {site.fixedPrice}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-graphite/60">Provision</dt>
                  <dd className="font-semibold text-gold-deep">0 %</dd>
                </div>
              </dl>
              <a
                href={site.phoneHref}
                className="mt-8 flex w-full items-center justify-center gap-2 bg-ink py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-slate"
              >
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Market + neighborhoods */}
      <section id="markt" className="scroll-mt-24 bg-sand py-20 md:py-24">
        <div className="container-lux grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Der Markt in {loc.name}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-ink md:text-4xl">
              Was Ihr Objekt in {loc.name} wert ist
            </h2>
            <p className="mt-6 leading-relaxed text-graphite/80">{loc.market}</p>
            <div className="mt-8 flex items-start gap-4 border-l-2 border-gold pl-5">
              <TrendingUp className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <p className="text-graphite/80">
                Eine professionelle Vermarktung macht in {loc.name} oft den Unterschied
                zwischen «okay» und «optimal» verkauft.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="border border-line bg-white p-8">
              <div className="flex items-center gap-2 text-gold-deep">
                <MapPin className="h-5 w-5" />
                <span className="eyebrow">Quartiere & Lagen</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {loc.neighborhoods.map((n) => (
                  <span
                    key={n}
                    className="border border-line bg-sand/60 px-4 py-2 text-sm text-graphite/80"
                  >
                    {n}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-graphite/60">
                Wir betreuen Verkäuferinnen und Verkäufer in allen Quartieren von {loc.name}
                {loc.lakeside ? ", von der Seelage bis zum Hang." : "."}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Transparenz */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-lux">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <Eyebrow className="justify-center">Philosophie</Eyebrow>
              <h2 className="mt-6 font-serif text-3xl leading-[1.15] text-ink md:text-5xl">
                Volle Transparenz statt versteckter Kosten.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-graphite/75 md:text-xl">
                Wir glauben, dass eine exzellente Immobilienvermarktung in {loc.name} nicht 3 % Ihres Verkaufserlöses kosten muss. Mit unserem Fixpreis von {site.fixedPrice} erhalten Sie denselben umfassenden Service wie bei einem klassischen Makler, aber Sie behalten den gesamten Mehrwert Ihres Objekts.
              </p>
              <div className="mt-10 flex justify-center">
                <ButtonLink href="/ueber-uns" variant="outline">
                  Unsere Werte kennenlernen
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Valuation */}
      <ValuationCta
        eyebrow={`Beratung ${loc.name}`}
        title={`Verkaufen, kaufen oder investieren in ${loc.name}?`}
        intro={`Sagen Sie uns Ihr Anliegen für ${loc.name}. Wir melden uns mit einer kostenlosen, unverbindlichen Ersteinschätzung, in unter zwei Minuten ausgefüllt.`}
      />

      {/* FAQ */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-lux max-w-4xl">
          <SectionHeading
            align="center"
            eyebrow="Häufige Fragen"
            title={`Immobilienmakler ${loc.name}, Ihre Fragen`}
            className="mb-12"
          />
          <FaqAccordion faqs={loc.faq} />
        </div>
      </section>

      {/* Nearby */}
      {nearby.length > 0 && (
        <section className="bg-sand py-16 md:py-20">
          <div className="container-lux">
            <Eyebrow>Weitere Standorte in der Nähe</Eyebrow>
            <div className="mt-6 flex flex-wrap gap-3">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={`/immobilienmakler/${n.slug}`}
                  className="group inline-flex items-center gap-2 border border-line bg-white px-5 py-3 text-sm font-medium text-ink transition-all hover:border-gold hover:shadow-[var(--shadow-luxe)]"
                >
                  Immobilienmakler {n.name}
                  <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
              <Link
                href="/immobilienmakler"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-gold-deep transition-colors hover:text-ink"
              >
                Alle Standorte <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        title={`Verkaufen Sie in ${loc.name}, provisionsfrei.`}
        subtitle={`Ein Anruf genügt. Wir beraten Sie persönlich zu Ihrem Verkauf in ${loc.name}.`}
      />
    </main>
  );
}
