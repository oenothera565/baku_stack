import { createClient } from '@supabase/supabase-js';

// Supabase client for client-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

// =====================================================
// DATABASE TYPES (TypeScript interfaces)
// =====================================================

export interface Profile {
  id: string;
  email: string;
  role: 'student' | 'instructor';
  full_name: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description?: string;
  instructor_id: string;
  price: number;
  is_published: boolean;
  thumbnail_url?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  updated_at: string;
}

export interface CourseWithInstructor extends Course {
  instructor: Profile;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  video_url?: string;
  content?: string;
  duration?: number;
  order_index: number;
  is_free: boolean;
  created_at: string;
  updated_at: string;
}

export interface Submission {
  id: string;
  lesson_id: string;
  student_id: string;
  content: string;
  feedback?: string;
  status: 'pending' | 'approved' | 'rejected';
  grade?: number;
  submitted_at: string;
  reviewed_at?: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  enrolled_at: string;
  completed_at?: string;
  progress: number;
}

export interface EnrollmentWithCourse extends Enrollment {
  course: Course;
}

export interface LessonProgress {
  id: string;
  student_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at?: string;
}

// =====================================================
// DATABASE QUERIES
// =====================================================

// -----------------------------------------------------
// COURSES
// -----------------------------------------------------

/**
 * Get all published courses
 */
export async function getPublishedCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      instructor:profiles!courses_instructor_id_fkey(*)
    `)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as CourseWithInstructor[];
}

/**
 * Get a course by slug with all modules and lessons
 */
export async function getCourseBySlug(slug: string) {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      instructor:profiles!courses_instructor_id_fkey(*),
      modules(
        *,
        lessons(*)
      )
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get courses by instructor
 */
export async function getCoursesByInstructor(instructorId: string) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('instructor_id', instructorId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Course[];
}

// -----------------------------------------------------
// ENROLLMENTS
// -----------------------------------------------------

/**
 * Enroll a student in a course
 */
export async function enrollInCourse(studentId: string, courseId: string) {
  const { data, error } = await supabase
    .from('enrollments')
    .insert({ student_id: studentId, course_id: courseId })
    .select()
    .single();

  if (error) throw error;
  return data as Enrollment;
}

/**
 * Get student enrollments
 */
export async function getStudentEnrollments(studentId: string) {
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      course:courses(*)
    `)
    .eq('student_id', studentId)
    .order('enrolled_at', { ascending: false });

  if (error) throw error;
  return data as EnrollmentWithCourse[];
}

/**
 * Check if student is enrolled in a course
 */
export async function isEnrolled(studentId: string, courseId: string) {
  const { data, error } = await supabase
    .from('enrollments')
    .select('id')
    .eq('student_id', studentId)
    .eq('course_id', courseId)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

// -----------------------------------------------------
// LESSON PROGRESS
// -----------------------------------------------------

/**
 * Mark a lesson as completed
 */
export async function markLessonComplete(studentId: string, lessonId: string) {
  const { data, error } = await supabase
    .from('lesson_progress')
    .upsert(
      {
        student_id: studentId,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'student_id,lesson_id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as LessonProgress;
}

/**
 * Get student progress for a course
 */
export async function getCourseProgress(studentId: string, courseId: string) {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select(`
      *,
      lesson:lessons!inner(
        *,
        module:modules!inner(
          course_id
        )
      )
    `)
    .eq('student_id', studentId)
    .eq('lesson.module.course_id', courseId);

  if (error) throw error;
  return data;
}

/**
 * Get completed lesson IDs for a student
 */
export async function getCompletedLessonIds(studentId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('lesson_id')
    .eq('student_id', studentId)
    .eq('completed', true);

  if (error) throw error;
  return data ? data.map(item => item.lesson_id) : [];
}

// -----------------------------------------------------
// SUBMISSIONS
// -----------------------------------------------------

/**
 * Submit homework for a lesson
 */
export async function submitHomework(
  studentId: string,
  lessonId: string,
  content: string
) {
  const { data, error } = await supabase
    .from('submissions')
    .upsert(
      {
        student_id: studentId,
        lesson_id: lessonId,
        content,
        status: 'pending',
        submitted_at: new Date().toISOString(),
      },
      { onConflict: 'student_id,lesson_id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as Submission;
}

/**
 * Get submissions for a lesson (instructor view)
 */
export async function getLessonSubmissions(lessonId: string) {
  const { data, error } = await supabase
    .from('submissions')
    .select(`
      *,
      student:profiles!submissions_student_id_fkey(*)
    `)
    .eq('lesson_id', lessonId)
    .order('submitted_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Grade a submission (instructor)
 */
export async function gradeSubmission(
  submissionId: string,
  feedback: string,
  status: 'approved' | 'rejected',
  grade?: number
) {
  const { data, error } = await supabase
    .from('submissions')
    .update({
      feedback,
      status,
      grade,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', submissionId)
    .select()
    .single();

  if (error) throw error;
  return data as Submission;
}

// -----------------------------------------------------
// PROFILES
// -----------------------------------------------------

/**
 * Get current user profile
 */
export async function getCurrentUserProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data as Profile;
}

/**
 * Update user profile
 */
export async function updateProfile(
  userId: string,
  updates: Partial<Profile>
) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as Profile;
}

// =====================================================
// AUTH HELPERS
// =====================================================

/**
 * Sign up a new user
 */
export async function signUp(
  email: string,
  password: string,
  fullName: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;
  return data;
}

/**
 * Sign in a user
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

/**
 * Sign out
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Get current session
 */
export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}
