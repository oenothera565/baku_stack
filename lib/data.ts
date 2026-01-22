// lib/data.ts

export interface Course {
  id: string;
  slug: string; // Для ссылки в браузере (например, /courses/frontend)
  title: string;
  tech: string; // Список технологий строкой
  description: string;
  price: string;
  duration: string;
}

export const COURSES: Course[] = [
  {
    id: "01",
    slug: "frontend",
    title: "FRONTEND",
    tech: "React + Next.js + Tailwind",
    description: "Build interfaces. Master the DOM. Create visual impact.",
    price: "ISA Model (Pay Later)",
    duration: "4 Months",
  },
  {
    id: "02",
    slug: "qa",
    title: "QA AUTOMATION",
    tech: "Python + Selenium + PyTest",
    description: "Test the logic. Find the bugs. Ensure quality.",
    price: "ISA Model (Pay Later)",
    duration: "3 Months",
  },
  {
    id: "03",
    slug: "backend",
    title: "BACKEND",
    tech: "Node.js + SQL + Redis",
    description: "Power the data. Create the API. Handle scale.",
    price: "ISA Model (Pay Later)",
    duration: "5 Months",
  },
  {
    id: "04",
    slug: "devops",
    title: "DEVOPS",
    tech: "Docker + K8s + AWS",
    description: "Manage infrastructure. Automate deployment.",
    price: "ISA Model (Pay Later)",
    duration: "5 Months",
  },
  {
    id: "05",
    slug: "ux-design",
    title: "UX DESIGN",
    tech: "Figma + Prototyping",
    description: "Design the experience. Solve user problems.",
    price: "ISA Model (Pay Later)",
    duration: "3 Months",
  },
  {
    id: "06",
    slug: "mobile",
    title: "MOBILE",
    tech: "Flutter + Dart",
    description: "Build for iOS and Android. One codebase.",
    price: "ISA Model (Pay Later)",
    duration: "4 Months",
  },
];
