"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MapPin, BedDouble, Bath, SquareMenu } from "lucide-react";
import Link from "next/link";

const properties = [
  {
    id: 1,
    title: "Exklusive Villa mit Seesicht",
    location: "8700 Küsnacht",
    price: "Auf Anfrage",
    rooms: 6.5,
    bathrooms: 3,
    livingSpace: 280,
    image: "https://optimal-immobilien.ch/wp-content/uploads/2024/05/Optimal-Immobilien-B15.jpg",
    status: "Verfügbar"
  },
  {
    id: 2,
    title: "Moderne Attikawohnung im Herzen von Zürich",
    location: "8001 Zürich",
    price: "CHF 2,450,000",
    rooms: 4.5,
    bathrooms: 2,
    livingSpace: 145,
    image: "https://optimal-immobilien.ch/wp-content/uploads/2024/05/Optimal-Immobilien-B13.jpg",
    status: "Verfügbar"
  },
  {
    id: 3,
    title: "Elegantes Einfamilienhaus im Grünen",
    location: "8126 Zumikon",
    price: "CHF 3,100,000",
    rooms: 5.5,
    bathrooms: 2,
    livingSpace: 210,
    image: "https://optimal-immobilien.ch/wp-content/uploads/2024/05/Optimal-Immobilien-B12.jpg",
    status: "Reserviert"
  },
  {
    id: 4,
    title: "Historisches Stadthaus mit Charme",
    location: "8008 Zürich Seefeld",
    price: "CHF 4,200,000",
    rooms: 7,
    bathrooms: 3,
    livingSpace: 320,
    image: "https://optimal-immobilien.ch/wp-content/uploads/2024/05/Optimal-Immobilien-B11.jpg",
    status: "Verkauft"
  }
];

export default function KaufenPage() {
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
            <span className="text-amber-700 uppercase tracking-widest text-xs font-semibold">Immobilienangebote</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-stone-900 mb-6"
          >
            Ihr neues <span className="italic text-amber-600">Zuhause</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-500 text-lg md:text-xl max-w-2xl"
          >
            Entdecken Sie unsere aktuellen Immobilienangebote in Zürich und Umgebung. Von modernen Wohnungen bis hin zu exklusiven Villen.
          </motion.p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md
                    ${property.status === 'Verfügbar' ? 'bg-stone-900/80 text-white' : 
                      property.status === 'Reserviert' ? 'bg-amber-500/90 text-stone-900' : 
                      'bg-red-900/80 text-white'}`}
                  >
                    {property.status}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="px-5 py-2 bg-white/90 backdrop-blur-sm text-stone-900 font-bold rounded-lg shadow-lg">
                    {property.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-2 text-stone-500 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{property.location}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6 group-hover:text-amber-600 transition-colors">
                  {property.title}
                </h3>
                
                <div className="flex items-center gap-6 text-stone-500 pt-6 border-t border-stone-100">
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-stone-400" />
                    <span className="font-medium">{property.rooms} Zi.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-stone-400" />
                    <span className="font-medium">{property.bathrooms} Bad</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SquareMenu className="w-5 h-5 text-stone-400" />
                    <span className="font-medium">{property.livingSpace} m²</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
