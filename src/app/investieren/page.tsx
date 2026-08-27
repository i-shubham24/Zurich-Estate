import type { Metadata } from "next";
import { BadgePercent, LineChart, HeartHandshake, Building2, Home, Building, Landmark, KeyRound, MessagesSquare, Search, FileSignature } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading, ButtonLink } from "@/components/ui";
import ValuationCta from "@/components/ValuationCta";
import CtaBanner from "@/components/CtaBanner";
import FaqAccordion from "@/components/FaqAccordion";
import { JsonLd } from "@/components/StructuredData";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "In Immobilien investieren in Zürich, 0 % Provision",
  description:
    "Immobilien als Kapitalanlage in der Region Zürich, provisionsfrei. Renditeobjekte, Mehrfamilienhäuser und Gewerbe, mit persönlicher Beratung und tiefer Marktkenntnis.",
  alternates: { canonical: "/investieren" },
  openGraph: {
    title: "In Immobilien investieren in Zürich, 0 % Provision | Optimal Immobilien AG",
    description:
      "Immobilien als Kapitalanlage, provisionsfrei, mit tiefen Einblicken in den lokalen Markt.",
    url: `${SITE_URL}/investieren`,
  },
};

const benefits = [
  {
    icon: BadgePercent,
    title: "Provisionsfrei",
    desc: "Sie investieren, ohne die üblichen Maklergebühren, mehr Rendite bleibt bei Ihnen.",
  },
  {
    icon: LineChart,
    title: "Marktexpertise",
    desc: "Tiefe Einblicke in den lokalen Markt der Region Zürich, für fundierte Investitionsentscheide.",
  },
  {
    icon: HeartHandshake,
    title: "Persönliche Beratung",
    desc: "Jede Anlage ist einzigartig. Wir richten unsere Beratung an Ihrer Strategie und Ihren Zielen aus.",
  },
];

const investmentTypes = [
  { icon: Home, label: "Wohnungen & Häuser" },
  { icon: Building, label: "Gewerbeimmobilien" },
  { icon: Building2, label: "Mehrfamilienhäuser" },
  { icon: Landmark, label: "Renditeobjekte" },
  { icon: KeyRound, label: "Verwaltung & Bewirtschaftung" },
];

const steps = [
  { n: "01", icon: MessagesSquare, title: "Erstberatung", desc: "Wir besprechen Ihre Investitionsziele, Ihr Budget und Ihre Präferenzen." },
  { n: "02", icon: LineChart, title: "Marktanalyse", desc: "Wir analysieren aktuelle Chancen und Renditepotenziale in der Region Zürich." },
  { n: "03", icon: Search, title: "Objektauswahl", desc: "Sie erhalten passende Objekte, die zu Ihrer Anlagestrategie passen, auch off-market." },
  { n: "04", icon: FileSignature, title: "Kaufabwicklung", desc: "Wir begleiten Sie von der Verhandlung bis zum erfolgreichen Abschluss." },
];

const faqs = [
  {
    q: "Welche Objekte eignen sich als Kapitalanlage?",
    a: "Von Eigentumswohnungen und Häusern über Mehrfamilienhäuser bis zu Gewerbeimmobilien, wir finden das Objekt, das zu Ihrer Strategie und Renditeerwartung passt.",
  },
  {
    q: "Übernehmen Sie auch die Verwaltung?",
    a: "Ja, auf Wunsch unterstützen wir Sie bei Vermietung, Bewirtschaftung und Verwaltung Ihrer Renditeobjekte.",
  },
  {
    q: "Fallen für mich Maklergebühren an?",
    a: "Nein. Wir arbeiten provisionsfrei, so bleibt mehr Ihrer Rendite bei Ihnen. Die Konditionen besprechen wir transparent im Voraus.",
  },
];

export default function InvestierenPage() {
  return (
    <main>
      <JsonLd
        data={[
          faqJsonLd(faqs),
          breadcrumbJsonLd([
            { name: "Startseite", url: "/" },
            { name: "In Immobilien investieren", url: "/investieren" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="In Immobilien investieren"
        image="/projekte/residenz-aussenansicht-2.jpg"
        imageAlt="Renditeobjekt in der Region Zürich"
        crumbs={[
          { name: "Start", href: "/" },
          { name: "Investieren", href: "/investieren" },
        ]}
        title={
          <>
            Immobilien als{" "}
            <span className="italic text-gold">Kapitalanlage</span>.
          </>
        }
        subtitle="Bauen Sie Vermögen mit Immobilien in der Region Zürich auf, provisionsfrei und mit tiefen Einblicken in den lokalen Markt."
      >
        <ButtonLink href="#bewertung" variant="gold">
          Investment besprechen
        </ButtonLink>
      </PageHero>

      {/* Benefits */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux">
          <SectionHeading
            eyebrow="Warum mit uns investieren"
            title="Rendite statt Provision"
            intro="Wir helfen Ihnen, qualitativ hochwertige Objekte zu finden, ohne die typischen Maklergebühren des Schweizer Marktes."
          />
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 90}>
                <div className="flex h-full flex-col border border-line bg-white p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/12 text-gold">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl text-ink">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite/75">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Investment types */}
      <section className="bg-slate py-20 md:py-28">
        <div className="container-lux">
          <SectionHeading
            tone="onDark"
            eyebrow="Anlageformen"
            title="Worin wir Sie begleiten"
            intro="Vom Eigenheim als Anlage bis zum Renditeportfolio, wir decken das gesamte Spektrum ab."
          />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {investmentTypes.map((t, i) => (
              <Reveal key={t.label} delay={i * 70}>
                <div className="flex h-full flex-col items-start gap-4 border border-white/10 bg-white/[0.03] p-6">
                  <t.icon className="h-7 w-7 text-gold" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-white/85">{t.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux">
          <SectionHeading eyebrow="Unser Vorgehen" title="In 4 Schritten zum Investment" />
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="flex h-full flex-col border border-line bg-white p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-4xl text-gold/40">{s.n}</span>
                    <s.icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-serif text-lg text-ink">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite/75">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ValuationCta
        eyebrow="Kostenlose Erstberatung"
        title="Sprechen wir über Ihr Investment"
        intro="Sagen Sie uns Ihre Ziele. Wir melden uns mit passenden Chancen aus der Region Zürich, kostenlos und unverbindlich."
      />

      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux max-w-4xl">
          <SectionHeading align="center" eyebrow="Häufige Fragen" title="Rund ums Investieren" className="mb-12" />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBanner
        title="Bereit, in Immobilien zu investieren?"
        subtitle="Ein Anruf genügt. Wir zeigen Ihnen die Chancen in der Region Zürich, provisionsfrei."
      />
    </main>
  );
}
