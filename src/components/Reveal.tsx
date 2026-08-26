"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** entrance delay in ms */
  delay?: number;
  as?: ElementType;
  /** re-trigger every time it enters view */
  repeat?: boolean;
};

/**
 * Progressive-enhancement scroll reveal. Children render immediately in SSR
 * markup (fully visible without JS via the `.js`-gated CSS in globals.css);
 * once hydrated we hide-then-reveal as the element scrolls into view.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  repeat = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!repeat) observer.unobserve(el);
        } else if (repeat) {
          setInView(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [repeat]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={delay ? ({ ["--reveal-delay" as string]: `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
