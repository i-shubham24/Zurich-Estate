"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Typewriter({
  text,
  className = "",
  speed = 80,
  delay = 300,
  loop = true,
  loopDelay = 3000,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  loopDelay?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
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
    
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (loop && currentIndex === text.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(0);
      }, loopDelay);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text.length, speed, hasStarted, loop, loopDelay]);

  const Cursor = () => (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ 
        duration: 0.8, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="inline-block w-[0.1em] h-[1em] bg-current mx-[1px] align-middle"
      style={{ transform: "translateY(-10%)" }}
    />
  );

  return (
    <span className={`inline ${className}`}>
      {text.split("").map((char, i) => {
        const isCurrent = i === currentIndex;
        const isTyped = i < currentIndex;
        
        return (
          <span key={i}>
            {isCurrent && <Cursor />}
            <span className={isTyped ? "" : "opacity-0"}>{char}</span>
          </span>
        );
      })}
      {currentIndex === text.length && <Cursor />}
    </span>
  );
}
