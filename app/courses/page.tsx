"use client";

import Link from "next/link";
import { COURSES } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { Layout } from "@/components/Layout";

export default function CoursesPage() {
  const { t, getCourse } = useLanguage();

  return (
    <Layout>
      {/* Header */}
      <section className="min-h-[40vh] flex flex-col justify-center items-center p-16 border-b-2 border-black dark:border-white relative">
        {/* Path */}
        <div className="absolute top-8 right-8 font-mono text-sm border border-black dark:border-white px-3 py-1">
          {t.courses.path}
        </div>

        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-center font-sans">
          {t.courses.title}
        </h1>
        <p className="text-lg font-mono mt-6 text-gray-600 dark:text-gray-400">
          {t.courses.subtitle}
        </p>
      </section>

      {/* Courses Grid */}
      <section className="p-16 min-h-[50vh]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-7xl mx-auto">
          {COURSES.map((course) => {
            const courseData = getCourse(course.slug);
            return (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="group border-2 border-black dark:border-white p-8 transition-all duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-t-0 md:border-t-2 md:first:border-l-2"
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="font-mono text-sm opacity-50">#{course.id}</span>
                  <span className="font-mono text-xs border border-current px-2 py-1 rounded-sm">{course.tech}</span>
                </div>

                <h2 className="text-4xl font-bold uppercase mb-4 font-sans group-hover:underline decoration-2 underline-offset-4">
                  {course.title}
                </h2>

                <p className="text-lg leading-relaxed font-mono opacity-80 mb-8">
                  {courseData.description}
                </p>

                <div className="mt-auto pt-8 border-t border-current flex justify-between items-end">
                  <div>
                    <span className="block text-xs font-bold uppercase opacity-50">{t.courses.duration}</span>
                    <span className="font-mono font-bold">{course.duration}</span>
                  </div>
                  <div className="font-bold uppercase text-sm font-mono group-hover:translate-x-2 transition-transform">
                    {t.courses.initialize}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="p-12 border-t-2 border-black dark:border-white flex justify-between">
        <Link
          href="/"
          className="text-sm font-bold uppercase font-mono hover:underline"
        >
          {t.courses.back}
        </Link>
        <div className="font-mono text-xs text-gray-500 dark:text-gray-500">
          {t.courses.endOfList}
        </div>
      </footer>
    </Layout>
  );
}
