import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui";
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
              Sprechen Sie mit uns
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
              Ob eine erste Einschätzung Ihrer Immobilie, eine Frage zu unserem
              Fixpreis-Modell oder ein persönliches Kennenlernen – wir sind für
              Sie da.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Contact Cards ── */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {contactCards.map((card) => (
              <Reveal key={card.label}>
                <a
                  href={card.href}
                  target={card.icon === MapPin ? "_blank" : undefined}
                  rel={card.icon === MapPin ? "noopener noreferrer" : undefined}
                  className="group block border border-ink/8 bg-white p-8 transition-shadow hover:shadow-lg md:p-10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                    <card.icon className="h-5 w-5 text-gold-deep" />
                  </span>
                  <h2 className="mt-6 font-serif text-xl text-ink">
                    {card.label}
                  </h2>
                  <p className="mt-2 text-base font-medium text-ink group-hover:text-gold-deep">
                    {card.value}
                  </p>
                  <p className="mt-1 text-sm text-graphite/70">
                    {card.description}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Opening Hours ── */}
      <section className="bg-sand py-20 md:py-28">
        <div className="container-lux mx-auto max-w-2xl">
          <Reveal>
            <SectionHeading
              eyebrow="Öffnungszeiten"
              title="Wann Sie uns erreichen"
              align="center"
            />
            <div className="mt-10 flex justify-center">
              <div className="w-full max-w-md divide-y divide-ink/10">
                {site.openingHours.map((slot) => (
                  <div
                    key={slot.days}
                    className="flex items-center justify-between py-4"
                  >
                    <span className="flex items-center gap-3 text-ink">
                      <Clock className="h-4 w-4 text-gold-deep" />
                      <span className="text-sm font-semibold uppercase tracking-wide">
                        {slot.days}
                      </span>
                    </span>
                    <span className="text-sm text-graphite">
                      {slot.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
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
