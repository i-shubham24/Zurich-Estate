/**
 * Property + reference-project data for /kaufen and the flagship showcase.
 * Integrates client's authentic architectural renders, floor plans (Grundrisse),
 * and real on-site construction documentation.
 */

export type FloorplanItem = {
  title: string;
  image: string;
  badge?: string;
  rooms?: string;
  area?: string;
  outdoor?: string;
  features?: string[];
};

export type ConstructionImage = {
  src: string;
  caption: string;
};

export type ConstructionUpdate = {
  title: string;
  stage: string;
  statusBadge: string;
  description: string;
  images: ConstructionImage[];
};

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
  floorplans?: FloorplanItem[];
  constructionUpdates?: ConstructionUpdate;
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
      "/projekte/residenz-aussenansicht-2.jpg",
      "/projekte/attika-kueche-seeblick.jpg",
      "/projekte/attika-wohnen-1.jpg",
      "/projekte/attika-wohnen-2.jpg",
      "/projekte/attika-wohnen-3.jpg",
      "/projekte/erdgeschoss-wohnbereich.jpg",
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
    slug: "neubau-birchwil",
    title: "Neubauprojekt Birchwil",
    location: "Birchwil / Nürensdorf",
    region: "Zürcher Unterland",
    type: "Neubau-Erstvermarktung",
    rooms: "3 Einheiten (3.5 – 4.5 Zi.)",
    area: "135 – 195 m²",
    price: "Erfolgreich verkauft",
    status: "Kürzlich erfolgreich vermittelt",
    image: "/projekte/birchwil-pool-skizze.jpg",
    gallery: [
      "/projekte/birchwil-pool-skizze.jpg",
      "/projekte/birchwil-fassade-visualisierung.jpg",
      "/projekte/birchwil-grundriss-eg.png",
      "/projekte/obergeschoss-wohnbereich.jpg",
      "/projekte/attika-wohnen-1.jpg",
      "/projekte/erdgeschoss-wohnbereich.jpg",
    ],
    floorplans: [
      {
        title: "Grundriss Erdgeschoss · 4.5-Zimmer-Gartenwohnung",
        image: "/projekte/birchwil-grundriss-eg.png",
        badge: "Erdgeschoss / Gartenresidenz",
        rooms: "4.5 Zimmer",
        area: "ca. 142 m² Wohnfläche",
        outdoor: "ca. 38 m² Sitzplatz & privater Gartenanteil",
        features: [
          "Grosszügiger Wohn- und Essbereich mit offener Premium-Küche",
          "Direkter Austritt zu überdachtem Sitzplatz und privatem Garten",
          "Master-Suite mit integriertem En-Suite-Bad",
          "Zusätzliches Komfort-Badezimmer mit bodenebener Regendusche",
          "Privater Hauswirtschaftsraum / Reduit mit eigenem Waschturm",
          "Raumhohe Panorama-Verglasung für maximalen Lichteinfall",
        ],
      },
    ],
    description:
      "In Birchwil entsteht ein architektonisch exklusiver Neubau mit 3 individuell gestalteten Eigentumswohnungen. Das Projekt verbindet moderne Schweizer Holz- und Betonarchitektur mit grosszügigen, lichtdurchfluteten Grundrissen und höchster Ausbauqualität. Alle Einheiten wurden von uns bereits während der Bauphase vollständig vermittelt.\n\nDas Gebäude umfasst eine luxuriöse Attikawohnung mit Weitsicht-Terrasse, eine grosszügige 3.5-Zimmer-Etagenwohnung sowie eine 4.5-Zimmer-Gartenwohnung mit privatem Aussenbereich und gedecktem Sitzplatz.",
    highlights: [
      "3 exklusive Eigentumswohnungen",
      "Attikawohnung mit grosszügiger Sonnenterrasse",
      "4.5-Zimmer-Gartenwohnung mit privatem Umschwung",
      "Durchdachte Grundrisse & bodentiefe Fenster",
      "Nachhaltige Architektur & erstklassige Materialisierung",
      "100 % vor Baubeginn erfolgreich beurkundet",
    ],
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
    image: "/projekte/nuerensdorf-baustelle-uebersicht.jpg",
    gallery: [
      "/projekte/nuerensdorf-baustelle-uebersicht.jpg",
      "/projekte/nuerensdorf-baustelle-kran.jpg",
      "/projekte/nuerensdorf-baustelle-bauwerk.jpg",
    ],
    constructionUpdates: {
      title: "Aktueller Baufortschritt vor Ort",
      stage: "Rohbau- & Aushubphase",
      statusBadge: "100 % vermittelt während der Bauphase",
      description:
        "Die Bauarbeiten in Nürensdorf schreiten zügig voran. Nach dem erfolgreichen Aushub und der Sicherung der Baugrube wird derzeit das Fundament und der Rohbau der Wohneinheiten errichtet. Bereits vor Baubeginn waren alle drei Wohneinheiten durch Optimal Immobilien AG vollständig notariell beurkundet.",
      images: [
        {
          src: "/projekte/nuerensdorf-baustelle-uebersicht.jpg",
          caption: "Baufeld & Hanglage Nürensdorf mit Blick ins Grüne",
        },
        {
          src: "/projekte/nuerensdorf-baustelle-kran.jpg",
          caption: "Kran- und Schalungsarbeiten für die Untergeschosse",
        },
        {
          src: "/projekte/nuerensdorf-baustelle-bauwerk.jpg",
          caption: "Rohbau-Struktur und Fundamentierung",
        },
      ],
    },
    description:
      "In Nürensdorf entsteht ein moderner Neubau mit 3 hochwertigen Eigentumswohnungen. Das Projekt befindet sich derzeit in der Bauphase und nimmt mit den laufenden Aushub- und Rohbauarbeiten erste sichtbare Formen an. Bereits in diesem frühen Stadium sind alle Einheiten erfolgreich verkauft und beurkundet worden. Ein Meilenstein für die professionelle Vermarktung von Neubauprojekten direkt ab Plan.",
    highlights: [
      "Neubauprojekt mit 3 Eigentumswohnungen",
      "Vollständig verkauft während der Bauphase",
      "Bau- und Aushubarbeiten derzeit im Gange",
      "Attraktive Lage in Nürensdorf",
      "Erfolgreich vermarktet vor Fertigstellung",
      "Professioneller Verkaufsprozess",
    ],
  },
];

export const flagshipProject = projects.find((p) => p.flagship)!;
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
