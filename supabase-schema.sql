-- =====================================================
-- Baku Stack - Supabase Database Schema
-- =====================================================
-- This script creates all necessary tables for the MVP
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. PROFILES TABLE (Users)
-- =====================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'instructor')),
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster email lookups
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);

-- =====================================================
-- 2. COURSES TABLE
-- =====================================================
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  instructor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_published ON courses(is_published);
CREATE INDEX idx_courses_slug ON courses(slug);

-- =====================================================
-- 3. MODULES TABLE (Course sections)
-- =====================================================
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure unique ordering within each course
  UNIQUE(course_id, order_index)
);

-- Index for ordering
CREATE INDEX idx_modules_course ON modules(course_id, order_index);

-- =====================================================
-- 4. LESSONS TABLE (Individual videos/content)
-- =====================================================
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  video_url TEXT,
  content TEXT, -- Markdown content/description
  duration INTEGER, -- Duration in seconds
  order_index INTEGER NOT NULL,
  is_free BOOLEAN DEFAULT false, -- Free preview lessons
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure unique ordering within each module
  UNIQUE(module_id, order_index)
);

-- Index for ordering
CREATE INDEX idx_lessons_module ON lessons(module_id, order_index);

-- =====================================================
-- 5. SUBMISSIONS TABLE (Homework/Assignments)
-- =====================================================
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL, -- Student's code/answer
  feedback TEXT, -- Instructor's review
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  grade NUMERIC(5, 2), -- Optional grade (0-100)
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,

  -- One submission per student per lesson
  UNIQUE(lesson_id, student_id)
);

-- Indexes
CREATE INDEX idx_submissions_lesson ON submissions(lesson_id);
CREATE INDEX idx_submissions_student ON submissions(student_id);
CREATE INDEX idx_submissions_status ON submissions(status);

-- =====================================================
-- 6. ENROLLMENTS TABLE (Student course enrollment)
-- =====================================================
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),

  -- One enrollment per student per course
  UNIQUE(student_id, course_id)
);

-- Indexes
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);

-- =====================================================
-- 7. LESSON_PROGRESS TABLE (Track completed lessons)
-- =====================================================
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,

  -- One progress record per student per lesson
  UNIQUE(student_id, lesson_id)
);

-- Indexes
CREATE INDEX idx_lesson_progress_student ON lesson_progress(student_id);
CREATE INDEX idx_lesson_progress_lesson ON lesson_progress(lesson_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PROFILES POLICIES
-- =====================================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Anyone can view instructor profiles (for course pages)
CREATE POLICY "Anyone can view instructor profiles"
  ON profiles FOR SELECT
  USING (role = 'instructor');

-- =====================================================
-- COURSES POLICIES
-- =====================================================

-- Anyone can view published courses
CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT
  USING (is_published = true);

-- Instructors can view their own courses
CREATE POLICY "Instructors can view own courses"
  ON courses FOR SELECT
  USING (auth.uid() = instructor_id);

-- Instructors can create courses
CREATE POLICY "Instructors can create courses"
  ON courses FOR INSERT
  WITH CHECK (auth.uid() = instructor_id);

-- Instructors can update their own courses
CREATE POLICY "Instructors can update own courses"
  ON courses FOR UPDATE
  USING (auth.uid() = instructor_id);

-- Instructors can delete their own courses
CREATE POLICY "Instructors can delete own courses"
  ON courses FOR DELETE
  USING (auth.uid() = instructor_id);

-- =====================================================
-- MODULES POLICIES
-- =====================================================

-- Anyone can view modules of published courses
CREATE POLICY "Anyone can view published course modules"
  ON modules FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = modules.course_id
      AND courses.is_published = true
    )
  );

-- Instructors can manage modules of their courses
CREATE POLICY "Instructors can manage own course modules"
  ON modules FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = modules.course_id
      AND courses.instructor_id = auth.uid()
    )
  );

-- =====================================================
-- LESSONS POLICIES
-- =====================================================

-- Anyone can view free lessons
CREATE POLICY "Anyone can view free lessons"
  ON lessons FOR SELECT
  USING (is_free = true);

-- Enrolled students can view lessons of enrolled courses
CREATE POLICY "Enrolled students can view course lessons"
  ON lessons FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM modules
      JOIN courses ON courses.id = modules.course_id
      JOIN enrollments ON enrollments.course_id = courses.id
      WHERE modules.id = lessons.module_id
      AND enrollments.student_id = auth.uid()
    )
  );

-- Instructors can manage lessons of their courses
CREATE POLICY "Instructors can manage own course lessons"
  ON lessons FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM modules
      JOIN courses ON courses.id = modules.course_id
      WHERE modules.id = lessons.module_id
      AND courses.instructor_id = auth.uid()
    )
  );

-- =====================================================
-- SUBMISSIONS POLICIES
-- =====================================================

-- Students can view their own submissions
CREATE POLICY "Students can view own submissions"
  ON submissions FOR SELECT
  USING (auth.uid() = student_id);

-- Students can create submissions for enrolled courses
CREATE POLICY "Students can submit homework"
  ON submissions FOR INSERT
  WITH CHECK (
    auth.uid() = student_id
    AND EXISTS (
      SELECT 1 FROM lessons
      JOIN modules ON modules.id = lessons.module_id
      JOIN courses ON courses.id = modules.course_id
      JOIN enrollments ON enrollments.course_id = courses.id
      WHERE lessons.id = submissions.lesson_id
      AND enrollments.student_id = auth.uid()
    )
  );

-- Instructors can view submissions for their courses
CREATE POLICY "Instructors can view course submissions"
  ON submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM lessons
      JOIN modules ON modules.id = lessons.module_id
      JOIN courses ON courses.id = modules.course_id
      WHERE lessons.id = submissions.lesson_id
      AND courses.instructor_id = auth.uid()
    )
  );

-- Instructors can update submissions (add feedback/grade)
CREATE POLICY "Instructors can grade submissions"
  ON submissions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM lessons
      JOIN modules ON modules.id = lessons.module_id
      JOIN courses ON courses.id = modules.course_id
      WHERE lessons.id = submissions.lesson_id
      AND courses.instructor_id = auth.uid()
    )
  );

-- =====================================================
-- ENROLLMENTS POLICIES
-- =====================================================

-- Students can view their own enrollments
CREATE POLICY "Students can view own enrollments"
  ON enrollments FOR SELECT
  USING (auth.uid() = student_id);

-- Students can enroll in courses
CREATE POLICY "Students can enroll in courses"
  ON enrollments FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- Instructors can view enrollments in their courses
CREATE POLICY "Instructors can view course enrollments"
  ON enrollments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = enrollments.course_id
      AND courses.instructor_id = auth.uid()
    )
  );

-- =====================================================
-- LESSON_PROGRESS POLICIES
-- =====================================================

-- Students can view and update their own progress
CREATE POLICY "Students can manage own progress"
  ON lesson_progress FOR ALL
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);

-- Instructors can view progress in their courses
CREATE POLICY "Instructors can view course progress"
  ON lesson_progress FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM lessons
      JOIN modules ON modules.id = lessons.module_id
      JOIN courses ON courses.id = modules.course_id
      WHERE lessons.id = lesson_progress.lesson_id
      AND courses.instructor_id = auth.uid()
    )
  );

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-update enrollment progress
CREATE OR REPLACE FUNCTION update_enrollment_progress()
RETURNS TRIGGER AS $$
DECLARE
  total_lessons INTEGER;
  completed_lessons INTEGER;
  new_progress INTEGER;
  enrollment_course_id UUID;
BEGIN
  -- Get the course_id from the lesson
  SELECT courses.id INTO enrollment_course_id
  FROM lessons
  JOIN modules ON modules.id = lessons.module_id
  JOIN courses ON courses.id = modules.course_id
  WHERE lessons.id = NEW.lesson_id;

  -- Count total lessons in the course
  SELECT COUNT(*) INTO total_lessons
  FROM lessons
  JOIN modules ON modules.id = lessons.module_id
  WHERE modules.course_id = enrollment_course_id;

  -- Count completed lessons by this student
  SELECT COUNT(*) INTO completed_lessons
  FROM lesson_progress
  JOIN lessons ON lessons.id = lesson_progress.lesson_id
  JOIN modules ON modules.id = lessons.module_id
  WHERE modules.course_id = enrollment_course_id
  AND lesson_progress.student_id = NEW.student_id
  AND lesson_progress.completed = true;

  -- Calculate progress percentage
  IF total_lessons > 0 THEN
    new_progress := (completed_lessons * 100) / total_lessons;
  ELSE
    new_progress := 0;
  END IF;

  -- Update enrollment progress
  UPDATE enrollments
  SET progress = new_progress,
      completed_at = CASE WHEN new_progress = 100 THEN NOW() ELSE NULL END
  WHERE student_id = NEW.student_id
  AND course_id = enrollment_course_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update enrollment progress when lesson is completed
CREATE TRIGGER update_progress_on_lesson_complete
AFTER INSERT OR UPDATE ON lesson_progress
FOR EACH ROW
WHEN (NEW.completed = true)
EXECUTE FUNCTION update_enrollment_progress();

-- =====================================================
-- SEED DATA (Optional - for testing)
-- =====================================================

-- Insert a test instructor (you'll need to replace with real auth.uid())
-- INSERT INTO profiles (id, email, role, full_name) VALUES
--   ('11111111-1111-1111-1111-111111111111', 'instructor@baku.com', 'instructor', 'Test Instructor');

-- Insert a test student
-- INSERT INTO profiles (id, email, role, full_name) VALUES
--   ('22222222-2222-2222-2222-222222222222', 'student@baku.com', 'student', 'Test Student');

-- =====================================================
-- END OF SCHEMA
-- =====================================================

-- To run this script:
-- 1. Go to Supabase Dashboard
-- 2. Navigate to SQL Editor
-- 3. Paste this entire script
-- 4. Click "Run"

-- Notes:
-- - auth.uid() refers to Supabase Auth user ID
-- - After creating tables, you'll need to sync profiles with auth.users
-- - Consider creating a trigger to auto-create profile on user signup
