"use client";

import { motion, Variants } from "framer-motion";
import { CheckCircle2, TrendingUp, ShieldCheck, ArrowRight, Star, Clock, Home as HomeIcon } from "lucide-react";
import ValuationForm from "@/components/ValuationForm";
import Link from "next/link";

export default function Home() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <main className="overflow-hidden">
      {/* 1. HOOK: One clear promise in the first 3 seconds */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://optimal-immobilien.ch/wp-content/uploads/2024/03/Optimal-Immobilien-Makler-Kauf-Verkauf.jpg" 
            alt="Luxuriöse Immobilie Zürich" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-transparent to-stone-900/90" />
        </div>

        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 z-50 p-6 md:p-10 flex justify-between items-center">
          <div className="text-white font-serif text-2xl tracking-widest">
            OPTIMAL<span className="text-amber-500 font-sans font-light">.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/kaufen" className="hidden md:inline-flex items-center text-white/80 hover:text-white transition-colors uppercase tracking-wider text-xs font-semibold">
              Immobilien finden
            </Link>
            <Link href="/ratgeber" className="hidden md:inline-flex items-center text-white/80 hover:text-white transition-colors uppercase tracking-wider text-xs font-semibold">
              Ratgeber
            </Link>
            <a href="#valuation" className="hidden md:inline-flex items-center gap-2 text-white border border-white/30 hover:bg-white hover:text-stone-900 px-6 py-2 rounded-full transition-all duration-300 backdrop-blur-sm uppercase tracking-wider text-xs font-semibold">
              Kostenlose Bewertung
            </a>
          </div>
        </nav>

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-block mb-6 px-4 py-1.5 border border-amber-500/50 rounded-full backdrop-blur-md bg-stone-900/30">
            <span className="text-amber-400 uppercase tracking-widest text-xs font-semibold">Zürichs innovativer Immobilienmakler</span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1]">
            Ihr Weg zur <br />
            <span className="italic text-amber-500">provisionsfreien Immobilie</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-stone-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Entdecken Sie die Freiheit des Immobilienmarkts in Zürich. Wir garantieren Ihnen <strong className="text-white font-medium">0% Provision und 100% Transparenz</strong> beim Kauf und Verkauf.
          </motion.p>
          
          <motion.div variants={fadeInUp}>
            <a href="#action" className="group relative inline-flex items-center justify-center gap-4 bg-amber-500 text-stone-900 px-8 py-5 rounded-none text-lg font-semibold uppercase tracking-wider hover:bg-amber-400 transition-all duration-300">
              <span>Jetzt Wert ermitteln</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. TRUST: Proof, numbers, real faces */}
      <section className="py-24 md:py-32 bg-stone-50" id="trust">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { icon: HomeIcon, val: "250+", label: "Erfolgreiche Verkäufe" },
              { icon: Star, val: "98%", label: "Kundenzufriedenheit" },
              { icon: TrendingUp, val: "12%", label: "Über Marktwert" },
              { icon: Clock, val: "15", label: "Jahre Erfahrung" }
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="flex flex-col items-center">
                <stat.icon className="w-8 h-8 text-amber-600 mb-4 opacity-80" />
                <div className="font-serif text-4xl md:text-5xl text-stone-900 mb-2">{stat.val}</div>
                <div className="text-sm uppercase tracking-widest text-stone-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div 
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-amber-200 translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8" />
              <img 
                src="https://optimal-immobilien.ch/wp-content/uploads/2024/05/Optimal-Immobilien-B16.jpg" 
                alt="Geschäftsführer Optimal Immobilien" 
                className="relative z-10 w-full h-[600px] object-cover hover:scale-105 transition-all duration-700"
              />
              <div className="absolute bottom-10 -right-4 md:-right-12 z-20 bg-stone-900 text-white p-6 md:p-8 max-w-xs shadow-2xl">
                <div className="flex text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="italic text-stone-300 text-sm md:text-base leading-relaxed mb-4">
                  &quot;Exzellente Beratung, diskrete Abwicklung und ein Preis, der unsere Erwartungen übertroffen hat.&quot;
                </p>
                <p className="font-serif font-bold text-white">— Dr. Müller, Zürich</p>
              </div>
            </motion.div>

            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-amber-600 uppercase tracking-widest text-sm font-semibold mb-4">Ihr Partner in Zürich</h2>
              <h3 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8 leading-tight">
                &quot;Wir verkaufen nicht nur Immobilien.<br/>Wir realisieren Werte.&quot;
              </h3>
              <div className="space-y-6 text-stone-600 text-lg font-light leading-relaxed mb-10">
                <p>
                  Ein Hausverkauf ist mehr als eine Transaktion – es ist der Abschluss eines Lebensabschnitts und der Beginn von etwas Neuem. Als Premium-Makler in Zürich verstehen wir die Sensibilität dieses Moments.
                </p>
                <p>
                  Unser Versprechen ist simpel: Wir nehmen Ihnen 100% der Arbeit ab und sichern Ihnen den absolut höchsten Marktpreis. Transparent, diskret und kompromisslos professionell.
                </p>
              </div>
              <div className="pt-8 border-t border-stone-200">
                <p className="font-serif text-2xl text-stone-900">Adi Kavzani</p>
                <p className="text-stone-500 tracking-wider text-sm uppercase mt-1">Gründer & Geschäftsführer</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. DESIRE: Show the result, not the service */}
      <section className="py-24 md:py-32 bg-stone-900 text-stone-50" id="desire">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">
              Das Resultat?<br />
              <span className="text-amber-500 italic">Ein perfekter Abschluss.</span>
            </h2>
            <p className="text-stone-400 text-xl font-light">Wir ersparen Ihnen den mühsamen Prozess und liefern nur eines: Das gewünschte Ergebnis auf Ihrem Konto.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Maximale Rendite",
                desc: "Durch unser exklusives Netzwerk und gezieltes Off-Market-Marketing erzielen wir Preise, die weit über dem Durchschnitt liegen.",
                icon: TrendingUp
              },
              {
                title: "Absolute Ruhe",
                desc: "Keine Wochenenden voller Besichtigungen. Keine nervigen Preisverhandlungen. Sie lehnen sich zurück, wir erledigen den Rest.",
                icon: ShieldCheck
              },
              {
                title: "Planungssicherheit",
                desc: "Sie wissen genau, wann Sie ausziehen können und wann das Geld auf Ihrem Konto ist. Ein reibungsloser Übergang in Ihr neues Leben.",
                icon: CheckCircle2
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="group p-10 bg-stone-800/50 border border-stone-700/50 hover:bg-stone-800 hover:border-amber-500/30 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 bg-stone-900 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-amber-500 transition-all duration-500">
                  <item.icon className="w-6 h-6 text-amber-500 group-hover:text-stone-900 transition-colors" />
                </div>
                <h4 className="font-serif text-2xl mb-4">{item.title}</h4>
                <p className="text-stone-400 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUATION: Interactive Lead Magnet */}
      <section className="relative py-32 bg-stone-50" id="valuation">
        <div className="relative max-w-4xl mx-auto px-4 z-10">
          <div className="text-center mb-16">
            <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-serif text-4xl md:text-5xl text-stone-900 mb-6 leading-tight">Interaktive Immobilienbewertung</motion.h2>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-stone-500 text-lg">Ihre kostenlose und unverbindliche Einschätzung in weniger als 2 Minuten.</motion.p>
          </div>
          <ValuationForm />
        </div>
      </section>

      {/* 4. ACTION: One obvious next step, zero friction */}
      <section className="relative py-32 bg-stone-100" id="action">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        <div className="relative max-w-4xl mx-auto px-4 z-10">
          <div className="bg-white shadow-2xl p-8 md:p-16 border-t-4 border-amber-500">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6 leading-tight">Lassen Sie uns starten.</h2>
              <p className="text-stone-500 text-lg">Eine kostenlose und unverbindliche Einschätzung des Marktwerts Ihrer Immobilie in Zürich.</p>
            </motion.div>
            
            <motion.form 
              className="space-y-6"
              onSubmit={(e) => e.preventDefault()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-stone-400 mb-2 font-semibold">Ihr Name</label>
                  <input type="text" id="name" className="w-full px-0 py-3 bg-transparent border-b-2 border-stone-200 focus:border-amber-500 outline-none transition-colors text-stone-900 text-lg" placeholder="Max Muster" required />
                </div>
                <div>
                  <label htmlFor="contact" className="block text-xs uppercase tracking-widest text-stone-400 mb-2 font-semibold">Telefon oder E-Mail</label>
                  <input type="text" id="contact" className="w-full px-0 py-3 bg-transparent border-b-2 border-stone-200 focus:border-amber-500 outline-none transition-colors text-stone-900 text-lg" placeholder="079 123 45 67" required />
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="pt-4">
                <label htmlFor="address" className="block text-xs uppercase tracking-widest text-stone-400 mb-2 font-semibold">Adresse der Immobilie</label>
                <input type="text" id="address" className="w-full px-0 py-3 bg-transparent border-b-2 border-stone-200 focus:border-amber-500 outline-none transition-colors text-stone-900 text-lg" placeholder="Strassenname, PLZ Zürich" required />
              </motion.div>
              
              <motion.div variants={fadeInUp} className="pt-10 text-center">
                <button type="submit" className="w-full md:w-auto bg-stone-900 hover:bg-amber-600 text-white px-12 py-5 text-lg font-semibold uppercase tracking-widest transition-all duration-300">
                  Unverbindlich anfragen
                </button>
                <p className="mt-6 text-stone-400 text-sm">Diskretion ist unser oberstes Gebot. Wir melden uns innert 24 Stunden.</p>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </section>

      <footer className="bg-stone-950 text-stone-500 py-12 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-serif text-2xl tracking-widest text-stone-300">
            OPTIMAL<span className="text-amber-500 font-sans font-light">.</span>
          </div>
          <div className="text-sm font-light">
            &copy; {new Date().getFullYear()} Optimal Immobilien AG - Zürich. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </main>
  );
}
