"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === "en" ? "az" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-none border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white px-3 py-1 text-xs font-bold uppercase transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
      aria-label="Toggle language"
    >
      {lang === "en" ? "EN" : "AZ"}
    </button>
  );
}
