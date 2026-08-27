"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ParallaxImage from "./ParallaxImage";

export default function ArticleCard({
  href,
  image,
  title,
  category,
  excerpt,
}: {
  href: string;
  image: string;
  title: string;
  category: string;
  excerpt: string;
}) {
  return (
    <Link href={href} className="group flex flex-col w-full">
      {/* Image container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border border-line">
        <ParallaxImage src={image} alt={title} />
        
        {/* Pill Tag */}
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/95 border border-line px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-sm backdrop-blur-md">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="mt-6 flex flex-col">
        {/* Title and Arrow row */}
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl text-ink transition-colors duration-500 group-hover:text-gold-deep">
            {title}
          </h3>
          <ArrowRight className="h-5 w-5 text-ink transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold-deep" />
        </div>

        {/* Animated Divider */}
        <div className="mt-5 mb-5 h-[1px] w-0 bg-gold-deep transition-all duration-500 ease-out group-hover:w-full" />

        {/* Description */}
        <p className="text-sm leading-relaxed text-graphite/80 transition-colors duration-500 group-hover:text-gold-deep">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}
