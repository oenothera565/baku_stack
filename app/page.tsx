"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Layout } from "@/components/Layout";

export default function Home() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center items-center p-16 border-b-2 border-black dark:border-white relative">
        {/* Version tag */}
        <div className="absolute top-8 right-8 font-mono text-sm border border-black dark:border-white px-3 py-1">
          v1.0.0
        </div>

        {/* Path */}
        <div className="font-mono text-sm mb-4 text-gray-600 dark:text-gray-400 uppercase tracking-widest">
          {t.home.path}
        </div>

        <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tight text-center font-sans">
          {t.home.title}
        </h1>
        <p className="text-xl md:text-2xl font-mono mt-8 tracking-widest text-gray-600 dark:text-gray-400">
          {t.home.subtitle}
        </p>
      </section>

      {/* Features Section */}
      <section className="p-16 border-b-2 border-black dark:border-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold uppercase mb-12 font-sans">
            {t.home.modulesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Card 1: Code */}
            <Link href="/courses" className="block">
              <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-12 shadow-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer h-full">
                <div className="font-mono text-xs mb-4 opacity-50">01 /</div>
                <h3 className="text-4xl font-bold uppercase mb-6 font-sans">{t.home.modules.code.title}</h3>
                <p className="text-lg leading-relaxed font-mono">
                  {t.home.modules.code.description}
                </p>
              </div>
            </Link>

            {/* Card 2: Learn */}
            <Link href="/resources" className="block">
              <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-12 shadow-none border-t-0 md:border-t-2 md:border-l-0 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer h-full">
                <div className="font-mono text-xs mb-4 opacity-50">02 /</div>
                <h3 className="text-4xl font-bold uppercase mb-6 font-sans">{t.home.modules.learn.title}</h3>
                <p className="text-lg leading-relaxed font-mono">
                  {t.home.modules.learn.description}
                </p>
              </div>
            </Link>

            {/* Card 3: Earn */}
            <Link href="/careers" className="block">
              <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-12 shadow-none border-t-0 md:border-t-2 md:border-l-0 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer h-full">
                <div className="font-mono text-xs mb-4 opacity-50">03 /</div>
                <h3 className="text-4xl font-bold uppercase mb-6 font-sans">{t.home.modules.earn.title}</h3>
                <p className="text-lg leading-relaxed font-mono">
                  {t.home.modules.earn.description}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-[40vh] flex flex-col justify-center items-center p-16 border-b-2 border-black dark:border-white">
        <h2 className="text-5xl md:text-6xl font-bold uppercase mb-12 text-center font-sans">
          {t.home.cta.title}
        </h2>
        {/* Console-style button */}
        <button className="rounded-none border-2 border-black dark:border-white bg-transparent text-black dark:text-white px-16 py-6 text-2xl font-mono font-bold uppercase tracking-wide hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center gap-4">
          <span className="text-green-500">$</span>
          <span>{t.home.cta.button}</span>
        </button>
      </section>

      {/* Footer */}
      <footer className="p-12 flex justify-between items-center border-t-2 border-black dark:border-white">
        <div className="flex flex-col">
          <p className="font-bold uppercase text-xl">{t.home.footer.title}</p>
          <p className="font-mono text-xs mt-2 text-gray-600 dark:text-gray-400">
            {t.home.footer.copyright}
          </p>
        </div>
        <div className="font-mono text-xs border-l-2 border-black dark:border-white pl-4">
          {t.home.footer.status} <span className="text-green-500">● {t.home.footer.online}</span>
        </div>
      </footer>
    </Layout>
  );
}
