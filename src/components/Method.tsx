import { Sparkles, ShieldCheck, Heart, KeyRound } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHeading } from "./ui";

const steps = [
  {
    icon: Sparkles,
    stage: "01 — Hook",
    title: "Aufmerksamkeit in 3 Sekunden",
    desc: "Hochwertige Visualisierungen, ein präzises Exposé und ein klares Versprechen. Ihr Objekt fällt sofort auf – bei den richtigen Käufern.",
  },
  {
    icon: ShieldCheck,
    stage: "02 — Trust",
    title: "Vertrauen durch Fakten",
    desc: "Datenbasierte Bewertung, transparente Zahlen und echte Referenzen. Kaufinteressenten wissen sofort, dass hier professionell verkauft wird.",
  },
  {
    icon: Heart,
    stage: "03 — Desire",
    title: "Emotion statt Aufzählung",
    desc: "Wir verkaufen nicht Quadratmeter, sondern ein Lebensgefühl. So entsteht der Wunsch, der die Zahlungsbereitschaft nach oben treibt.",
  },
  {
    icon: KeyRound,
    stage: "04 — Action",
    title: "Der reibungslose Abschluss",
    desc: "Ein klarer nächster Schritt, ein strukturiertes Bieterverfahren und die vollständige Abwicklung bis zur Beurkundung – ohne Reibung.",
  },
];

export default function Method({
  tone = "onLight",
}: {
  tone?: "onLight" | "onDark";
}) {
  const cardBg =
    tone === "onDark"
      ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
      : "border-line bg-white hover:shadow-[var(--shadow-luxe)]";
  const descColor = tone === "onDark" ? "text-white/60" : "text-graphite/80";
  const titleColor = tone === "onDark" ? "text-white" : "text-ink";

  return (
    <div>
      <SectionHeading
        tone={tone}
        eyebrow="Die Adi Kavzani Sales Engine"
        title={
          <>
            Vier Stufen, die aus einem Inserat
            <br className="hidden md:block" /> einen{" "}
            <span className="italic text-gold">Höchstpreis</span> machen.
          </>
        }
        intro="Jede Seite, jede Besichtigung, jede Nachricht folgt demselben bewährten System. Was den Interessenten nicht zur nächsten Stufe bewegt, lassen wir weg."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal key={step.stage} delay={i * 90}>
            <div
              className={`flex h-full flex-col border p-8 transition-all duration-500 ${cardBg}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/12 text-gold">
                <step.icon className="h-5 w-5" />
              </div>
              <div className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
                {step.stage}
              </div>
              <h3 className={`mt-2 font-serif text-xl ${titleColor}`}>
                {step.title}
              </h3>
              <p className={`mt-3 text-sm leading-relaxed ${descColor}`}>
                {step.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
