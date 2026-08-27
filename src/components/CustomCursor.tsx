"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Slower springs for the outer ring (creates the "chasing" lag effect)
  const ringX = useSpring(mouseX, { stiffness: 100, damping: 25, mass: 1 });
  const ringY = useSpring(mouseY, { stiffness: 100, damping: 25, mass: 1 });

  // Very fast springs for the inner dot (almost instant tracking)
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 40, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 40, mass: 0.1 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Check if hovering over a clickable element
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    // Hide when mouse leaves window
    const handleMouseLeave = () => setIsVisible(false);
    
    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Ring - Lags slightly behind */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold mix-blend-difference md:block"
        style={{ x: ringX, y: ringY, opacity: isVisible ? 1 : 0 }}
        animate={{ 
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(207, 181, 59, 0.1)" : "rgba(0, 0, 0, 0)"
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Inner Dot - Tracks the mouse instantly */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold mix-blend-difference md:block"
        style={{ x: dotX, y: dotY, opacity: isVisible ? 1 : 0 }}
        animate={{ 
          scale: isHovering ? 0 : 1 
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
