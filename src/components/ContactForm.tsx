"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { submitContact } from "@/actions/valuation";

const contactSchema = z.object({
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  email: z.string().trim().email().max(100),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v === "" || /^[+()\-.\s\d]{5,30}$/.test(v), {
      message: "invalid phone",
    })
    .optional(),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional(),
});

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const first = parsed.error.issues[0];
      setError(
        first?.path?.[0] === "email"
          ? "Bitte geben Sie eine gültige E-Mail-Adresse ein."
          : first?.path?.[0] === "phone"
            ? "Bitte geben Sie eine gültige Telefonnummer ein."
            : first?.path?.[0] === "message"
              ? "Ihre Nachricht ist zu kurz (min. 10 Zeichen)."
              : "Bitte prüfen Sie Ihre Eingaben."
      );
      return;
    }
    setStatus("loading");
    try {
      const result = await submitContact(parsed.data);
      if (result.error) {
        setError(result.error);
        setStatus("idle");
        return;
      }
      localStorage.setItem("contact_last", String(Date.now()));
      setStatus("success");
    } catch {
      setError("Senden fehlgeschlagen. Bitte versuchen Sie es erneut.");
      setStatus("idle");
    }
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
