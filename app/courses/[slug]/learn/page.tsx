"use client";

import { use, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLanguage } from "@/context/LanguageContext";
import { Layout } from "@/components/Layout";
import {
  getCourseBySlug,
  getCurrentUserProfile,
  isEnrolled,
  markLessonComplete,
  getCompletedLessonIds,
} from "@/lib/supabase";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface Lesson {
  id: string;
  title: string;
  video_url?: string;
  duration?: number;
  is_free: boolean;
  order_index: number;
}

interface Module {
  id: string;
  title: string;
  order_index: number;
  lessons?: Lesson[];
}

interface CourseData {
  id: string;
  title: string;
  slug: string;
  modules?: Module[];
}

export default function LearnPage({ params }: PageProps) {
  const { slug } = use(params);
  const { t } = useLanguage();
  const router = useRouter();

  const [course, setCourse] = useState<CourseData | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  useEffect(() => {
    async function loadCourse() {
      try {
        // Get user profile
        const profile = await getCurrentUserProfile();
        if (!profile) {
          router.push("/login");
          return;
        }
        setUserId(profile.id);

        // Load course
        const courseData = await getCourseBySlug(slug);
        if (!courseData) {
          notFound();
        }

        // Check enrollment
        const isUserEnrolled = await isEnrolled(profile.id, courseData.id);
        setEnrolled(isUserEnrolled);

        // Load completed lessons
        const completedIds = await getCompletedLessonIds(profile.id);
        setCompletedLessonIds(completedIds);

        setCourse(courseData as CourseData);

        // Set first lesson as default
        if (courseData.modules && courseData.modules.length > 0) {
          const firstModule = courseData.modules[0];
          const firstLesson = firstModule.lessons?.[0];
          if (firstLesson) {
            setCurrentModule(firstModule);
            setCurrentLesson(firstLesson);
          }
        }
      } catch (err) {
        console.error("Failed to load course:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [slug, router]);

  const handleLessonClick = (module: Module, lesson: Lesson) => {
    // Check if lesson is locked
    if (!enrolled && !lesson.is_free) {
      toast.error("🔒 Please enroll in this course to access this lesson");
      return;
    }

    setCurrentModule(module);
    setCurrentLesson(lesson);
  };

  const handleMarkComplete = async () => {
    if (!userId || !currentLesson) return;

    const toastId = toast.loading('Marking as complete...');

    try {
      await markLessonComplete(userId, currentLesson.id);

      // Update completed lessons list
      setCompletedLessonIds(prev => [...prev, currentLesson.id]);

      toast.success('Lesson marked as complete! ✓', { id: toastId });
    } catch (err) {
      console.error("Failed to mark lesson complete:", err);
      toast.error('Failed to mark lesson as complete', { id: toastId });
    }
  };

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
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

  const embedUrl = getYouTubeEmbedUrl(currentLesson?.video_url);

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
          {!enrolled && (
            <div className="font-mono text-xs border border-orange-600 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 text-orange-600">
              NOT ENROLLED
            </div>
          )}
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-0">
        {/* Left Column: Video Player (75% = 3 cols) */}
        <div className="lg:col-span-3 border-r-2 border-black dark:border-white">
          <div className="aspect-video w-full bg-black dark:bg-gray-900 flex items-center justify-center">
            {embedUrl ? (
              <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                title={currentLesson?.title || "Video"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <p className="text-white font-mono text-lg">
                {currentLesson ? "No video available for this lesson" : "Select a lesson to start"}
              </p>
            )}
          </div>

          {/* Video Info */}
          {currentLesson && (
            <div className="p-8 border-b-2 border-black dark:border-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-mono text-xs text-gray-500 mb-2">
                    {currentModule?.title}
                  </div>
                  <h2 className="text-3xl font-bold uppercase mb-2">
                    {currentLesson.title}
                  </h2>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    {currentLesson.duration ? `${currentLesson.duration} min` : "Duration unknown"}
                    {currentLesson.is_free && (
                      <span className="ml-3 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs">
                        FREE
                      </span>
                    )}
                  </p>
                </div>
                {enrolled && (
                  <>
                    {completedLessonIds.includes(currentLesson.id) ? (
                      <div className="px-4 py-2 border-2 border-green-600 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-bold uppercase text-sm text-center">
                        ✓ COMPLETED
                      </div>
                    ) : (
                      <button
                        onClick={handleMarkComplete}
                        className="px-4 py-2 border-2 border-black dark:border-white bg-green-600 text-white font-bold uppercase text-sm hover:bg-green-700 transition-colors"
                      >
                        ✓ MARK COMPLETE
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Syllabus (25% = 1 col) */}
        <div className="lg:col-span-1">
          <div className="sticky top-0 max-h-screen overflow-y-auto">
            <div className="border-b-2 border-black dark:border-white p-4">
              <h3 className="font-mono text-sm uppercase tracking-widest text-gray-600 dark:text-gray-400">
                {t.learn.syllabus}
              </h3>
            </div>

            {course.modules && course.modules.length > 0 ? (
              <div>
                {course.modules
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((module) => (
                    <div key={module.id} className="border-b border-black/20 dark:border-white/20">
                      {/* Module Header */}
                      <div className="p-4 bg-gray-50 dark:bg-gray-900">
                        <h4 className="font-mono text-xs uppercase font-bold">
                          {module.title}
                        </h4>
                      </div>

                      {/* Lessons */}
                      {module.lessons &&
                        module.lessons
                          .sort((a, b) => a.order_index - b.order_index)
                          .map((lesson) => {
                            const isPlaying = currentLesson?.id === lesson.id;
                            const isLocked = !enrolled && !lesson.is_free;
                            const isCompleted = completedLessonIds.includes(lesson.id);

                            return (
                              <button
                                key={lesson.id}
                                onClick={() => handleLessonClick(module, lesson)}
                                className={`w-full text-left p-3 font-mono text-xs transition-all hover:bg-black/5 dark:hover:bg-white/5 ${
                                  isLocked ? "opacity-50" : ""
                                } ${isPlaying ? "bg-orange-50 dark:bg-orange-900/20" : ""} ${
                                  isCompleted ? "bg-green-50 dark:bg-green-900/20" : ""
                                }`}
                                disabled={isLocked}
                              >
                                <div className="flex items-start gap-2">
                                  <span className="flex-shrink-0 mt-0.5">
                                    {isCompleted ? (
                                      <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                                    ) : isPlaying ? (
                                      <span className="inline-block w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                                    ) : isLocked ? (
                                      <span>🔒</span>
                                    ) : (
                                      <span className="text-gray-400">▶</span>
                                    )}
                                  </span>
                                  <span
                                    className={
                                      isPlaying
                                        ? "text-black dark:text-white font-semibold"
                                        : isCompleted
                                        ? "text-green-700 dark:text-green-300"
                                        : "text-gray-700 dark:text-gray-300"
                                    }
                                  >
                                    {lesson.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 ml-4 mt-1">
                                  {lesson.duration && (
                                    <span className="text-gray-500 text-xs">
                                      {lesson.duration} min
                                    </span>
                                  )}
                                  {isCompleted && (
                                    <span className="text-green-600 dark:text-green-400 text-xs font-bold">
                                      COMPLETED
                                    </span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="p-8 text-center font-mono text-sm text-gray-500">
                No lessons available yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
