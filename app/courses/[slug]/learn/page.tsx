"use client";

import { COURSES } from "@/lib/data";
import { notFound } from "next/navigation";
import { use } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Layout } from "@/components/Layout";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function LearnPage({ params }: PageProps) {
  const { slug } = use(params);
  const course = COURSES.find((c) => c.slug === slug);
  const { t } = useLanguage();

  if (!course) {
    return notFound();
  }

  const handleLockedClick = () => {
    alert(t.learn.loginRequired);
  };

  return (
    <Layout>
      {/* Header */}
      <header className="border-b-2 border-black dark:border-white p-6">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="font-mono text-sm border border-black dark:border-white px-3 py-1">
            {course.slug}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
            {course.title}
          </h1>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-0">

        {/* Left Column: Video Player (75% = 3 cols) */}
        <div className="lg:col-span-3 border-r-2 border-black dark:border-white">
          <div className="aspect-video w-full bg-black dark:bg-gray-900 flex items-center justify-center">
            {/* ==================== INSERT YOUTUBE IFRAME HERE ==================== */}
            <p className="text-white font-mono text-lg">{t.learn.videoPlaceholder}</p>
            {/* ==================== END YOUTUBE IFRAME ==================== */}
          </div>

          {/* Video Info */}
          <div className="p-8 border-b-2 border-black dark:border-white">
            <h2 className="text-3xl font-bold uppercase mb-4">
              {course.modules[0]}
            </h2>
            <p className="font-mono text-gray-600 dark:text-gray-400">
              {t.learn.nowPlaying} • {course.duration}
            </p>
          </div>
        </div>

        {/* Right Column: Syllabus (25% = 1 col) */}
        <div className="lg:col-span-1">
          <div className="sticky top-0">
            <div className="border-b-2 border-black dark:border-white p-4">
              <h3 className="font-mono text-sm uppercase tracking-widest text-gray-600 dark:text-gray-400">
                {t.learn.syllabus}
              </h3>
            </div>

            <ul className="divide-y divide-black/20 dark:divide-white/20">
              {course.modules.map((module, index) => {
                const isPlaying = index === 0;
                const isLocked = index > 0;

                return (
                  <li key={index}>
                    <button
                      onClick={isLocked ? handleLockedClick : undefined}
                      className={`w-full text-left p-4 font-mono text-sm transition-all hover:bg-black/5 dark:hover:bg-white/5 ${
                        isLocked ? "cursor-pointer opacity-50" : ""
                      }`}
                      disabled={isLocked}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-0.5">
                          {isPlaying ? (
                            <span className="inline-block w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                          ) : (
                            <span>🔒</span>
                          )}
                        </span>
                        <span className={isPlaying ? "text-black dark:text-white font-semibold" : "text-gray-600 dark:text-gray-400"}>
                          {module}
                        </span>
                      </div>
                      {isPlaying && (
                        <div className="mt-2 ml-5 text-xs text-orange-500 uppercase tracking-wider">
                          {t.learn.nowPlaying}
                        </div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

      </div>
    </Layout>
  );
}
