"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Typewriter from "@/components/Typewriter";
import { ButtonLink } from "@/components/ui";

export default function ScrollTextHero({
  title1 = "IHR IMMOBILIENMAKLER",
  title2 = "PROVISIONSFREI",
  subtitle = "Wir verkaufen Ihre Immobilie zum Fixpreis. Kein Risiko, keine versteckten Kosten.",
  image = "/projekte/residenz-aussenansicht-1.jpg",
}: {
  title1?: string;
  title2?: string;
  subtitle?: string;
  image?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Spring-smoothed progress → glassy parallax instead of frame jitter
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  });

  // Background image moves slightly slower than normal scroll
  const imageY = useTransform(progress, [0, 1], ["-8%", "8%"]);

  // Text drifts up, creating a gentle parallax overlap effect
  const textY = useTransform(progress, [0, 1], ["12%", "-28%"]);
  const textOpacity = useTransform(progress, [0, 0.35, 0.7, 1], [1, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative flex h-[120vh] w-full flex-col items-center justify-center overflow-hidden bg-ink"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 z-0 h-[120%] w-full">
        <Image
          src={image}
          alt="Hero Architecture"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-transparent" />
      </motion.div>

      <motion.div 
        style={{ y: textY, opacity: textOpacity }} 
        className="relative z-10 flex w-full flex-col items-center px-4 text-center"
      >
        <h1 className="font-sans text-[clamp(2rem,6vw,5rem)] font-bold uppercase leading-[1] tracking-wide text-white drop-shadow-2xl">
          <span className="block">{title1}</span>
          <span className="block italic text-gold">
            {title2}
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-sm font-medium tracking-widest text-white/80 md:text-base">
          {subtitle}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <ButtonLink href="/#bewertung" variant="gold">
            Kostenlose Bewertung
          </ButtonLink>
          <ButtonLink href="/immobilie-verkaufen" variant="ghost">
            So verkaufen wir
          </ButtonLink>
        </div>
      </motion.div>

      {/* Scroll indicator at the bottom */}
      <div className="absolute bottom-10 z-20 flex flex-col items-center text-xs tracking-[0.2em] text-white/60">
        <span>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="mt-2 text-white/40"
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}
