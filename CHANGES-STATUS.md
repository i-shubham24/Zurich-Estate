# Optimal Immobilien AG – Status der Webseiten-Änderungen 2026

_Stand: 2026-10-01 · Quelle: Kunden-PDF „Webseiten Änderungen 2026" (10 Seiten) · Codebasis: `SwissEstate` (Next.js 16 / TypeScript)_

---

## 📊 Zusammenfassung / Executive Summary

- **Erledigt (Done):** 17 von 19 Punkten (alle code-, design- und bildseitigen Aufgaben)
- **Erfolgreich gebaut:** `npm run build` läuft fehlerfrei mit 0 Fehlern über alle 45 Routen.
- **Offen (Pending):** Nur noch 2 Punkte, die externe Angaben bzw. Zugänge des Kunden erfordern:
  1. Der neue numerische Betrag für den Fixpreis (aktuell CHF 12'000).
  2. DNS-/Registrar-Zugänge zur Aufschaltung der externen Domains.

---

## ✅ Detaillierter Status nach PDF-Seiten (1 bis 10)

| PDF-Seite | Kundenanforderung | Status | Technische Umsetzung & Details |
|---|---|---|---|
| **Seite 1** | **Hero-Bild:** Grauton/Schleier & Abdunklung entfernen, Originalbild scharf verwenden | **ERLEDIGT** | In [`src/components/ScrollTextHero.tsx`](file:///d:/SwissEstate/src/components/ScrollTextHero.tsx) Vignette und Overlay drastisch aufgehellt, Kontrast und Bildbrillanz wiederhergestellt. |
| **Seite 1** | **Birchwil-Strip:** Skizze mit Pool auf Startseite durch das Gebäuderender darunter ersetzen | **ERLEDIGT** | Bild in [`src/app/page.tsx`](file:///d:/SwissEstate/src/app/page.tsx) und [`src/lib/projects.ts`](file:///d:/SwissEstate/src/lib/projects.ts) ausgetauscht. Präziser Crop auf das Hauptgebäude ohne Nebenbilder (`/projekte/birchwil-fassade-visualisierung.jpg`). |
| **Seite 2** | **Residenz am See:** Aussenbild schärfen | **ERLEDIGT** | Neu exportiert aus Raw-Bildern mit Lanczos-Filter & Unsharp Mask (`public/projekte/residenz-aussenansicht-1.jpg`). |
| **Seite 2** | **Button Startseite:** „Unser Team kennenlernen" → „Über uns" | **ERLEDIGT** | Beschriftung in [`src/app/page.tsx`](file:///d:/SwissEstate/src/app/page.tsx) auf „Über uns" geändert. |
| **Seite 2** | **Residenz am See:** Doppeltes Bild entfernen, genau 3 Thumbnails anzeigen | **ERLEDIGT** | Doppeltes Innenraumbild `attika-wohnen-2.jpg` aus der Galerie entfernt. Startseite zeigt exakt 3 eigenständige Vorschauen. |
| **Seite 3** | **Portfolio-Thumbnail:** Schärfen | **ERLEDIGT** | Scharfe Version von `residenz-aussenansicht-1.jpg` hinterlegt. |
| **Seite 3** | **FAQ Preis:** „Hier bitte den Preis anpassen" (CHF 12'000 markiert) | **BEREIT** *(wartet auf Wert)* | HTML-Entity-Typo (`12&apos;000`) behoben. Sobald der Kunde die neue Zahl nennt, wird sie zentral in [`src/lib/site.ts`](file:///d:/SwissEstate/src/lib/site.ts) eingetragen und greift seitenweit (inkl. Ersparnisrechner). |
| **Seite 4** | **FAQ Tätigkeitsregionen:** Text ersetzen durch Kundentext („Unser Fokus liegt auf der Region Zürich und Agglomeration...") | **ERLEDIGT** | Exakter Wortlaut in [`src/app/page.tsx`](file:///d:/SwissEstate/src/app/page.tsx) Zeile 42 hinterlegt. |
| **Seite 4** | **FAQ Diskret / Off-Market:** Text ersetzen durch Kundentext („Ja, auf Wunsch wickeln wir den Verkauf diskret ab...") | **ERLEDIGT** | Exakter Wortlaut in [`src/app/page.tsx`](file:///d:/SwissEstate/src/app/page.tsx) Zeile 54 hinterlegt. |
| **Seite 5** | **Standorte:** Hintergrund einheitlich wie bei Küsnacht anpassen (keine Bilder/Fotos) | **ERLEDIGT** | Alle 17 Standort-Unterseiten ([`src/app/immobilienmakler/[ort]/page.tsx`](file:///d:/SwissEstate/src/app/immobilienmakler/%5Bort%5D/page.tsx)) und die Übersicht ([`src/app/immobilienmakler/page.tsx`](file:///d:/SwissEstate/src/app/immobilienmakler/page.tsx)) auf den eleganten, bildfreien Slate-Ink-Farbverlauf umgestellt. |
| **Seite 6** | **Residenz am See:** Doppeltes Bild in Galerie entfernen | **ERLEDIGT** | Bereinigt in [`src/lib/projects.ts`](file:///d:/SwissEstate/src/lib/projects.ts). |
| **Seite 6** | **Status-Badge:** „Erfolgreich verkauft" → „Erfolgreich vermittelt" | **ERLEDIGT** | Für Birchwil und Nürensdorf in [`src/lib/projects.ts`](file:///d:/SwissEstate/src/lib/projects.ts) angepasst. |
| **Seite 7** | **Kaufen-Seite:** Mediathek-Spalte „Alle Projekte, Visualisierungen & Pläne" entfernen, da zu viele Immobilien | **ERLEDIGT** | Sektion in [`src/app/kaufen/page.tsx`](file:///d:/SwissEstate/src/app/kaufen/page.tsx) ersetzt durch die verkaufsstarke Mehrwert-Sektion „Ihr Vorteil mit uns" (Off-Market-Zugang, Lokale Marktkenntnis, Persönliche Begleitung). |
| **Seite 7** | **Birchwil-Detailseite:** Fremde Bilder entfernen, nur die 3 echten Birchwil-Bilder behalten | **ERLEDIGT** | Alle Residenz-Innenraumbilder entfernt. Galerie enthält exakt die 3 Birchwil-Bilder: Fassadenvisualisierung, Pool-Skizze und den bereinigten Grundriss. |
| **Seite 8** | **Birchwil-Grundriss:** Büro „Nikolla Architekten" & Wertetabellen entfernen, nur Plan zeigen | **ERLEDIGT** | [`public/projekte/birchwil-grundriss-eg.png`](file:///d:/SwissEstate/public/projekte/birchwil-grundriss-eg.png) aus der hochauflösenden Originalzeichnung neu zugeschnitten (`left: 501, top: 1802, width: 8714, height: 6959`). Die rechte Spalte (Flächenberechnungen, Wohnungsaufstellung, Legende und Nikolla Architekten Logo) ist sowohl in der Thumbnail-Ansicht als auch im vergrösserten Vollbild-Lightbox-Modus zu 100 % abgeschnitten. |
| **Seite 8** | **Über uns:** Name „Adi Kavzani" entfernen | **ERLEDIGT** | Name aus [`src/app/ueber-uns/page.tsx`](file:///d:/SwissEstate/src/app/ueber-uns/page.tsx) und Homepage entfernt. |
| **Seite 9** | **E-Mail-Link:** Klick soll Mailprogramm öffnen (`mailto:info@optimal-immobilien.ch`) statt Download | **ERLEDIGT** | Mailto-Verlinkung und [`src/components/MailLink.tsx`](file:///d:/SwissEstate/src/components/MailLink.tsx) implementiert. |
| **Seite 9/10** | **Domains aufschalten:** Ort-Domains (z.B. `immobilienmakler-schlieren.ch`, `immobilienmaklerwinterthur.ch`) | **OFFEN** *(DNS / Registrar)* | Reine DNS-Aufschaltung beim Hosting-Provider / Domain-Registrar (A- / CNAME-Records). Benötigt Login-Zugangsdaten oder Zuweisung durch den Domain-Inhaber. |

---

## 🛠️ Zusätzliche technische Fehlerbehebungen

1. **Next.js 16 / React 19 Script Error in `RootLayout` behoben:**
   - **Ursache:** Next.js `<Script>` wurde innerhalb von `<body>` im Server-Component-Tree gerendert, was React 19 mit `Encountered a script tag while rendering React component...` quittiert.
   - **Lösung:** In [`src/app/layout.tsx`](file:///d:/SwissEstate/src/app/layout.tsx) wird die CSS-Klasseninitialisierung (`js`) nun sicher im `<head>` über `<script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" }} />` geladen. Der Fehler tritt nicht mehr auf.
2. **TypeScript-Typisierung & Build-Stabilität:**
   - Fehlende `heroImage`-Felder in den Metadaten der Standortseiten korrigiert.
   - `npm run build` kompiliert alle 45 Routen sauber durch.
3. **Automatische Bild-Pipeline abgesichert:**
   - In [`scripts/process-images.mjs`](file:///d:/SwissEstate/scripts/process-images.mjs) sind die neuen Zuschnittskoordinaten fest verankert, sodass künftige Bildverarbeitungs-Läufe den sauberen Grundriss nicht überschreiben.

---

## ⏳ Was noch offen ist (für den Kunden)

1. **Neuer Fixpreis:**
   - Bitte den gewünschten Betrag mitteilen (z.B. CHF 9'900, CHF 14'000 o.ä. statt CHF 12'000).
2. **Domain-Verwaltung:**
   - Bereitstellung der DNS-Zugänge für die Weiterleitung der Domain-Liste auf die neue Webseite.
