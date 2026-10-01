"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";

type Phase = "typing" | "holdFull" | "deleting" | "holdEmpty";

const DICTIONARY: Record<string, string> = {
  "Sprechen Sie mit uns": "Get in touch with us",
  "provisionsfrei": "commission-free",
  "Zürich & Umgebung": "Zurich & surroundings",
  "Zürich": "Zurich",
  "Immobilienverkauf": "Property sales",
};

export default function Typewriter({
  text,
  textEn,
  className = "",
  speed = 85,
  deleteSpeed = 40,
  delay = 300,
  loop = true,
  holdFull = 2200,
  holdEmpty = 500,
}: {
  text: string;
  textEn?: string;
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
  loop?: boolean;
  holdFull?: number;
  holdEmpty?: number;
}) {
  const { lang } = useLanguage();
  const [isBrowserTranslated, setIsBrowserTranslated] = useState(false);

  // Detect browser translation (e.g. Google Chrome translate, which sets html.translated-ltr or lang="en")
  useEffect(() => {
    const checkTranslated = () => {
      if (typeof document === "undefined") return;
      const html = document.documentElement;
      const htmlLang = html.getAttribute("lang")?.toLowerCase() || "";
      const isEn =
        html.classList.contains("translated-ltr") ||
        html.classList.contains("translated-rtl") ||
        htmlLang.startsWith("en");
      setIsBrowserTranslated(!!isEn);
    };

    checkTranslated();
    const observer = new MutationObserver(checkTranslated);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "lang"],
    });
    return () => observer.disconnect();
  }, []);

  const effectiveEn = textEn || DICTIONARY[text];
  const activeText = (isBrowserTranslated || lang === "en") && effectiveEn ? effectiveEn : text;

  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [mounted, setMounted] = useState(false);

  // Reset typing when language changes
  useEffect(() => {
    setCount(0);
    setPhase("typing");
  }, [activeText]);

  // useLayoutEffect fires synchronously before the browser paints
  useLayoutEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  // Drive the type / hold / erase cycle
  useEffect(() => {
    if (!mounted) return;
    let t: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (count < activeText.length) {
        t = setTimeout(() => setCount((c) => c + 1), speed);
      } else {
        setPhase("holdFull");
      }
    } else if (phase === "holdFull") {
      if (loop) t = setTimeout(() => setPhase("deleting"), holdFull);
    } else if (phase === "deleting") {
      if (count > 0) {
        t = setTimeout(() => setCount((c) => c - 1), deleteSpeed);
      } else {
        setPhase("holdEmpty");
      }
    } else if (phase === "holdEmpty") {
      t = setTimeout(() => setPhase("typing"), holdEmpty);
    }

    return () => clearTimeout(t);
  }, [phase, count, mounted, activeText.length, speed, deleteSpeed, loop, holdFull, holdEmpty]);

  // Server and pre-mount: render the full text invisibly to reserve space
  const displayed = mounted ? activeText.slice(0, count) : "";
  const hidden = mounted ? activeText.slice(count) : activeText;

  return (
    <span className={`inline-block ${className}`}>
      <span>{displayed}</span>
      <span className="invisible" aria-hidden="true">{hidden}</span>
      {mounted && (
        <span
          aria-hidden="true"
          className="typewriter-caret ml-[2px] inline-block h-[0.9em] w-[2px] translate-y-[0.06em] bg-current align-baseline"
        />
      )}
    </span>
  );
}
