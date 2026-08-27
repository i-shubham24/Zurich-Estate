import Link from "next/link";
import { Phone } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "./Reveal";

export default function CtaBanner({
  title = "Bereit, Ihre Immobilie zum Höchstpreis zu verkaufen?",
  subtitle = "Ein Anruf genügt. Wir beraten Sie persönlich, ehrlich, diskret und ohne Verpflichtung.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-ink py-20 md:py-24">
      <div className="container-lux">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl leading-[1.15] text-white md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">{subtitle}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#bewertung"
              className="group inline-flex items-center justify-center gap-3 bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-all hover:bg-gold-bright"
            >
              Gratis-Bewertung starten
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-3 border border-white/25 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-gold" />
              {site.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
