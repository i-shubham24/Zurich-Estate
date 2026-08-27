"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    // Mock successful submission after 1s
    setTimeout(() => {
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
            <input required type="text" id="firstName" className="w-full border border-line bg-sand/50 px-4 py-3 text-ink outline-none transition-colors focus:border-gold focus:bg-white" />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs font-semibold uppercase tracking-wider text-graphite/70 mb-2">Nachname</label>
            <input required type="text" id="lastName" className="w-full border border-line bg-sand/50 px-4 py-3 text-ink outline-none transition-colors focus:border-gold focus:bg-white" />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-graphite/70 mb-2">E-Mail Adresse</label>
          <input required type="email" id="email" className="w-full border border-line bg-sand/50 px-4 py-3 text-ink outline-none transition-colors focus:border-gold focus:bg-white" />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-graphite/70 mb-2">Telefonnummer</label>
          <input type="tel" id="phone" className="w-full border border-line bg-sand/50 px-4 py-3 text-ink outline-none transition-colors focus:border-gold focus:bg-white" />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-graphite/70 mb-2">Nachricht</label>
          <textarea required id="message" rows={4} className="w-full border border-line bg-sand/50 px-4 py-3 text-ink outline-none transition-colors focus:border-gold focus:bg-white resize-none"></textarea>
        </div>
        
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
