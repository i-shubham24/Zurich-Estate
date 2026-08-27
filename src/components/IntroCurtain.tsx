"use client";

import { motion, animate } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

export default function IntroCurtain() {
  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(0);
  const [wiping, setWiping] = useState(false);

  const unlockBody = useCallback(() => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.overflow = "";
  }, []);

  const dismiss = useCallback(() => {
    unlockBody();
    setShouldRender(false);
  }, [unlockBody]);

  useEffect(() => {

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Lock scroll while the curtain is up
    document.body.style.position = "fixed";
    document.body.style.top = "0";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "instant" });

    const controls = animate(0, 100, {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (val) => setProgress(Math.round(val)),
      onComplete: () => setTimeout(() => setWiping(true), 250),
    });

    // Hard safety net: no matter what, never leave the page locked/covered.
    const failsafe = setTimeout(dismiss, 4000);

    return () => {
      controls.stop();
      clearTimeout(failsafe);
      unlockBody();
    };
  }, [dismiss, unlockBody]);

  // Once the wipe starts, guarantee dismissal even if the animation callback
  // is missed for any reason.
  useEffect(() => {
    if (!wiping) return;
    const t = setTimeout(dismiss, 1600);
    return () => clearTimeout(t);
  }, [wiping, dismiss]);

  if (!shouldRender) return null;

  return (
    <motion.div
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={{ clipPath: wiping ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (wiping) dismiss();
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
