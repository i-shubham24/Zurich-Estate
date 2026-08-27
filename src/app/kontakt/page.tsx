import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import { Eyebrow, SectionHeading } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import ValuationCta from "@/components/ValuationCta";
import CtaBanner from "@/components/CtaBanner";
import { JsonLd } from "@/components/StructuredData";
import { site, SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Kontakt – Optimal Immobilien AG",
  description:
    "Kontaktieren Sie Optimal Immobilien AG – Ihr provisionsfreier Immobilienmakler in Zürich. Telefon, E-Mail und Adresse für eine persönliche Beratung.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt – Optimal Immobilien AG",
    description:
      "Sprechen Sie mit uns – persönlich, ehrlich und unverbindlich. Telefon, E-Mail oder Besuch in Bassersdorf.",
    url: `${SITE_URL}/kontakt`,
  },
};

const contactCards = [
  {
    icon: Phone,
    label: "Telefon",
    value: site.phone,
    href: site.phoneHref,
    description: "Mo–Fr 08:00–18:30",
  },
  {
    icon: Mail,
    label: "E-Mail",
    value: site.email,
    href: site.emailHref,
    description: "Wir antworten innert 24 Stunden",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: `${site.address.street}, ${site.address.postalCode} ${site.address.city}`,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${site.address.street}, ${site.address.postalCode} ${site.address.city}, ${site.address.countryName}`
    )}`,
    description: `Kanton ${site.address.region}`,
  },
] as const;

export default function KontaktPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", url: "/" },
          { name: "Kontakt", url: "/kontakt" },
        ])}
      />

      {/* ── Hero ── */}
      <section className="bg-ink pt-40 pb-20 md:pb-28">
        <div className="container-lux mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow tone="onDark">Kontakt</Eyebrow>
            </div>
            <h1 className="mt-6 font-serif text-4xl leading-[1.12] text-white md:text-5xl lg:text-[3.3rem]">
              <Typewriter text="Sprechen Sie mit uns" />
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
              Ob eine erste Einschätzung Ihrer Immobilie, eine Frage zu unserem
              Fixpreis-Modell oder ein persönliches Kennenlernen – wir sind für
              Sie da.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Contact Section (Cards + Form) ── */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left Col: Contact Info & Hours */}
            <div>
              <Reveal>
                <h2 className="font-serif text-3xl text-ink md:text-4xl">Wir sind für Sie da</h2>
                <p className="mt-4 text-graphite/80 leading-relaxed mb-10">
                  Haben Sie Fragen zum Fixpreis-Modell oder möchten Sie eine erste Einschätzung 
                  Ihrer Immobilie? Zögern Sie nicht, uns zu kontaktieren.
                </p>
                <div className="space-y-6">
                  {contactCards.map((card) => (
                    <a
                      key={card.label}
                      href={card.href}
                      target={card.icon === MapPin ? "_blank" : undefined}
                      rel={card.icon === MapPin ? "noopener noreferrer" : undefined}
                      className="group flex items-start gap-5 border border-ink/8 bg-white p-6 transition-shadow hover:shadow-md"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10">
                        <card.icon className="h-5 w-5 text-gold-deep" />
                      </span>
                      <div>
                        <h3 className="font-serif text-lg text-ink">{card.label}</h3>
                        <p className="mt-1 text-base font-medium text-ink group-hover:text-gold-deep">
                          {card.value}
                        </p>
                        <p className="mt-1 text-sm text-graphite/70">{card.description}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-12 bg-sand/50 p-8 border border-line">
                  <h3 className="font-serif text-xl text-ink mb-6">Öffnungszeiten</h3>
                  <div className="divide-y divide-ink/10">
                    {site.openingHours.map((slot) => (
                      <div key={slot.days} className="flex items-center justify-between py-3">
                        <span className="flex items-center gap-3 text-ink">
                          <Clock className="h-4 w-4 text-gold-deep" />
                          <span className="text-sm font-semibold uppercase tracking-wide">
                            {slot.days}
                          </span>
                        </span>
                        <span className="text-sm text-graphite">{slot.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
            
            {/* Right Col: Contact Form */}
            <div>
              <Reveal delay={100}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Valuation CTA ── */}
      <ValuationCta />

      {/* ── CTA Banner ── */}
      <CtaBanner />
    </main>
  );
}
