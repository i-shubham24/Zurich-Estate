"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Marquee({
  children,
  speed = 40,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <div className={`relative flex w-full overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <div className="flex px-4">{children}</div>
        <div className="flex px-4">{children}</div>
      </motion.div>
    </div>
  );
}
