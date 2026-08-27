"use client";

import { motion, animate } from "framer-motion";
import { useState, useEffect } from "react";

export default function IntroCurtain() {
  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(0);
  const [wiping, setWiping] = useState(false);

  useEffect(() => {
    // Only run the curtain once per session
    if (sessionStorage.getItem("intro_played")) {
      setShouldRender(false);
      return;
    }

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Bulletproof scroll lock: fix the body in place so Lenis and the browser CANNOT scroll
    document.body.style.position = "fixed";
    document.body.style.top = "0";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "instant" });

    // Animate 0 to 100 for buffering effect
    const controls = animate(0, 100, {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1], // smooth ease out
      onUpdate: (val) => setProgress(Math.round(val)),
      onComplete: () => {
        // Start the wipe up animation after a tiny pause
        setTimeout(() => setWiping(true), 250);
      }
    });

    return () => {
      controls.stop();
      // Cleanup safety
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleWipeComplete = () => {
    // Unlock the body fully
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.overflow = "";
    
    sessionStorage.setItem("intro_played", "true");
    setShouldRender(false);
  };

  if (!shouldRender) return null;

  return (
    <motion.div
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={{ clipPath: wiping ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={(def) => {
        // @ts-ignore
        if (def.clipPath === "inset(0% 0% 100% 0%)") handleWipeComplete();
      }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink"
    >
      <motion.div 
        animate={{ opacity: wiping ? 0 : 1, y: wiping ? -50 : 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <div className="font-sans text-[clamp(2.5rem,8vw,6rem)] font-bold leading-none tracking-tighter text-gold">
          {progress}%
        </div>
      </motion.div>
    </motion.div>
  );
}
