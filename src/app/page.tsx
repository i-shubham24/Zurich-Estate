import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Clock,
  Lock,
  Building2,
  ArrowUpRight,
  Check,
  MapPin,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import ArticleCard from "@/components/ArticleCard";
import ArticleCarousel from "@/components/ArticleCarousel";
import ScrollTextHero from "@/components/ScrollTextHero";
import VerticalStrips from "@/components/VerticalStrips";
import FloatingGallery from "@/components/FloatingGallery";
import { Eyebrow, SectionHeading, ButtonLink } from "@/components/ui";
import Counter from "@/components/Counter";
import LocationsCarousel from "@/components/LocationsCarousel";
import ValuationCta from "@/components/ValuationCta";
import CtaBanner from "@/components/CtaBanner";
import FaqAccordion from "@/components/FaqAccordion";
import Typewriter from "@/components/Typewriter";
import HomeBackToTop from "@/components/HomeBackToTop";
import { JsonLd } from "@/components/StructuredData";
import { site, stats } from "@/lib/site";
import { featuredLocations } from "@/lib/locations";
import { flagshipProject } from "@/lib/projects";
import { featuredGuides, guides } from "@/lib/guides";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

const homeFaqs = [
  {
    q: "Was kostet ein Immobilienmakler in Zürich bei Optimal Immobilien?",
    a: "Sie verkaufen provisionsfrei zum Fixpreis von CHF 12&apos;000, unabhängig vom Verkaufspreis. Keine prozentuale Provision, keine versteckten Kosten. Bei einem Objekt von CHF 2 Mio. sparen Sie so gegenüber einer klassischen 3 % Provision rund CHF 48'000.",
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
    a: "Nach der kostenlosen Bewertung erstellen wir eine Vermarktungsstrategie, professionelle Fotos und ein Exposé, sprechen gezielt geprüfte Käufer an und begleiten Sie bis zur Beurkundung, nach der bewährten Adi Kavzani Sales Engine.",
  },
  {
    q: "Verkaufen Sie Immobilien auch diskret / off market?",
    a: "Ja. Gerade bei hochpreisigen Objekten an der Goldküste vermarkten wir auf Wunsch vollständig diskret an einen ausgewählten Kreis solventer Interessenten, ohne öffentliches Inserat.",
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
    desc: "Auf Wunsch vermarkten wir Ihr Objekt vollständig diskret, nur an geprüfte Interessenten.",
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
       * 1. HOOK, Scroll Text Hero
       * ===================================================== */}
      <ScrollTextHero 
        title1="IHR IMMOBILIENMAKLER"
        title2="CHF 12&apos;000"
        subtitle={<>Wir verkaufen Ihre Immobilie zum Fixpreis von <strong className="font-bold text-white">CHF 12&apos;000</strong>. Kein Risiko, keine versteckten Kosten.</>}
        image="/projekte/attika-wohnen-1.jpg"
      />

      {/* ===================================================== *
       * Selected objects, de-emphasized (few objects available)
       * ===================================================== */}
      <VerticalStrips 
        title="Aktuelle Auswahl"
        subtitle="Wenige, aktuell verfügbare Objekte – unser Fokus liegt auf dem provisionsfreien Verkauf Ihrer Immobilie."
        strips={[
          { id: "1", title: "RESIDENZ AM SEE", image: "/projekte/residenz-aussenansicht-1.jpg", href: "/kaufen/residenz-am-see" },
          { id: "2", title: "ATTIKA SEEFELD", image: "/projekte/obergeschoss-wohnbereich.jpg", href: "/kaufen/attikawohnung-seefeld" },
          { id: "3", title: "VILLA KÜSNACHT", image: "/projekte/villa-kuesnacht-exterior.jpg", href: "/kaufen/villa-seesicht-kuesnacht" },
        ]}
      />

      {/* ===================================================== *
       * 2. TRUST, proof & numbers
       * ===================================================== */}
      <section className="bg-cream py-16 md:py-20">
        <div className="container-lux">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="text-center">
                <Counter value={s.value} label={s.label} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== *
       * USP, the provisionsfrei / fixed-price argument
       * ===================================================== */}
      <section className="bg-sand py-20 md:py-28">
        <div className="container-lux grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Das Provisionsfrei-Prinzip"
              title={
                <>
                  Warum Prozente zahlen,
                  <br /> wenn ein <span className="italic text-gold-deep">Fixpreis</span> reicht?
                </>
              }
              intro="Klassische Makler verlangen 2 bis 3 % des Verkaufspreises, für denselben Aufwand, egal wie teuer Ihr Objekt ist. Wir drehen das um: ein fairer Fixpreis, dieselbe erstklassige Vermarktung."
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
                  <span className="font-serif text-3xl text-ink">CHF 12&apos;000</span>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between bg-gold/10 px-6 py-5">
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">
                  Ihre Ersparnis
                </span>
                <span className="font-serif text-3xl text-gold-deep">≈ CHF 48'000</span>
              </div>
              <p className="mt-5 text-sm text-graphite/60">
                Je höher der Verkaufspreis, desto grösser Ihre Ersparnis, bei
                gleichbleibend professioneller Vermarktung.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================== *
       * 3. VALUES, Transparenz & Fixpreis
       * ===================================================== */}
      <section className="bg-sand py-20 md:py-28">
        <div className="container-lux">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <Eyebrow className="justify-center">Ihre lokalen Experten</Eyebrow>
              <h2 className="mt-6 font-serif text-3xl leading-[1.15] text-ink md:text-5xl">
                Ehrliche Beratung. Verwurzelt in Zürich.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-graphite/75 md:text-xl">
                Als lokales Zürcher Immobilienunternehmen kennen wir die Quartiere, die Strassen und die Menschen. Wir verzichten auf leere Versprechen und teure Maklerprovisionen. Bei uns zahlen Sie einen fairen Fixpreis von {site.fixedPrice}, so bleibt der wahre Wert Ihrer Immobilie dort, wo er hingehört: bei Ihnen.
              </p>
              <div className="mt-10 flex justify-center">
                <ButtonLink href="/ueber-uns" variant="outline">
                  Unser Team kennenlernen
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================================================== *
       * 4. DESIRE, show the result (flagship project)
       * ===================================================== */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="container-lux">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
            <div className="relative aspect-[4/3] w-full">
              <ParallaxImage
                src={flagshipProject.image}
                alt="Neubau-Residenz mit Seesicht, Referenzprojekt von Optimal Immobilien"
                priority={true}
              />
              <span className="absolute left-5 top-5 bg-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink z-10">
                Referenzprojekt
              </span>
            </div>
            </Reveal>
            <Reveal>
              <Eyebrow tone="onDark">Das Resultat, nicht die Dienstleistung</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl leading-[1.12] md:text-4xl lg:text-[2.9rem]">
                {flagshipProject.title}
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">
                Wir könnten Ihnen viel über unser Marketing erzählen. Aber am Ende zählen für Sie nur echte Resultate. Dieses Projekt steht stellvertretend für die Qualität und den Einsatz, den wir für jede uns anvertraute Liegenschaft an den Tag legen.
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
                <div className="relative aspect-square w-full">
                  <ParallaxImage
                    src={src}
                    alt={`${flagshipProject.title}, Innenansicht ${i + 1}`}
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
       * LOCAL COVERAGE, internal linking to town pages
       * ===================================================== */}
      <section className="bg-sand py-20 md:py-28">
        <div className="container-lux">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Ihr Makler vor Ort"
              title={
                <>
                  Immobilienmakler in{" "}
                  <span className="italic text-gold-deep">Ihrer Region</span>
                </>
              }
              intro="Lokale Marktkenntnis entscheidet über den Preis. Wir kennen jede Gemeinde rund um Zürich, finden Sie Ihren Standort."
            />
            <Link
              href="/immobilienmakler"
              className="group hidden items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep transition-colors hover:text-ink md:inline-flex"
            >
              Alle Standorte
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-24">
            <LocationsCarousel items={featuredLocations} />
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
            title="Wissen, das sich für Sie auszahlt"
            intro="Wir teilen unser tiefes Wissen über den Zürcher Immobilienmarkt offen mit Ihnen. Keine Geheimnisse, sondern ehrliche Marktberichte und Tipps für Eigentümer, die den Wert ihrer Immobilie verstehen wollen."
          />
          <div className="mt-24">
            <ArticleCarousel items={(featuredGuides.length ? featuredGuides : guides).slice(0, 5)} />
          </div>
        </div>
      </section>

      {/* ===================================================== *
       * FLOATING GALLERY, See all properties
       * ===================================================== */}
      <FloatingGallery 
        title="Portfolio"
        href="/kaufen"
        images={[
          { src: "/projekte/residenz-aussenansicht-1.jpg", alt: "Neubau-Residenz mit Seesicht", width: "26vw", height: "48vh", left: "15%", top: "25%" },
          { src: "/locations/mega-mansion.jpg", alt: "Mega Mansion properties", width: "24vw", height: "42vh", left: "75%", top: "20%" },
          { src: "/locations/curved-apartments.jpg", alt: "Modern architecture", width: "30vw", height: "36vh", left: "50%", top: "15%" },
          { src: "/projekte/villa-kuesnacht-exterior.jpg", alt: "Villa an der Goldküste", width: "33vw", height: "54vh", left: "20%", top: "75%" },
          { src: "/projekte/obergeschoss-wohnbereich.jpg", alt: "Wohnbereich im Obergeschoss", width: "30vw", height: "50vh", left: "80%", top: "70%" },
          { src: "/locations/mansion-topdown.jpg", alt: "Luxury living", width: "28vw", height: "45vh", left: "50%", top: "85%" },
        ]}
      />

      {/* ===================================================== *
       * 5. ACTION, valuation form
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
      <HomeBackToTop />
    </main>
  );
}
