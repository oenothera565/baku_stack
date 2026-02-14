# Supabase Database Setup Guide

## 📋 Overview

This guide will help you set up the complete database structure for Baku Stack on Supabase.

## 🗄️ Database Schema

### Tables Created:
1. **profiles** - User information (students & instructors)
2. **courses** - Course catalog
3. **modules** - Course sections/chapters
4. **lessons** - Individual video lessons
5. **submissions** - Student homework submissions
6. **enrollments** - Student course enrollments
7. **lesson_progress** - Track completed lessons

### Features:
- ✅ UUID primary keys
- ✅ Foreign key relationships
- ✅ Cascading deletes
- ✅ Row Level Security (RLS) policies
- ✅ Automatic timestamps
- ✅ Auto-update enrollment progress
- ✅ Unique constraints

---

## 🚀 Setup Instructions

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for setup to complete (2-3 minutes)
4. Note your project URL and anon key

### Step 2: Run SQL Schema

1. Open your Supabase Dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy the entire content from `supabase-schema.sql`
5. Paste into the editor
6. Click **Run** (or press Ctrl/Cmd + Enter)

✅ You should see: "Success. No rows returned"

### Step 3: Set Up Auth Trigger

To automatically create a profile when a user signs up, run this additional SQL:

```sql
-- Create a trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    'student', -- Default role
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Step 4: Configure Environment Variables

Add these to your `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Keep existing
ANTHROPIC_API_KEY=your-anthropic-key
```

### Step 5: Install Supabase Client

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

---

## 🔐 Row Level Security (RLS) Summary

### Profiles
- ✅ Users can view/edit their own profile
- ✅ Anyone can view instructor profiles

### Courses
- ✅ Anyone can view published courses
- ✅ Instructors can manage their own courses

### Modules & Lessons
- ✅ Anyone can view published course content
- ✅ Enrolled students can view all lessons
- ✅ Instructors can manage their own content

### Submissions
- ✅ Students can submit and view their own homework
- ✅ Instructors can view and grade submissions for their courses

### Enrollments
- ✅ Students can enroll and view their enrollments
- ✅ Instructors can view enrollments in their courses

### Progress Tracking
- ✅ Students can update their own progress
- ✅ Instructors can view student progress

---

## 🧪 Testing the Database

### 1. Create Test Data

Run this SQL to create test instructor and course:

```sql
-- Create test instructor profile (use a real auth user ID)
INSERT INTO profiles (id, email, role, full_name, bio)
VALUES (
  'your-auth-user-id-here',
  'instructor@test.com',
  'instructor',
  'John Doe',
  'Senior Full Stack Developer with 10 years experience'
);

-- Create test course
INSERT INTO courses (title, slug, description, instructor_id, price, is_published)
VALUES (
  'Complete Frontend Development',
  'frontend-dev',
  'Learn HTML, CSS, JavaScript, React and more!',
  'your-auth-user-id-here',
  999.99,
  true
);

-- Create test module
INSERT INTO modules (course_id, title, description, order_index)
VALUES (
  (SELECT id FROM courses WHERE slug = 'frontend-dev'),
  'Introduction to HTML',
  'Learn the basics of HTML',
  1
);

-- Create test lesson
INSERT INTO lessons (module_id, title, content, order_index, is_free)
VALUES (
  (SELECT id FROM modules WHERE title = 'Introduction to HTML'),
  'HTML Basics',
  '# Welcome to HTML\n\nIn this lesson, you will learn...',
  1,
  true
);
```

### 2. Test Enrollment

```sql
-- Enroll a student (use real student auth user ID)
INSERT INTO enrollments (student_id, course_id)
VALUES (
  'student-auth-user-id',
  (SELECT id FROM courses WHERE slug = 'frontend-dev')
);
```

### 3. Test Lesson Progress

```sql
-- Mark a lesson as completed
INSERT INTO lesson_progress (student_id, lesson_id, completed, completed_at)
VALUES (
  'student-auth-user-id',
  (SELECT id FROM lessons WHERE title = 'HTML Basics'),
  true,
  NOW()
);

-- Check enrollment progress (should auto-update)
SELECT * FROM enrollments WHERE student_id = 'student-auth-user-id';
```

---

## 📊 Useful Queries

### Get all courses with instructor info
```sql
SELECT
  c.*,
  p.full_name as instructor_name,
  p.avatar_url as instructor_avatar
FROM courses c
JOIN profiles p ON p.id = c.instructor_id
WHERE c.is_published = true;
```

### Get course structure (modules + lessons)
```sql
SELECT
  c.title as course_title,
  m.title as module_title,
  m.order_index as module_order,
  l.title as lesson_title,
  l.order_index as lesson_order,
  l.duration
FROM courses c
JOIN modules m ON m.course_id = c.id
JOIN lessons l ON l.module_id = m.id
WHERE c.slug = 'frontend-dev'
ORDER BY m.order_index, l.order_index;
```

### Get student progress in a course
```sql
SELECT
  c.title as course,
  COUNT(l.id) as total_lessons,
  COUNT(lp.id) FILTER (WHERE lp.completed = true) as completed_lessons,
  e.progress,
  e.enrolled_at
FROM enrollments e
JOIN courses c ON c.id = e.course_id
JOIN modules m ON m.course_id = c.id
JOIN lessons l ON l.module_id = m.id
LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.student_id = e.student_id
WHERE e.student_id = 'your-student-id'
GROUP BY c.id, c.title, e.progress, e.enrolled_at;
```

### Get pending submissions for instructor
```sql
SELECT
  s.*,
  p.full_name as student_name,
  l.title as lesson_title,
  c.title as course_title
FROM submissions s
JOIN profiles p ON p.id = s.student_id
JOIN lessons l ON l.id = s.lesson_id
JOIN modules m ON m.id = l.module_id
JOIN courses c ON c.id = m.course_id
WHERE c.instructor_id = 'your-instructor-id'
AND s.status = 'pending'
ORDER BY s.submitted_at DESC;
```

---

## 🔧 Next Steps

After setting up the database:

1. **Install Auth Package**: `npm install @supabase/auth-helpers-nextjs`
2. **Create Supabase Client**: Create `lib/supabase.ts` for database queries
3. **Implement Auth**: Replace fake login with real Supabase Auth
4. **Build API Routes**: Create Next.js API routes for CRUD operations
5. **Update Components**: Connect UI to real database

---

## 📝 Notes

- **Cascading Deletes**: Deleting a course will delete all its modules, lessons, submissions, etc.
- **Progress Auto-Update**: Enrollment progress automatically updates when lessons are completed
- **Unique Constraints**: Students can only enroll once per course, submit once per lesson
- **RLS Enabled**: All tables have Row Level Security enabled for data protection

---

## 🆘 Troubleshooting

### "permission denied for table profiles"
- Make sure RLS policies are created
- Check that you're using authenticated user (auth.uid())

### "no rows returned" when querying
- Check RLS policies
- Verify you're querying with correct user context

### Foreign key constraint errors
- Ensure parent records exist before inserting children
- Check UUID references are correct

### Progress not updating
- Check the trigger `update_progress_on_lesson_complete` is created
- Verify lesson_progress.completed is set to `true`

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
