"use client";

import Link from "next/link";
import { COURSES } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { Layout } from "@/components/Layout";

// Get first 3 courses for enrolled courses
const ENROLLED_COURSES = COURSES.slice(0, 3);

export default function DashboardPage() {
  const { t, getCourse } = useLanguage();

  return (
    <Layout>
      {/* Header */}
      <section className="min-h-[40vh] flex flex-col justify-center p-16 border-b-2 border-black dark:border-white relative">
        {/* Path */}
        <div className="absolute top-8 right-8 font-mono text-sm border border-black dark:border-white px-3 py-1">
          {t.dashboard.path}
        </div>

        <div className="font-mono text-sm mb-4 text-gray-600 dark:text-gray-400 uppercase tracking-widest">
          {t.dashboard.path}
        </div>
        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tight font-sans">
          {t.dashboard.title}
        </h1>
        <p className="text-xl font-mono mt-6 text-gray-600 dark:text-gray-400">
          {t.dashboard.subtitle}
        </p>
      </section>

      {/* Enrolled Courses */}
      <section className="p-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-12 font-sans">
            {t.dashboard.enrolledCourses}
          </h2>

          <div className="space-y-0">
            {ENROLLED_COURSES.map((course) => {
              const courseData = getCourse(course.slug);
              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="block border-2 border-black dark:border-white border-t-0 first:border-t-2 p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="font-mono text-xs opacity-50 mb-2">
                        #{course.id} / {course.tech}
                      </div>
                      <h3 className="text-3xl font-bold uppercase font-sans">
                        {course.title}
                      </h3>
                    </div>
                    <div className="font-mono text-xs border border-current px-3 py-1 rounded-sm">
                      IN PROGRESS
                    </div>
                  </div>

                  <p className="text-lg font-mono opacity-80 mb-6">
                    {courseData.description}
                  </p>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between font-mono text-sm mb-2">
                      <span className="opacity-50">{t.dashboard.progress}</span>
                      <span className="font-bold">50%</span>
                    </div>
                    <div className="w-full h-3 border-2 border-black dark:border-white">
                      <div className="h-full bg-orange-600" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-12 border-t-2 border-black dark:border-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/courses"
            className="text-sm font-bold uppercase font-mono hover:underline"
          >
            {t.dashboard.browseAll}
          </Link>
          <div className="font-mono text-xs text-gray-500 dark:text-gray-500">
            {t.dashboard.endOfDashboard}
          </div>
        </div>
      </footer>
    </Layout>
  );
}
