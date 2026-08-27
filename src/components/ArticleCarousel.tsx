"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import { type Guide } from "@/lib/guides";

export default function ArticleCarousel({ items }: { items: Guide[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Scroll Buttons */}
      <div className="absolute -top-16 right-0 hidden items-center gap-2 md:flex">
        <button
          onClick={scrollLeft}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold hover:text-gold"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={scrollRight}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold hover:text-gold"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-8 scrollbar-hide sm:mx-0 sm:w-full sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((g) => (
          <div key={g.slug} className="w-[85vw] min-w-[300px] max-w-[400px] shrink-0 snap-start sm:w-[350px]">
            <ArticleCard
              href={`/ratgeber/${g.slug}`}
              image={g.image}
              title={g.title}
              category={g.category}
              excerpt={g.excerpt}
            />
          </div>
        ))}
      </div>
      
      {/* Hide scrollbar with inline style for webkit */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </div>
  );
}
