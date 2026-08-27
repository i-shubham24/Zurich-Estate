"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ParallaxImage({
  src,
  alt,
  priority = false,
  quality = 82,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth the raw scroll progress with a spring so the parallax glides
  // instead of jittering frame-to-frame (especially under lenis smooth-scroll).
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  });
  const y = useTransform(smooth, [0, 1], ["-7%", "7%"]);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        className="h-full w-full"
      >
        {/* scale-125 overscans so the ±7% parallax shift never reveals edges */}
        <motion.div
          style={{ y, willChange: "transform" }}
          className="relative h-full w-full origin-center scale-125"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            quality={quality}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
