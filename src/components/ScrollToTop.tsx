"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

const HEADER_OFFSET = 90;

/**
 * Scroll behaviour manager for the lenis smooth-scroll root:
 *  - On route change, scroll to the top (lenis otherwise keeps the old
 *    position), or to the hash target if the URL carries one.
 *  - Intercept in-page hash links (e.g. "/#bewertung") and scroll to the
 *    element. lenis.scrollTo clamps large targets to a stale document height
 *    after the intro curtain, so we use native smooth scroll for anchors,
 *    which lenis follows reliably.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = useLenis() as any;

  const scrollToEl = (el: Element) => {
    const targetY = Math.max(
      0,
      window.scrollY + el.getBoundingClientRect().top - HEADER_OFFSET
    );
    // Pause lenis so it stops intercepting/clamping, let the browser do a
    // native smooth scroll, then resume lenis synced to the new position.
    if (lenis && typeof lenis.stop === "function") {
      lenis.stop();
      window.scrollTo({ top: targetY, behavior: "smooth" });
      window.setTimeout(() => {
        try {
          lenis.start();
        } catch {}
      }, 1000);
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (hash && hash.length > 1) {
      let tries = 0;
      const go = () => {
        const el = document.querySelector(hash);
        if (el) scrollToEl(el);
        else if (tries++ < 20) setTimeout(go, 50);
      };
      setTimeout(go, 80);
    } else if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, lenis]);

  // Smooth-scroll in-page hash links (capture phase, before Next's Link).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.includes("#")) return;
      const id = href.slice(href.indexOf("#"));
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return; // target is on another page → let the link navigate
      e.preventDefault();
      scrollToEl(el);
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis]);

  return null;
}
