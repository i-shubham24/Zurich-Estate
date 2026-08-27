import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { JsonLd } from "@/components/StructuredData";
import { site, SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Impressum, Optimal Immobilien AG",
  description:
    "Impressum und rechtliche Angaben der Optimal Immobilien AG, Bassersdorf, Kanton Zürich.",
  alternates: { canonical: "/impressum" },
  openGraph: {
    title: "Impressum, Optimal Immobilien AG",
    url: `${SITE_URL}/impressum`,
  },
};

export default function ImpressumPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", url: "/" },
          { name: "Impressum", url: "/impressum" },
        ])}
      />

      {/* ── Hero ── */}
      <section className="bg-ink pt-40 pb-16 md:pb-20">
        <div className="container-lux mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow tone="onDark">Rechtliches</Eyebrow>
            </div>
            <h1 className="mt-6 font-serif text-4xl leading-[1.12] text-white md:text-5xl lg:text-[3.3rem]">
              Impressum
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux">
          <Reveal>
            <div className="prose-lux mx-auto max-w-2xl">
              <h2>Angaben gemäss Art.&nbsp;3 UWG</h2>

              <p>
                <strong>{site.legalName}</strong>
                <br />
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
                <br />
                Kanton {site.address.region}, {site.address.countryName}
              </p>

              <h2>Kontakt</h2>
              <p>
                Telefon:{" "}
                <a href={site.phoneHref} className="text-gold-deep hover:underline">
                  {site.phone}
                </a>
                <br />
                E-Mail:{" "}
                <a href={site.emailHref} className="text-gold-deep hover:underline">
                  {site.email}
                </a>
              </p>

              <h2>Handelsregistereintrag</h2>
              <p>
                Eingetragen im Handelsregister des Kantons Zürich
                <br />
                UID: CHE-XXX.XXX.XXX
              </p>

              <h2>Verantwortlich für den Inhalt</h2>
              <p>
                Adi Kavzani
                <br />
                {site.legalName}
                <br />
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </p>

              <h2>Haftungsausschluss</h2>
              <p>
                Der Autor übernimmt keine Gewähr für die Richtigkeit,
                Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der
                Informationen. Haftungsansprüche gegen den Autor wegen Schäden
                materieller oder immaterieller Art, die aus dem Zugriff oder der
                Nutzung bzw. Nichtnutzung der veröffentlichten Informationen,
                durch Missbrauch der Verbindung oder durch technische Störungen
                entstanden sind, werden ausgeschlossen.
              </p>

              <h2>Urheberrechte</h2>
              <p>
                Die Urheber- und alle anderen Rechte an Inhalten, Bildern,
                Fotos oder anderen Dateien auf dieser Website gehören
                ausschliesslich der {site.legalName} oder den speziell
                genannten Rechteinhabern. Für die Reproduktion jeglicher
                Elemente ist die schriftliche Zustimmung des Urheberrechtsträgers
                im Voraus einzuholen.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
