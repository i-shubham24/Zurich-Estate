import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { SectionHeading, Eyebrow, Stat } from "@/components/ui";
import Typewriter from "@/components/Typewriter";
import ValuationCta from "@/components/ValuationCta";
import CtaBanner from "@/components/CtaBanner";
import { JsonLd } from "@/components/StructuredData";
import { site, stats, SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Über uns – Optimal Immobilien AG",
  description:
    "Lernen Sie das Team hinter Optimal Immobilien AG kennen. Wir verkaufen Ihre Immobilie in Zürich provisionsfrei zum Fixpreis – transparent, persönlich und mit nachweisbarem Erfolg.",
  alternates: { canonical: "/ueber-uns" },
  openGraph: {
    title: "Über uns – Optimal Immobilien AG",
    description:
      "Provisionsfrei verkaufen zum Fixpreis. Lernen Sie das Team und die Philosophie von Optimal Immobilien AG kennen.",
    url: `${SITE_URL}/ueber-uns`,
  },
};

export default function UeberUnsPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", url: "/" },
          { name: "Über uns", url: "/ueber-uns" },
        ])}
      />

      {/* ── Hero ── */}
      <section className="bg-ink pt-40 pb-20 md:pb-28">
        <div className="container-lux mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow tone="onDark">Über Uns</Eyebrow>
            </div>
            <h1 className="mt-6 font-serif text-4xl leading-[1.12] text-white md:text-5xl lg:text-[3.3rem]">
              Wir revolutionieren den{" "}
              <span className="italic text-gold"><Typewriter text="Immobilienverkauf" /></span> in
              Zürich.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
              Optimal Immobilien AG verkauft Ihre Immobilie provisionsfrei zum
              Fixpreis von {site.fixedPrice} – mit derselben erstklassigen
              Vermarktung wie ein traditioneller Makler, aber ohne prozentuale
              Provision. Den Unterschied behalten Sie.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux">
          <Reveal>
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-14">
              {stats.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Werte ── */}
      <section className="bg-sand py-20 md:py-28">
        <div className="container-lux">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-ink">Transparenz von Anfang bis Ende</h2>
            <p className="mt-6 text-lg text-graphite/80 leading-relaxed">
              Wir verstecken uns nicht hinter komplizierten Prozentrechnungen. Bei uns wissen Sie ab dem ersten Tag, 
              welche Kosten auf Sie zukommen. Der Fixpreis von {site.fixedPrice} deckt den gesamten Verkaufsprozess ab – 
              von der Marktwertermittlung über das professionelle Fotoshooting bis hin zur finalen Schlüsselübergabe 
              beim Notariat.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Team / Philosophy ── */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/projekte/residenz-aussenansicht-2.jpg"
                alt="Optimal Immobilien – Büro und Team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Unsere Philosophie"
              title={
                <>
                  Ehrlich, transparent und{" "}
                  <span className="italic text-gold">messbar erfolgreich</span>.
                </>
              }
              intro="Wir glauben, dass ein Immobilienverkauf kein Luxusprodukt sein muss. Unser provisionsfreies Modell beweist, dass erstklassige Vermarktung und faire Konditionen Hand in Hand gehen."
            />
            <p className="mt-5 text-base leading-relaxed text-graphite/80">
              Gegründet von Adi Kavzani, vereint Optimal Immobilien AG
              datenbasierte Marktanalyse mit persönlicher Betreuung. Jedes
              Objekt wird individuell aufbereitet – mit professioneller
              Fotografie, massgeschneidertem Exposé und gezieltem Marketing. Das
              Ergebnis: Über 480 erfolgreich verkaufte Objekte und ein
              durchschnittlicher Verkaufspreis von 3.8 % über dem Marktwert.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Valuation CTA ── */}
      <ValuationCta />

      {/* ── CTA Banner ── */}
      <CtaBanner />
    </main>
  );
}
