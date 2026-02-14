"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Layout } from "@/components/Layout";
import { getPublishedCourses, CourseWithInstructor } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function CoursesPage() {
  const { t, getCourse } = useLanguage();
  const [courses, setCourses] = useState<CourseWithInstructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await getPublishedCourses();
        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses:", err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

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
        {loading ? (
          <div className="text-center font-mono text-2xl py-20">
            Loading courses...
          </div>
        ) : error ? (
          <div className="text-center font-mono text-2xl py-20 text-red-600">
            {error}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center font-mono text-2xl py-20">
            No courses available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-7xl mx-auto">
            {courses.map((course, index) => {
              const courseData = getCourse(course.slug);
              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="group border-2 border-black dark:border-white p-8 transition-all duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-t-0 md:border-t-2 md:first:border-l-2"
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-sm opacity-50">#{String(index + 1).padStart(2, '0')}</span>
                    <span className="font-mono text-xs border border-current px-2 py-1 uppercase">
                      {course.difficulty || 'BEGINNER'}
                    </span>
                  </div>

                  <h2 className="text-4xl font-bold uppercase mb-4 font-sans group-hover:underline decoration-2 underline-offset-4">
                    {course.title}
                  </h2>

                  <p className="text-lg leading-relaxed font-mono opacity-80 mb-8">
                    {course.description || courseData.description}
                  </p>

                  <div className="mt-auto pt-8 border-t border-current flex justify-between items-end">
                    <div>
                      <span className="block text-xs font-bold uppercase opacity-50">{t.courses.price}</span>
                      <span className="font-mono font-bold">${course.price.toFixed(2)}</span>
                    </div>
                    <div className="font-bold uppercase text-sm font-mono group-hover:translate-x-2 transition-transform">
                      {t.courses.initialize}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
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
