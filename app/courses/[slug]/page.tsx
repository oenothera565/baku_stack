"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLanguage } from "@/context/LanguageContext";
import { Layout } from "@/components/Layout";
import { getCourseBySlug, getCurrentUserProfile, isEnrolled, enrollInCourse } from "@/lib/supabase";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface CourseDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  difficulty: string;
  instructor: {
    full_name: string;
    bio: string;
  };
  modules?: Array<{
    id: string;
    title: string;
    description: string;
    order_index: number;
    lessons?: Array<{
      id: string;
      title: string;
      duration: number;
      is_free: boolean;
    }>;
  }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const { t, getCourse } = useLanguage();
  const router = useRouter();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      try {
        const data = await getCourseBySlug(slug);
        if (!data) {
          notFound();
        }
        setCourse(data as CourseDetail);

        // Check if user is logged in and enrolled
        try {
          const profile = await getCurrentUserProfile();
          if (profile) {
            setUserId(profile.id);
            const enrollmentStatus = await isEnrolled(profile.id, data.id);
            setEnrolled(enrollmentStatus);
          }
        } catch {
          // User not logged in, that's okay
          setUserId(null);
        }
      } catch (err) {
        console.error("Failed to load course:", err);
      } finally {
        setLoading(false);
        setCheckingAuth(false);
      }
    }
    loadCourse();
  }, [slug]);

  const handleEnroll = async () => {
    if (!userId) {
      toast.error('Please login to enroll in this course');
      router.push('/login?redirect=' + encodeURIComponent(`/courses/${slug}`));
      return;
    }

    if (!course) return;

    setEnrolling(true);
    const toastId = toast.loading('Enrolling...');

    try {
      await enrollInCourse(userId, course.id);
      setEnrolled(true);
      toast.success('Successfully enrolled! 🎉', { id: toastId });
    } catch (err) {
      console.error("Enrollment failed:", err);
      toast.error('Failed to enroll. Please try again.', { id: toastId });
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl font-mono">Loading course...</div>
        </div>
      </Layout>
    );
  }

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
          <span className="px-4 py-2 border border-black dark:border-white uppercase">
            {course.difficulty}
          </span>
          <span className="px-4 py-2 border border-black dark:border-white">
            ${course.price.toFixed(2)}
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
              {course.description || courseData.description}
            </p>

            {/* Instructor Info */}
            {course.instructor && (
              <div className="mb-6 p-4 border border-black dark:border-white">
                <p className="text-sm font-bold uppercase mb-2">Instructor</p>
                <p className="text-lg font-mono">{course.instructor.full_name}</p>
                {course.instructor.bio && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {course.instructor.bio}
                  </p>
                )}
              </div>
            )}

            {/* Modules */}
            {course.modules && course.modules.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold uppercase mb-4 font-mono">Modules</h3>
                <div className="space-y-2">
                  {course.modules
                    .sort((a, b) => a.order_index - b.order_index)
                    .map((module) => (
                      <div
                        key={module.id}
                        className="border border-black dark:border-white p-3 font-mono text-sm"
                      >
                        <span className="font-bold">Module {module.order_index}:</span> {module.title}
                        {module.lessons && module.lessons.length > 0 && (
                          <span className="text-gray-600 dark:text-gray-400 ml-2">
                            ({module.lessons.length} lessons)
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Enroll/Continue */}
          <div className="flex flex-col justify-center">
            <div className="border-2 border-black dark:border-white p-8">
              {checkingAuth ? (
                <div className="text-center font-mono">
                  Loading...
                </div>
              ) : enrolled ? (
                <>
                  <h3 className="text-2xl font-bold uppercase mb-4">
                    ✓ ENROLLED
                  </h3>
                  <p className="mb-8 font-mono text-sm text-green-600 dark:text-green-400">
                    You have access to this course
                  </p>

                  <Link
                    href={`/courses/${course.slug}/learn`}
                    className="block w-full rounded-none border-2 border-black dark:border-white bg-green-600 text-white px-8 py-4 text-xl font-bold uppercase tracking-wide hover:bg-green-700 transition-colors mb-4 text-center"
                  >
                    → CONTINUE LEARNING
                  </Link>

                  <Link
                    href="/dashboard"
                    className="block text-center text-sm font-bold uppercase font-mono hover:underline"
                  >
                    Back to Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold uppercase mb-4">
                    {t.courses.detail.readyToDeploy}
                  </h3>
                  <p className="mb-4 font-mono text-sm">
                    {t.courses.detail.joinCohort}
                  </p>

                  {/* Price */}
                  <div className="mb-6 p-4 border border-black dark:border-white">
                    <div className="text-sm font-mono text-gray-600 dark:text-gray-400 uppercase">
                      Course Price
                    </div>
                    <div className="text-3xl font-bold">
                      ${course.price.toFixed(2)}
                    </div>
                  </div>

                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="block w-full rounded-none border-2 border-black dark:border-white bg-orange-600 text-white px-8 py-4 text-xl font-bold uppercase tracking-wide hover:bg-orange-700 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {enrolling ? "ENROLLING..." : "ENROLL NOW"}
                  </button>

                  <Link
                    href="/courses"
                    className="block text-center text-sm font-bold uppercase font-mono hover:underline"
                  >
                    {t.courses.detail.backToList}
                  </Link>
                </>
              )}
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
