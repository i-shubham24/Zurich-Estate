"use client";

import { useEffect, useState } from "react";

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
  const [started, setStarted] = useState(false);

  // Initial start delay
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  // Drive the type / hold / erase cycle
  useEffect(() => {
    if (!started) return;
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
  }, [phase, count, started, text.length, speed, deleteSpeed, loop, holdFull, holdEmpty]);

  return (
    <span className={`inline-block whitespace-pre ${className}`}>
      {/* Reserve the full width so the heading never shifts as characters
          appear or disappear; only opacity toggles. */}
      {text.split("").map((char, i) => (
        <span key={i} className={i < count ? "" : "opacity-0"}>
          {char}
        </span>
      ))}
      <span
        aria-hidden="true"
        className="typewriter-caret ml-[2px] inline-block h-[0.9em] w-[2px] translate-y-[0.06em] bg-current align-baseline"
      />
    </span>
  );
}
