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
        
        <div className="flex h-[68vh] w-full flex-col gap-2 lg:h-[75vh] lg:flex-row lg:gap-4">
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
                  
                  {/* Title text - left bottom, small, straight up */}
                  <div className="absolute inset-0">
                    <h3
                      className={`absolute whitespace-nowrap font-sans font-semibold uppercase tracking-[0.14em] text-white transition-all duration-700 ease-out [backface-visibility:hidden] [will-change:transform,opacity] text-[1.1rem] lg:text-[1.15rem] xl:text-[1.3rem] ${
                        isHovered
                          ? "bottom-8 left-8 lg:bottom-10 lg:left-8 rotate-0 origin-bottom-left opacity-100"
                          : "bottom-8 left-8 rotate-0 origin-bottom-left opacity-100 lg:bottom-6 lg:left-8 lg:-rotate-90 lg:origin-bottom-left"
                      }`}
                    >
                      {strip.title}
                    </h3>
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
