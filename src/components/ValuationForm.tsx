"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, KeyRound, TrendingUp, MapPin, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5;

const anliegen = [
  { v: "Verkaufen", icon: Home, hint: "Immobilie verkaufen" },
  { v: "Kaufen", icon: KeyRound, hint: "Immobilie kaufen" },
  { v: "Investieren", icon: TrendingUp, hint: "In Immobilien investieren" },
];

const timeframes = [
  "So schnell wie möglich",
  "In 1 bis 3 Monaten",
  "In 3 bis 6 Monaten",
  "Ich informiere mich nur",
];

export default function ValuationForm() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    intent: "",
    timeframe: "",
    location: "",
    name: "",
    contact: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, 5) as Step);
  const prev = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const select = (field: string, value: string) => {
    setFormData((d) => ({ ...d, [field]: value }));
    setTimeout(next, 350);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(next, 700);
  };

  const optionBase =
    "p-6 border text-left transition-all duration-200 hover:border-gold hover:bg-gold/[0.04]";

  return (
    <div
      id="bewertung-form"
      className="relative flex min-h-[420px] w-full flex-col overflow-hidden border-t-2 border-gold bg-white shadow-[var(--shadow-luxe)]"
    >
      {step < 5 && (
        <div className="h-1 w-full bg-sand">
          <div
            className="h-full bg-gold transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      )}

      <div className="flex flex-grow flex-col justify-center p-8 md:p-12">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}>
              <p className="eyebrow text-gold-deep">Schritt 1 von 4</p>
              <h3 className="mt-3 font-serif text-2xl text-ink md:text-3xl">Wie können wir Ihnen helfen?</h3>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {anliegen.map(({ v, icon: Icon, hint }) => (
                  <button
                    key={v}
                    onClick={() => select("intent", v)}
                    className={`${optionBase} flex flex-col items-center gap-3 text-center ${
                      formData.intent === v ? "border-gold bg-gold/[0.06]" : "border-line"
                    }`}
                  >
                    <Icon className="h-9 w-9 text-graphite" strokeWidth={1.3} />
                    <span className="font-medium text-ink">{v}</span>
                    <span className="text-xs leading-tight text-graphite/60">{hint}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}>
              <p className="eyebrow text-gold-deep">Schritt 2 von 4</p>
              <h3 className="mt-3 font-serif text-2xl text-ink md:text-3xl">In welchem Zeitrahmen?</h3>
              <div className="mt-8 flex flex-col gap-3">
                {timeframes.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => select("timeframe", opt)}
                    className={`${optionBase} ${formData.timeframe === opt ? "border-gold bg-gold/[0.06]" : "border-line"}`}
                  >
                    <span className="font-medium text-ink">{opt}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}>
              <p className="eyebrow text-gold-deep">Schritt 3 von 4</p>
              <h3 className="mt-3 font-serif text-2xl text-ink md:text-3xl">Um welche Region geht es?</h3>
              <div className="relative mt-8">
                <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-graphite/50" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData((d) => ({ ...d, location: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && formData.location && next()}
                  className="w-full border border-line bg-sand/50 py-4 pl-12 pr-4 text-lg text-ink outline-none transition-colors focus:border-gold focus:bg-white"
                  placeholder="PLZ oder Ort (z. B. 8700 Küsnacht)"
                  autoFocus
                />
              </div>
              <button
                onClick={next}
                disabled={!formData.location}
                className="mt-6 flex w-full items-center justify-center gap-2 bg-ink py-4 font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-slate disabled:cursor-not-allowed disabled:opacity-40"
              >
                Weiter <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}>
              <p className="eyebrow text-gold-deep">Fast geschafft</p>
              <h3 className="mt-3 font-serif text-2xl text-ink md:text-3xl">Wie erreichen wir Sie?</h3>
              <form onSubmit={submit} className="mt-8 space-y-4">
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                  className="w-full border border-line bg-sand/50 px-4 py-4 text-ink outline-none transition-colors focus:border-gold focus:bg-white"
                  placeholder="Ihr Name"
                />
                <input
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData((d) => ({ ...d, contact: e.target.value }))}
                  className="w-full border border-line bg-sand/50 px-4 py-4 text-ink outline-none transition-colors focus:border-gold focus:bg-white"
                  placeholder="Telefonnummer"
                />
                <button
                  type="submit"
                  className="w-full bg-gold py-4 font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-gold-bright"
                >
                  Kostenlose Beratung anfragen
                </button>
                <p className="flex items-center justify-center gap-2 pt-1 text-xs text-graphite/60">
                  <ShieldCheck className="h-4 w-4 text-gold" /> Diskret &amp; unverbindlich. Keine Weitergabe an Dritte.
                </p>
              </form>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-gold">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="font-serif text-3xl text-ink">Vielen Dank!</h3>
              <p className="mx-auto mt-4 max-w-sm text-graphite/80">
                Wir haben Ihre Anfrage erhalten und melden uns innert 24 Stunden persönlich
                bei Ihnen, provisionsfrei und unverbindlich.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step > 1 && step < 5 && (
        <div className="flex justify-start border-t border-line bg-sand/50 p-4">
          <button
            type="button"
            onClick={prev}
            className="flex items-center gap-2 text-sm font-medium text-graphite/70 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Zurück
          </button>
        </div>
      )}
    </div>
  );
}
