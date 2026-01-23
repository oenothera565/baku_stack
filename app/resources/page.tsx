"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Layout } from "@/components/Layout";

export default function ResourcesPage() {
  const { t } = useLanguage();

  const resources = [
    {
      title: t.resources.items.roadmap.title,
      description: t.resources.items.roadmap.description,
      url: "https://roadmap.sh",
      category: t.resources.items.roadmap.category
    },
    {
      title: t.resources.items.mdn.title,
      description: t.resources.items.mdn.description,
      url: "https://developer.mozilla.org",
      category: t.resources.items.mdn.category
    },
    {
      title: t.resources.items.stackoverflow.title,
      description: t.resources.items.stackoverflow.description,
      url: "https://stackoverflow.com",
      category: t.resources.items.stackoverflow.category
    },
    {
      title: t.resources.items.freecodecamp.title,
      description: t.resources.items.freecodecamp.description,
      url: "https://freecodecamp.org",
      category: t.resources.items.freecodecamp.category
    },
    {
      title: t.resources.items.github.title,
      description: t.resources.items.github.description,
      url: "https://github.com",
      category: t.resources.items.github.category
    },
    {
      title: t.resources.items.devto.title,
      description: t.resources.items.devto.description,
      url: "https://dev.to",
      category: t.resources.items.devto.category
    }
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="min-h-[40vh] flex flex-col justify-center items-center p-16 border-b-2 border-black dark:border-white relative">
        {/* Path */}
        <div className="absolute top-8 right-8 font-mono text-sm border border-black dark:border-white px-3 py-1">
          {t.resources.path}
        </div>

        <div className="font-mono text-sm mb-4 text-gray-600 dark:text-gray-400 uppercase tracking-widest">
          Resources
        </div>
        <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tight text-center font-sans">
          {t.resources.title}
        </h1>
        <p className="text-xl md:text-2xl font-mono mt-8 tracking-widest text-gray-600 dark:text-gray-400">
          {t.resources.subtitle}
        </p>
      </section>

      {/* Resources Grid */}
      <section className="p-16 border-b-2 border-black dark:border-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold uppercase mb-12 font-mono">
            {t.resources.sectionTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`border-2 border-black dark:border-white p-8 transition-colors group
                  ${index === 0 ? "" : "border-t-0 md:border-t-2"}
                  ${index % 3 !== 0 ? "md:border-l-0" : ""}
                  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black
                `}
              >
                <div className="font-mono text-xs mb-3 opacity-50 uppercase">
                  {resource.category}
                </div>
                <h3 className="text-2xl font-bold uppercase mb-4 font-sans group-hover:underline">
                  {resource.title}
                </h3>
                <p className="text-base font-mono text-gray-600 dark:text-gray-400 group-hover:text-inherit">
                  {resource.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="p-16">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-block font-mono text-sm uppercase tracking-wider hover:underline">
            {t.resources.back}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
