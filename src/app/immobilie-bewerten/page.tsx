import type { Metadata } from "next";
import { Target, Eye, Gift, LineChart, Phone, Home, BarChart3, FileText } from "lucide-react";
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
  title: "Immobilie bewerten in Zürich, kostenlos & unverbindlich",
  description:
    "Entdecken Sie den wahren Wert Ihrer Immobilie in Zürich. Kostenlose, unverbindliche Bewertung mit Vor-Ort-Besichtigung, Marktanalyse und Bewertungsbericht.",
  alternates: { canonical: "/immobilie-bewerten" },
  openGraph: {
    title: "Immobilie bewerten in Zürich, kostenlos | Optimal Immobilien AG",
    description:
      "Unkompliziert, rasch und kompetent, den wahren Wert Ihrer Immobilie herausfinden.",
    url: `${SITE_URL}/immobilie-bewerten`,
  },
};

const benefits = [
  {
    icon: Target,
    title: "Genauigkeit",
    desc: "Fundiert durch tiefgreifende Marktkenntnis und reale Vergleichstransaktionen aus Ihrer Mikrolage.",
  },
  {
    icon: Eye,
    title: "Transparenz",
    desc: "Sie verstehen, welche Faktoren den Wert Ihrer Immobilie beeinflussen, und können fundiert entscheiden.",
  },
  {
    icon: Gift,
    title: "Kostenlos & unverbindlich",
    desc: "Ein vollständig kostenloser Service, ohne versteckte Kosten und ohne Verpflichtung.",
  },
  {
    icon: LineChart,
    title: "Marktüberblick",
    desc: "Sie erhalten einen klaren Überblick über den aktuellen Marktwert und die Nachfrage in Ihrer Gemeinde.",
  },
];

const steps = [
  { n: "01", icon: Phone, title: "Kontakt & Termin", desc: "Sie melden sich, wir vereinbaren einen passenden Termin, unkompliziert und rasch." },
  { n: "02", icon: Home, title: "Vor-Ort-Besichtigung", desc: "Ein Makler begutachtet Ihre Immobilie persönlich, mit Blick auf Zustand, Lage und Ausbaustandard." },
  { n: "03", icon: BarChart3, title: "Marktanalyse", desc: "Wir analysieren vergleichbare Verkäufe und aktuelle Trends in Ihrer Region." },
  { n: "04", icon: FileText, title: "Bewertungsbericht", desc: "Sie erhalten einen nachvollziehbaren Bericht mit dem realistischen Marktwert Ihrer Immobilie." },
];

const faqs = [
  {
    q: "Ist die Immobilienbewertung wirklich kostenlos?",
    a: "Ja. Die Ersteinschätzung des Marktwerts ist vollständig kostenlos und unverbindlich, ohne versteckte Kosten.",
  },
  {
    q: "Wie lange dauert eine Bewertung?",
    a: "Die erste Online-Einschätzung dauert nur wenige Minuten. Nach einer Vor-Ort-Besichtigung erhalten Sie den Bewertungsbericht in der Regel innert weniger Tage.",
  },
  {
    q: "Bin ich nach der Bewertung zu etwas verpflichtet?",
    a: "Nein. Die Bewertung ist unverbindlich. Ob und wann Sie verkaufen, entscheiden allein Sie.",
  },
];

export default function ImmobilieBewertenPage() {
  return (
    <main>
      <JsonLd
        data={[
          faqJsonLd(faqs),
          breadcrumbJsonLd([
            { name: "Startseite", url: "/" },
            { name: "Immobilie bewerten", url: "/immobilie-bewerten" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Immobilie bewerten"
        image="/projekte/erdgeschoss-wohnbereich.jpg"
        imageAlt="Moderne Immobilie in Zürich"
        crumbs={[
          { name: "Start", href: "/" },
          { name: "Immobilie bewerten", href: "/immobilie-bewerten" },
        ]}
        title={
          <>
            Was ist Ihre Immobilie{" "}
            <span className="italic text-gold">wirklich wert</span>?
          </>
        }
        subtitle="Unkompliziert, rasch und kompetent: Entdecken Sie den wahren Wert Ihrer Immobilie, kostenlos und unverbindlich."
      >
        <ButtonLink href="#bewertung" variant="gold">
          Jetzt bewerten lassen
        </ButtonLink>
      </PageHero>

      {/* Benefits */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux">
          <SectionHeading
            eyebrow="Warum eine Bewertung"
            title="Klarheit über Ihren Immobilienwert"
            intro="Eine fundierte Bewertung ist der wichtigste erste Schritt, egal ob Sie verkaufen, kaufen oder investieren möchten."
          />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <div className="flex h-full flex-col border border-line bg-white p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/12 text-gold">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-serif text-lg text-ink">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite/75">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-sand py-20 md:py-28">
        <div className="container-lux">
          <SectionHeading
            eyebrow="So funktioniert es"
            title="In 4 Schritten zum Marktwert"
          />
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
        eyebrow="Kostenlose Bewertung"
        title="Ihre kostenlose Ersteinschätzung"
        intro="Starten Sie in unter zwei Minuten. Wir melden uns mit einer fundierten, unverbindlichen Einschätzung des Marktwerts."
      />

      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux max-w-4xl">
          <SectionHeading align="center" eyebrow="Häufige Fragen" title="Rund um die Bewertung" className="mb-12" />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBanner
        title="Neugierig auf Ihren Immobilienwert?"
        subtitle="Ein Anruf genügt. Wir beraten Sie persönlich, ehrlich und unverbindlich."
      />
    </main>
  );
}
