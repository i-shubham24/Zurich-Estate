"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

const guides = [
  {
    id: 1,
    title: "Immobilienpreise in Zürich: Der grosse Report 2024",
    excerpt: "Wie entwickeln sich die Preise am Zürichsee? Wo lohnt sich der Verkauf aktuell am meisten? Ein detaillierter Einblick in den aktuellen Markt.",
    category: "Marktbericht",
    readTime: "5 Min.",
    image: "https://images.unsplash.com/photo-1506974210756-8e1b8985d348?q=80&w=1000&auto=format&fit=crop",
    slug: "immobilienpreise-zuerich-2024"
  },
  {
    id: 2,
    title: "Haus verkaufen in Zürich: 5 Fehler, die Sie Tausende kosten",
    excerpt: "Viele Eigentümer verschenken beim Verkauf bares Geld. Mit dem Adi Kavzani Sales Engine vermeiden Sie diese klassischen Stolpersteine.",
    category: "Ratgeber",
    readTime: "4 Min.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
    slug: "haus-verkaufen-zuerich-fehler"
  },
  {
    id: 3,
    title: "Wohnen im Seefeld: Warum das Quartier so begehrt ist",
    excerpt: "Zürich Seefeld gehört zu den exklusivsten Lagen der Schweiz. Was macht die Magie dieses Quartiers aus und wie finden Sie hier Ihr Traumhaus?",
    category: "Quartier-Guide",
    readTime: "3 Min.",
    image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?q=80&w=1000&auto=format&fit=crop",
    slug: "wohnen-im-seefeld-zuerich"
  }
];

export default function RatgeberPage() {
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
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4 px-4 py-1.5 border border-amber-500/30 bg-amber-50 rounded-full"
          >
            <span className="text-amber-700 uppercase tracking-widest text-xs font-semibold">Wissen & Insights</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-stone-900 mb-6"
          >
            Immobilien-Ratgeber <span className="italic text-amber-600">Zürich</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-500 text-lg md:text-xl max-w-2xl"
          >
            Aktuelle Marktberichte, Experten-Tipps für den Hausverkauf und exklusive Einblicke in die Zürcher Quartiere.
          </motion.p>
        </div>

        {/* Featured Post */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row group"
        >
          <div className="w-full md:w-1/2 h-[300px] md:h-auto relative overflow-hidden">
            <img 
              src={guides[0].image} 
              alt={guides[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs font-bold uppercase tracking-wider">
                {guides[0].category}
              </span>
              <div className="flex items-center gap-1 text-stone-400 text-sm">
                <Clock className="w-4 h-4" /> {guides[0].readTime}
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4 group-hover:text-amber-600 transition-colors">
              {guides[0].title}
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed mb-8">
              {guides[0].excerpt}
            </p>
            <Link href={`/ratgeber/${guides[0].slug}`} className="inline-flex items-center gap-2 text-amber-600 font-semibold uppercase tracking-wider text-sm hover:text-stone-900 transition-colors">
              Artikel lesen <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.slice(1).map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="relative h-[250px] overflow-hidden">
                <img 
                  src={guide.image} 
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-stone-900 rounded-full text-xs font-bold uppercase tracking-wider">
                    {guide.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-1 text-stone-400 text-sm mb-3">
                  <Clock className="w-4 h-4" /> {guide.readTime}
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4 group-hover:text-amber-600 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-stone-500 leading-relaxed mb-6 flex-grow">
                  {guide.excerpt}
                </p>
                <Link href={`/ratgeber/${guide.slug}`} className="inline-flex items-center gap-2 text-amber-600 font-semibold uppercase tracking-wider text-sm hover:text-stone-900 transition-colors mt-auto">
                  Artikel lesen <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
