# Baku Stack

A modern coding academy platform built with Next.js 15, featuring a Swiss Brutalism design aesthetic. Master coding. Build future.

![Baku Stack](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)

## 🎯 Features

- **Swiss Brutalism Design** - Clean, bold aesthetic with high contrast
- **Dark/Light Theme** - Toggle between themes with persistence
- **Course Catalog** - Browse 6 tech courses (Frontend, Backend, QA, DevOps, UX, Mobile)
- **Student Dashboard** - Track enrolled courses and progress
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
│   ├── courses/
│   │   ├── page.tsx             # Course catalog
│   │   └── [slug]/
│   │       └── page.tsx         # Dynamic course detail
│   ├── login/
│   │   └── page.tsx             # Login page
│   └── dashboard/
│       └── page.tsx             # Student dashboard
├── components/                   # React components
│   ├── Navbar.tsx               # Navigation bar
│   ├── ThemeProvider.tsx        # Theme context provider
│   └── ThemeToggle.tsx          # Dark/light mode toggle
├── lib/
│   └── data.ts                  # Course data & types
├── public/                       # Static assets
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

## 🚧 Known Issues & Improvements

### To Fix
- [ ] Remove console.log from login form
- [ ] Add proper authentication
- [ ] Implement form validation
- [ ] Add error boundaries
- [ ] Improve accessibility (ARIA labels)
- [ ] Add loading states

### Future Enhancements
- [ ] Database integration
- [ ] Payment processing (ISA model)
- [ ] User authentication system
- [ ] Course progress tracking
- [ ] Instructor dashboard
- [ ] Video lessons integration
- [ ] Code editor/sandbox
- [ ] Certificate generation

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
