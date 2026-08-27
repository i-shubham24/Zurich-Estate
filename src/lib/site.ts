/**
 * Central source of truth for the Optimal Immobilien AG brand & NAP data.
 * Consistent Name/Address/Phone across every page is a core local-SEO signal,
 * so all pages read contact facts from here.
 */

export const SITE_URL = "https://optimal-immobilien.ch";

export const site = {
  name: "Optimal Immobilien",
  legalName: "Optimal Immobilien AG",
  url: SITE_URL,
  tagline: "Immobilienmakler Zürich",
  description:
    "Optimal Immobilien AG verkauft Ihre Immobilie in Zürich provisionsfrei zum Fixpreis von CHF 12'000, 0 % Provision, 100 % Transparenz und der Höchstpreis für Ihr Objekt.",

  // Unique selling proposition
  fixedPrice: "CHF 12'000",
  usp: "Provisionsfrei verkaufen zum Fixpreis von CHF 12'000",

  // Contact / NAP
  phone: "+41 43 540 82 27",
  phoneHref: "tel:+41435408227",
  email: "info@optimal-immobilien.ch",
  emailHref: "mailto:info@optimal-immobilien.ch",

  address: {
    street: "Holzacherweg 18a",
    postalCode: "8303",
    city: "Bassersdorf",
    region: "Zürich",
    country: "CH",
    countryName: "Schweiz",
  },

  // Approx. geo of the Bassersdorf office (for LocalBusiness schema)
  geo: { lat: 47.4467, lng: 8.6295 },

  openingHours: [
    { days: "Mo bis Fr", hours: "08:00, 18:30" },
    { days: "Sa", hours: "Nach Vereinbarung" },
  ],
} as const;

export const stats = [
  { value: "CHF 12'000", label: "Fixpreis statt Prozente" },
  { value: "0 %", label: "Maklerprovision" },
  { value: "3.8 %", label: "Über Marktwert (Ø)" },
  { value: "480+", label: "Verkaufte Objekte" },
] as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Verkaufen", href: "/immobilie-verkaufen" },
  { label: "Standorte", href: "/immobilienmakler" },
  { label: "Immobilien", href: "/kaufen" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export const services = [
  {
    slug: "immobilie-verkaufen",
    title: "Immobilie verkaufen",
    short: "Provisionsfrei zum Fixpreis von CHF 12'000",
    href: "/immobilie-verkaufen",
  },
  {
    slug: "immobilie-bewerten",
    title: "Immobilie bewerten",
    short: "Kostenlose Marktwert­einschätzung in 2 Minuten",
    href: "/#bewertung",
  },
  {
    slug: "immobilie-kaufen",
    title: "Immobilie kaufen",
    short: "Exklusive Objekte & Neubau­projekte am Zürichsee",
    href: "/kaufen",
  },
  {
    slug: "investieren",
    title: "In Immobilien investieren",
    short: "Renditeobjekte und Off Market-Chancen",
    href: "/kontakt",
  },
] as const;
