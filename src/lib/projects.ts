/**
 * Property + reference-project data for /kaufen and the flagship showcase.
 * The "Residenz am See" is built from the client's own architectural renders
 * (Projekt 1513) and headlines the site as a marketing reference.
 */

export type Project = {
  slug: string;
  title: string;
  location: string;
  region: string;
  type: string;
  rooms: number;
  area: number;
  price: string;
  status: "Erfolgreich vermittelt" | "Referenzprojekt";
  image: string;
  gallery?: string[];
  description: string;
  highlights?: string[];
  flagship?: boolean;
};

export const projects: Project[] = [
  {
    slug: "residenz-am-see",
    title: "Residenz am See, 5 Exklusive Wohnungen",
    location: "Region Zürichsee",
    region: "Zürichsee",
    type: "Neubau-Erstvermarktung",
    rooms: 5.5,
    area: 208,
    price: "Preis auf Anfrage",
    status: "Referenzprojekt",
    image: "/projekte/residenz-aussenansicht-1.jpg",
    gallery: [
      "/projekte/residenz-aussenansicht-1.jpg",
      "/projekte/attika-kueche-seeblick.jpg",
      "/projekte/attika-wohnen-1.jpg",
      "/projekte/attika-wohnen-3.jpg",
      "/projekte/residenz-aussenansicht-2.jpg",
      "/projekte/obergeschoss-wohnbereich.jpg",
    ],
    description:
      "Ein herausragendes Neubauprojekt in sonniger Hanglage, bestehend aus 5 exklusiven Eigentumswohnungen. Jede Einheit besticht durch bodentiefe Verglasungen, durchdachte Grundrisse und einen erstklassigen Ausbau. Ein Paradebeispiel für unsere umfassende Expertise in der Vermarktung von hochwertigen Neubauprojekten.",
    highlights: [
      "5 individuelle Einheiten",
      "Unverbaubare See- und Weitsicht",
      "Bodentiefe Fenster & viel Tageslicht",
      "Hochwertige Designküchen & Eichenparkett",
      "Umfassende Erstvermarktung",
      "Provisionsfreie Abwicklung",
    ],
    flagship: true,
  },
  {
    slug: "attikawohnung-seefeld",
    title: "Moderne Attikawohnung im Seefeld",
    location: "8008 Zürich Seefeld",
    region: "Stadt Zürich",
    type: "Eigentumswohnung",
    rooms: 4.5,
    area: 145,
    price: "Preis auf Anfrage",
    status: "Erfolgreich vermittelt",
    image: "/projekte/attika-wohnen-1.jpg",
    description:
      "Grosszügige Attika im begehrten Seefeld. Ein hervorragendes Beispiel unserer schnellen und diskreten Immobilienvermittlung in der Stadt Zürich.",
  },
  {
    slug: "villa-seesicht-kuesnacht",
    title: "Villa mit Seesicht",
    location: "8700 Küsnacht",
    region: "Goldküste",
    type: "Einfamilienhaus",
    rooms: 6.5,
    area: 280,
    price: "Preis auf Anfrage",
    status: "Erfolgreich vermittelt",
    image: "/projekte/residenz-aussenansicht-2.jpg",
    description:
      "Freistehende Villa an bester Goldküsten-Lage mit Panoramablick über den Zürichsee. Erfolgreich über dem Marktwert vermittelt.",
  },
];

export const flagshipProject = projects.find((p) => p.flagship)!;
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
