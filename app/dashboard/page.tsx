import Link from "next/link";
import { COURSES } from "@/lib/data";

// Get first 3 courses for enrolled courses
const ENROLLED_COURSES = COURSES.slice(0, 3);

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      {/* Header */}
      <section className="min-h-[40vh] flex flex-col justify-center p-16 border-b-2 border-black dark:border-white">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-sm mb-4 text-gray-600 dark:text-gray-400 uppercase tracking-widest">
            /dashboard
          </div>
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tight font-sans">
            Student Dashboard
          </h1>
          <p className="text-xl font-mono mt-6 text-gray-600 dark:text-gray-400">
            Welcome back, Cadet.
          </p>
        </div>
      </section>

      {/* Enrolled Courses */}
      <section className="p-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-12 font-sans">
            Enrolled Courses
          </h2>

          <div className="space-y-0">
            {ENROLLED_COURSES.map((course) => (
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
                  {course.description}
                </p>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between font-mono text-sm mb-2">
                    <span className="opacity-50">Progress</span>
                    <span className="font-bold">50%</span>
                  </div>
                  <div className="w-full h-3 border-2 border-black dark:border-white">
                    <div className="h-full bg-orange-600" style={{ width: "50%" }}></div>
                  </div>
                </div>
              </Link>
            ))}
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
            ← Browse All Courses
          </Link>
          <div className="font-mono text-xs text-gray-500 dark:text-gray-500">
            END OF DASHBOARD
          </div>
        </div>
      </footer>
    </main>
  );
}
