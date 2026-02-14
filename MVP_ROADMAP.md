# 🚀 MVP Development Roadmap

This document outlines the path to a fully functional Baku Stack MVP.

---

## 📊 Current Status: Database Architecture Complete ✅

You now have:
- ✅ Complete database schema (`supabase-schema.sql`)
- ✅ Row Level Security policies
- ✅ Database client with helper functions (`lib/supabase.ts`)
- ✅ Setup documentation (`supabase-setup.md`)
- ✅ Integration guide (`DATABASE_INTEGRATION.md`)
- ✅ Environment template (`.env.example`)

---

## 🎯 Phase 1: Database & Auth Setup (Week 1)

### Priority: CRITICAL

**Estimated Time:** 2-3 hours

### Tasks:

1. **Set up Supabase Project**
   - [ ] Create Supabase account
   - [ ] Create new project
   - [ ] Save credentials
   - ⏱️ 10 minutes

2. **Run Database Schema**
   - [ ] Open SQL Editor in Supabase Dashboard
   - [ ] Paste `supabase-schema.sql` contents
   - [ ] Execute the script
   - [ ] Verify tables are created
   - ⏱️ 5 minutes

3. **Install Dependencies**
   ```bash
   npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
   ```
   - ⏱️ 2 minutes

4. **Configure Environment**
   - [ ] Copy `.env.example` to `.env.local`
   - [ ] Add Supabase URL and anon key
   - [ ] Keep existing Anthropic key
   - ⏱️ 5 minutes

5. **Test Database Connection**
   - [ ] Create a test page that fetches from Supabase
   - [ ] Verify connection works
   - ⏱️ 15 minutes

**Deliverable:** Working Supabase connection

---

## 🎯 Phase 2: Authentication System (Week 1-2)

### Priority: HIGH

**Estimated Time:** 4-6 hours

### Tasks:

1. **Set Up Auth Trigger**
   - [ ] Run the auth trigger SQL from `supabase-setup.md`
   - [ ] Test profile creation on signup
   - ⏱️ 10 minutes

2. **Update Login Page**
   - [ ] Replace fake login with `signIn()` from `lib/supabase.ts`
   - [ ] Add error handling
   - [ ] Test login flow
   - ⏱️ 1 hour

3. **Create Signup Page**
   - [ ] Create `app/signup/page.tsx`
   - [ ] Use `signUp()` function
   - [ ] Collect: email, password, full name
   - [ ] Add form validation
   - ⏱️ 2 hours

4. **Add Auth Middleware**
   - [ ] Create `middleware.ts`
   - [ ] Protect `/dashboard` routes
   - [ ] Redirect authenticated users from `/login`
   - ⏱️ 1 hour

5. **Add Logout Functionality**
   - [ ] Add logout button to Navbar
   - [ ] Call `signOut()` function
   - [ ] Redirect to home
   - ⏱️ 30 minutes

6. **Profile Management**
   - [ ] Show user name in Navbar when logged in
   - [ ] Add profile page (optional)
   - ⏱️ 1 hour

**Deliverable:** Working authentication system

---

## 🎯 Phase 3: Course Integration (Week 2)

### Priority: HIGH

**Estimated Time:** 3-4 hours

### Tasks:

1. **Seed Course Data**
   - [ ] Create SQL to insert your 6 courses
   - [ ] Add modules for each course
   - [ ] Add sample lessons
   - ⏱️ 1 hour

2. **Update Courses Page**
   - [ ] Replace hardcoded data with `getPublishedCourses()`
   - [ ] Update types to match database
   - [ ] Test rendering
   - ⏱️ 1 hour

3. **Update Course Detail Page**
   - [ ] Use `getCourseBySlug(slug)`
   - [ ] Display modules and lessons
   - [ ] Show instructor info
   - ⏱️ 1 hour

4. **Add Enrollment Button**
   - [ ] Check if user is enrolled
   - [ ] Show "Enroll" or "Go to Course" button
   - [ ] Call `enrollInCourse()` on click
   - ⏱️ 1 hour

**Deliverable:** Courses loaded from database

---

## 🎯 Phase 4: Dashboard & Progress (Week 2-3)

### Priority: HIGH

**Estimated Time:** 4-5 hours

### Tasks:

1. **Update Dashboard**
   - [ ] Fetch real enrollments with `getStudentEnrollments()`
   - [ ] Display enrolled courses
   - [ ] Show real progress bars
   - ⏱️ 2 hours

2. **Build Learn Page**
   - [ ] Fetch course structure
   - [ ] Show lesson list sidebar
   - [ ] Display current lesson content
   - [ ] Add video player (YouTube embed for now)
   - ⏱️ 2 hours

3. **Lesson Progress Tracking**
   - [ ] Add "Mark as Complete" button
   - [ ] Call `markLessonComplete()`
   - [ ] Update UI to show completed lessons
   - [ ] Auto-update enrollment progress
   - ⏱️ 1 hour

**Deliverable:** Functional student dashboard with progress tracking

---

## 🎯 Phase 5: Homework System (Week 3)

### Priority: MEDIUM

**Estimated Time:** 4-5 hours

### Tasks:

1. **Add Homework Submission UI**
   - [ ] Add textarea for code/answer
   - [ ] Add submit button
   - [ ] Show submission status
   - ⏱️ 2 hours

2. **Connect to Database**
   - [ ] Call `submitHomework()` on form submit
   - [ ] Show success/error message
   - [ ] Display previous submissions
   - ⏱️ 1 hour

3. **Instructor View (Basic)**
   - [ ] Create `/instructor/submissions` page
   - [ ] List pending submissions
   - [ ] Add feedback form
   - [ ] Call `gradeSubmission()`
   - ⏱️ 2 hours

**Deliverable:** Working homework submission system

---

## 🎯 Phase 6: Instructor Features (Week 3-4)

### Priority: MEDIUM

**Estimated Time:** 6-8 hours

### Tasks:

1. **Instructor Dashboard**
   - [ ] Create `/instructor` layout
   - [ ] Show instructor's courses
   - [ ] Display enrollment stats
   - ⏱️ 2 hours

2. **Course Management**
   - [ ] Create course CRUD pages
   - [ ] Add/edit/delete courses
   - [ ] Toggle publish status
   - ⏱️ 3 hours

3. **Module/Lesson Management**
   - [ ] Add module creation form
   - [ ] Add lesson creation form
   - [ ] Reorder modules/lessons
   - ⏱️ 3 hours

**Deliverable:** Instructor can manage their courses

---

## 🎯 Phase 7: Polish & Testing (Week 4)

### Priority: MEDIUM

**Estimated Time:** 4-6 hours

### Tasks:

1. **Error Handling**
   - [ ] Add error boundaries
   - [ ] Show user-friendly error messages
   - [ ] Add loading states
   - ⏱️ 2 hours

2. **UI/UX Improvements**
   - [ ] Add toast notifications (react-hot-toast)
   - [ ] Improve form validation
   - [ ] Add confirmation dialogs
   - ⏱️ 2 hours

3. **Testing**
   - [ ] Test all user flows
   - [ ] Test instructor flows
   - [ ] Fix bugs
   - ⏱️ 2 hours

**Deliverable:** Polished MVP

---

## 🔒 Phase 8: Security Hardening (Post-MVP)

### Priority: HIGH (before production)

**Estimated Time:** 4-6 hours

### Tasks:

1. **API Key Security**
   - [ ] Revoke and rotate all API keys
   - [ ] Verify `.env.local` not in git
   - [ ] Check git history for leaked secrets
   - ⏱️ 1 hour

2. **Code Quality**
   - [ ] Remove all console.log statements
   - [ ] Enable linting in build
   - [ ] Fix linting errors
   - ⏱️ 2 hours

3. **Input Validation**
   - [ ] Add Zod schemas for all forms
   - [ ] Validate API inputs
   - [ ] Sanitize user content
   - ⏱️ 2 hours

4. **Rate Limiting**
   - [ ] Add rate limiting to chat API
   - [ ] Add rate limiting to auth endpoints
   - ⏱️ 1 hour

**Deliverable:** Production-ready security

---

## 📋 MVP Feature Checklist

### Core Features

- [ ] User registration and login
- [ ] Email verification (optional for MVP)
- [ ] Browse published courses
- [ ] View course details
- [ ] Enroll in courses
- [ ] Watch video lessons
- [ ] Track lesson progress
- [ ] Submit homework
- [ ] View submission feedback
- [ ] Student dashboard with progress
- [ ] AI chat assistant (already working)

### Instructor Features

- [ ] Create/edit courses
- [ ] Add modules and lessons
- [ ] Upload video URLs
- [ ] View student enrollments
- [ ] Review and grade submissions

### Nice-to-Have (Post-MVP)

- [ ] Payment integration (Stripe ISA)
- [ ] Certificate generation
- [ ] Course reviews and ratings
- [ ] Video hosting (Supabase Storage)
- [ ] Code playground
- [ ] Email notifications
- [ ] Social authentication

---

## 🚀 Quick Start

Want to jump right in? Follow these steps:

1. **Day 1: Database Setup**
   - Set up Supabase
   - Run schema
   - Test connection

2. **Day 2-3: Authentication**
   - Implement login/signup
   - Add middleware
   - Test auth flow

3. **Day 4-5: Courses**
   - Seed course data
   - Connect pages to database
   - Add enrollment

4. **Day 6-7: Dashboard & Progress**
   - Build learn page
   - Add progress tracking

5. **Day 8-10: Homework & Polish**
   - Homework system
   - Instructor features
   - Testing & fixes

**Total MVP Time: ~2 weeks of focused work**

---

## 🆘 Need Help?

If you get stuck:

1. Check the documentation files:
   - `supabase-setup.md` - Database setup
   - `DATABASE_INTEGRATION.md` - Code examples
   - `lib/supabase.ts` - Available functions

2. Supabase Resources:
   - [Supabase Docs](https://supabase.com/docs)
   - [Auth Helpers Guide](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
   - [Supabase Discord](https://discord.supabase.com)

3. Test queries in Supabase SQL Editor before implementing in code

---

## 🎉 You're Ready!

All the infrastructure is in place. Now it's time to connect the pieces.

**Next Step:** Start with Phase 1 - Database & Auth Setup

Good luck building your MVP! 🚀
