"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  HardHat,
  Eye,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import type { FloorplanItem, ConstructionUpdate } from "@/lib/projects";

interface Props {
  title: string;
  gallery?: string[];
  floorplans?: FloorplanItem[];
  constructionUpdates?: ConstructionUpdate;
}

export default function ProjectShowcaseMedia({
  title,
  gallery = [],
  floorplans = [],
  constructionUpdates,
}: Props) {
  const [activeTab, setActiveTab] = useState<"gallery" | "floorplan" | "construction">(
    floorplans.length > 0 ? "gallery" : "gallery"
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  // Collect all available media for lightbox
  const allImages = [
    ...gallery,
    ...(constructionUpdates?.images.map((img) => img.src) || []),
  ];

  const openLightbox = (src: string, list: string[] = allImages) => {
    const idx = list.indexOf(src);
    setLightboxImages(list);
    setLightboxIndex(idx >= 0 ? idx : 0);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : lightboxImages.length - 1));
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < lightboxImages.length - 1 ? prev! + 1 : 0));
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
  }, [lightboxIndex, lightboxImages]);

  const hasFloorplans = floorplans && floorplans.length > 0;
  const hasConstruction = constructionUpdates && constructionUpdates.images.length > 0;

  return (
    <div className="container-lux mt-16 md:mt-24">
      {/* Navigation tabs if multiple media types exist */}
      {(hasFloorplans || hasConstruction) && (
        <div className="mb-10 flex flex-wrap items-center gap-3 border-b border-line pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className={`inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all ${
              activeTab === "gallery"
                ? "bg-ink text-white shadow-sm"
                : "bg-cream text-graphite/70 hover:bg-gold/10 hover:text-ink"
            }`}
          >
            <Eye className="h-4 w-4 text-gold" /> Impressionen & Visualisierungen ({gallery.length})
          </button>

          {hasFloorplans && (
            <button
              type="button"
              onClick={() => setActiveTab("floorplan")}
              className={`inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all ${
                activeTab === "floorplan"
                  ? "bg-ink text-white shadow-sm"
                  : "bg-cream text-graphite/70 hover:bg-gold/10 hover:text-ink"
              }`}
            >
              <Layers className="h-4 w-4 text-gold" /> Grundrisse & Pläne ({floorplans.length})
            </button>
          )}

          {hasConstruction && (
            <button
              type="button"
              onClick={() => setActiveTab("construction")}
              className={`inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all ${
                activeTab === "construction"
                  ? "bg-ink text-white shadow-sm"
                  : "bg-cream text-graphite/70 hover:bg-gold/10 hover:text-ink"
              }`}
            >
              <HardHat className="h-4 w-4 text-gold" /> Baufortschritt & Baustelle ({constructionUpdates.images.length})
            </button>
          )}
        </div>
      )}

      {/* ── TAB 1: Gallery & Visualizations ── */}
      {activeTab === "gallery" && gallery.length > 0 && (
        <div>
          <div className="flex items-center justify-between">
            <div>
              <Eyebrow>Impressionen</Eyebrow>
              <h3 className="mt-2 font-serif text-2xl text-ink md:text-3xl">
                Architektur & Ausbau
              </h3>
            </div>
            <span className="hidden text-xs uppercase tracking-wider text-graphite/50 sm:inline-block">
              Klicken zum Vergrössern
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((src, i) => (
              <Reveal key={src} delay={(i % 3) * 70}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openLightbox(src, gallery)}
                  onKeyDown={(e) => e.key === "Enter" && openLightbox(src, gallery)}
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden border border-line bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Image
                    src={src}
                    alt={`${title}, Ansicht ${i + 1}`}
                    fill
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4 text-ink" />
                  </div>
                  <span className="absolute left-3 top-3 bg-ink/80 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                    {src.includes("aussen")
                      ? "Aussenansicht"
                      : src.includes("grundriss")
                      ? "Grundriss"
                      : src.includes("baustelle")
                      ? "Baustelle"
                      : src.includes("kueche")
                      ? "Küche & Essen"
                      : "Innenraum"}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 2: Dedicated Floor Plan Viewer ── */}
      {activeTab === "floorplan" && hasFloorplans && (
        <div className="space-y-12">
          {floorplans.map((fp, idx) => (
            <Reveal key={idx}>
              <div className="overflow-hidden border border-line bg-white shadow-sm">
                <div className="grid grid-cols-1 items-stretch lg:grid-cols-[1.3fr_0.7fr]">
                  {/* Floorplan Image with Zoom trigger */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => openLightbox(fp.image, [fp.image])}
                    onKeyDown={(e) => e.key === "Enter" && openLightbox(fp.image, [fp.image])}
                    className="group relative flex min-h-[420px] cursor-pointer items-center justify-center border-b border-line bg-[#fdfdfd] p-6 lg:border-b-0 lg:border-r"
                  >
                    <div className="relative h-full min-h-[380px] w-full">
                      <Image
                        src={fp.image}
                        alt={fp.title}
                        fill
                        priority
                        className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-ink/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-md backdrop-blur-sm transition-transform group-hover:scale-105">
                      <Maximize2 className="h-3.5 w-3.5 text-gold" /> Plan in Vollbild vergrössern
                    </div>
                  </div>

                  {/* Floorplan Specifications */}
                  <div className="flex flex-col justify-between p-8 md:p-10">
                    <div>
                      {fp.badge && (
                        <span className="inline-block bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-gold-deep">
                          {fp.badge}
                        </span>
                      )}
                      <h3 className="mt-3 font-serif text-2xl text-ink md:text-3xl">
                        {fp.title}
                      </h3>

                      <div className="mt-6 grid grid-cols-2 gap-4 border-y border-line py-5">
                        {fp.rooms && (
                          <div>
                            <div className="text-xs uppercase tracking-wider text-graphite/50">Zimmer</div>
                            <div className="mt-1 font-serif text-lg font-semibold text-ink">{fp.rooms}</div>
                          </div>
                        )}
                        {fp.area && (
                          <div>
                            <div className="text-xs uppercase tracking-wider text-graphite/50">Wohnfläche</div>
                            <div className="mt-1 font-serif text-lg font-semibold text-ink">{fp.area}</div>
                          </div>
                        )}
                        {fp.outdoor && (
                          <div className="col-span-2">
                            <div className="text-xs uppercase tracking-wider text-graphite/50">Aussenbereich</div>
                            <div className="mt-1 text-sm font-medium text-ink">{fp.outdoor}</div>
                          </div>
                        )}
                      </div>

                      {fp.features && fp.features.length > 0 && (
                        <div className="mt-6">
                          <div className="text-xs font-bold uppercase tracking-[0.14em] text-graphite/60">
                            Grundriss-Highlights
                          </div>
                          <ul className="mt-3 space-y-2.5">
                            {fp.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2.5 text-sm text-graphite/80">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-line">
                      <button
                        type="button"
                        onClick={() => openLightbox(fp.image, [fp.image])}
                        className="inline-flex w-full items-center justify-center gap-2 border border-ink bg-ink py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-gold hover:text-ink hover:border-gold"
                      >
                        <Maximize2 className="h-4 w-4" /> Plan hochauflösend betrachten
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {/* ── TAB 3: Construction Documentation ── */}
      {activeTab === "construction" && hasConstruction && (
        <Reveal>
          <div className="border border-line bg-white p-8 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-line pb-6">
              <div>
                <span className="inline-block bg-gold/15 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-gold-deep">
                  {constructionUpdates.stage}
                </span>
                <h3 className="mt-2 font-serif text-2xl text-ink md:text-3xl">
                  {constructionUpdates.title}
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800 border border-emerald-200">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                {constructionUpdates.statusBadge}
              </div>
            </div>

            <p className="mt-6 text-base leading-relaxed text-graphite/80 max-w-3xl">
              {constructionUpdates.description}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {constructionUpdates.images.map((img, i) => (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    openLightbox(
                      img.src,
                      constructionUpdates.images.map((x) => x.src)
                    )
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    openLightbox(
                      img.src,
                      constructionUpdates.images.map((x) => x.src)
                    )
                  }
                  className="group relative cursor-pointer overflow-hidden border border-line bg-cream shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.caption}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-ink/20 opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity group-hover:opacity-100">
                      <Maximize2 className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-medium text-graphite/75 leading-relaxed">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Lightbox Modal ── */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Schliessen"
          >
            <X className="h-6 w-6" />
          </button>

          {lightboxImages.length > 1 && (
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

          <div
            className="relative flex h-[85vh] w-[90vw] max-w-6xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImages[lightboxIndex]}
              alt={`${title} - Ansicht ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs tracking-widest text-white/80 backdrop-blur-sm">
            {lightboxIndex + 1} / {lightboxImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
