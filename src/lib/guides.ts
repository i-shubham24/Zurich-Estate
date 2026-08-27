/**
 * Ratgeber (guide) articles — long-form content that builds topical authority
 * for informational keywords ("Haus verkaufen Zürich", "Maklerprovision",
 * "Immobilie bewerten", "Immobilienpreise Zürich"). Bodies are HTML rendered
 * inside the `.prose-lux` styles.
 */

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string; // ISO
  dateLabel: string;
  image: string;
  content: string;
  faqs?: { q: string; a: string }[];
  featured?: boolean;
};

export const guides: Guide[] = [
  {
    slug: "haus-verkaufen-zuerich-fehler",
    title: "Haus verkaufen in Zürich: Die 7 teuersten Fehler",
    metaTitle: "Haus verkaufen Zürich: 7 teure Fehler vermeiden (2026)",
    excerpt:
      "Viele Eigentümer verschenken beim Verkauf zehntausende Franken. Diese sieben Fehler kosten in Zürich am meisten – und so vermeiden Sie sie.",
    category: "Ratgeber",
    readTime: "6 Min.",
    date: "2026-07-14",
    dateLabel: "14. Juli 2026",
    image: "/projekte/residenz-aussenansicht-1.jpg",
    featured: true,
    content: `
<p>Der Verkauf einer Immobilie in Zürich ist für die meisten Menschen die grösste finanzielle Transaktion ihres Lebens. Umso erstaunlicher ist, wie oft dabei vermeidbare Fehler gemacht werden – Fehler, die schnell fünf- bis sechsstellige Beträge kosten. Hier sind die sieben teuersten.</p>

<h2>1. Der falsche Angebotspreis</h2>
<p>Ein zu hoher Startpreis schreckt genau die Käufer ab, die am meisten zahlen würden. Das Objekt bleibt liegen, gilt bald als «Ladenhüter» – und wird am Ende <strong>unter</strong> Marktwert verkauft. Ein zu tiefer Preis verschenkt bares Geld. Die Lösung ist eine datenbasierte Bewertung auf Basis realer Transaktionen im Quartier.</p>

<h2>2. Amateurhafte Fotos</h2>
<p>Über 90 % der Kaufinteressenten entscheiden anhand der Bilder, ob sie ein Objekt überhaupt in Betracht ziehen. Handyfotos bei schlechtem Licht sind der schnellste Weg, Interessenten zu verlieren. Professionelle Aufnahmen – idealerweise mit Home Staging – zahlen sich vielfach aus.</p>

<h2>3. Kein Vermarktungskonzept</h2>
<p>Ein Inserat auf einem Portal ist kein Konzept. Wer den Höchstpreis will, braucht eine gezielte Ansprache der richtigen Zielgruppe, ein hochwertiges Exposé und – bei begehrten Objekten – ein strukturiertes Bieterverfahren.</p>

<h2>4. Emotionale Preisverhandlung</h2>
<p>Wer selbst verkauft, verhandelt über sein eigenes Zuhause – und trifft dabei selten rationale Entscheidungen. Ein neutraler Profi holt regelmässig mehr heraus, weil er die Verhandlung strategisch statt emotional führt.</p>

<h2>5. Unvollständige Unterlagen</h2>
<p>Fehlende Grundbuchauszüge, Baupläne oder Energieausweise verzögern den Verkauf und schaffen Misstrauen. Käufer zahlen für Sicherheit – und ziehen bei Unsicherheit den Preis nach unten.</p>

<h2>6. Die falsche Timing-Strategie</h2>
<p>Der Zürcher Markt hat Rhythmen. Wer im richtigen Fenster startet und das Objekt nicht «verbrennt», erzielt spürbar bessere Ergebnisse.</p>

<h2>7. Zu hohe Provision zahlen</h2>
<p>Klassische Makler verlangen 2–3 % des Verkaufspreises. Bei einem Objekt von CHF 2 Mio. sind das schnell CHF 40'000–60'000. Dabei ist der Aufwand weitgehend derselbe – egal, ob das Objekt CHF 1 Mio. oder CHF 3 Mio. kostet. Ein <strong>Fixpreis-Modell</strong> spart diese Differenz vollständig.</p>

<blockquote>Der teuerste Fehler ist, den Verkauf dem Zufall zu überlassen. Struktur schlägt Glück – jedes Mal.</blockquote>

<p>Genau deshalb verkauft Optimal Immobilien provisionsfrei zum Fixpreis von CHF 12'000 – mit professioneller Vermarktung, aber ohne prozentuale Provision. Starten Sie mit einer kostenlosen Bewertung.</p>
`,
    faqs: [
      {
        q: "Was ist der häufigste Fehler beim Hausverkauf in Zürich?",
        a: "Ein falsch angesetzter Angebotspreis. Zu hoch schreckt zahlungskräftige Käufer ab, zu tief verschenkt Geld. Eine datenbasierte Bewertung ist der wichtigste erste Schritt.",
      },
      {
        q: "Wie viel Provision spare ich mit einem Fixpreis-Modell?",
        a: "Bei einem Verkaufspreis von CHF 2 Mio. liegt die klassische 3 %-Provision bei CHF 60'000. Mit dem Fixpreis von CHF 12'000 sparen Sie hier rund CHF 48'000.",
      },
    ],
  },
  {
    slug: "maklerprovision-schweiz",
    title: "Maklerprovision in der Schweiz: So viel zahlen Sie wirklich",
    metaTitle: "Maklerprovision Schweiz 2026: Kosten, Prozente & Alternativen",
    excerpt:
      "2 %, 3 % oder Fixpreis? Wir zeigen transparent, was ein Immobilienmakler in der Schweiz kostet – und wie Sie beim Verkauf tausende Franken sparen.",
    category: "Kosten",
    readTime: "5 Min.",
    date: "2026-06-28",
    dateLabel: "28. Juni 2026",
    image: "/projekte/attika-wohnen-3.jpg",
    featured: false,
    content: `
<p>Die Maklerprovision ist in der Schweiz gesetzlich nicht fix geregelt – sie ist Verhandlungssache. In der Praxis haben sich jedoch bestimmte Sätze etabliert. Wer sie kennt, verhandelt besser.</p>

<h2>Übliche Provisionssätze</h2>
<p>Für den Verkauf von Wohneigentum liegen die üblichen Provisionen in der Schweiz meist zwischen <strong>2 % und 3 %</strong> des Verkaufspreises – zuzüglich MwSt. Bei Luxusobjekten wird teils weniger Prozent verlangt, absolut aber deutlich mehr bezahlt.</p>

<h2>Was das konkret bedeutet</h2>
<ul>
<li>Verkaufspreis CHF 1'000'000 → Provision (3 %): rund CHF 30'000</li>
<li>Verkaufspreis CHF 2'000'000 → Provision (3 %): rund CHF 60'000</li>
<li>Verkaufspreis CHF 4'000'000 → Provision (3 %): rund CHF 120'000</li>
</ul>
<p>Der entscheidende Punkt: Der <strong>Aufwand</strong> für den Verkauf steigt nicht proportional zum Preis. Ob ein Objekt CHF 1 Mio. oder CHF 3 Mio. kostet – Fotos, Exposé, Besichtigungen und Verhandlung sind vergleichbar. Die prozentuale Provision belohnt also nicht mehr Arbeit, sondern nur einen höheren Preis.</p>

<h2>Wer zahlt die Provision?</h2>
<p>In der Regel zahlt die verkaufende Partei, die den Makler beauftragt. Die Provision wird bei erfolgreichem Verkauf fällig.</p>

<h2>Die Alternative: Fixpreis</h2>
<p>Immer mehr Eigentümer setzen auf transparente Fixpreis-Modelle. Sie erhalten dieselbe professionelle Vermarktung – zahlen aber einen festen Betrag statt eines Prozentsatzes. Bei Optimal Immobilien beträgt dieser <strong>CHF 12'000</strong>, unabhängig vom Verkaufspreis.</p>

<blockquote>Bei einem Objekt von CHF 2 Mio. bedeutet das eine Ersparnis von rund CHF 48'000 gegenüber einer 3 %-Provision.</blockquote>

<p>Rechnen Sie nach: Der Fixpreis lohnt sich für praktisch jedes Objekt oberhalb von etwa CHF 500'000 Verkaufspreis – und je teurer die Immobilie, desto grösser die Ersparnis.</p>
`,
    faqs: [
      {
        q: "Wie hoch ist die Maklerprovision in der Schweiz?",
        a: "Üblich sind 2–3 % des Verkaufspreises plus MwSt. Sie ist gesetzlich nicht fixiert und damit verhandelbar. Fixpreis-Modelle sind eine transparente Alternative.",
      },
      {
        q: "Ab wann lohnt sich ein Fixpreis gegenüber Prozent-Provision?",
        a: "In der Regel ab einem Verkaufspreis von rund CHF 500'000. Bei CHF 12'000 Fixpreis sparen Sie gegenüber 3 % Provision bereits ab CHF 400'000 spürbar.",
      },
    ],
  },
  {
    slug: "immobilienbewertung-marktwert",
    title: "Immobilienbewertung: So ermitteln Sie den echten Marktwert",
    metaTitle: "Immobilie bewerten in Zürich: Marktwert richtig ermitteln",
    excerpt:
      "Online-Rechner, hedonische Bewertung oder Gutachten? So finden Sie heraus, was Ihre Immobilie in Zürich wirklich wert ist.",
    category: "Bewertung",
    readTime: "5 Min.",
    date: "2026-06-05",
    dateLabel: "5. Juni 2026",
    image: "/projekte/erdgeschoss-wohnbereich.jpg",
    featured: false,
    content: `
<p>«Was ist meine Immobilie wert?» – die wichtigste Frage vor jedem Verkauf. Die Antwort entscheidet über den Erfolg. Es gibt drei gängige Methoden, den Marktwert zu ermitteln.</p>

<h2>1. Die hedonische Bewertung</h2>
<p>Das gängigste Verfahren für Wohneigentum in der Schweiz. Ein statistisches Modell vergleicht Ihre Immobilie mit tausenden tatsächlich verkauften Objekten – anhand von Lage, Grösse, Zustand und Ausstattung. Schnell, datenbasiert und für Standardobjekte sehr zuverlässig.</p>

<h2>2. Das Vergleichswertverfahren</h2>
<p>Hier werden konkrete, kürzlich verkaufte Objekte in derselben Mikrolage herangezogen. Gerade in Zürich, wo sich Preise zwischen zwei Strassen deutlich unterscheiden können, ist lokale Marktkenntnis Gold wert.</p>

<h2>3. Das Ertragswertverfahren</h2>
<p>Für Renditeobjekte relevant: Der Wert ergibt sich aus den erzielbaren Mieterträgen. Für selbstgenutztes Wohneigentum spielt es meist eine untergeordnete Rolle.</p>

<h2>Vorsicht bei reinen Online-Rechnern</h2>
<p>Kostenlose Online-Tools liefern eine erste Grössenordnung – aber sie kennen weder den echten Zustand Ihrer Küche noch die Aussicht von Ihrem Balkon. Sie ersetzen keine fundierte Einschätzung durch jemanden, der das Objekt und den lokalen Markt kennt.</p>

<blockquote>Der Marktwert ist kein fixer Betrag, sondern der Preis, den ein realer Käufer heute zu zahlen bereit ist. Genau den gilt es zu maximieren.</blockquote>

<h2>Unser Ansatz</h2>
<p>Wir kombinieren hedonische Daten mit einer Vor-Ort-Einschätzung und aktueller Nachfrage in Ihrer Gemeinde. So erhalten Sie keinen theoretischen Wert, sondern eine realistische Verkaufsstrategie. Die Ersteinschätzung ist kostenlos und unverbindlich.</p>
`,
    faqs: [
      {
        q: "Wie kann ich meine Immobilie in Zürich bewerten lassen?",
        a: "Über eine kostenlose Ersteinschätzung: Sie geben Objektart und Lage an, wir kombinieren hedonische Daten mit lokaler Marktkenntnis. Für den Verkauf empfiehlt sich zusätzlich eine Vor-Ort-Besichtigung.",
      },
      {
        q: "Sind kostenlose Online-Bewertungen genau?",
        a: "Sie liefern eine grobe Orientierung, berücksichtigen aber nicht Zustand, Ausbaustandard und Aussicht. Für eine belastbare Verkaufsstrategie braucht es eine individuelle Einschätzung.",
      },
    ],
  },
  {
    slug: "immobilienpreise-zuerich-2026",
    title: "Immobilienpreise Zürich 2026: Der grosse Marktbericht",
    metaTitle: "Immobilienpreise Zürich 2026: Marktbericht & Prognose",
    excerpt:
      "Wie entwickeln sich die Preise in Stadt, an der Goldküste und im Unterland? Zahlen, Trends und was das für Verkäufer bedeutet.",
    category: "Marktbericht",
    readTime: "7 Min.",
    date: "2026-05-19",
    dateLabel: "19. Mai 2026",
    image: "/projekte/residenz-aussenansicht-2.jpg",
    featured: true,
    content: `
<p>Der Immobilienmarkt in der Region Zürich bleibt einer der robustesten Europas. Knappheit an Bauland, hohe Zuwanderung und tiefe Leerstände treffen auf eine kaufkräftige Nachfrage. Für Eigentümer ist das eine komfortable Ausgangslage.</p>

<h2>Stadt Zürich</h2>
<p>In der Stadt bewegen sich die Quadratmeterpreise für Eigentumswohnungen je nach Kreis zwischen rund CHF 14'000 und über CHF 22'000. Die Nachfrage nach gutem Wohneigentum übersteigt das Angebot deutlich – Objekte in Toplagen wie Seefeld, Enge oder am Zürichberg wechseln oft über dem Angebotspreis die Hand.</p>

<h2>Die Goldküste</h2>
<p>Am rechten Seeufer – von Zollikon über Küsnacht bis Meilen und Herrliberg – bleibt die Nachfrage nach Seesicht-Liegenschaften ungebrochen. Der Käuferkreis ist zunehmend international, Diskretion und gezielte Vermarktung entscheiden über den Bestpreis.</p>

<h2>Linkes Ufer & Unterland</h2>
<p>Am linken Ufer (Kilchberg, Thalwil, Horgen) und im Unterland (Bassersdorf, Kloten, Wallisellen) sind die Einstiegspreise moderater – bei stabil steigender Nachfrage von Familien und Pendlern. Hier entsteht aktuell besonders viel hochwertiger Neubau.</p>

<h2>Was bedeutet das für Verkäufer?</h2>
<ul>
<li>Die Ausgangslage ist stark – gut vorbereitete Objekte verkaufen sich zügig.</li>
<li>Der Preisunterschied zwischen «okay» und «optimal» vermarktet ist erheblich.</li>
<li>Wer jetzt verkauft, profitiert von hoher Nachfrage und tiefen Leerständen.</li>
</ul>

<blockquote>Ein starker Markt verzeiht Vermarktungsfehler – aber er belohnt professionelle Vermarktung mit einem spürbaren Aufschlag.</blockquote>

<p>Wie viel Ihr Objekt heute konkret wert ist, zeigt Ihnen unsere kostenlose Bewertung – zugeschnitten auf Ihre Gemeinde und Mikrolage.</p>
`,
    faqs: [
      {
        q: "Steigen die Immobilienpreise in Zürich 2026 weiter?",
        a: "Die Fundamentaldaten – Knappheit, Zuwanderung, tiefe Leerstände – sprechen für ein weiterhin robustes Preisniveau. Toplagen bleiben besonders gefragt.",
      },
      {
        q: "Ist 2026 ein guter Zeitpunkt zum Verkaufen in Zürich?",
        a: "Für gut vorbereitete Objekte ja: Die Nachfrage ist hoch und das Angebot knapp. Entscheidend bleiben korrekte Bewertung und professionelle Vermarktung.",
      },
    ],
  },
  {
    slug: "wohnen-an-der-goldkueste",
    title: "Wohnen an der Goldküste: Warum die Lagen so begehrt sind",
    metaTitle: "Goldküste Zürich: Küsnacht, Zollikon, Meilen & Co.",
    excerpt:
      "Sonnenhänge, Seesicht und tiefe Steuern: Ein Quartier-Guide zur begehrtesten Wohnregion am rechten Zürichseeufer.",
    category: "Quartier-Guide",
    readTime: "4 Min.",
    date: "2026-04-30",
    dateLabel: "30. April 2026",
    image: "/projekte/attika-kueche-seeblick.jpg",
    featured: false,
    content: `
<p>Die «Goldküste» am rechten Ufer des Zürichsees ist ein Synonym für Wohnqualität auf höchstem Niveau. Doch was macht Zollikon, Küsnacht, Erlenbach, Herrliberg und Meilen so besonders?</p>

<h2>Die Sonnenlage</h2>
<p>Die Hänge des rechten Ufers sind nach Südwesten ausgerichtet – sie fangen die Abendsonne ein und bieten Blick über den See auf die gegenüberliegenden Hügel. Diese Kombination aus Licht und Aussicht ist der Kern des Goldküsten-Mythos.</p>

<h2>Die Steuervorteile</h2>
<p>Gemeinden wie Zollikon, Küsnacht oder Herrliberg zählen zu den steuergünstigsten im Kanton. Für vermögende Käufer ein zentrales Argument – und ein Preistreiber.</p>

<h2>Die Gemeinden im Überblick</h2>
<ul>
<li><strong>Zollikon:</strong> Stadtnah, Seesicht, sehr tiefe Steuern.</li>
<li><strong>Küsnacht:</strong> Internationale Nachfrage, Villenlagen, Off-Market-Markt.</li>
<li><strong>Erlenbach:</strong> Klein, exklusiv, direkte Seelage.</li>
<li><strong>Herrliberg:</strong> Steile Sonnenhänge mit unverbaubarer Aussicht.</li>
<li><strong>Meilen:</strong> Wachsende Neubau-Szene, Seezugang, Rebberge.</li>
</ul>

<blockquote>An der Goldküste entscheidet die Mikrolage über Millionen. Wer hier verkauft, braucht einen Partner, der jede Strasse kennt.</blockquote>

<p>Optimal Immobilien vermarktet an der gesamten Goldküste – diskret, gezielt und provisionsfrei zum Fixpreis.</p>
`,
    faqs: [
      {
        q: "Welche Gemeinden gehören zur Zürcher Goldküste?",
        a: "Insbesondere Zollikon, Küsnacht, Erlenbach, Herrliberg und Meilen am rechten Zürichseeufer – geprägt von Sonnenhängen, Seesicht und tiefen Steuern.",
      },
      {
        q: "Warum sind Goldküsten-Immobilien so teuer?",
        a: "Die Kombination aus Südwestlage mit Seesicht, tiefer Steuerbelastung, Stadtnähe und grosser Knappheit treibt die Preise – häufig in den zweistelligen Millionenbereich.",
      },
    ],
  },
];

export const guideSlugs = guides.map((g) => g.slug);
export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
export const featuredGuides = guides.filter((g) => g.featured);
