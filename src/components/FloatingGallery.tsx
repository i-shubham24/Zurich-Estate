"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue, useReducedMotion } from "framer-motion";
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

function FloatingItem({
  img,
  progress,
  delay,
}: {
  img: FloatingImage;
  progress: MotionValue<number>;
  delay: number;
}) {
  const shouldReduce = useReducedMotion();
  const popStart = delay;
  const popFull = 0.2 + delay;
  const hideStart = 0.8;
  const hideFull = 0.95;
  const xTransform = useTransform(progress, [popStart, popFull, hideStart, hideFull], ["50%", img.left, img.left, img.left]);
  const yTransform = useTransform(progress, [popStart, popFull, hideStart, hideFull], ["50%", img.top, img.top, "150%"]);
  const scale = useTransform(progress, [popStart, popFull, hideStart, hideFull], [0, 1, 1, 0.8]);
  const opacity = useTransform(progress, [popStart, popFull, hideStart, hideFull], [0, 1, 1, 0]);

  if (shouldReduce) {
    return (
      <div
        className="absolute overflow-hidden shadow-2xl brightness-90"
        style={{
          left: img.left,
          top: img.top,
          width: img.width,
          height: img.height,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
      </div>
    );
  }

  return (
    <motion.div
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
      <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
    </motion.div>
  );
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
      className="relative flex h-[180dvh] w-full items-start justify-center bg-ink"
    >
      <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden">
        
        {/* Solid Text Behind Images - de-emphasized */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
          <p className="eyebrow mb-4 text-gold-bright/70">Ausgewählte Objekte</p>
          <h2 className="text-center font-serif text-[clamp(2rem,5vw,5.5rem)] font-medium leading-[0.9] tracking-tight text-white">
            {title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h2>
          <span className="mt-4 text-xs uppercase tracking-[0.18em] text-transparent">Alle ansehen →</span>
        </div>

        {images.map((img, i) => {
          const maxDelay = 0.4;
          const delay = (i / Math.max(1, images.length - 1)) * maxDelay;
          return <FloatingItem key={i} img={img} progress={smoothProgress} delay={delay} />;
        })}

        {/* Hollow Text In Front of Images (z-20) - de-emphasized */}
        <Link href={href} className="absolute inset-0 flex flex-col items-center justify-center z-20 group">
          <p className="eyebrow mb-4 text-transparent">Ausgewählte Objekte</p>
          <h2 
            className="text-center font-serif text-[clamp(2rem,5vw,5.5rem)] font-medium leading-[0.9] tracking-tight text-transparent transition-colors duration-500 group-hover:text-gold/20"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}
          >
            {title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h2>
          <span className="mt-4 text-xs uppercase tracking-[0.18em] text-white/50 group-hover:text-gold-bright">Alle ansehen →</span>
        </Link>
      </div>
    </section>
  );
}
