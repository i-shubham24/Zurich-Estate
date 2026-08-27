import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { JsonLd } from "@/components/StructuredData";
import { site, SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Datenschutzerklärung, Optimal Immobilien AG",
  description:
    "Datenschutzerklärung der Optimal Immobilien AG. Informationen zur Erhebung, Verarbeitung und Nutzung personenbezogener Daten gemäss Schweizer DSG.",
  alternates: { canonical: "/datenschutz" },
  openGraph: {
    title: "Datenschutzerklärung, Optimal Immobilien AG",
    url: `${SITE_URL}/datenschutz`,
  },
};

export default function DatenschutzPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", url: "/" },
          { name: "Datenschutzerklärung", url: "/datenschutz" },
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
              Datenschutzerklärung
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-lux">
          <Reveal>
            <div className="prose-lux mx-auto max-w-2xl">
              {/* 1, Verantwortliche Stelle */}
              <h2>1. Verantwortliche Stelle</h2>
              <p>
                Verantwortlich für die Datenbearbeitung auf dieser Website ist:
              </p>
              <p>
                <strong>{site.legalName}</strong>
                <br />
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
                <br />
                Kanton {site.address.region}, {site.address.countryName}
                <br />
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

              {/* 2, Erhebung und Verarbeitung */}
              <h2>2. Erhebung und Verarbeitung personenbezogener Daten</h2>
              <p>
                Beim Besuch unserer Website werden automatisch technische Daten
                erfasst, die Ihr Browser übermittelt (sog. Server-Logfiles).
                Dazu gehören:
              </p>
              <ul>
                <li>IP-Adresse des anfragenden Rechners</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Name und URL der abgerufenen Datei</li>
                <li>Verwendeter Browser und Betriebssystem</li>
                <li>Referrer-URL (zuvor besuchte Seite)</li>
              </ul>
              <p>
                Diese Daten werden ausschliesslich zur Sicherstellung eines
                störungsfreien Betriebs und zur Verbesserung unseres Angebots
                ausgewertet. Ein Rückschluss auf Ihre Person ist nicht möglich.
              </p>

              {/* 3, Cookies */}
              <h2>3. Cookies</h2>
              <p>
                Unsere Website verwendet Cookies. Dabei handelt es sich um
                kleine Textdateien, die auf Ihrem Endgerät gespeichert werden.
                Einige Cookies sind technisch notwendig, andere dienen der
                Analyse des Nutzungsverhaltens. Sie können die Verwendung von
                Cookies in Ihren Browsereinstellungen jederzeit einschränken oder
                deaktivieren. Beachten Sie, dass dadurch allenfalls nicht alle
                Funktionen der Website vollumfänglich nutzbar sind.
              </p>

              {/* 4, Google Analytics */}
              <h2>4. Google Analytics</h2>
              <p>
                Diese Website nutzt Google Analytics, einen Webanalysedienst der
                Google Ireland Limited (&quot;Google&quot;). Google Analytics
                verwendet Cookies zur Analyse der Benutzung der Website. Die
                durch das Cookie erzeugten Informationen über Ihre Benutzung
                dieser Website werden in der Regel an einen Server von Google in
                den USA übertragen und dort gespeichert. Wir haben die
                IP-Anonymisierung aktiviert, sodass Ihre IP-Adresse von Google
                innerhalb der EU/des EWR gekürzt wird.
              </p>
              <p>
                Sie können die Erfassung durch Google Analytics verhindern,
                indem Sie das unter dem folgenden Link verfügbare
                Browser-Add-on herunterladen und installieren:{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-deep hover:underline"
                >
                  Google Analytics Opt-out
                </a>
                .
              </p>

              {/* 5, Kontaktformular */}
              <h2>5. Kontaktformular und Immobilienbewertung</h2>
              <p>
                Wenn Sie uns über das Kontaktformular oder das
                Bewertungsformular Anfragen zukommen lassen, werden Ihre Angaben
                aus dem Formular inklusive der von Ihnen dort angegebenen
                Kontaktdaten zur Bearbeitung der Anfrage und für den Fall von
                Anschlussfragen bei uns gespeichert. Diese Daten geben wir
                nicht ohne Ihre Einwilligung weiter.
              </p>

              {/* 6, Rechte der betroffenen Personen */}
              <h2>6. Rechte der betroffenen Personen</h2>
              <p>
                Gemäss dem Schweizer Bundesgesetz über den Datenschutz (DSG)
                haben Sie folgende Rechte:
              </p>
              <ul>
                <li>
                  <strong>Auskunftsrecht:</strong> Sie können jederzeit Auskunft
                  über Ihre bei uns gespeicherten personenbezogenen Daten
                  verlangen.
                </li>
                <li>
                  <strong>Berichtigungsrecht:</strong> Sie haben das Recht,
                  unrichtige Daten berichtigen zu lassen.
                </li>
                <li>
                  <strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer
                  Daten verlangen, sofern keine gesetzlichen
                  Aufbewahrungspflichten entgegenstehen.
                </li>
                <li>
                  <strong>Widerspruchsrecht:</strong> Sie können der
                  Datenbearbeitung jederzeit widersprechen.
                </li>
                <li>
                  <strong>Datenübertragbarkeit:</strong> Sie haben das Recht,
                  die Herausgabe der Daten in einem gängigen Format zu
                  verlangen.
                </li>
              </ul>
              <p>
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
                <a href={site.emailHref} className="text-gold-deep hover:underline">
                  {site.email}
                </a>
              </p>

              {/* 7, Änderungen */}
              <h2>7. Änderungen dieser Datenschutzerklärung</h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung jederzeit
                anzupassen, damit sie stets den aktuellen rechtlichen
                Anforderungen entspricht oder um Änderungen unserer Leistungen
                umzusetzen. Für Ihren erneuten Besuch gilt dann die neue
                Datenschutzerklärung.
              </p>

              {/* 8, Anwendbares Recht */}
              <h2>8. Anwendbares Recht und Gerichtsstand</h2>
              <p>
                Es gilt ausschliesslich schweizerisches Recht, insbesondere das
                Bundesgesetz über den Datenschutz (DSG). Gerichtsstand ist{" "}
                {site.address.city}, Kanton {site.address.region},{" "}
                {site.address.countryName}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
