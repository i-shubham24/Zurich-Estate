/**
 * Location dataset powering the programmatic local landing pages
 * /immobilienmakler/[ort]. Each entry carries genuinely distinct local copy
 * (intro, market note, neighbourhoods, FAQ) so the pages earn rankings for
 * "Immobilienmakler <Ort>" rather than reading as thin doorway pages.
 */

export type LocationFaq = { q: string; a: string };

export type Location = {
  slug: string;
  name: string;
  regionLabel: string;
  plz: string;
  lakeside: boolean;
  heroImage?: string;
  /** Short hero descriptor */
  headline: string;
  /** 2-3 sentence unique intro */
  intro: string;
  /** Local market context */
  market: string;
  /** Why sell with Optimal here */
  whyHere: string;
  /** Quarters / hamlets / streets that add local texture */
  neighborhoods: string[];
  /** Slugs of neighbouring towns for internal linking */
  nearby: string[];
  faq: LocationFaq[];
  /** Show on the home-page coverage grid */
  featured?: boolean;
};

export const locations: Location[] = [
  {
    slug: "zuerich",
    heroImage: "/locations/zurich-panorama-2.jpg",
    name: "Zürich",
    regionLabel: "Stadt Zürich",
    plz: "8001, 8064",
    lakeside: true,
    headline: "Ihr Immobilienmakler für die Stadt Zürich",
    intro:
      "Vom Seefeld bis zum Zürichberg, von der Enge bis nach Wollishofen: Der Zürcher Stadtmarkt ist der kompetitivste der Schweiz, und einer der undurchsichtigsten für Verkäufer. Wir bringen Transparenz in Ihren Verkauf und den Höchstpreis auf Ihr Konto, ohne dass Sie prozentuale Provision zahlen.",
    market:
      "In der Stadt Zürich liegen die Quadratmeterpreise für Eigentumswohnungen je nach Kreis zwischen rund CHF 14'000 und über CHF 22'000. Objekte in guter Lage sind chronisch knapp, wer richtig positioniert und inszeniert, erzielt regelmässig ein Bieterergebnis über dem Angebotspreis.",
    whyHere:
      "Wir kennen die Mikrolagen jedes Kreises und vermarkten Ihr Objekt gezielt an geprüfte, kaufkräftige Interessenten, diskret und ohne unnötige Massenbesichtigungen.",
    neighborhoods: ["Seefeld", "Enge", "Wollishofen", "Zürichberg", "Witikon", "Höngg"],
    nearby: ["zollikon", "kilchberg", "kuesnacht", "duebendorf"],
    faq: [
      {
        q: "Was kostet ein Immobilienmakler in Zürich?",
        a: "Bei klassischen Maklern zahlen Sie in Zürich meist 2 bis 3 % des Verkaufspreises plus MwSt. Bei Optimal Immobilien verkaufen Sie provisionsfrei zum Fixpreis von CHF 12'000, bei einem Objekt von CHF 2 Mio. sparen Sie so schnell CHF 40'000 und mehr.",
      },
      {
        q: "Wie lange dauert ein Immobilienverkauf in der Stadt Zürich?",
        a: "In gefragten Kreisen wie 8008 (Seefeld) oder 8002 (Enge) sind gut vorbereitete Objekte oft innert weniger Wochen verkauft. Entscheidend sind eine korrekte Bewertung, professionelle Fotos und die gezielte Ansprache vorgemerkter Käufer.",
      },
    ],
    featured: true,
  },
  {
    slug: "kuesnacht",
    heroImage: "/locations/mega-mansion.jpg",
    name: "Küsnacht",
    regionLabel: "Zürcher Goldküste",
    plz: "8700",
    lakeside: true,
    headline: "Immobilienmakler an der Goldküste, Küsnacht",
    intro:
      "Küsnacht ZH gehört zu den begehrtesten Wohnlagen der Schweiz. Zwischen Seeufer und Forch treffen sonnenverwöhnte Hanglagen, Steuervorteile und internationale Nachfrage aufeinander. Genau hier zahlt sich eine Vermarktung aus, die den maximalen Preis herausholt, ohne Provision.",
    market:
      "An der Goldküste werden für Villen und Seesicht-Liegenschaften regelmässig zweistellige Millionenbeträge erzielt. Der Käuferkreis ist international und diskret, Off Market-Vermarktung ist hier oft der Schlüssel zum Bestpreis.",
    whyHere:
      "Wir vermarkten Küsnachter Objekte über ein Netzwerk geprüfter Kaufinteressenten und diskrete Kanäle, nicht über anonyme Massenportale.",
    neighborhoods: ["Küsnacht Dorf", "Itschnach", "Goldbach", "Heslibach", "Forch"],
    nearby: ["zollikon", "erlenbach", "zumikon", "herrliberg"],
    faq: [
      {
        q: "Lohnt sich ein provisionsfreier Verkauf auch bei teuren Objekten in Küsnacht?",
        a: "Gerade dort. Bei einem Verkaufspreis von CHF 5 Mio. betragen klassische 3 % Provision CHF 150'000. Bei Optimal zahlen Sie den Fixpreis von CHF 12'000, die gesamte Differenz bleibt bei Ihnen.",
      },
      {
        q: "Verkaufen Sie auch diskret / Off Market in Küsnacht?",
        a: "Ja. Auf Wunsch vermarkten wir Ihre Liegenschaft vollständig diskret an einen ausgewählten Kreis solventer Interessenten, ohne öffentliches Inserat.",
      },
    ],
    featured: true,
  },
  {
    slug: "zollikon",
    heroImage: "/locations/swiss-waterfront.jpg",
    name: "Zollikon",
    regionLabel: "Zürcher Goldküste",
    plz: "8702",
    lakeside: true,
    headline: "Immobilienmakler Zollikon",
    intro:
      "Zollikon verbindet Stadtnähe mit Goldküsten-Charme: In wenigen Minuten ist man im Zürcher Seefeld, und doch geniesst man Seesicht, tiefe Steuern und ruhige Wohnquartiere. Eigentum ist hier rar, umso wichtiger ist eine Vermarktung, die den vollen Wert ausschöpft.",
    market:
      "Zollikon und Zollikerberg zählen zu den steuergünstigsten und teuersten Gemeinden im Kanton. Freistehende Häuser mit Seeblick erreichen Spitzenpreise; die Nachfrage übersteigt das Angebot deutlich.",
    whyHere:
      "Wir positionieren Ihr Objekt in Zollikon so, dass es die zahlungskräftigsten Käufer erreicht, und begleiten Sie von der Bewertung bis zur Beurkundung.",
    neighborhoods: ["Zollikon Dorf", "Zollikerberg", "Rüterwis", "Buechholz"],
    nearby: ["kuesnacht", "zuerich", "zumikon", "erlenbach"],
    faq: [
      {
        q: "Wie bewerten Sie eine Liegenschaft in Zollikon?",
        a: "Wir kombinieren aktuelle Transaktionsdaten aus Zollikon und Zollikerberg mit einer Vor-Ort-Einschätzung von Lage, Zustand und Ausbaustandard. Die Ersteinschätzung ist kostenlos und unverbindlich.",
      },
      {
        q: "Betreuen Sie auch den Zollikerberg?",
        a: "Selbstverständlich, wir sind für ganz Zollikon inklusive Zollikerberg tätig.",
      },
    ],
    featured: true,
  },
  {
    slug: "zumikon",
    heroImage: "/locations/curved-apartments.jpg",
    name: "Zumikon",
    regionLabel: "Zürcher Goldküste",
    plz: "8126",
    lakeside: false,
    headline: "Immobilienmakler Zumikon",
    intro:
      "Zumikon steht für grosszügige Einfamilienhäuser, viel Grün und familienfreundliche Ruhe, bei hervorragender Anbindung an die Stadt über die Forchbahn. Wer hier verkauft, verkauft an Familien und Selbständige mit hohen Ansprüchen.",
    market:
      "Der Markt in Zumikon ist geprägt von grossen Grundstücken und exklusiven Neubauten. Objekte mit Weitsicht und moderner Architektur erzielen deutliche Aufschläge gegenüber dem Standard.",
    whyHere:
      "Wir inszenieren Ihr Haus in Zumikon so, dass sein Lebensgefühl spürbar wird, und erzielen so den Preis, den die Lage verdient.",
    neighborhoods: ["Zumikon Dorf", "Waltikon", "Chapf"],
    nearby: ["zollikon", "kuesnacht", "zuerich"],
    faq: [
      {
        q: "Was macht den Immobilienmarkt in Zumikon besonders?",
        a: "Die Kombination aus grossen Parzellen, tiefer Steuerbelastung und Nähe zur Stadt Zürich. Familien zahlen für das richtige Objekt gerne einen Aufpreis, vorausgesetzt, es wird professionell präsentiert.",
      },
      {
        q: "Verkaufen Sie in Zumikon wirklich ohne Provision?",
        a: "Ja. Sie zahlen den transparenten Fixpreis von CHF 12'000 statt einer prozentualen Provision, unabhängig vom Verkaufspreis.",
      },
    ],
    featured: false,
  },
  {
    slug: "meilen",
    heroImage: "/locations/luxury-chalet.jpg",
    name: "Meilen",
    regionLabel: "Zürcher Goldküste",
    plz: "8706",
    lakeside: true,
    headline: "Immobilienmakler Meilen",
    intro:
      "Meilen ist das Herz der oberen Goldküste, mit direktem Seezugang, Rebbergen und einer wachsenden, kaufkräftigen Nachfrage. Zwischen Feldmeilen und Obermeilen entsteht laufend hochwertiger Neubau, der überregional Interessenten anzieht.",
    market:
      "In Meilen reichen die Preise von soliden Eigentumswohnungen bis zu Seeliegenschaften im zweistelligen Millionenbereich. Neubauprojekte am Hang mit Seesicht sind besonders gefragt.",
    whyHere:
      "Ob Bestand oder Neubau: Wir vermarkten in Meilen mit hochwertigen Visualisierungen und gezieltem Zugang zu vorgemerkten Käufern.",
    neighborhoods: ["Feldmeilen", "Obermeilen", "Dorfkern", "Tobel"],
    nearby: ["herrliberg", "erlenbach", "uster"],
    faq: [
      {
        q: "Vermarkten Sie auch Neubauprojekte in Meilen?",
        a: "Ja. Wir begleiten Bauträger und Eigentümer von der Erstvermarktung über professionelle Renderings bis zum Verkauf einzelner Einheiten.",
      },
      {
        q: "Wie erreichen Sie Käufer für Seeliegenschaften in Meilen?",
        a: "Über eine Kombination aus diskreter Direktansprache, unserem Interessentenpool und gezielter Online-Vermarktung an internationale Käufer.",
      },
    ],
    featured: true,
  },
  {
    slug: "herrliberg",
    heroImage: "/locations/mansion-topdown.jpg",
    name: "Herrliberg",
    regionLabel: "Zürcher Goldküste",
    plz: "8704",
    lakeside: true,
    headline: "Immobilienmakler Herrliberg",
    intro:
      "Herrliberg gilt als eine der exklusivsten Wohngemeinden am rechten Zürichseeufer, sonnige Hanglagen, unverbaute Seesicht und absolute Ruhe. Verkäufe sind hier selten und entsprechend gefragt.",
    market:
      "Die Nachfrage nach Herrliberger Liegenschaften ist konstant hoch, das Angebot minimal. Für Objekte mit Seesicht werden Spitzenpreise bezahlt, Diskretion ist im Verkaufsprozess oft entscheidend.",
    whyHere:
      "Wir verkaufen in Herrliberg mit dem nötigen Feingefühl für hochpreisige, private Transaktionen, und maximaler Preisdurchsetzung.",
    neighborhoods: ["Herrliberg Dorf", "Wetzwil", "Schipf"],
    nearby: ["meilen", "erlenbach", "kuesnacht"],
    faq: [
      {
        q: "Warum sind Objekte in Herrliberg so gefragt?",
        a: "Steilhang-Lagen mit unverbaubarer Seesicht, tiefe Steuern und Seltenheitswert. Wer hier verkauft, verhandelt aus einer starken Position, wir sorgen dafür, dass diese Position voll ausgeschöpft wird.",
      },
      {
        q: "Ist ein diskreter Verkauf in Herrliberg möglich?",
        a: "Ja, Off Market-Verkäufe sind hier besonders verbreitet. Wir vermitteln gezielt an einen ausgewählten, geprüften Käuferkreis.",
      },
    ],
    featured: false,
  },
  {
    slug: "erlenbach",
    heroImage: "/locations/alpine-chalet.jpg",
    name: "Erlenbach",
    regionLabel: "Zürcher Goldküste",
    plz: "8703",
    lakeside: true,
    headline: "Immobilienmakler Erlenbach",
    intro:
      "Erlenbach ZH ist klein, exklusiv und begehrt: direkter Seeanschluss, kurze Wege nach Zürich und eine der schönsten Uferpromenaden der Goldküste. Eigentum wechselt hier selten die Hand, umso wichtiger ist eine erstklassige Vermarktung.",
    market:
      "Von der modernen Eigentumswohnung bis zur Ufervilla: Erlenbach deckt das obere Preissegment ab. Lage und Seesicht bestimmen den Preis stärker als anderswo.",
    whyHere:
      "Wir kennen die Erlenbacher Mikrolagen und positionieren Ihr Objekt exakt dort, wo die zahlungskräftigsten Käufer suchen.",
    neighborhoods: ["Erlenbach Dorf", "Winkel", "Rank"],
    nearby: ["kuesnacht", "herrliberg", "zollikon"],
    faq: [
      {
        q: "Wie schnell verkaufen sich Objekte in Erlenbach?",
        a: "Gut positionierte Liegenschaften an dieser Lage finden meist rasch Käufer. Entscheidend ist eine realistische, datenbasierte Preisstrategie von Beginn an.",
      },
      {
        q: "Was sparen Verkäufer in Erlenbach mit dem Fixpreis?",
        a: "Bei einem Verkaufspreis von CHF 4 Mio. liegt die klassische 3 % Provision bei CHF 120'000. Mit dem Fixpreis von CHF 12'000 bleibt dieser Betrag fast vollständig bei Ihnen.",
      },
    ],
    featured: false,
  },
  {
    slug: "kilchberg",
    heroImage: "/locations/heavy-construction.jpg",
    name: "Kilchberg",
    regionLabel: "Linkes Zürichseeufer",
    plz: "8802",
    lakeside: true,
    headline: "Immobilienmakler Kilchberg",
    intro:
      "Kilchberg am linken Seeufer verbindet Stadtnähe, tiefe Steuern und Seelage, nur wenige Minuten vom Zürcher Zentrum entfernt. Die Gemeinde ist bei Familien und Führungskräften gleichermassen beliebt.",
    market:
      "Kilchberg zählt zu den steuergünstigsten Gemeinden am See. Eigentum ist begehrt und knapp; hochwertige Objekte erzielen konstant starke Preise.",
    whyHere:
      "Wir vermarkten Ihre Liegenschaft in Kilchberg zielgerichtet und provisionsfrei, mit voller Preistransparenz.",
    neighborhoods: ["Kilchberg Dorf", "Bendlikon", "Hornhaldenstrasse"],
    nearby: ["thalwil", "zuerich", "horgen"],
    faq: [
      {
        q: "Warum ist Kilchberg als Wohnort so attraktiv?",
        a: "Die Kombination aus tiefer Steuerbelastung, Seelage und der Nähe zur Stadt Zürich macht Kilchberg zu einer Top-Adresse am linken Ufer.",
      },
      {
        q: "Bewerten Sie mein Haus in Kilchberg kostenlos?",
        a: "Ja, die Ersteinschätzung des Marktwerts ist kostenlos und unverbindlich, vor Ort oder auf Basis Ihrer Objektdaten.",
      },
    ],
    featured: false,
  },
  {
    slug: "thalwil",
    heroImage: "/locations/bern-clock-tower.jpg",
    name: "Thalwil",
    regionLabel: "Linkes Zürichseeufer",
    plz: "8800",
    lakeside: true,
    headline: "Immobilienmakler Thalwil",
    intro:
      "Thalwil ist der lebendige Knotenpunkt des linken Seeufers: hervorragende Bahnanbindung, Seezugang und ein gesunder Mix aus Eigentumswohnungen und Einfamilienhäusern. Ein Markt mit stabiler, breiter Nachfrage.",
    market:
      "Von der Familienwohnung bis zum Hausobjekt mit Seesicht bietet Thalwil ein breites Spektrum. Die gute Erreichbarkeit von Zürich hält die Nachfrage konstant hoch.",
    whyHere:
      "Wir treffen in Thalwil den richtigen Preis und die richtige Zielgruppe, vom Ersterwerber bis zur investierenden Familie.",
    neighborhoods: ["Thalwil Zentrum", "Gattikon", "Ludretikon", "Oberdorf"],
    nearby: ["kilchberg", "horgen", "zuerich"],
    faq: [
      {
        q: "Wie ist der Immobilienmarkt in Thalwil?",
        a: "Breit und stabil: Thalwil zieht Familien wie Pendler an. Gut geschnittene Wohnungen und Häuser mit Aussicht sind besonders gefragt.",
      },
      {
        q: "Fallen bei Optimal versteckte Kosten an?",
        a: "Nein. Sie zahlen ausschliesslich den Fixpreis von CHF 12'000, Fotos, Vermarktung und Beratung sind darin enthalten.",
      },
    ],
    featured: false,
  },
  {
    slug: "horgen",
    heroImage: "/locations/luxury-construction.jpg",
    name: "Horgen",
    regionLabel: "Linkes Zürichseeufer",
    plz: "8810",
    lakeside: true,
    headline: "Immobilienmakler Horgen",
    intro:
      "Horgen ist eine der grössten Seegemeinden am linken Ufer, mit Zentrumsfunktion, Seezugang und einem vielfältigen Wohnungsmarkt. Hier verkaufen Sie an eine breite, kaufkräftige Nachfrage.",
    market:
      "Horgen bietet vom Neubau am Hang bis zum charmanten Altbau alles. Die Preise sind im Vergleich zur oberen Goldküste moderater, die Nachfrage jedoch robust.",
    whyHere:
      "Wir verkaufen in Horgen datenbasiert und zielgerichtet, mit einer Preisstrategie, die den Markt trifft.",
    neighborhoods: ["Horgen Zentrum", "Käpfnach", "Horgenberg", "Arn"],
    nearby: ["thalwil", "waedenswil", "kilchberg"],
    faq: [
      {
        q: "Welche Objekte verkaufen sich in Horgen am besten?",
        a: "Moderne Eigentumswohnungen mit Seesicht und gut unterhaltene Einfamilienhäuser. Entscheidend sind Präsentation und ein marktgerechter Startpreis.",
      },
      {
        q: "Wie starte ich den Verkauf in Horgen?",
        a: "Mit unserer kostenlosen Bewertung. Danach erstellen wir eine Vermarktungsstrategie und starten, provisionsfrei zum Fixpreis.",
      },
    ],
    featured: false,
  },
  {
    slug: "waedenswil",
    heroImage: "/locations/city-street.jpg",
    name: "Wädenswil",
    regionLabel: "Linkes Zürichseeufer",
    plz: "8820",
    lakeside: true,
    headline: "Immobilienmakler Wädenswil",
    intro:
      "Wädenswil überzeugt mit Seelage, Hochschulstandort und wachsender Attraktivität für Familien. Die Gemeinde entwickelt sich dynamisch, ein guter Zeitpunkt, um den Wert Ihrer Immobilie professionell zu realisieren.",
    market:
      "Wädenswil bietet noch vergleichsweise attraktive Einstiegspreise am See, bei steigender Nachfrage. Neubauprojekte und sanierte Objekte erzielen deutliche Aufschläge.",
    whyHere:
      "Wir zeigen in Wädenswil das Potenzial Ihres Objekts auf und holen mit gezielter Vermarktung den Bestpreis heraus.",
    neighborhoods: ["Wädenswil Zentrum", "Au", "Giessen", "Hangenmoos"],
    nearby: ["horgen", "thalwil"],
    faq: [
      {
        q: "Lohnt sich der Verkauf in Wädenswil aktuell?",
        a: "Die Nachfrage steigt mit der Entwicklung der Gemeinde. Eine professionelle Bewertung zeigt Ihnen, welchen Preis Ihr Objekt heute realistisch erzielt.",
      },
      {
        q: "Übernehmen Sie die komplette Vermarktung?",
        a: "Ja, von Fotos und Exposé über Besichtigungen bis zur Vertragsabwicklung. Sie haben einen festen Ansprechpartner.",
      },
    ],
    featured: false,
  },
  {
    slug: "uster",
    heroImage: "/locations/zurich-river.jpg",
    name: "Uster",
    regionLabel: "Zürcher Oberland",
    plz: "8610",
    lakeside: false,
    headline: "Immobilienmakler Uster",
    intro:
      "Uster ist die drittgrösste Stadt im Kanton Zürich und das Zentrum des Zürcher Oberlands, grün, familienfreundlich und mit direkter S-Bahn-Anbindung an die Stadt. Ein Markt mit hoher, verlässlicher Nachfrage.",
    market:
      "Uster bietet ein breites Angebot vom Reihenhaus bis zur Eigentumswohnung am Greifensee. Familien schätzen das Preis-Leistungs-Verhältnis gegenüber der Seeregion.",
    whyHere:
      "Wir vermarkten in Uster mit klarer Zielgruppenansprache und erzielen so den optimalen Preis, ohne Provision.",
    neighborhoods: ["Uster Zentrum", "Nänikon", "Werrikon", "Nossikon", "Riedikon"],
    nearby: ["duebendorf", "meilen"],
    faq: [
      {
        q: "Wer kauft Immobilien in Uster?",
        a: "Überwiegend Familien und Pendler, die Raum, Grün und eine gute Anbindung suchen. Objekte in der Nähe des Greifensees sind besonders beliebt.",
      },
      {
        q: "Wie realistisch ist der Fixpreis für Uster-Objekte?",
        a: "Sehr. Gerade im mittleren Preissegment ist der Fixpreis von CHF 12'000 oft günstiger als jede prozentuale Provision.",
      },
    ],
    featured: false,
  },
  {
    slug: "duebendorf",
    heroImage: "/locations/bern-fountain.jpg",
    name: "Dübendorf",
    regionLabel: "Glattal",
    plz: "8600",
    lakeside: false,
    headline: "Immobilienmakler Dübendorf",
    intro:
      "Dübendorf im Glattal ist einer der dynamischsten Standorte der Region Zürich, stadtnah, wirtschaftsstark und im Wandel. Für Verkäufer bedeutet das: eine breite, aktive Käuferschaft.",
    market:
      "Rund um das Innovationsareal und die gute Verkehrsanbindung wächst die Nachfrage. Eigentumswohnungen und Häuser wechseln zügig die Hand, wenn Preis und Präsentation stimmen.",
    whyHere:
      "Wir kennen die Glattal-Nachfrage und positionieren Ihr Objekt in Dübendorf so, dass es rasch und zum Bestpreis verkauft.",
    neighborhoods: ["Dübendorf Zentrum", "Gfenn", "Hochbord", "Stettbach"],
    nearby: ["wallisellen", "uster", "zuerich"],
    faq: [
      {
        q: "Wie entwickelt sich der Markt in Dübendorf?",
        a: "Positiv, die wirtschaftliche Entwicklung im Glattal und die Stadtnähe treiben die Nachfrage. Das ist ein günstiges Umfeld für Verkäufer.",
      },
      {
        q: "Kann ich mein Objekt in Dübendorf online bewerten lassen?",
        a: "Ja, starten Sie mit unserer kostenlosen Online-Ersteinschätzung, in unter zwei Minuten.",
      },
    ],
    featured: false,
  },
  {
    slug: "wallisellen",
    heroImage: "/locations/swiss-village.jpg",
    name: "Wallisellen",
    regionLabel: "Glattal",
    plz: "8304",
    lakeside: false,
    headline: "Immobilienmakler Wallisellen",
    intro:
      "Wallisellen ist Einkaufs- und Wirtschaftszentrum des Glattals, mit Glattzentrum, Richti-Areal und exzellenter �-V-Anbindung. Urbanes Wohnen bei kurzer Distanz zur Stadt zieht eine junge, kaufkräftige Nachfrage an.",
    market:
      "Moderne Eigentumswohnungen im Richti-Quartier und gepflegte Häuser sind gefragt. Die Nähe zu Flughafen und Stadt macht Wallisellen für Berufstätige attraktiv.",
    whyHere:
      "Wir vermarkten in Wallisellen mit dem richtigen Gespür für urbane Käufer, provisionsfrei und transparent.",
    neighborhoods: ["Wallisellen Zentrum", "Richti", "Rieden", "Herti"],
    nearby: ["duebendorf", "kloten", "zuerich"],
    faq: [
      {
        q: "Welche Objekte sind in Wallisellen besonders gefragt?",
        a: "Moderne Neubauwohnungen mit guter Anbindung, etwa im Richti-Areal. Aber auch Einfamilienhäuser in den ruhigeren Quartieren finden rasch Käufer.",
      },
      {
        q: "Wie hoch ist die Provision bei Optimal?",
        a: "Es gibt keine prozentuale Provision, nur den Fixpreis von CHF 12'000 für den kompletten Verkauf.",
      },
    ],
    featured: false,
  },
  {
    slug: "bassersdorf",
    heroImage: "/locations/zurich-limmat.jpg",
    name: "Bassersdorf",
    regionLabel: "Zürcher Unterland",
    plz: "8303",
    lakeside: false,
    headline: "Ihr lokaler Immobilienmakler in Bassersdorf",
    intro:
      "Bassersdorf ist unser Zuhause: Von hier aus betreuen wir Eigentümerinnen und Eigentümer im ganzen Zürcher Unterland. Kein anderer Makler kennt den lokalen Markt besser, und keiner ist schneller vor Ort.",
    market:
      "Das Unterland punktet mit Flughafennähe, familienfreundlichen Gemeinden und moderaten Preisen gegenüber der Seeregion. Die Nachfrage von Familien und Pendlern ist stabil hoch.",
    whyHere:
      "Als ansässiger Makler sind wir in Bassersdorf, Nürensdorf und Umgebung schnell zur Stelle, mit lokalem Wissen und persönlicher Betreuung.",
    neighborhoods: ["Bassersdorf Dorf", "Baltenswil", "Birchwil", "Nürensdorf"],
    nearby: ["kloten", "wallisellen", "duebendorf"],
    faq: [
      {
        q: "Warum ist Optimal Immobilien in Bassersdorf besonders stark?",
        a: "Weil hier unser Büro ist. Wir kennen jede Strasse, jedes Quartier und die lokale Nachfrage, und sind für Besichtigungen und Beratung sofort vor Ort.",
      },
      {
        q: "Betreuen Sie das ganze Zürcher Unterland?",
        a: "Ja, von Bassersdorf über Kloten und Nürensdorf bis Bülach und Umgebung.",
      },
    ],
    featured: true,
  },
  {
    slug: "kloten",
    heroImage: "/locations/city-fountain.jpg",
    name: "Kloten",
    regionLabel: "Zürcher Unterland",
    plz: "8302",
    lakeside: false,
    headline: "Immobilienmakler Kloten",
    intro:
      "Kloten ist geprägt vom Flughafen Zürich, wirtschaftsstark, gut erschlossen und mit stabiler Wohnnachfrage. Für Verkäufer ein verlässlicher Markt mit breiter Käuferschaft.",
    market:
      "Die Flughafennähe sorgt für konstante Nachfrage von Berufstätigen und internationalen Käufern. Eigentumswohnungen und Häuser in ruhigeren Lagen sind besonders gefragt.",
    whyHere:
      "Als Makler aus dem Unterland kennen wir Kloten genau und vermarkten Ihr Objekt schnell, lokal und provisionsfrei.",
    neighborhoods: ["Kloten Zentrum", "Rieden", "Balsberg", "Gerlisberg"],
    nearby: ["bassersdorf", "wallisellen"],
    faq: [
      {
        q: "Ist die Flughafennähe ein Vor- oder Nachteil beim Verkauf?",
        a: "Meist ein Vorteil: Sie sorgt für Arbeitsplätze und konstante Nachfrage. In ruhigeren Quartieren spielt der Fluglärm eine untergeordnete Rolle, wir positionieren Ihr Objekt entsprechend.",
      },
      {
        q: "Wie schnell sind Sie in Kloten vor Ort?",
        a: "Sehr schnell, unser Büro in Bassersdorf liegt nur wenige Minuten entfernt.",
      },
    ],
    featured: false,
  },
  {
    slug: "winterthur",
    heroImage: "/locations/zurich-panorama-2.jpg",
    name: "Winterthur",
    regionLabel: "Winterthur & Umgebung",
    plz: "8400",
    lakeside: false,
    headline: "Immobilienmakler Winterthur",
    intro:
      "Winterthur ist die sechstgrösste Stadt der Schweiz, urban, kulturell und deutlich erschwinglicher als die Stadt Zürich. Für Familien und Investoren einer der spannendsten Märkte der Region.",
    market:
      "Vom charmanten Altstadt-Objekt bis zum Neubau in Töss oder Seen bietet Winterthur ein breites Spektrum. Das gute Preis-Leistungs-Verhältnis hält die Nachfrage hoch.",
    whyHere:
      "Wir verkaufen in Winterthur mit lokalem Marktverständnis und einer Preisstrategie, die den Bestpreis erzielt, ohne Provision.",
    neighborhoods: ["Altstadt", "Töss", "Seen", "Oberwinterthur", "Wülflingen"],
    nearby: ["uster"],
    faq: [
      {
        q: "Ist Winterthur ein guter Markt für Verkäufer?",
        a: "Ja. Die Stadt wächst, die Nachfrage von Familien und Investoren ist hoch, und gut präsentierte Objekte verkaufen sich zügig.",
      },
      {
        q: "Verkaufen Sie in Winterthur auch Renditeobjekte?",
        a: "Ja, wir vermitteln sowohl Eigenheime als auch Mehrfamilien und Renditeobjekte, auf Wunsch diskret.",
      },
    ],
    featured: false,
  },
];

export const locationSlugs = locations.map((l) => l.slug);

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getNearby(loc: Location): Location[] {
  return loc.nearby
    .map((slug) => getLocation(slug))
    .filter((l): l is Location => Boolean(l));
}

export const featuredLocations = locations.filter((l) => l.featured);
