"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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

  // Drive parallax straight from the scroll progress. Lenis already smooths
  // the scroll, so adding a spring on top double-smooths and causes the
  // rubber-band jitter, this glides instead. Small range keeps it subtle.
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        className="h-full w-full"
      >
        {/* scale-115 overscans so the ±6% parallax shift never reveals edges */}
        <motion.div
          style={{ y, willChange: "transform", backfaceVisibility: "hidden" }}
          className="relative h-full w-full origin-center scale-[1.15]"
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
