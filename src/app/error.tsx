"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-6 py-24 text-center">
      <p className="eyebrow text-gold-deep">Fehler</p>
      <h1 className="mt-4 font-serif text-4xl text-ink">Etwas ist schiefgelaufen</h1>
      <p className="mt-4 max-w-lg text-graphite/70">Bitte versuchen Sie es erneut. Falls das Problem bestehen bleibt, kontaktieren Sie uns.</p>
      <button onClick={reset} className="mt-8 rounded-full bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white">Erneut versuchen</button>
    </main>
  );
}
