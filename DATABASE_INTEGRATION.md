# 🚀 Database Integration Guide

This guide shows how to integrate the Supabase database with your existing Baku Stack app.

---

## 📦 Step 1: Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

---

## ⚙️ Step 2: Configure Environment Variables

Add to your `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Keep existing
ANTHROPIC_API_KEY=your-key-here
```

**Where to find these:**
1. Go to your Supabase project dashboard
2. Click on ⚙️ Settings → API
3. Copy "Project URL" → `NEXT_PUBLIC_SUPABASE_URL`
4. Copy "anon public" key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🗄️ Step 3: Set Up Database

1. **Run the SQL schema:**
   - Open Supabase Dashboard → SQL Editor
   - Paste content from `supabase-schema.sql`
   - Click "Run"

2. **Set up auth trigger:**
   - Copy the trigger from `supabase-setup.md` (Step 3)
   - Run it in SQL Editor

---

## 🔄 Step 4: Replace Mock Data with Real Data

### Current State:
- `lib/data.ts` has hardcoded courses
- Login page is fake (console.log only)
- Dashboard shows mock progress

### After Integration:
- Courses fetched from Supabase
- Real authentication with Supabase Auth
- Real progress tracking

---

## 🛠️ Step 5: Update Components

### 5.1 Update Courses Page

**Before:** Uses hardcoded `courses` from `lib/data.ts`

**After:** Fetch from Supabase

```typescript
// app/courses/page.tsx
import { getPublishedCourses } from '@/lib/supabase';

export default async function CoursesPage() {
  const courses = await getPublishedCourses();

  // Rest of your component...
}
```

### 5.2 Update Course Detail Page

```typescript
// app/courses/[slug]/page.tsx
import { getCourseBySlug } from '@/lib/supabase';

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  // Rest of your component...
}
```

### 5.3 Update Login Page

Replace the fake login with real Supabase auth:

```typescript
// app/login/page.tsx
'use client';

import { signIn } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Your existing form JSX */}
    </form>
  );
}
```

### 5.4 Update Dashboard

```typescript
// app/dashboard/page.tsx
import { getCurrentUserProfile, getStudentEnrollments } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect('/login');
  }

  const enrollments = await getStudentEnrollments(profile.id);

  return (
    <div>
      <h1>Welcome, {profile.full_name}!</h1>
      {/* Display real enrollments */}
    </div>
  );
}
```

### 5.5 Update Learn Page (Video Player)

```typescript
// app/courses/[slug]/learn/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { getCourseBySlug, markLessonComplete, isEnrolled } from '@/lib/supabase';

export default function LearnPage({ params }: { params: { slug: string } }) {
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  // Fetch course data, check enrollment, etc.

  async function handleLessonComplete(lessonId: string) {
    await markLessonComplete(userId, lessonId);
    // Update UI
  }

  return (
    <div>
      {/* Video player + lesson content */}
    </div>
  );
}
```

---

## 🔐 Step 6: Add Authentication Middleware

Create middleware to protect routes:

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Redirect logged-in users away from login
  if (req.nextUrl.pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
```

---

## 📊 Step 7: Create Admin Dashboard (Optional)

For instructors to manage courses:

```typescript
// app/instructor/courses/page.tsx
import { getCurrentUserProfile, getCoursesByInstructor } from '@/lib/supabase';

export default async function InstructorCoursesPage() {
  const profile = await getCurrentUserProfile();

  if (profile?.role !== 'instructor') {
    return <div>Access denied</div>;
  }

  const courses = await getCoursesByInstructor(profile.id);

  return (
    <div>
      <h1>My Courses</h1>
      {/* List of instructor's courses */}
    </div>
  );
}
```

---

## 🧪 Step 8: Testing

### Test User Creation

```bash
# Using Supabase CLI (optional)
supabase functions invoke auth --data '{"email":"test@example.com","password":"password123"}'
```

Or use the Supabase dashboard:
1. Go to Authentication → Users
2. Click "Add user"
3. Enter email and password

### Test Data Insertion

Run this SQL in your Supabase SQL Editor:

```sql
-- Get your user ID
SELECT id FROM auth.users WHERE email = 'your-email@example.com';

-- Insert a test course
INSERT INTO courses (title, slug, instructor_id, price, is_published)
VALUES (
  'Test Course',
  'test-course',
  'your-user-id-here',
  99.99,
  true
);
```

---

## 🚀 Step 9: Deploy

### Update `.gitignore`

Make sure these are ignored:

```
.env*.local
.env.local
.env
```

### Environment Variables for Production

Add the same env vars to your hosting platform (Vercel, Netlify, etc.):

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
ANTHROPIC_API_KEY=...
```

---

## 📝 Migration Checklist

- [ ] Install Supabase packages
- [ ] Add environment variables
- [ ] Run database schema SQL
- [ ] Set up auth trigger
- [ ] Update courses page to fetch from DB
- [ ] Replace fake login with real auth
- [ ] Update dashboard with real enrollments
- [ ] Add middleware for route protection
- [ ] Test user registration
- [ ] Test course enrollment
- [ ] Test lesson progress tracking
- [ ] Test homework submission
- [ ] Remove hardcoded data from `lib/data.ts`
- [ ] Update TypeScript types

---

## 🔍 Common Issues

### "JWT expired" error
- Session expired, user needs to log in again
- Implement token refresh logic

### "Row Level Security policy violation"
- Check RLS policies in Supabase
- Ensure user is authenticated
- Verify user has correct role

### "Foreign key constraint" error
- Parent record doesn't exist
- Check IDs are correct UUIDs

### Data not showing
- Check RLS policies
- Verify user authentication
- Use Supabase dashboard to check data

---

## 📚 Next Features to Add

1. **Email verification** - Require users to verify email
2. **Password reset** - "Forgot password" flow
3. **Profile editing** - Let users update their info
4. **Course reviews** - Add ratings and reviews table
5. **Certificates** - Generate PDF certificates on completion
6. **Payments** - Integrate Stripe for ISA model
7. **Video hosting** - Set up Supabase Storage for videos
8. **Real-time chat** - Use Supabase Realtime for AI chat history

---

## 🆘 Getting Help

- [Supabase Discord](https://discord.supabase.com)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
