"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, translations, Translations, getCourseTranslation } from "@/lib/dictionary";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
  getCourse: (slug: string) => { description: string; price: string };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "baku-stack-lang";

function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "az";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "az" ? stored : "az";
  } catch {
    return "az";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("az");

  // Initialize from localStorage on mount
  useEffect(() => {
    setLangState(getStoredLanguage());
  }, []);

  // Save to localStorage whenever lang changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore localStorage errors
    }
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const getCourse = (slug: string) => {
    return getCourseTranslation(lang, slug);
  };

  const value: LanguageContextType = {
    lang,
    setLang,
    t: translations[lang],
    getCourse
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
