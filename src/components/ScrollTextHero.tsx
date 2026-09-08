"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui";

export default function ScrollTextHero({
  title1 = "IHR IMMOBILIENMAKLER",
  title2 = "PROVISIONSFREI",
  subtitle = "Wir verkaufen Ihre Immobilie zum Fixpreis. Kein Risiko, keine versteckten Kosten.",
  image = "/projekte/residenz-aussenansicht-1.jpg",
}: {
  title1?: string;
  title2?: string;
  subtitle?: string | React.ReactNode;
  image?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        window.matchMedia("(max-width: 767px), (pointer: coarse)").matches
      );
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // Track the hero section from the top of the page until it exits the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Desktop parallax transforms: smooth 0 -> target translation
  const desktopImageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const desktopTextY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45, 0.9], [1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative flex h-[100svh] min-h-[600px] md:h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink"
    >
      {/* Background Image: Static on mobile to prevent compositor/JS desync jitter; parallax on desktop */}
      <motion.div 
        style={isTouchDevice ? undefined : { y: desktopImageY }} 
        className="absolute inset-0 z-0 h-full w-full md:-top-[10%] md:h-[120%]"
      >
        <Image
          src={image}
          alt="Luxuriöse Immobilie in Zürich mit Seesicht — Optimal Immobilien AG, Fixpreis CHF 12&apos;000"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={75}
          className="object-cover opacity-60"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-transparent" />
      </motion.div>

      {/* Hero content: Native 120fps scroll momentum on mobile; subtle parallax on desktop */}
      <motion.div 
        style={isTouchDevice ? { opacity: textOpacity } : { y: desktopTextY, opacity: textOpacity }} 
        className="relative z-10 flex w-full flex-col items-center px-4 text-center"
      >
        <h1 className="font-sans text-[clamp(1.5rem,4.5vw,4rem)] font-bold uppercase leading-[1] tracking-wide text-white drop-shadow-2xl">
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
      <motion.div 
        style={{ opacity: textOpacity }}
        className="absolute bottom-10 z-20 flex flex-col items-center text-xs tracking-[0.2em] text-white/60"
      >
        <span>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="mt-2 text-white/40"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
