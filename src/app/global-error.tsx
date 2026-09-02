"use client";
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="de-CH">
      <body className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
        <h1 className="font-serif text-3xl text-ink">Fehler</h1>
        <p className="mt-3 text-graphite/70">Ein unerwarteter Fehler ist aufgetreten.</p>
        <button onClick={reset} className="mt-6 rounded-full bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white">Neu laden</button>
      </body>
    </html>
  );
}
