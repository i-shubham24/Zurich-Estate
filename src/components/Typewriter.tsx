"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Typewriter({
  text,
  className = "",
  speed = 80,
  delay = 300,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Start delay
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, hasStarted]);

  return (
    <span className={`inline-block ${className}`}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ 
          duration: 0.8, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="inline-block w-[0.1em] h-[1em] bg-current ml-[2px] align-middle"
        style={{ transform: "translateY(-10%)" }}
      />
    </span>
  );
}
