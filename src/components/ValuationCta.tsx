import { Check } from "lucide-react";
import ValuationForm from "./ValuationForm";
import Reveal from "./Reveal";
import { Eyebrow } from "./ui";

const points = [
  "Kostenlos & unverbindlich",
  "Ergebnis innert 24 Stunden",
  "Diskret – keine Weitergabe an Dritte",
  "Von echten Marktdaten gestützt",
];

export default function ValuationCta({
  eyebrow = "Kostenlose Bewertung",
  title = "Was ist Ihre Immobilie heute wert?",
  intro = "Erhalten Sie eine fundierte Ersteinschätzung des Marktwerts – in weniger als zwei Minuten und ohne Verpflichtung.",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section id="bewertung" className="scroll-mt-24 bg-slate py-20 md:py-28">
      <div className="container-lux grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow tone="onDark">{eyebrow}</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-[1.12] text-white md:text-4xl lg:text-[2.9rem]">
            {title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">{intro}</p>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-white/85">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15">
                  <Check className="h-3.5 w-3.5 text-gold" />
                </span>
                <span className="text-sm">{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <ValuationForm />
        </Reveal>
      </div>
    </section>
  );
}
