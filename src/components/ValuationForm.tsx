"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Building, MapPin, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5;

export default function ValuationForm() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    propertyType: "",
    intent: "",
    location: "",
    name: "",
    contact: "",
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 5) as Step);
  const prevStep = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const handleSelect = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setTimeout(nextStep, 400); // Auto-advance after selection
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      nextStep();
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden min-h-[400px] flex flex-col relative border-t-4 border-amber-500" id="valuation-form">
      {/* Progress Bar */}
      {step < 5 && (
        <div className="w-full bg-stone-100 h-2">
          <div 
            className="bg-amber-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      )}

      <div className="p-8 md:p-12 flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 text-center mb-8">
                Was für eine Immobilie möchten Sie bewerten?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => handleSelect('propertyType', 'Haus')}
                  className={`p-6 border-2 rounded-xl flex flex-col items-center gap-4 transition-all hover:border-amber-500 hover:bg-amber-50/50 ${formData.propertyType === 'Haus' ? 'border-amber-500 bg-amber-50' : 'border-stone-100'}`}
                >
                  <Home className="w-12 h-12 text-stone-700" />
                  <span className="font-medium text-stone-900 text-lg">Haus</span>
                </button>
                <button 
                  onClick={() => handleSelect('propertyType', 'Wohnung')}
                  className={`p-6 border-2 rounded-xl flex flex-col items-center gap-4 transition-all hover:border-amber-500 hover:bg-amber-50/50 ${formData.propertyType === 'Wohnung' ? 'border-amber-500 bg-amber-50' : 'border-stone-100'}`}
                >
                  <Building className="w-12 h-12 text-stone-700" />
                  <span className="font-medium text-stone-900 text-lg">Wohnung</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 text-center mb-8">
                Wann planen Sie den Verkauf?
              </h3>
              <div className="flex flex-col gap-3">
                {['So schnell wie möglich', 'In 1-3 Monaten', 'In 3-6 Monaten', 'Ich bin nur neugierig'].map((option) => (
                  <button 
                    key={option}
                    onClick={() => handleSelect('intent', option)}
                    className={`p-4 border-2 rounded-xl text-left transition-all hover:border-amber-500 hover:bg-amber-50/50 ${formData.intent === option ? 'border-amber-500 bg-amber-50' : 'border-stone-100'}`}
                  >
                    <span className="font-medium text-stone-900">{option}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 text-center mb-8">
                Wo befindet sich die Immobilie?
              </h3>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-6 h-6" />
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  onKeyDown={(e) => e.key === 'Enter' && formData.location && nextStep()}
                  className="w-full pl-14 pr-4 py-4 bg-stone-50 border-2 border-stone-100 rounded-xl focus:border-amber-500 focus:bg-white outline-none transition-colors text-lg text-stone-900"
                  placeholder="PLZ oder Ort (z.B. 8001 Zürich)"
                  autoFocus
                />
              </div>
              <button 
                onClick={nextStep}
                disabled={!formData.location}
                className="w-full bg-stone-900 text-white py-4 rounded-xl font-medium hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Weiter <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 text-center mb-2">
                Ihre Auswertung ist bereit!
              </h3>
              <p className="text-stone-500 text-center mb-8">
                Wo dürfen wir Ihnen die Bewertung zustellen?
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-4 bg-stone-50 border-2 border-stone-100 rounded-xl focus:border-amber-500 focus:bg-white outline-none transition-colors text-stone-900"
                  placeholder="Ihr Name"
                />
                <input 
                  type="text" 
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  className="w-full px-4 py-4 bg-stone-50 border-2 border-stone-100 rounded-xl focus:border-amber-500 focus:bg-white outline-none transition-colors text-stone-900"
                  placeholder="Telefonnummer oder E-Mail"
                />
                <button 
                  type="submit"
                  className="w-full bg-amber-500 text-stone-900 py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-amber-400 transition-colors mt-4 shadow-lg shadow-amber-500/20"
                >
                  Kostenlose Bewertung erhalten
                </button>
              </form>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-8"
            >
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-stone-900">
                Vielen Dank!
              </h3>
              <p className="text-stone-600 text-lg leading-relaxed max-w-sm mx-auto">
                Wir haben Ihre Anfrage erhalten und melden uns in Kürze mit Ihrer individuellen Markteinschätzung bei Ihnen.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      {step > 1 && step < 5 && (
        <div className="p-4 border-t border-stone-100 bg-stone-50 flex justify-start">
          <button 
            onClick={prevStep}
            className="text-stone-500 hover:text-stone-900 flex items-center gap-2 font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück
          </button>
        </div>
      )}
    </div>
  );
}
