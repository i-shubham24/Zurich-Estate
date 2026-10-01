"use client";

import { useEffect, useLayoutEffect, useState } from "react";

type Phase = "typing" | "holdFull" | "deleting" | "holdEmpty";

export default function Typewriter({
  text,
  className = "",
  speed = 85,
  deleteSpeed = 40,
  delay = 300,
  loop = true,
  holdFull = 2200,
  holdEmpty = 500,
}: {
  text: string;
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
  loop?: boolean;
  holdFull?: number;
  holdEmpty?: number;
}) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [mounted, setMounted] = useState(false);

  // useLayoutEffect fires synchronously before the browser paints
  // → no visible flash when switching from SSR invisible text to typed output
  useLayoutEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  // Drive the type / hold / erase cycle
  useEffect(() => {
    if (!mounted) return;
    let t: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (count < text.length) {
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
  }, [phase, count, mounted, text.length, speed, deleteSpeed, loop, holdFull, holdEmpty]);

  // Server and pre-mount: render the full text invisibly to reserve space
  // Client after mount: show typed characters
  const displayed = mounted ? text.slice(0, count) : "";
  const hidden = mounted ? text.slice(count) : text;

  return (
    // translate="no" keeps browser auto-translation (e.g. Chrome) from rewriting
    // these text nodes while the animation is mutating them, which otherwise
    // collides with React and produces duplicated / glitched text.
    <span translate="no" className={`notranslate inline-block ${className}`}>
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
