"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

/**
 * Resets scroll to the top on every route change. Lenis (smooth scroll)
 * otherwise keeps the previous page's scroll position, which makes a nav
 * click look like it "did nothing" because you land mid-page.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Don't fight in-page anchor links (e.g. /#bewertung)
    if (typeof window !== "undefined" && window.location.hash) return;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}
