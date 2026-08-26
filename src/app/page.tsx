import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  TrendingUp,
  Clock,
  Lock,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { Eyebrow, SectionHeading, ButtonLink, Stat } from "@/components/ui";
import Method from "@/components/Method";
import LocationsGrid from "@/components/LocationsGrid";
import ValuationCta from "@/components/ValuationCta";
import CtaBanner from "@/components/CtaBanner";
import FaqAccordion from "@/components/FaqAccordion";
import { JsonLd } from "@/components/StructuredData";
import { site, stats } from "@/lib/site";
import { featuredLocations } from "@/lib/locations";
import { flagshipProject } from "@/lib/projects";
import { featuredGuides, guides } from "@/lib/guides";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

const homeFaqs = [
  {
    q: "Was kostet ein Immobilienmakler in Zürich bei Optimal Immobilien?",
    a: "Sie verkaufen provisionsfrei zum Fixpreis von CHF 12'000.– – unabhängig vom Verkaufspreis. Keine prozentuale Provision, keine versteckten Kosten. Bei einem Objekt von CHF 2 Mio. sparen Sie so gegenüber einer klassischen 3 %-Provision rund CHF 48'000.",
  },
  {
    q: "In welchen Regionen ist Optimal Immobilien tätig?",
    a: "In der Stadt Zürich, an der Goldküste (Küsnacht, Zollikon, Meilen, Herrliberg, Erlenbach), am linken Seeufer, im Glattal, im Zürcher Unterland sowie in Winterthur und Uster.",
  },
  {
    q: "Ist die Immobilienbewertung wirklich kostenlos?",
    a: "Ja. Die Ersteinschätzung des Marktwerts ist kostenlos und unverbindlich. Sie erhalten Ihr Ergebnis in der Regel innert 24 Stunden.",
  },
  {
    q: "Wie läuft der Verkauf ab?",
    a: "Nach der kostenlosen Bewertung erstellen wir eine Vermarktungsstrategie, professionelle Fotos und ein Exposé, sprechen gezielt geprüfte Käufer an und begleiten Sie bis zur Beurkundung – nach der bewährten Adi Kavzani Sales Engine.",
  },
  {
    q: "Verkaufen Sie Immobilien auch diskret / off-market?",
    a: "Ja. Gerade bei hochpreisigen Objekten an der Goldküste vermarkten wir auf Wunsch vollständig diskret an einen ausgewählten Kreis solventer Interessenten – ohne öffentliches Inserat.",
  },
];

const desireItems = [
  {
    icon: TrendingUp,
    title: "Maximale Rendite",
    desc: "Gezielte Vermarktung und ein strukturiertes Bieterverfahren erzielen Preise über dem Durchschnitt.",
  },
  {
    icon: Clock,
    title: "Absolute Ruhe",
    desc: "Keine Wochenenden voller Besichtigungen. Sie lehnen sich zurück, wir übernehmen den gesamten Prozess.",
  },
  {
    icon: Lock,
    title: "Diskretion",
    desc: "Auf Wunsch vermarkten wir Ihr Objekt vollständig diskret – nur an geprüfte Interessenten.",
  },
];

export default function HomePage() {
  return (
    <main>
      <JsonLd
        data={[
          faqJsonLd(homeFaqs),
          breadcrumbJsonLd([{ name: "Startseite", url: "/" }]),
        ]}
      />

      {/* ===================================================== *
       * 1. HOOK — one clear promise, above the fold
       * ===================================================== */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <Image
          src="/projekte/residenz-aussenansicht-1.jpg"
          alt="Moderne Neubau-Residenz mit Seesicht in der Region Zürich"
          fill
          priority
          quality={82}
          sizes="100vw"
          className="animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />

        <div className="container-lux relative z-10 pt-28 pb-16">
          <div className="max-w-3xl">
            <p className="eyebrow flex items-center gap-3 text-gold-bright">
              <span className="h-px w-8 bg-gold" />
              Optimal Immobilien AG · Zürich &amp; Goldküste
            </p>
            <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Ihr Immobilienmakler
              <br />
              in Zürich –{" "}
              <span className="italic text-gold">provisionsfrei</span>
              <br className="hidden sm:block" /> zum Höchstpreis.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
              Wir verkaufen Ihre Immobilie zum Fixpreis von{" "}
              <strong className="font-semibold text-white">{site.fixedPrice}</strong>{" "}
              – 0 % Provision, 100 % Transparenz und der beste Preis für Ihr Objekt.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/#bewertung" variant="gold">
                Kostenlose Bewertung
              </ButtonLink>
              <ButtonLink href="/immobilie-verkaufen" variant="ghost">
                So verkaufen wir
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Trust ticker */}
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-ink/40 backdrop-blur-sm">
          <div className="container-lux flex flex-wrap items-center gap-x-8 gap-y-2 py-4 text-xs uppercase tracking-[0.16em] text-white/70">
            <span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-gold" /> 0 % Provision</span>
            <span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-gold" /> {site.fixedPrice} Fixpreis</span>
            <span className="hidden items-center gap-2 sm:flex"><BadgeCheck className="h-4 w-4 text-gold" /> 480+ verkaufte Objekte</span>
            <span className="hidden items-center gap-2 md:flex"><BadgeCheck className="h-4 w-4 text-gold" /> Experten für die Goldküste</span>
          </div>
        </div>
      </section>

      {/* ===================================================== *
       * 2. TRUST — proof & numbers
       * ===================================================== */}
      <section className="bg-cream py-16 md:py-20">
        <div className="container-lux">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="text-center">
                <Stat value={s.value} label={s.label} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== *
       * USP — the provisionsfrei / fixed-price argument
       * ===================================================== */}
      <section className="bg-sand py-20 md:py-28">
        <div className="container-lux grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Das Provisionsfrei-Prinzip"
              title={
                <>
                  Warum Prozente zahlen,
                  <br /> wenn ein <span className="italic text-gold">Fixpreis</span> reicht?
                </>
              }
              intro="Klassische Makler verlangen 2–3 % des Verkaufspreises – für denselben Aufwand, egal wie teuer Ihr Objekt ist. Wir drehen das um: ein fairer Fixpreis, dieselbe erstklassige Vermarktung."
            />
            <div className="mt-8">
              <ButtonLink href="/immobilie-verkaufen" variant="dark">
                Mehr zum Verkaufsprozess
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="border border-line bg-white p-8 shadow-[var(--shadow-luxe)] md:p-10">
              <div className="text-xs uppercase tracking-[0.18em] text-graphite/60">
                Rechenbeispiel · Verkaufspreis CHF 2'000'000
              </div>
              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between border-b border-line pb-5">
                  <span className="text-graphite/80">Klassischer Makler (3 %)</span>
                  <span className="font-serif text-2xl text-graphite/50 line-through">CHF 60'000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink">Optimal Immobilien</span>
                  <span className="font-serif text-3xl text-ink">CHF 12'000</span>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between bg-gold/10 px-6 py-5">
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">
                  Ihre Ersparnis
                </span>
                <span className="font-serif text-3xl text-gold-deep">≈ CHF 48'000</span>
              </div>
              <p className="mt-5 text-sm text-graphite/60">
                Je höher der Verkaufspreis, desto grösser Ihre Ersparnis – bei
                gleichbleibend professioneller Vermarktung.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== *
       * 3. METHOD — the Adi Kavzani Sales Engine
       * ===================================================== */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux">
          <Method tone="onLight" />
        </div>
      </section>

      {/* ===================================================== *
       * 4. DESIRE — show the result (flagship project)
       * ===================================================== */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="container-lux">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={flagshipProject.image}
                  alt="Neubau-Residenz mit Seesicht – Referenzprojekt von Optimal Immobilien"
                  fill
                  quality={82}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute left-5 top-5 bg-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                  Referenzprojekt
                </span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Eyebrow tone="onDark">Das Resultat, nicht die Dienstleistung</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl leading-[1.12] md:text-4xl lg:text-[2.9rem]">
                {flagshipProject.title}
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">
                {flagshipProject.description}
              </p>
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {flagshipProject.highlights?.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <Link
                  href={`/kaufen/${flagshipProject.slug}`}
                  className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-bright transition-colors hover:text-gold"
                >
                  Projekt ansehen
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* thumbnail strip */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {flagshipProject.gallery?.slice(1, 5).map((src, i) => (
              <Reveal key={src} delay={i * 70}>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={src}
                    alt={`${flagshipProject.title} – Innenansicht ${i + 1}`}
                    fill
                    quality={70}
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
            {desireItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="flex h-full flex-col border border-white/10 bg-white/[0.03] p-8">
                  <item.icon className="h-7 w-7 text-gold" strokeWidth={1.5} />
                  <h3 className="mt-5 font-serif text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== *
       * LOCAL COVERAGE — internal linking to town pages
       * ===================================================== */}
      <section className="bg-sand py-20 md:py-28">
        <div className="container-lux">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Ihr Makler vor Ort"
              title={
                <>
                  Immobilienmakler in{" "}
                  <span className="italic text-gold">Ihrer Region</span>
                </>
              }
              intro="Lokale Marktkenntnis entscheidet über den Preis. Wir kennen jede Gemeinde rund um Zürich – finden Sie Ihren Standort."
            />
            <Link
              href="/immobilienmakler"
              className="group hidden items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep transition-colors hover:text-ink md:inline-flex"
            >
              Alle Standorte
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-12">
            <LocationsGrid items={featuredLocations} />
          </div>
        </div>
      </section>

      {/* ===================================================== *
       * RATGEBER teaser
       * ===================================================== */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux">
          <SectionHeading
            eyebrow="Ratgeber & Marktwissen"
            title="Wissen, das Ihren Verkauf besser macht"
            intro="Aktuelle Marktberichte, Experten-Tipps und Quartier-Guides für Eigentümerinnen und Eigentümer in Zürich."
          />
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {(featuredGuides.length ? featuredGuides : guides).slice(0, 3).map((g, i) => (
              <Reveal key={g.slug} delay={i * 90}>
                <Link href={`/ratgeber/${g.slug}`} className="group flex h-full flex-col">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={g.image}
                      alt={g.title}
                      fill
                      quality={70}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 bg-white/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink">
                      {g.category}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-graphite/50">
                    <Clock className="h-3.5 w-3.5" /> {g.readTime}
                  </div>
                  <h3 className="mt-3 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-gold-deep">
                    {g.title}
                  </h3>
                  <p className="mt-3 flex-grow text-sm leading-relaxed text-graphite/70">
                    {g.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                    Artikel lesen <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== *
       * 5. ACTION — valuation form
       * ===================================================== */}
      <ValuationCta />

      {/* FAQ */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux max-w-4xl">
          <SectionHeading
            align="center"
            eyebrow="Häufige Fragen"
            title="Was Eigentümer oft fragen"
            className="mb-12"
          />
          <FaqAccordion faqs={homeFaqs} />
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
