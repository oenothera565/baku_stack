# Baku Stack

A modern coding academy platform built with Next.js 15, featuring a Swiss Brutalism design aesthetic. Master coding. Build future.

![Baku Stack](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)

## 🎯 Features

- **Swiss Brutalism Design** - Clean, bold aesthetic with high contrast
- **Dark/Light Theme** - Toggle between themes with persistence
- **Bilingual Support** - English/Azerbaijani (EN/AZ) interface
- **Course Catalog** - Browse 6 tech courses (Frontend, Backend, QA, DevOps, UX, Mobile)
- **AI Chat Assistant** - Powered by Claude (Anthropic) for learning support
- **Student Dashboard** - Track enrolled courses and progress
- **Supabase Integration** - Full database with authentication and RLS
- **Responsive Layout** - Mobile-first design with CSS Grid
- **Type-Safe** - Full TypeScript coverage
- **Fast Navigation** - Client-side routing with Next.js App Router

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Supabase** | PostgreSQL database + Authentication |
| **Anthropic AI** | Claude API for AI chat assistant |
| **Inter Font** | Primary typeface (sans-serif) |
| **Mono Font** | Code/technical elements |

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd baku-stack

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

## ⚙️ Environment Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure your environment variables:**
   ```env
   # Supabase (required)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

   # Anthropic AI (required for chat feature)
   ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
   ```

3. **Get your Supabase credentials:**
   - Create a project at [supabase.com](https://supabase.com)
   - Go to Settings → API
   - Copy the Project URL and anon public key

4. **Get your Anthropic API key:**
   - Create an account at [console.anthropic.com](https://console.anthropic.com/)
   - Generate an API key

## 🗄️ Database Setup

This project uses Supabase (PostgreSQL) for data persistence.

**Quick Setup:**

1. Run the database schema:
   - Open your Supabase Dashboard
   - Go to SQL Editor
   - Copy & paste contents from `supabase-schema.sql`
   - Click "Run"

2. Follow the detailed guide:
   - See `supabase-setup.md` for step-by-step instructions
   - See `DATABASE_INTEGRATION.md` for code integration guide

**Database Features:**
- User profiles (students & instructors)
- Course management
- Lesson progress tracking
- Homework submissions
- Enrollment system
- Row Level Security (RLS) policies

## 🚀 Running the Project

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
baku-stack/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles + Tailwind
│   ├── api/
│   │   └── chat/
│   │       └── route.ts         # AI chat API endpoint (Claude)
│   ├── courses/
│   │   ├── page.tsx             # Course catalog
│   │   └── [slug]/
│   │       ├── page.tsx         # Course detail page
│   │       └── learn/
│   │           └── page.tsx     # Video learning interface
│   ├── login/
│   │   └── page.tsx             # Login page (to be connected to Supabase)
│   ├── dashboard/
│   │   └── page.tsx             # Student dashboard
│   ├── resources/
│   │   └── page.tsx             # Learning resources
│   └── careers/
│       └── page.tsx             # Career information
├── components/                   # React components
│   ├── Navbar.tsx               # Navigation bar with i18n
│   ├── Layout.tsx               # Page wrapper component
│   ├── ThemeProvider.tsx        # Theme context provider
│   ├── ThemeToggle.tsx          # Dark/light mode toggle
│   ├── LanguageToggle.tsx       # EN/AZ language switcher
│   ├── TerminalChat.tsx         # AI chat terminal UI
│   └── TerminalToggle.tsx       # AI chat toggle button
├── context/                      # React Context providers
│   ├── LanguageContext.tsx      # i18n state management
│   └── TerminalContext.tsx      # Terminal state management
├── lib/
│   ├── data.ts                  # Course data & types (to be replaced)
│   ├── dictionary.ts            # Translation strings (EN/AZ)
│   └── supabase.ts              # Supabase client & database queries
├── public/                       # Static assets
├── supabase-schema.sql          # Database schema (PostgreSQL)
├── supabase-setup.md            # Database setup guide
├── DATABASE_INTEGRATION.md      # Code integration guide
├── .env.example                 # Environment variables template
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## 🎨 Design System

### Swiss Brutalism Guidelines

This project follows a Swiss Brutalism design language:

| Element | Style |
|---------|-------|
| **Background** | Pure white (#FFFFFF) / Black (#000000) |
| **Borders** | 2px solid, no rounded corners |
| **Typography** | Inter (sans-serif) for headings, Mono for code |
| **Shadows** | None (flat design) |
| **Spacing** | Generous padding (p-12, p-16) |
| **Accents** | Orange-600 for primary CTAs only |

### Color Palette

```css
/* Light Mode */
--bg: #FFFFFF
--text: #000000
--border: #000000
--accent: #ea580c  /* Orange-600 */

/* Dark Mode */
--bg: #000000
--text: #FFFFFF
--border: #FFFFFF
--accent: #ea580c
```

### Typography Scale

| Usage | Font | Size | Weight |
|-------|------|------|--------|
| H1 (Hero) | Inter | 9xl | bold |
| H2 (Section) | Inter | 6xl-8xl | bold |
| H3 (Card) | Inter | 4xl | bold |
| Body | Inter | lg | medium |
| Code/Tech | Mono | sm-base | medium |

## 📄 Pages Overview

### `/` - Home
- Hero section with brand name
- Feature cards (Code, Learn, Earn)
- Call-to-action section

### `/courses` - Course Catalog
- Grid of all available courses
- Filter by technology
- Course cards with duration and tech stack

### `/courses/[slug]` - Course Detail
- Dynamic route for individual courses
- Course overview and curriculum
- "Apply Now" CTA

### `/login` - Authentication
- Centered login form
- Email and password inputs
- Link to create account

### `/dashboard` - Student Portal
- Enrolled courses list
- Progress bars for each course
- Status indicators (IN PROGRESS)

## 🧩 Components

### Navbar
```tsx
<Navbar />
```
Sticky navigation with links to main pages.

### ThemeProvider
```tsx
<ThemeProvider>{children}</ThemeProvider>
```
Context provider for theme management.

### ThemeToggle
```tsx
<ThemeToggle />
```
Fixed button for switching themes.

## 📊 Data Structure

### Course Interface

```typescript
interface Course {
  id: string;        // "01", "02", etc.
  slug: string;      // URL-friendly identifier
  title: string;     // Display name
  tech: string;      // Technology stack
  description: string;
  price: string;
  duration: string;
}
```

### Available Courses

| ID | Course | Tech | Duration |
|----|--------|------|----------|
| 01 | FRONTEND | React + Next.js + Tailwind | 4 Months |
| 02 | QA AUTOMATION | Python + Selenium + PyTest | 3 Months |
| 03 | BACKEND | Node.js + SQL + Redis | 5 Months |
| 04 | DEVOPS | Docker + K8s + AWS | 5 Months |
| 05 | UX DESIGN | Figma + Prototyping | 3 Months |
| 06 | MOBILE | Flutter + Dart | 4 Months |

## 🔧 Development Guidelines

### Adding a New Page

1. Create directory in `app/`
2. Add `page.tsx` file
3. Follow the Swiss Brutalism design system

### Adding a New Course

Edit `lib/data.ts`:

```typescript
{
  id: "07",
  slug: "new-course",
  title: "COURSE NAME",
  tech: "Tech + Stack",
  description: "Course description.",
  price: "ISA Model (Pay Later)",
  duration: "X Months",
}
```

### Styling Rules

- Use `border-2` for all borders
- Never use `rounded-*` classes
- Use `font-sans` for headings, `font-mono` for technical text
- Always include `dark:` variants for colors

## 🚧 MVP Development Status

### ✅ Completed (MVP Ready!)
- [x] Database schema design (Supabase)
- [x] Row Level Security (RLS) policies
- [x] Database helper functions
- [x] Environment configuration
- [x] AI Chat integration (Claude)
- [x] Bilingual support (EN/AZ)
- [x] Dark/Light theme system
- [x] Real authentication (Supabase Auth)
- [x] Login/Signup/Logout functionality
- [x] Replace mock data with Supabase queries
- [x] Connect dashboard to real enrollments
- [x] Video player integration (YouTube)
- [x] Lesson progress tracking
- [x] Enroll button with real enrollment
- [x] Mark lesson as complete
- [x] Completed lessons indicator
- [x] Toast notifications (react-hot-toast)
- [x] User profile in navbar
- [x] Enrollment checking
- [x] Locked lessons for non-enrolled users

### 🚀 Future Enhancements
- [ ] Homework submission system
- [ ] Instructor dashboard
- [ ] Email verification
- [ ] Password reset

### 🔒 Security Improvements (Post-MVP)
- [ ] Remove console.log statements
- [ ] Add input validation (Zod)
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Enable linting in build
- [ ] Security audit

### 🎯 Future Enhancements
- [ ] Payment processing (ISA model via Stripe)
- [ ] Instructor dashboard
- [ ] Video hosting (Supabase Storage)
- [ ] Code editor/sandbox (Monaco Editor)
- [ ] Certificate generation (PDF)
- [ ] Email notifications
- [ ] Course reviews & ratings
- [ ] Social auth (Google, GitHub)

## 📚 Documentation Files

This project includes comprehensive documentation:

| File | Description |
|------|-------------|
| `README.md` | Main project documentation (this file) |
| `supabase-schema.sql` | Complete database schema with RLS policies |
| `supabase-setup.md` | Step-by-step database setup guide |
| `DATABASE_INTEGRATION.md` | Guide for integrating Supabase into code |
| `.env.example` | Template for environment variables |
| `lib/supabase.ts` | Database client and query helpers |

## 🎉 Recent Updates

### Version 1.0 MVP (February 2025)
- ✅ **Authentication System**: Full login/signup with Supabase Auth
- ✅ **Real Database Integration**: All data loaded from Supabase
- ✅ **Enrollment System**: Students can enroll in courses via UI
- ✅ **Progress Tracking**: Mark lessons as complete, track progress
- ✅ **Toast Notifications**: Beautiful notifications for all actions
- ✅ **Video Player**: YouTube integration for lessons
- ✅ **User Profiles**: Profile display in navbar with logout
- ✅ **Security**: All API keys secured, removed console.log leaks
- ✅ **Code Cleanup**: Removed mock data, test pages, disabled middleware

**Status**: MVP Ready! 🚀

---

## 📝 License

© 2025 Baku Stack. All rights reserved.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Built with** ❤️ **using Next.js & Swiss Brutalism**
