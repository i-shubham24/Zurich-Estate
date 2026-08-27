"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface FloatingImage {
  src: string;
  alt: string;
  width: string;
  height: string;
  left: string;
  top: string;
}

export default function FloatingGallery({
  title = "VIEW ALL PROJECTS",
  images,
  href = "/kaufen"
}: {
  title?: string;
  images: FloatingImage[];
  href?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Pin for a reasonable amount of scroll (not too much empty space)
    offset: ["start start", "end end"], 
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef} 
      // 400vh gives enough room to pin and animate all 6 images slowly
      className="relative flex h-[400vh] w-full items-start justify-center bg-ink"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        
        {/* Solid Text Behind Images */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <h2 className="text-center font-sans text-[clamp(2.5rem,7.5vw,8.5rem)] font-bold leading-[0.85] tracking-tighter text-white">
            {title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h2>
        </div>

        {/* Floating Images (z-10) */}
        {images.map((img, i) => {
          // Stagger the pop out animations
          const maxDelay = 0.4;
          const delay = (i / Math.max(1, images.length - 1)) * maxDelay;
          
          const popStart = 0.0 + delay;
          const popFull = 0.2 + delay;
          
          // All fade away together at the very end
          const hideStart = 0.8;
          const hideFull = 0.95;
          
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const xTransform = useTransform(smoothProgress, [popStart, popFull, hideStart, hideFull], ["50%", img.left, img.left, img.left]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const yTransform = useTransform(smoothProgress, [popStart, popFull, hideStart, hideFull], ["50%", img.top, img.top, "150%"]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const scale = useTransform(smoothProgress, [popStart, popFull, hideStart, hideFull], [0, 1, 1, 0.8]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(smoothProgress, [popStart, popFull, hideStart, hideFull], [0, 1, 1, 0]);

          return (
            <motion.div
              key={i}
              style={{
                left: xTransform,
                top: yTransform,
                scale,
                opacity,
                width: img.width,
                height: img.height,
                x: "-50%",
                y: "-50%",
              }}
              className="absolute z-10 overflow-hidden shadow-2xl brightness-90 transition-all duration-300 hover:z-50 hover:brightness-110 hover:scale-105"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>
          );
        })}

        {/* Hollow Text In Front of Images (z-20) */}
        <Link href={href} className="absolute inset-0 flex items-center justify-center z-20 group">
          <h2 
            className="text-center font-sans text-[clamp(2.5rem,7.5vw,8.5rem)] font-bold leading-[0.85] tracking-tighter text-transparent transition-colors duration-500 group-hover:text-gold/20"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}
          >
            {title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h2>
        </Link>
      </div>
    </section>
  );
}
