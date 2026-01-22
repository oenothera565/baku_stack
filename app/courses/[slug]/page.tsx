import { COURSES } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function CourseDetailPage({ params }: PageProps) {
  const course = COURSES.find((c) => c.slug === params.slug);

  if (!course) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      {/* Header */}
      <section className="min-h-[50vh] flex flex-col justify-center items-center p-16 border-b-2 border-black dark:border-white relative">
        <div className="absolute top-8 left-8 font-mono text-sm border border-black dark:border-white px-3 py-1">
          {course.slug}
        </div>
        
        <div className="font-mono text-sm mb-4 text-gray-600 dark:text-gray-400 uppercase tracking-widest">
          Course Overview
        </div>
        <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tight text-center font-sans">
          {course.title}
        </h1>
        
        <div className="mt-8 flex gap-4 font-mono text-lg">
          <span className="px-4 py-2 border border-black dark:border-white">
            {course.duration}
          </span>
          <span className="px-4 py-2 border border-black dark:border-white">
            {course.price}
          </span>
        </div>
      </section>

      {/* Content */}
      <section className="p-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Left Column: Description */}
          <div className="border-l-2 border-black dark:border-white pl-8">
            <h2 className="text-3xl font-bold uppercase mb-6 font-mono">
              // Syllabus
            </h2>
            <p className="text-xl leading-relaxed mb-6">
              {course.description}
            </p>
            <p className="text-lg font-mono text-gray-600 dark:text-gray-400">
              Tech Stack: {course.tech}
            </p>
          </div>

          {/* Right Column: Apply */}
          <div className="flex flex-col justify-center">
            <div className="border-2 border-black dark:border-white p-8">
              <h3 className="text-2xl font-bold uppercase mb-4">
                Ready to deploy?
              </h3>
              <p className="mb-8 font-mono text-sm">
                Join the cohort. Start learning today. Pay after you get hired.
              </p>
              
              <button className="w-full rounded-none border-2 border-black dark:border-white bg-orange-600 text-white px-8 py-4 text-xl font-bold uppercase tracking-wide hover:bg-orange-700 transition-colors mb-4">
                Apply Now
              </button>
              
              <Link href="/courses" className="block text-center text-sm font-bold uppercase font-mono hover:underline">
                ← Back to List
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
