"use client";

import { COURSES } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Layout } from "@/components/Layout";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const course = COURSES.find((c) => c.slug === slug);
  const { t, getCourse } = useLanguage();

  if (!course) {
    return notFound();
  }

  const courseData = getCourse(course.slug);

  return (
    <Layout>
      {/* Header */}
      <section className="min-h-[50vh] flex flex-col justify-center items-center p-16 border-b-2 border-black dark:border-white relative">
        <div className="absolute top-8 left-8 font-mono text-sm border border-black dark:border-white px-3 py-1">
          {course.slug}
        </div>

        <div className="font-mono text-sm mb-4 text-gray-600 dark:text-gray-400 uppercase tracking-widest">
          {t.courses.detail.overview}
        </div>
        <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tight text-center font-sans">
          {course.title}
        </h1>

        <div className="mt-8 flex gap-4 font-mono text-lg">
          <span className="px-4 py-2 border border-black dark:border-white">
            {course.duration}
          </span>
          <span className="px-4 py-2 border border-black dark:border-white">
            {courseData.price}
          </span>
        </div>
      </section>

      {/* Content */}
      <section className="p-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Left Column: Description */}
          <div className="border-l-2 border-black dark:border-white pl-8">
            <h2 className="text-3xl font-bold uppercase mb-6 font-mono">
              {t.courses.detail.syllabus}
            </h2>
            <p className="text-xl leading-relaxed mb-6">
              {courseData.description}
            </p>
            <p className="text-lg font-mono text-gray-600 dark:text-gray-400">
              {t.courses.detail.techStack} {course.tech}
            </p>
          </div>

          {/* Right Column: Apply */}
          <div className="flex flex-col justify-center">
            <div className="border-2 border-black dark:border-white p-8">
              <h3 className="text-2xl font-bold uppercase mb-4">
                {t.courses.detail.readyToDeploy}
              </h3>
              <p className="mb-8 font-mono text-sm">
                {t.courses.detail.joinCohort}
              </p>

              <Link href={`/courses/${course.slug}/learn`} className="block w-full rounded-none border-2 border-black dark:border-white bg-orange-600 text-white px-8 py-4 text-xl font-bold uppercase tracking-wide hover:bg-orange-700 transition-colors mb-4 text-center">
                {t.courses.detail.applyNow}
              </Link>

              <Link href="/courses" className="block text-center text-sm font-bold uppercase font-mono hover:underline">
                {t.courses.detail.backToList}
              </Link>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
