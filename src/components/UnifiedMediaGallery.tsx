"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Layers,
  HardHat,
  Eye,
  Home,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui";

export interface MediaItem {
  id: string;
  src: string;
  title: string;
  category: "visualisierung" | "grundriss" | "baustelle" | "interior";
  categoryLabel: string;
  projectSlug: string;
  projectName: string;
  location: string;
  description: string;
  aspect?: "landscape" | "portrait" | "square" | "floorplan";
}

export const ALL_MEDIA_ASSETS: MediaItem[] = [
  // ── 1. Birchwil Visualizations & Floor Plan ──
  {
    id: "birchwil-vis-1",
    src: "/projekte/birchwil-pool-skizze.jpg",
    title: "Neubau Birchwil – Architektur & Aussenansicht",
    category: "visualisierung",
    categoryLabel: "Architektur-Visualisierung",
    projectSlug: "neubau-birchwil",
    projectName: "Neubauprojekt Birchwil",
    location: "Birchwil / Nürensdorf",
    description: "Moderne Schweizer Holz- und Betonarchitektur in sonniger Lage. 3 exklusive Eigentumswohnungen.",
    aspect: "landscape",
  },
  {
    id: "birchwil-vis-2",
    src: "/projekte/birchwil-fassade-visualisierung.jpg",
    title: "Neubau Birchwil – Garten- & Terrassenperspektive",
    category: "visualisierung",
    categoryLabel: "Architektur-Visualisierung",
    projectSlug: "neubau-birchwil",
    projectName: "Neubauprojekt Birchwil",
    location: "Birchwil / Nürensdorf",
    description: "Grosszügige private Aussenbereiche, bodentiefe Fensterfronten und harmonische Einbettung ins Quartier.",
    aspect: "landscape",
  },
  {
    id: "birchwil-grundriss",
    src: "/projekte/birchwil-grundriss-eg.png",
    title: "Grundrissplan Erdgeschoss – 4.5-Zimmer-Gartenwohnung",
    category: "grundriss",
    categoryLabel: "Grundrissplan",
    projectSlug: "neubau-birchwil",
    projectName: "Neubauprojekt Birchwil",
    location: "Birchwil / Nürensdorf",
    description: "Detaillierter Architekturplan mit Wohn-/Essbereich, Master-Suite, gedecktem Sitzplatz und Gartenanteil.",
    aspect: "floorplan",
  },

  // ── 2. Nürensdorf Real On-Site Construction Photos ──
  {
    id: "nuerensdorf-bau-1",
    src: "/projekte/nuerensdorf-baustelle-uebersicht.jpg",
    title: "Baustellen-Übersicht Nürensdorf",
    category: "baustelle",
    categoryLabel: "Baustelle & Baufortschritt",
    projectSlug: "neubau-nuerensdorf",
    projectName: "Neubauprojekt Nürensdorf",
    location: "8309 Nürensdorf",
    description: "Reale Baustellendokumentation der Hanglage. Bereits während der Bauphase 100% erfolgreich beurkundet.",
    aspect: "landscape",
  },
  {
    id: "nuerensdorf-bau-2",
    src: "/projekte/nuerensdorf-baustelle-kran.jpg",
    title: "Kranarbeiten & Aushub Nürensdorf",
    category: "baustelle",
    categoryLabel: "Baustelle & Baufortschritt",
    projectSlug: "neubau-nuerensdorf",
    projectName: "Neubauprojekt Nürensdorf",
    location: "8309 Nürensdorf",
    description: "Laufende Rohbau- und Fundamentierungsarbeiten auf dem Baufeld in Nürensdorf.",
    aspect: "portrait",
  },
  {
    id: "nuerensdorf-bau-3",
    src: "/projekte/nuerensdorf-baustelle-bauwerk.jpg",
    title: "Rohbau & Struktur Nürensdorf",
    category: "baustelle",
    categoryLabel: "Baustelle & Baufortschritt",
    projectSlug: "neubau-nuerensdorf",
    projectName: "Neubauprojekt Nürensdorf",
    location: "8309 Nürensdorf",
    description: "Blick auf das Tragwerk und die Baugrubensicherung der 3 Eigentumswohnungen.",
    aspect: "portrait",
  },

  // ── 3. Residenz am See (Flagship Renders & Interiors) ──
  {
    id: "residenz-ext-1",
    src: "/projekte/residenz-aussenansicht-1.jpg",
    title: "Residenz am See – Fassade & Hanglage",
    category: "visualisierung",
    categoryLabel: "Architektur-Visualisierung",
    projectSlug: "residenz-am-see",
    projectName: "Residenz am See",
    location: "Region Zürichsee",
    description: "Flagship-Neubauprojekt mit 5 Luxuswohnungen und unverbaubarer Seesicht.",
    aspect: "landscape",
  },
  {
    id: "residenz-ext-2",
    src: "/projekte/residenz-aussenansicht-2.jpg",
    title: "Residenz am See – Panoramablick Seeseite",
    category: "visualisierung",
    categoryLabel: "Architektur-Visualisierung",
    projectSlug: "residenz-am-see",
    projectName: "Residenz am See",
    location: "Region Zürichsee",
    description: "Elegante Terrassenlandschaft und kubische Architektur direkt am Zürichsee.",
    aspect: "landscape",
  },
  {
    id: "residenz-attika-kueche",
    src: "/projekte/attika-kueche-seeblick.jpg",
    title: "Attika Design-Küche mit Seeblick",
    category: "interior",
    categoryLabel: "Interior & Wohnwelten",
    projectSlug: "residenz-am-see",
    projectName: "Residenz am See",
    location: "Region Zürichsee",
    description: "Massgefertigte Kücheninsel mit Marmorabdeckung und raumhohen Schiebefenstern.",
    aspect: "landscape",
  },
  {
    id: "residenz-attika-wohnen-1",
    src: "/projekte/attika-wohnen-1.jpg",
    title: "Attika Wohn- & Loungebereich",
    category: "interior",
    categoryLabel: "Interior & Wohnwelten",
    projectSlug: "residenz-am-see",
    projectName: "Residenz am See",
    location: "Region Zürichsee",
    description: "Lichtdurchfluteter Wohnsalon mit Eichenparkett und fliessendem Übergang zur Sonnenterrasse.",
    aspect: "landscape",
  },
  {
    id: "residenz-attika-wohnen-2",
    src: "/projekte/attika-wohnen-2.jpg",
    title: "Attika Essbereich & Panorama",
    category: "interior",
    categoryLabel: "Interior & Wohnwelten",
    projectSlug: "residenz-am-see",
    projectName: "Residenz am See",
    location: "Region Zürichsee",
    description: "Grosszügiges Raumgefühl mit warmer Materialisierung und Akzentbeleuchtung.",
    aspect: "landscape",
  },
  {
    id: "residenz-attika-wohnen-3",
    src: "/projekte/attika-wohnen-3.jpg",
    title: "Attika Wohnzimmer & Kamin",
    category: "interior",
    categoryLabel: "Interior & Wohnwelten",
    projectSlug: "residenz-am-see",
    projectName: "Residenz am See",
    location: "Region Zürichsee",
    description: "Harmonische Symbiose aus exklusiven Möbeln, Holzlamellen und Weitblick.",
    aspect: "landscape",
  },
  {
    id: "residenz-og-wohnen",
    src: "/projekte/obergeschoss-wohnbereich.jpg",
    title: "Obergeschoss – Moderner Wohnraum",
    category: "interior",
    categoryLabel: "Interior & Wohnwelten",
    projectSlug: "residenz-am-see",
    projectName: "Residenz am See",
    location: "Region Zürichsee",
    description: "Stilvoller Innenausbau mit bodentiefen Glaselementen und eleganter Möblierung.",
    aspect: "landscape",
  },
  {
    id: "residenz-eg-wohnen",
    src: "/projekte/erdgeschoss-wohnbereich.jpg",
    title: "Erdgeschoss – Wohnen mit Gartenzugang",
    category: "interior",
    categoryLabel: "Interior & Wohnwelten",
    projectSlug: "residenz-am-see",
    projectName: "Residenz am See",
    location: "Region Zürichsee",
    description: "Ebenerdiger Wohnkomfort mit direktem Austritt in die private Gartenanlage.",
    aspect: "landscape",
  },
];

type CategoryFilter = "all" | "visualisierung" | "grundriss" | "baustelle" | "interior";
type ProjectFilter = "all" | "neubau-birchwil" | "neubau-nuerensdorf" | "residenz-am-see";

export default function UnifiedMediaGallery() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [activeProject, setActiveProject] = useState<ProjectFilter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    return ALL_MEDIA_ASSETS.filter((item) => {
      const matchCat = activeCategory === "all" || item.category === activeCategory;
      const matchProj = activeProject === "all" || item.projectSlug === activeProject;
      return matchCat && matchProj;
    });
  }, [activeCategory, activeProject]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  // Lock background scroll while the lightbox is open (mobile + desktop)
  useEffect(() => {
    if (lightboxIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxIndex]);

  const activeMedia = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="media-galerie" className="bg-sand py-20 md:py-28">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Gesamte Mediathek"
            title="Alle Projekte, Visualisierungen & Pläne"
            intro="Entdecken Sie alle Visualisierungen, Grundrisse und Live-Baustellenaufnahmen unserer Neubau- und Referenzprojekte an einem zentralen Ort."
          />
          <div className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-graphite/70 shadow-sm">
            <Sparkles className="h-4 w-4 text-gold" /> {filteredItems.length} von {ALL_MEDIA_ASSETS.length} Aufnahmen
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-10 space-y-4">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 border-b border-line pb-4">
            <span className="mr-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-graphite/50">
              <Filter className="h-3.5 w-3.5 text-gold" /> Kategorie:
            </span>

            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === "all"
                  ? "bg-ink text-white shadow-sm"
                  : "bg-white text-graphite/70 hover:bg-gold/10 hover:text-ink border border-line"
              }`}
            >
              Alle ({ALL_MEDIA_ASSETS.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory("visualisierung")}
              className={`inline-flex items-center gap-1.5 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === "visualisierung"
                  ? "bg-ink text-white shadow-sm"
                  : "bg-white text-graphite/70 hover:bg-gold/10 hover:text-ink border border-line"
              }`}
            >
              <Eye className="h-3.5 w-3.5 text-gold" /> Visualisierungen (4)
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory("grundriss")}
              className={`inline-flex items-center gap-1.5 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === "grundriss"
                  ? "bg-ink text-white shadow-sm"
                  : "bg-white text-graphite/70 hover:bg-gold/10 hover:text-ink border border-line"
              }`}
            >
              <Layers className="h-3.5 w-3.5 text-gold" /> Grundrisse (1)
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory("baustelle")}
              className={`inline-flex items-center gap-1.5 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === "baustelle"
                  ? "bg-ink text-white shadow-sm"
                  : "bg-white text-graphite/70 hover:bg-gold/10 hover:text-ink border border-line"
              }`}
            >
              <HardHat className="h-3.5 w-3.5 text-gold" /> Baustelle (3)
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory("interior")}
              className={`inline-flex items-center gap-1.5 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === "interior"
                  ? "bg-ink text-white shadow-sm"
                  : "bg-white text-graphite/70 hover:bg-gold/10 hover:text-ink border border-line"
              }`}
            >
              <Home className="h-3.5 w-3.5 text-gold" /> Interior & Ausbau (6)
            </button>
          </div>

          {/* Project Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-graphite/50">
              Projekt:
            </span>

            <button
              type="button"
              onClick={() => setActiveProject("all")}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
                activeProject === "all"
                  ? "bg-gold text-ink font-semibold"
                  : "bg-white/80 text-graphite/70 hover:bg-white border border-line"
              }`}
            >
              Alle Projekte
            </button>

            <button
              type="button"
              onClick={() => setActiveProject("neubau-birchwil")}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
                activeProject === "neubau-birchwil"
                  ? "bg-gold text-ink font-semibold"
                  : "bg-white/80 text-graphite/70 hover:bg-white border border-line"
              }`}
            >
              Neubau Birchwil
            </button>

            <button
              type="button"
              onClick={() => setActiveProject("neubau-nuerensdorf")}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
                activeProject === "neubau-nuerensdorf"
                  ? "bg-gold text-ink font-semibold"
                  : "bg-white/80 text-graphite/70 hover:bg-white border border-line"
              }`}
            >
              Neubau Nürensdorf
            </button>

            <button
              type="button"
              onClick={() => setActiveProject("residenz-am-see")}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
                activeProject === "residenz-am-see"
                  ? "bg-gold text-ink font-semibold"
                  : "bg-white/80 text-graphite/70 hover:bg-white border border-line"
              }`}
            >
              Residenz am See
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item, index) => (
            <Reveal key={item.id} delay={(index % 4) * 60} className="h-full">
              <div
                role="button"
                tabIndex={0}
                onClick={() => openLightbox(index)}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
                className="group relative flex h-full flex-col overflow-hidden border border-line bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                {/* Media frame — identical 4/3 ratio on every card so all
                    frames (and rows) match; portrait/site photos and the plan
                    fill via object-cover, full view in the lightbox. */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#fafafa]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    quality={82}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    // Grid thumbs always fill the frame (floorplan detail stays fully
                    // visible in the lightbox, which uses object-contain).
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Badge */}
                  <span className="absolute left-3 top-3 z-10 bg-ink/85 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    {item.categoryLabel}
                  </span>

                  {/* Expand icon */}
                  <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>

                {/* Content info */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center justify-between text-xs text-graphite/55">
                      <span>{item.projectName}</span>
                      <span className="font-serif italic text-gold-deep">{item.location}</span>
                    </div>
                    <h4 className="mt-2 font-serif text-lg font-medium text-ink transition-colors group-hover:text-gold-deep">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-graphite/70 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[0.7rem] font-semibold uppercase tracking-wider text-gold-deep">
                    <span>Grossansicht</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Fullscreen Lightbox Modal ── */}
      {lightboxIndex !== null && activeMedia && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Schliessen"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev / Next Arrows */}
          {filteredItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Nächstes Bild"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Main Modal Layout */}
          <div
            className="relative flex h-[88vh] w-[92vw] max-w-7xl flex-col items-center justify-between overflow-hidden rounded-sm bg-ink/90 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex w-full items-center justify-between border-b border-white/10 px-6 py-4 text-white">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold">
                  {activeMedia.categoryLabel} · {activeMedia.location}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-white">
                  {activeMedia.title}
                </h3>
              </div>
              <div className="hidden sm:block text-xs uppercase tracking-widest text-white/50">
                {lightboxIndex + 1} / {filteredItems.length}
              </div>
            </div>

            {/* Media Image Area */}
            <div className="relative flex-1 w-full flex items-center justify-center p-4">
              <div className="relative h-full w-full max-w-5xl">
                <Image
                  key={activeMedia.src}
                  src={activeMedia.src}
                  alt={activeMedia.title}
                  fill
                  priority
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
            </div>

            {/* Bottom Bar with Project Link */}
            <div className="flex w-full flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 bg-black/50 px-6 py-4 text-white">
              <p className="text-xs md:text-sm text-white/70 max-w-2xl text-center sm:text-left">
                {activeMedia.description}
              </p>
              <Link
                href={`/kaufen/${activeMedia.projectSlug}`}
                className="inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-gold-bright shrink-0"
              >
                Zum Projekt: {activeMedia.projectName} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
