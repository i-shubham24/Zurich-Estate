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
  rooms: number | string;
  area: number | string;
  price: string;
  status: "Kürzlich erfolgreich vermittelt" | "Referenzprojekt";
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
      "/projekte/attika-wohnen-3.jpg",
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
    slug: "neubau-nuerensdorf",
    title: "Neubauprojekt Nürensdorf",
    location: "8309 Nürensdorf",
    region: "Zürcher Unterland",
    type: "Neubau-Erstvermarktung",
    rooms: "3 Einheiten",
    area: "Auf Anfrage",
    price: "Erfolgreich verkauft",
    status: "Kürzlich erfolgreich vermittelt",
    image: "/locations/heavy-construction.jpg",
    gallery: [
      "/locations/heavy-construction.jpg",
    ],
    description:
      "In Nürensdorf entsteht ein moderner Neubau mit 3 hochwertigen Eigentumswohnungen. Das Projekt befindet sich derzeit in der Bauphase und nimmt mit den laufenden Aushubarbeiten erste sichtbare Formen an. Bereits in diesem frühen Stadium sind alle Einheiten erfolgreich verkauft worden. Ein grosser Meilenstein, während das Projekt noch im Bau ist.",
    highlights: [
      "Neubauprojekt mit 3 Eigentumswohnungen",
      "Vollständig verkauft während der Bauphase",
      "Bau- und Aushubarbeiten derzeit im Gange",
      "Attraktive Lage in Nürensdorf",
      "Erfolgreich vermarktet vor Fertigstellung",
      "Professioneller Verkaufsprozess",
    ],
  },
  {
    slug: "neubau-birchwil",
    title: "Neubauprojekt Birchwil",
    location: "Birchwil / Nürensdorf",
    region: "Zürcher Unterland",
    type: "Neubau-Erstvermarktung",
    rooms: "3 Einheiten",
    area: "Auf Anfrage",
    price: "Erfolgreich verkauft",
    status: "Kürzlich erfolgreich vermittelt",
    image: "/projekte/obergeschoss-wohnbereich.jpg",
    gallery: [
      "/projekte/obergeschoss-wohnbereich.jpg",
      "/projekte/attika-wohnen-1.jpg",
      "/projekte/erdgeschoss-wohnbereich.jpg",
    ],
    description:
      "In Birchwil entsteht ein exklusiver Neubau mit 3 individuell gestalteten Eigentumswohnungen. Das Projekt befindet sich derzeit in der Bauphase und verbindet moderne Architektur mit grosszügigen Wohnkonzepten und einem hochwertigen Ausbau. Alle Einheiten wurden von uns während der Bauphase erfolgreich verkauft.\n\nDie Wohnungen umfassen eine exklusive Attikawohnung, eine grosszügige 3.5-Zimmer-Wohnung im mittleren Geschoss und eine 4.5-Zimmer-Gartenwohnung mit privatem Aussenbereich.",
    highlights: [
      "Neubauprojekt mit 3 Eigentumswohnungen",
      "Exklusive Attikawohnung",
      "Grosszügige 3.5-Zimmer-Wohnung",
      "4.5-Zimmer-Gartenwohnung",
      "Moderne Architektur und hochwertiger Ausbau",
      "Vollständig von uns verkauft während der Bauphase",
    ],
  },
];

export const flagshipProject = projects.find((p) => p.flagship)!;
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
