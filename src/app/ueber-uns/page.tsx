"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, TrendingUp, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";

export default function UeberUnsPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-900/90 backdrop-blur-md p-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-white font-serif text-2xl tracking-widest hover:text-amber-500 transition-colors">
            OPTIMAL<span className="text-amber-500 font-sans font-light">.</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors text-sm font-semibold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="inline-block mb-4 px-4 py-1.5 border border-amber-500/30 bg-amber-50 rounded-full"
          >
            <span className="text-amber-700 uppercase tracking-widest text-xs font-semibold">Über Uns</span>
          </motion.div>
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="font-serif text-5xl md:text-7xl text-stone-900 mb-8"
          >
            Wir revolutionieren den <span className="italic text-amber-600">Immobilienverkauf</span>
          </motion.h1>
          <motion.p 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="text-stone-500 text-lg md:text-2xl font-light leading-relaxed"
          >
            Mit 0% Provision, radikaler Transparenz und dem bewährten Adi Kavzani Sales Engine™ garantieren wir Ihnen den absoluten Höchstpreis.
          </motion.p>
        </div>

        {/* Feature Grid - The Method */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl mb-24 border-t-4 border-amber-500"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl text-stone-900 mb-6">Der Adi Kavzani <br/><span className="italic text-amber-600">Sales Engine</span></h2>
              <p className="text-stone-500 text-lg mb-8 leading-relaxed">
                Wir überlassen nichts dem Zufall. Unser 4-Stufen-System ist das Resultat jahrelanger Optimierung im Zürcher Immobilienmarkt. 
                Es filtert Touristen heraus, fokussiert sich auf kaufkräftige Interessenten und schafft ein Bieterverfahren, das den Preis maximiert.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><CheckCircle2 className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-lg">1. Der Hook</h4>
                    <p className="text-stone-500">Präzises Marketing, das in den ersten 3 Sekunden fasziniert.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><ShieldCheck className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-lg">2. Echtes Vertrauen</h4>
                    <p className="text-stone-500">Zertifizierte Bewertungen, transparente Daten und gläserne Historie.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><TrendingUp className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-lg">3. Pure Emotion</h4>
                    <p className="text-stone-500">Wir verkaufen kein Gebäude, wir verkaufen das künftige Leben darin.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-amber-100 rounded-3xl translate-x-4 translate-y-4" />
              <img 
                src="https://optimal-immobilien.ch/wp-content/uploads/2024/05/Optimal-Immobilien-B16.jpg" 
                alt="Unser Team bei der Arbeit" 
                className="relative z-10 rounded-3xl w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          <div className="text-center p-8 bg-stone-900 rounded-2xl text-white">
            <div className="text-5xl font-serif text-amber-500 mb-2">0%</div>
            <div className="text-stone-400 font-semibold tracking-wider uppercase text-sm">Provision</div>
          </div>
          <div className="text-center p-8 bg-white shadow-xl rounded-2xl">
            <div className="text-5xl font-serif text-stone-900 mb-2">150+</div>
            <div className="text-stone-500 font-semibold tracking-wider uppercase text-sm">Verkaufte Objekte</div>
          </div>
          <div className="text-center p-8 bg-white shadow-xl rounded-2xl">
            <div className="text-5xl font-serif text-stone-900 mb-2">14</div>
            <div className="text-stone-500 font-semibold tracking-wider uppercase text-sm">Tage bis Verkauf (Ø)</div>
          </div>
          <div className="text-center p-8 bg-white shadow-xl rounded-2xl">
            <div className="flex justify-center text-amber-500 mb-2 h-[48px] items-center">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-8 h-8 fill-current" />)}
            </div>
            <div className="text-stone-500 font-semibold tracking-wider uppercase text-sm">Trustpilot</div>
          </div>
        </div>

      </div>
    </main>
  );
}
