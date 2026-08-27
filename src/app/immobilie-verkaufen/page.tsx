import type { Metadata } from "next";
import { Camera, FileCheck2, Megaphone, Users, KeyRound, Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading, Eyebrow, ButtonLink } from "@/components/ui";
import Method from "@/components/Method";
import ValuationCta from "@/components/ValuationCta";
import CtaBanner from "@/components/CtaBanner";
import FaqAccordion from "@/components/FaqAccordion";
import { JsonLd } from "@/components/StructuredData";
import { site, SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Immobilie verkaufen in Zürich – provisionsfrei zum Fixpreis",
  description:
    "Immobilie verkaufen in Zürich zum Höchstpreis: provisionsfrei zum Fixpreis von CHF 12'000.–. Professionelle Vermarktung, 0 % Provision, volle Transparenz. Jetzt kostenlos bewerten lassen.",
  alternates: { canonical: "/immobilie-verkaufen" },
  openGraph: {
    title: "Immobilie verkaufen in Zürich – provisionsfrei | Optimal Immobilien AG",
    description:
      "Provisionsfrei verkaufen zum Fixpreis von CHF 12'000.– – professionelle Vermarktung, 0 % Provision.",
    url: `${SITE_URL}/immobilie-verkaufen`,
  },
};

const steps = [
  {
    n: "01",
    icon: FileCheck2,
    title: "Kostenlose Bewertung",
    desc: "Wir ermitteln den realistischen Marktwert Ihrer Immobilie – datenbasiert und mit Blick auf Ihre Mikrolage.",
  },
  {
    n: "02",
    icon: Camera,
    title: "Strategie & Aufbereitung",
    desc: "Professionelle Fotos, ein hochwertiges Exposé und eine massgeschneiderte Vermarktungs­strategie für Ihr Objekt.",
  },
  {
    n: "03",
    icon: Megaphone,
    title: "Gezielte Vermarktung",
    desc: "Wir sprechen die richtige Zielgruppe an – über Portale, unser Netzwerk und auf Wunsch diskret off-market.",
  },
  {
    n: "04",
    icon: Users,
    title: "Besichtigungen & Bieterverfahren",
    desc: "Wir qualifizieren Interessenten, führen Besichtigungen und schaffen mit einem strukturierten Verfahren den Höchstpreis.",
  },
  {
    n: "05",
    icon: KeyRound,
    title: "Abschluss & Beurkundung",
    desc: "Wir begleiten Sie durch Vertrag und Beurkundung – bis der Verkaufserlös auf Ihrem Konto ist.",
  },
];

const included = [
  "Marktwert-Bewertung Ihrer Immobilie",
  "Professionelle Fotos & Home-Staging-Beratung",
  "Hochwertiges, individuelles Exposé",
  "Inserate auf allen relevanten Portalen",
  "Gezielte Ansprache geprüfter Käufer",
  "Organisation & Durchführung der Besichtigungen",
  "Strukturiertes Bieterverfahren",
  "Verhandlungsführung bis zum Höchstpreis",
  "Begleitung bis zur notariellen Beurkundung",
];

const faqs = [
  {
    q: "Was kostet der Verkauf meiner Immobilie?",
    a: "Ein transparenter Fixpreis von CHF 12'000.– – unabhängig vom Verkaufspreis. Keine prozentuale Provision, keine versteckten Kosten. Alle oben genannten Leistungen sind darin enthalten.",
  },
  {
    q: "Zahle ich auch, wenn nicht verkauft wird?",
    a: "Die kostenlose Bewertung ist immer unverbindlich. Die konkreten Konditionen besprechen wir transparent, bevor Sie einen Auftrag erteilen – ohne Überraschungen.",
  },
  {
    q: "Wie lange dauert ein Immobilienverkauf in Zürich?",
    a: "Das hängt von Objekt, Lage und Preisstrategie ab. Gut vorbereitete Objekte in gefragten Lagen sind oft innert weniger Wochen verkauft. Wir setzen von Beginn an auf eine realistische, datenbasierte Preisstrategie.",
  },
  {
    q: "Welche Unterlagen brauche ich für den Verkauf?",
    a: "Unter anderem Grundbuchauszug, Baupläne, Gebäudeversicherungs­police und – je nach Objekt – weitere Dokumente. Wir sagen Ihnen genau, was nötig ist, und unterstützen bei der Beschaffung.",
  },
  {
    q: "Verkaufen Sie auch diskret?",
    a: "Ja. Auf Wunsch vermarkten wir Ihre Immobilie vollständig diskret an einen ausgewählten Kreis solventer Interessenten – ohne öffentliches Inserat.",
  },
];

export default function VerkaufenPage() {
  return (
    <main>
      <JsonLd
        data={[
          faqJsonLd(faqs),
          breadcrumbJsonLd([
            { name: "Startseite", url: "/" },
            { name: "Immobilie verkaufen", url: "/immobilie-verkaufen" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Immobilie verkaufen"
        image="/projekte/attika-wohnen-1.jpg"
        imageAlt="Hochwertige Immobilie in Zürich zum Verkauf"
        crumbs={[
          { name: "Start", href: "/" },
          { name: "Immobilie verkaufen", href: "/immobilie-verkaufen" },
        ]}
        title={
          <>
            Immobilie verkaufen in Zürich –{" "}
            <span className="italic text-gold">provisionsfrei</span>.
          </>
        }
        subtitle={`Dieselbe erstklassige Vermarktung wie beim klassischen Makler – aber zum Fixpreis von ${site.fixedPrice} statt 2–3 % Provision. Den Unterschied behalten Sie.`}
      >
        <ButtonLink href="/#bewertung" variant="gold">
          Kostenlose Bewertung
        </ButtonLink>
        <ButtonLink href="#ablauf" variant="ghost">
          So läuft es ab
        </ButtonLink>
      </PageHero>

      {/* Savings argument */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="0 % Provision"
              title={
                <>
                  Sie zahlen für die Leistung –{" "}
                  <span className="italic text-gold">nicht für den Preis</span>.
                </>
              }
              intro="Der Aufwand für einen Verkauf ist derselbe, egal ob Ihr Objekt CHF 1 Mio. oder CHF 3 Mio. kostet. Eine prozentuale Provision belohnt keinen Mehraufwand – nur einen höheren Preis. Deshalb rechnen wir fair ab: ein Fixpreis für den kompletten Verkauf."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { p: "CHF 1 Mio.", classic: "CHF 30'000", save: "CHF 18'000" },
                { p: "CHF 2 Mio.", classic: "CHF 60'000", save: "CHF 48'000" },
                { p: "CHF 4 Mio.", classic: "CHF 120'000", save: "CHF 108'000" },
              ].map((row) => (
                <div key={row.p} className="border border-line bg-white p-6 text-center">
                  <div className="text-xs uppercase tracking-[0.14em] text-graphite/50">
                    Verkaufspreis
                  </div>
                  <div className="mt-1 font-serif text-xl text-ink">{row.p}</div>
                  <div className="mt-4 text-xs text-graphite/50">Klassisch (3 %)</div>
                  <div className="text-graphite/50 line-through">{row.classic}</div>
                  <div className="mt-3 text-xs uppercase tracking-[0.12em] text-gold-deep">
                    Ihre Ersparnis
                  </div>
                  <div className="font-serif text-2xl text-gold-deep">{row.save}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process timeline */}
      <section id="ablauf" className="scroll-mt-24 bg-sand py-20 md:py-28">
        <div className="container-lux">
          <SectionHeading
            eyebrow="Der Ablauf"
            title="In 5 Schritten zum erfolgreichen Verkauf"
            intro="Ein klar strukturierter Prozess – Sie wissen jederzeit, wo Ihr Verkauf steht."
          />
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="flex h-full flex-col border border-line bg-white p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-4xl text-gold/40">{s.n}</span>
                    <s.icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-serif text-lg text-ink">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite/70">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Im Fixpreis enthalten"
              title="Alles inklusive – für CHF 12'000."
              intro="Keine Pakete, keine Zusatzkosten. Der komplette Verkaufsprozess ist im Fixpreis enthalten."
            />
            <div className="mt-8">
              <ButtonLink href="/#bewertung" variant="dark">
                Jetzt kostenlos bewerten
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/12">
                    <Check className="h-3.5 w-3.5 text-gold-deep" />
                  </span>
                  <span className="text-graphite/85">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Method */}
      <section className="bg-slate py-20 md:py-28">
        <div className="container-lux">
          <Method tone="onDark" />
        </div>
      </section>

      <ValuationCta />

      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux max-w-4xl">
          <SectionHeading
            align="center"
            eyebrow="Häufige Fragen"
            title="Rund um den Immobilienverkauf"
            className="mb-12"
          />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
