"use client";

import { useLanguage } from "./LanguageContext";
import { motion } from "framer-motion";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
      <button
        onClick={() => setLang('de')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
          lang === 'de' ? 'bg-amber-500 text-stone-900' : 'text-white/70 hover:text-white'
        }`}
      >
        DE
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
          lang === 'en' ? 'bg-amber-500 text-stone-900' : 'text-white/70 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
