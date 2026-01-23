// lib/data.ts

export interface Course {
  id: string;
  slug: string;
  title: string;
  tech: string;
  descriptionKey: string;
  priceKey: string;
  duration: string;
  modules: string[];
}

export const COURSES: Course[] = [
  {
    id: "01",
    slug: "frontend",
    title: "FRONTEND",
    tech: "React + Next.js + TypeScript",
    descriptionKey: "frontend.description",
    priceKey: "frontend.price",
    duration: "4 Months",
    modules: [
      "Module 1: HTML5 & CSS3 (Flexbox, Grid)",
      "Module 2: JavaScript ES6+ (Async/Await, DOM)",
      "Module 3: React Core (Hooks, State)",
      "Module 4: TypeScript Basics",
      "Module 5: Next.js & Routing",
      "Module 6: Git & GitHub Flow",
      "Module 7: Final Project (Portfolio)"
    ]
  },
  {
    id: "02",
    slug: "qa",
    title: "QA AUTOMATION",
    tech: "Python + PyTest + Jenkins",
    descriptionKey: "qa.description",
    priceKey: "qa.price",
    duration: "3 Months",
    modules: [
      "Module 1: Software Testing Life Cycle (STLC)",
      "Module 2: SQL Databases & API Testing",
      "Module 3: Python for Testers",
      "Module 4: PyTest Framework",
      "Module 5: CI/CD (Jenkins/GitLab)",
      "Module 6: Mobile Testing Basics",
      "Module 7: Bug Reports (Jira)"
    ]
  },
  {
    id: "03",
    slug: "backend",
    title: "BACKEND",
    tech: "Node.js + PostgreSQL + Redis",
    descriptionKey: "backend.description",
    priceKey: "backend.price",
    duration: "5 Months",
    modules: [
      "Module 1: Node.js & Express",
      "Module 2: RESTful API Design",
      "Module 3: PostgreSQL & SQL",
      "Module 4: Authentication (JWT)",
      "Module 5: Redis Caching",
      "Module 6: Docker Basics",
      "Module 7: System Architecture"
    ]
  },
  {
    id: "04",
    slug: "ux-design",
    title: "UX / UI DESIGN",
    tech: "Figma + Prototyping",
    descriptionKey: "uxdesign.description",
    priceKey: "uxdesign.price",
    duration: "3 Months",
    modules: [
      "Module 1: Design Thinking Principles",
      "Module 2: Wireframing (Balsamiq)",
      "Module 3: Figma Mastery",
      "Module 4: Typography & Color Theory",
      "Module 5: Prototyping & User Testing",
      "Module 6: Design Systems"
    ]
  },
  {
    id: "05",
    slug: "mobile",
    title: "MOBILE APPS",
    tech: "Flutter + Dart",
    descriptionKey: "mobile.description",
    priceKey: "mobile.price",
    duration: "4 Months",
    modules: [
      "Module 1: Dart Fundamentals",
      "Module 2: Flutter Widgets",
      "Module 3: State Management",
      "Module 4: API Integration",
      "Module 5: Firebase Integration",
      "Module 6: Publishing to App Store/Play Store"
    ]
  },
  {
    id: "06",
    slug: "devops",
    title: "DEVOPS",
    tech: "Docker + Kubernetes + AWS",
    descriptionKey: "devops.description",
    priceKey: "devops.price",
    duration: "5 Months",
    modules: [
      "Module 1: Linux Basics & Scripting",
      "Module 2: Docker & Containers",
      "Module 3: CI/CD Pipelines",
      "Module 4: Kubernetes Basics",
      "Module 5: Cloud Services (AWS)",
      "Module 6: Monitoring (Grafana/Prometheus)"
    ]
  }
];
