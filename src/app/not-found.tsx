import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-6 py-24 text-center">
      <p className="eyebrow text-gold-deep">404 · Seite nicht gefunden</p>
      <h1 className="mt-4 font-serif text-4xl text-ink md:text-5xl">Seite nicht gefunden</h1>
      <p className="mt-4 max-w-lg text-graphite/70">Die gesuchte Seite existiert nicht oder wurde verschoben. Zurück zur Startseite oder Standort wählen.</p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="rounded-full bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white">Startseite</Link>
        <Link href="/immobilienmakler" className="rounded-full border border-line px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink">Standorte</Link>
      </div>
    </main>
  );
}
