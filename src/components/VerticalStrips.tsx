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
  strips,
}: {
  title?: string;
  strips: Strip[];
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section className="bg-ink py-24 text-white overflow-hidden">
      <div className="container-lux">
        <h2 className="mb-12 font-sans text-4xl font-bold uppercase tracking-tight md:text-6xl">
          {title}
        </h2>
        
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
                  
                  {/* Title text */}
                  <div className="absolute bottom-0 left-0 flex h-full w-full flex-col justify-end p-4 md:p-8">
                    <div className="relative w-full">
                      <h3
                        className={`absolute bottom-0 left-0 font-sans text-xl font-bold uppercase tracking-widest text-white transition-all duration-700 ease-out md:text-4xl ${
                          isHovered 
                            ? "rotate-0 origin-bottom-left opacity-100" 
                            : "origin-bottom-left whitespace-nowrap opacity-0 md:opacity-100 md:-rotate-90 md:translate-y-[200px]"
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
