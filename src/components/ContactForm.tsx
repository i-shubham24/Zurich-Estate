"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email().max(100),
  phone: z.string().max(30).optional(),
  message: z.string().min(10).max(2000),
  website: z.string().max(0).optional(),
});

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<number | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const data = {
      firstName: String(fd.get("firstName") || ""),
      lastName: String(fd.get("lastName") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""),
    };
    if (data.website) return;
    const last = typeof window !== "undefined" ? Number(localStorage.getItem("contact_last") || 0) : 0;
    if (Date.now() - last < 30_000) {
      setError("Bitte warten Sie kurz vor der nächsten Anfrage.");
      return;
    }
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setError("Bitte prüfen Sie Ihre Eingaben.");
      return;
    }
    setStatus("loading");
    localStorage.setItem("contact_last", String(Date.now()));
    // TODO: replace with Server Action + Turnstile/arcjet: await fetch("/api/kontakt", ...)
    timer.current = window.setTimeout(() => {
      setStatus("success");
    }, 1000);
  };

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center border border-ink/8 bg-white p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold-deep mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-serif text-2xl text-ink">Vielen Dank!</h3>
        <p className="mt-4 text-graphite/80">Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.</p>
      </div>
    );
  }

  return (
    <div className="border border-ink/8 bg-white p-8 md:p-10">
      <h2 className="font-serif text-2xl text-ink">Schreiben Sie uns</h2>
      <p className="mt-3 text-sm text-graphite/70 mb-8">Füllen Sie das Formular aus und wir melden uns zeitnah bei Ihnen.</p>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-xs font-semibold uppercase tracking-wider text-graphite/70 mb-2">Vorname</label>
            <input required type="text" id="firstName" name="firstName" autoComplete="given-name" maxLength={50} className="w-full border border-line bg-sand/50 px-4 py-3 text-ink outline-none transition-colors focus:border-gold focus:bg-white focus-visible:ring-2 focus-visible:ring-gold" />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs font-semibold uppercase tracking-wider text-graphite/70 mb-2">Nachname</label>
            <input required type="text" id="lastName" name="lastName" autoComplete="family-name" maxLength={50} className="w-full border border-line bg-sand/50 px-4 py-3 text-ink outline-none transition-colors focus:border-gold focus:bg-white focus-visible:ring-2 focus-visible:ring-gold" />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-graphite/70 mb-2">E-Mail Adresse</label>
          <input required type="email" id="email" name="email" autoComplete="email" maxLength={100} className="w-full border border-line bg-sand/50 px-4 py-3 text-ink outline-none transition-colors focus:border-gold focus:bg-white focus-visible:ring-2 focus-visible:ring-gold" />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-graphite/70 mb-2">Telefonnummer</label>
          <input type="tel" id="phone" name="phone" autoComplete="tel" maxLength={30} className="w-full border border-line bg-sand/50 px-4 py-3 text-ink outline-none transition-colors focus:border-gold focus:bg-white focus-visible:ring-2 focus-visible:ring-gold" />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-graphite/70 mb-2">Nachricht</label>
          <textarea required id="message" name="message" rows={4} maxLength={2000} className="w-full border border-line bg-sand/50 px-4 py-3 text-ink outline-none transition-colors focus:border-gold focus:bg-white focus-visible:ring-2 focus-visible:ring-gold resize-none"></textarea>
        </div>
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        {/* Turnstile placeholder: <div className="cf-turnstile" data-sitekey="..." /> */}
        
        <button 
          type="submit" 
          disabled={status === "loading"}
          className="group flex w-full items-center justify-center gap-2 bg-ink py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-slate disabled:opacity-50"
        >
          {status === "loading" ? "Sende..." : "Nachricht senden"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}
