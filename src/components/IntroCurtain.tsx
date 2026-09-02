"use client";

import { motion, animate } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

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

    // Fast curtain for prod — show logo briefly then wipe
    const controls = animate(0, 1, {
      duration: 0.9,
      onComplete: () => setTimeout(() => setWiping(true), 150),
    });

    // Hard safety net: never leave the page locked/covered.
    const failsafe = setTimeout(dismiss, 2500);

    return () => {
      controls.stop();
      clearTimeout(failsafe);
      unlockBody();
    };
  }, [dismiss, unlockBody]);

  // Once the wipe starts, guarantee dismissal even if the callback is missed.
  useEffect(() => {
    if (!wiping) return;
    const t = setTimeout(dismiss, 900);
    return () => clearTimeout(t);
  }, [wiping, dismiss]);

  if (!shouldRender) return null;

  return (
    <motion.div
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={{ clipPath: wiping ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (wiping) dismiss();
      }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink"
    >
      <motion.div
        animate={{ opacity: wiping ? 0 : 1, y: wiping ? -40 : 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/brand/optimal-logo-transparent.png"
            alt="Optimal Immobilien AG"
            width={916}
            height={220}
            priority
            className="h-[52px] w-auto object-contain md:h-[64px]"
          />
        </motion.div>
        <motion.p
          className="eyebrow text-gold-bright/70"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Provisionsfrei · Fixpreis CHF 12'000
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
