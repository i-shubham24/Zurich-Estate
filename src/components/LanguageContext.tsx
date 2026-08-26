"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'de' | 'en';

interface Translations {
  [key: string]: {
    de: string;
    en: string;
  };
}

const translations: Translations = {
  // Navbar
  "nav.buy": { de: "Immobilien finden", en: "Buy Properties" },
  "nav.guide": { de: "Ratgeber", en: "Guides" },
  "nav.about": { de: "Über Uns", en: "About Us" },
  "nav.valuation": { de: "Kostenlose Bewertung", en: "Free Valuation" },
  
  // Hero
  "hero.badge": { de: "Zürichs innovativer Immobilienmakler", en: "Zurich's Innovative Real Estate Agent" },
  "hero.title1": { de: "Ihr Weg zur", en: "Your path to a" },
  "hero.title2": { de: "provisionsfreien Immobilie", en: "commission-free property" },
  "hero.subtitle": { 
    de: "Entdecken Sie die Freiheit des Immobilienmarkts in Zürich. Wir garantieren Ihnen 0% Provision und 100% Transparenz beim Kauf und Verkauf.", 
    en: "Discover freedom in the Zurich real estate market. We guarantee you 0% commission and 100% transparency when buying and selling." 
  },
  "hero.cta": { de: "Kostenlose Bewertung starten", en: "Start Free Valuation" },
  "hero.stats1": { de: "0% Provision", en: "0% Commission" },
  "hero.stats2": { de: "Transparenz", en: "Transparency" }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'de',
  setLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('de');

  useEffect(() => {
    const saved = localStorage.getItem('app_lang') as Language;
    if (saved && (saved === 'de' || saved === 'en')) {
      setLang(saved);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  const t = (key: string) => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
