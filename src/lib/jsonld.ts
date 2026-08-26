/**
 * JSON-LD builders. Kept as plain objects so any Server Component can embed
 * them. We deliberately avoid fabricated aggregateRating markup (against
 * Google's guidelines without a real review source).
 */
import { SITE_URL, site } from "./site";
import { locations, type Location } from "./locations";

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  postalCode: site.address.postalCode,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  addressCountry: site.address.country,
};

const openingHoursSpecification = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:30",
  },
];

/** Primary business entity — a RealEstateAgent (a LocalBusiness subtype). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#organization`,
    name: site.legalName,
    alternateName: "Optimal Immobilien",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/optimal-immobilien-logo.png`,
    image: `${SITE_URL}/projekte/residenz-aussenansicht-1.jpg`,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    priceRange: "CHF 12'000.– Fixpreis",
    currenciesAccepted: "CHF",
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification,
    areaServed: locations.map((l) => ({
      "@type": "City",
      name: l.name,
    })),
    knowsAbout: [
      "Immobilienverkauf",
      "Immobilienbewertung",
      "Immobilienvermarktung",
      "Zürcher Immobilienmarkt",
    ],
    makesOffer: {
      "@type": "Offer",
      name: "Provisionsfreier Immobilienverkauf zum Fixpreis",
      price: "12000",
      priceCurrency: "CHF",
      description:
        "Kompletter Immobilienverkauf ohne prozentuale Provision – zum transparenten Fixpreis von CHF 12'000.–.",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: site.legalName,
    inLanguage: "de-CH",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** A location-scoped service page entity. */
export function localBusinessJsonLd(loc: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/immobilienmakler/${loc.slug}/#business`,
    name: `Optimal Immobilien – Immobilienmakler ${loc.name}`,
    url: `${SITE_URL}/immobilienmakler/${loc.slug}`,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    image: `${SITE_URL}/projekte/residenz-aussenansicht-1.jpg`,
    telephone: site.phone,
    email: site.email,
    priceRange: "CHF 12'000.– Fixpreis",
    address: postalAddress,
    areaServed: { "@type": "City", name: loc.name },
    description: loc.intro,
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `${SITE_URL}${article.image}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    mainEntityOfPage: `${SITE_URL}/ratgeber/${article.slug}`,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "de-CH",
  };
}
