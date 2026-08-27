"use client";

import { motion, animate } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

export default function IntroCurtain() {
  const [shouldRender, setShouldRender] = useState(true);
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
    // The page was position:fixed while the curtain was up, so the smooth-scroll
    // library cached a zero-height document. Nudge it to re-measure now that the
    // page is scrollable again, otherwise anchor scrolls (e.g. #bewertung) clamp.
    requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
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

    // Hold long enough for the logo to draw, then wipe up.
    const controls = animate(0, 1, {
      duration: 1.5,
      onComplete: () => setTimeout(() => setWiping(true), 200),
    });

    // Hard safety net: never leave the page locked/covered.
    const failsafe = setTimeout(dismiss, 4200);

    return () => {
      controls.stop();
      clearTimeout(failsafe);
      unlockBody();
    };
  }, [dismiss, unlockBody]);

  // Once the wipe starts, guarantee dismissal even if the callback is missed.
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
        animate={{ opacity: wiping ? 0 : 1, y: wiping ? -40 : 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-7"
      >
        {/* OI monogram drawing itself in */}
        <svg
          width="92"
          height="92"
          viewBox="0 0 40 40"
          fill="none"
          aria-label="Optimal Immobilien AG"
        >
          <motion.circle
            cx="15"
            cy="20"
            r="11"
            stroke="#b8935e"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.15, ease: "easeInOut" }}
          />
          <motion.line
            x1="30"
            y1="9"
            x2="30"
            y2="31"
            stroke="#b8935e"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
          />
        </svg>

        {/* Wordmark fading up */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="font-sans text-xl font-semibold tracking-[0.32em] text-white sm:text-2xl">
            OPTIMAL
          </div>
          <div className="mt-2 font-sans text-[0.6rem] font-medium tracking-[0.4em] text-white/55 sm:text-xs">
            IMMOBILIEN AG
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
