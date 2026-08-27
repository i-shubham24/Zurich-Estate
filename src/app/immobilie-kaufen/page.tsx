import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Compass, HeartHandshake, Eye, ClipboardList, Search, FileSignature, ArrowRight } from "lucide-react";
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
  title: "Immobilie kaufen in Zürich, ohne Maklergebühren",
  description:
    "Finden Sie Ihr Traumhaus oder Ihre Traumwohnung in Zürich, ohne Maklergebühren. Persönliche Beratung, tiefe Marktkenntnis und volle Transparenz bei jedem Schritt.",
  alternates: { canonical: "/immobilie-kaufen" },
  openGraph: {
    title: "Immobilie kaufen in Zürich, ohne Maklergebühren | Optimal Immobilien AG",
    description:
      "Der schlüsselfertige Weg zu Ihrer neuen Immobilie, begleitet von erfahrenen Maklern.",
    url: `${SITE_URL}/immobilie-kaufen`,
  },
};

const reasons = [
  {
    icon: Compass,
    title: "Tiefe Marktkenntnis",
    desc: "Profitieren Sie von unserem tiefgreifenden Verständnis des Immobilienmarkts in Zürich und der ganzen Schweiz.",
  },
  {
    icon: HeartHandshake,
    title: "Persönliche Beratung",
    desc: "Wir nehmen uns Zeit, Ihre Wünsche zu verstehen, und schlagen Ihnen nur Objekte vor, die wirklich passen.",
  },
  {
    icon: Eye,
    title: "Volle Transparenz",
    desc: "Klare Kommunikation und Transparenz bei jedem Schritt, vom ersten Kontakt bis zur Schlüsselübergabe.",
  },
];

const steps = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Bedarfsanalyse",
    desc: "Sie teilen uns Ihre Prioritäten mit, Lage, Grösse, Ausstattung, damit wir Ihre Wünsche genau verstehen.",
  },
  {
    n: "02",
    icon: Search,
    title: "Auswahl & Besichtigungen",
    desc: "Sie erhalten eine sorgfältig kuratierte Auswahl passender Objekte, inklusive begleiteter Besichtigungen.",
  },
  {
    n: "03",
    icon: FileSignature,
    title: "Kaufabwicklung",
    desc: "Wir begleiten Sie vom Angebot über die Verhandlung bis zum Vertrag und der Beurkundung.",
  },
];

const faqs = [
  {
    q: "Was kostet der Kaufservice bei Optimal Immobilien?",
    a: "Unsere Käuferbegleitung ist für Sie ohne klassische Maklergebühren. Wir stehen für ein transparentes, faires Modell, das wir vor der Zusammenarbeit klar besprechen.",
  },
  {
    q: "Finden Sie auch Objekte, die nicht öffentlich inseriert sind?",
    a: "Ja. Über unser Netzwerk erhalten wir regelmässig Zugang zu Off-Market-Objekten, die nie öffentlich ausgeschrieben werden.",
  },
  {
    q: "In welchen Regionen suchen Sie für mich?",
    a: "In der Stadt Zürich, an der Goldküste, am linken Seeufer, im Glattal, im Unterland sowie in Winterthur und Uster.",
  },
];

export default function ImmobilieKaufenPage() {
  return (
    <main>
      <JsonLd
        data={[
          faqJsonLd(faqs),
          breadcrumbJsonLd([
            { name: "Startseite", url: "/" },
            { name: "Immobilie kaufen", url: "/immobilie-kaufen" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Immobilie kaufen"
        image="/projekte/attika-kueche-seeblick.jpg"
        imageAlt="Hochwertige Immobilie mit Seeblick in Zürich"
        crumbs={[
          { name: "Start", href: "/" },
          { name: "Immobilie kaufen", href: "/immobilie-kaufen" },
        ]}
        title={
          <>
            Finden Sie Ihr Zuhause,{" "}
            <span className="italic text-gold">ohne Maklergebühren</span>.
          </>
        }
        subtitle="Der schlüsselfertige Weg zu Ihrer neuen Immobilie, begleitet von erfahrenen Maklern, die Zürich und die ganze Region kennen."
      >
        <ButtonLink href="/#bewertung" variant="gold">
          Suchprofil starten
        </ButtonLink>
        <ButtonLink href="/kaufen" variant="ghost">
          Aktuelle Objekte
        </ButtonLink>
      </PageHero>

      {/* Value proposition */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Ihr Partner beim Kauf"
              title="Ankommen, wo Sie hingehören"
              intro="Willkommen bei Optimal Immobilien AG, Ihrem Partner für den Immobilienkauf. Unser Ziel ist es, Ihren Weg ins neue Zuhause so einfach und transparent wie möglich zu machen. Ob Haus oder Wohnung, unser erfahrenes Team begleitet Sie bei jedem Schritt."
            />
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <div className="font-serif text-3xl text-ink">0 %</div>
                <div className="text-xs uppercase tracking-[0.16em] text-graphite/60">Maklergebühren</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-ink">100 %</div>
                <div className="text-xs uppercase tracking-[0.16em] text-graphite/60">Transparenz</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-ink">480+</div>
                <div className="text-xs uppercase tracking-[0.16em] text-graphite/60">Vermittelte Objekte</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/projekte/attika-wohnen-3.jpg"
                alt="Modernes Wohnzimmer einer Immobilie in Zürich"
                fill
                quality={82}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-sand py-20 md:py-28">
        <div className="container-lux">
          <SectionHeading eyebrow="Warum mit uns kaufen" title="Drei Gründe, die den Unterschied machen" />
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 90}>
                <div className="flex h-full flex-col border border-line bg-white p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/12 text-gold">
                    <r.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl text-ink">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite/75">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux">
          <SectionHeading
            eyebrow="So läuft der Kauf ab"
            title="In 3 Schritten zu Ihrer Immobilie"
            intro="Ein klar strukturierter Prozess, bei dem Sie jederzeit wissen, was als Nächstes kommt."
          />
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="flex h-full flex-col border border-line bg-white p-8">
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
          <Reveal className="mt-10">
            <Link
              href="/kaufen"
              className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep transition-colors hover:text-ink"
            >
              Aktuelle Objekte ansehen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <ValuationCta
        eyebrow="Kostenloses Suchprofil"
        title="Sagen Sie uns, was Sie suchen"
        intro="In unter zwei Minuten: Wir erstellen Ihr Suchprofil und melden uns mit passenden Objekten, kostenlos und unverbindlich."
      />

      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux max-w-4xl">
          <SectionHeading align="center" eyebrow="Häufige Fragen" title="Rund um den Immobilienkauf" className="mb-12" />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaBanner
        title="Bereit für Ihr neues Zuhause?"
        subtitle="Ein Anruf genügt. Wir finden auch off-market das passende Objekt für Sie."
      />
    </main>
  );
}
