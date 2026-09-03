import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "./Logo";
import { site, services } from "@/lib/site";
import { locations } from "@/lib/locations";

const footerTowns = [
  "zuerich",
  "kuesnacht",
  "zollikon",
  "meilen",
  "thalwil",
  "bassersdorf",
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const towns = footerTowns
    .map((slug) => locations.find((l) => l.slug === slug))
    .filter(Boolean) as typeof locations;

  return (
    <footer className="bg-ink text-white/70">
      <div className="container-lux grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        {/* Brand + NAP */}
        <div>
          <Logo tone="onDark" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
            Ihr Immobilienmakler für Zürich und Umgebung. Provisionsfrei verkaufen
            zum Fixpreis von {site.fixedPrice}
          </p>
          <address className="mt-6 space-y-3 text-sm not-italic">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${site.address.street}, ${site.address.postalCode} ${site.address.city}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 transition-colors hover:text-white"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </span>
            </a>
            <a
              href={site.phoneHref}
              className="flex items-center gap-3 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              {site.phone}
            </a>
            <a
              href={site.emailHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              {site.email}
            </a>
          </address>
        </div>

        {/* Leistungen */}
        <nav aria-label="Leistungen">
          <h2 className="eyebrow text-gold">Leistungen</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={s.href} className="transition-colors hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Standorte */}
        <nav aria-label="Standorte">
          <h2 className="eyebrow text-gold">Standorte</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {towns.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/immobilienmakler/${t.slug}`}
                  className="transition-colors hover:text-white"
                >
                  Immobilienmakler {t.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/immobilienmakler"
                className="font-semibold text-gold-bright transition-colors hover:text-gold"
              >
                Alle Standorte →
              </Link>
            </li>
          </ul>
        </nav>

        {/* Unternehmen */}
        <nav aria-label="Unternehmen">
          <h2 className="eyebrow text-gold">Unternehmen</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link href="/ueber-uns" className="transition-colors hover:text-white">Über uns</Link></li>
            <li><Link href="/ratgeber" className="transition-colors hover:text-white">Ratgeber</Link></li>
            <li><Link href="/kaufen" className="transition-colors hover:text-white">Aktuelle Objekte</Link></li>
            <li><Link href="/kontakt" className="transition-colors hover:text-white">Kontakt</Link></li>
            <li><Link href="/impressum" className="transition-colors hover:text-white">Impressum</Link></li>
            <li><Link href="/datenschutz" className="transition-colors hover:text-white">Datenschutz</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-lux flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/60 md:flex-row">
          <p>© {year} {site.legalName} · {site.address.city} · Alle Rechte vorbehalten.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            0 % Provision · 100 % Transparenz
          </p>
        </div>
      </div>
    </footer>
  );
}
