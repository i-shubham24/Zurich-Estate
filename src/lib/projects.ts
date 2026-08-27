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
  status: "Verfügbar" | "Reserviert" | "Verkauft" | "In Vermarktung";
  image: string;
  gallery?: string[];
  description: string;
  highlights?: string[];
  flagship?: boolean;
};

export const projects: Project[] = [
  {
    slug: "residenz-am-see",
    title: "Residenz am See, Neubau-Attika",
    location: "Region Zürichsee",
    region: "Zürichsee",
    type: "Attika · Neubau-Erstvermarktung",
    rooms: 5.5,
    area: 208,
    price: "Auf Anfrage",
    status: "In Vermarktung",
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
      "Eine architektonische Ausnahme­erscheinung in sonniger Hanglage: bodentiefe Verglasungen, ein fliessender Grundriss über zwei Ebenen und eine Attika mit weitem Blick über See und Landschaft. Erstklassiger Ausbau mit Eichenparkett, Designküche und grosszügiger Dachterrasse.",
    highlights: [
      "Unverbaubare See- und Weitsicht",
      "Bodentiefe Fenster & viel Tageslicht",
      "Attika mit umlaufender Dachterrasse",
      "Hochwertige Designküche & Eichenparkett",
      "Zwei Wohnebenen mit offener Treppe",
      "Provisionsfreie Vermarktung",
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
    price: "CHF 2'450'000",
    status: "Verfügbar",
    image: "/projekte/attika-wohnen-1.jpg",
    description:
      "Grosszügige Attika im begehrten Seefeld, hell, ruhig und nur wenige Schritte vom See entfernt.",
  },
  {
    slug: "villa-seesicht-kuesnacht",
    title: "Villa mit Seesicht",
    location: "8700 Küsnacht",
    region: "Goldküste",
    type: "Einfamilienhaus",
    rooms: 6.5,
    area: 280,
    price: "Auf Anfrage",
    status: "Verfügbar",
    image: "/projekte/residenz-aussenansicht-2.jpg",
    description:
      "Freistehende Villa an bester Goldküsten-Lage mit Panoramablick über den Zürichsee.",
  },
  {
    slug: "gartenwohnung-meilen",
    title: "Gartenwohnung am Hang",
    location: "8706 Meilen",
    region: "Goldküste",
    type: "Eigentumswohnung",
    rooms: 4.5,
    area: 132,
    price: "CHF 1'890'000",
    status: "Reserviert",
    image: "/projekte/erdgeschoss-wohnbereich.jpg",
    description:
      "Lichtdurchflutete Gartenwohnung mit eigenem Sitzplatz und Blick ins Grüne.",
  },
  {
    slug: "penthouse-kilchberg",
    title: "Penthouse mit Weitblick",
    location: "8802 Kilchberg",
    region: "Linkes Ufer",
    type: "Attika",
    rooms: 5.5,
    area: 176,
    price: "CHF 3'250'000",
    status: "Verkauft",
    image: "/projekte/obergeschoss-wohnbereich.jpg",
    description:
      "Exklusives Penthouse in Kilchberg, verkauft in nur 18 Tagen über dem Angebotspreis.",
  },
];

export const flagshipProject = projects.find((p) => p.flagship)!;
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
