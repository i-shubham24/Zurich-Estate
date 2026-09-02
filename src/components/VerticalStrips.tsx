"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Strip {
  id: string;
  title: string;
  image: string;
  href: string;
}

export default function VerticalStrips({
  title = "FEATURED PROJECTS",
  subtitle,
  strips,
}: {
  title?: string;
  subtitle?: string;
  strips: Strip[];
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section className="bg-ink py-16 text-white overflow-hidden md:py-20">
      <div className="container-lux">
        <p className="eyebrow text-gold-bright/80">Aktuell verfügbar</p>
        <h2 className="mt-3 mb-3 font-serif text-3xl font-medium tracking-tight md:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-white/60">
            {subtitle}
          </p>
        )}
        
        <div className="flex h-[85vh] w-full flex-col gap-2 md:h-[75vh] md:flex-row md:gap-4">
          {strips.map((strip, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={strip.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setHoveredIndex(index)}
                className="group relative h-full w-full cursor-pointer overflow-hidden rounded-sm transition-all duration-700 ease-out"
                style={{ flex: isHovered ? 3 : 1 }}
              >
                <Link href={strip.href} className="absolute inset-0 block h-full w-full">
                  <Image
                    src={strip.image}
                    alt={strip.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-75" />
                  
                  {/* Title text - always visible on mobile, rotated only on desktop */}
                  <div className="absolute bottom-0 left-0 flex h-full w-full flex-col justify-end p-4 md:p-8">
                    <div className="relative w-full">
                      <h3
                        className={`absolute bottom-0 left-0 origin-bottom-left transform-gpu whitespace-nowrap font-sans text-xl font-bold uppercase tracking-widest text-white transition-[transform,opacity] duration-700 ease-out [backface-visibility:hidden] [will-change:transform,opacity] md:text-4xl ${
                          isHovered
                            ? "rotate-0 opacity-100"
                            : "rotate-0 opacity-100 md:-rotate-90 md:translate-y-[200px]"
                        }`}
                      >
                        {strip.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
