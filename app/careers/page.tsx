"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Layout } from "@/components/Layout";

export default function CareersPage() {
  const { t } = useLanguage();

  const stats = [
    { value: t.careers.stats.salary.value, label: t.careers.stats.salary.label, color: "bg-green-500" },
    { value: t.careers.stats.hired.value, label: t.careers.stats.hired.label, color: "bg-orange-500" },
    { value: t.careers.stats.growth.value, label: t.careers.stats.growth.label, color: "bg-blue-500" }
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="min-h-[40vh] flex flex-col justify-center items-center p-16 border-b-2 border-black dark:border-white relative">
        {/* Path */}
        <div className="absolute top-8 right-8 font-mono text-sm border border-black dark:border-white px-3 py-1">
          {t.careers.path}
        </div>

        <div className="font-mono text-sm mb-4 text-gray-600 dark:text-gray-400 uppercase tracking-widest">
          Careers
        </div>
        <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tight text-center font-sans">
          {t.careers.title}
        </h1>
        <p className="text-xl md:text-2xl font-mono mt-8 tracking-widest text-gray-600 dark:text-gray-400">
          {t.careers.subtitle}
        </p>
      </section>

      {/* Stats Section */}
      <section className="p-16 border-b-2 border-black dark:border-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold uppercase mb-12 font-mono">
            {t.careers.sectionTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`border-2 border-black dark:border-white p-12 text-center
                  ${index === 0 ? "" : "border-t-0 md:border-t-2"}
                  ${index % 3 !== 0 ? "md:border-l-0" : ""}
                `}
              >
                <div className={`inline-block ${stat.color} text-white font-mono text-xs px-2 py-1 mb-4`}>
                  {stat.label}
                </div>
                <div className="text-6xl md:text-7xl font-bold uppercase font-sans">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become Instructor Section */}
      <section className="p-16 border-b-2 border-black dark:border-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold uppercase mb-8 font-sans">
            {t.careers.instructor.title}
          </h2>
          <p className="text-xl font-mono mb-6 text-gray-600 dark:text-gray-400">
            {t.careers.instructor.description}
          </p>
          <ul className="font-mono text-base mb-8 space-y-2 text-gray-600 dark:text-gray-400">
            {t.careers.instructor.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-green-500">$</span> {benefit}
              </li>
            ))}
          </ul>
          <button className="rounded-none border-2 border-black dark:border-white bg-orange-600 text-white px-8 py-4 text-lg font-bold uppercase tracking-wide hover:bg-orange-700 transition-colors">
            {t.careers.instructor.button}
          </button>
        </div>
      </section>

      {/* Back Link */}
      <section className="p-16">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-block font-mono text-sm uppercase tracking-wider hover:underline">
            {t.careers.back}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
