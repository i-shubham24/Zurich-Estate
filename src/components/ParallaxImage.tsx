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
  
  // Parallax subtle translation
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        className="h-full w-full"
      >
        <motion.div style={{ y }} className="relative h-full w-full scale-125 origin-center">
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
