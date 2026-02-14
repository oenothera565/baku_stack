// lib/dictionary.ts

export type Language = "en" | "az";

export interface CourseTranslations {
  description: string;
  price: string;
}

export interface Translations {
  nav: {
    home: string;
    courses: string;
    resources: string;
    careers: string;
    login: string;
    dashboard: string;
  };
  home: {
    path: string;
    title: string;
    subtitle: string;
    modulesTitle: string;
    modules: {
      code: { title: string; description: string };
      learn: { title: string; description: string };
      earn: { title: string; description: string };
    };
    cta: { title: string; button: string };
    footer: { title: string; copyright: string; status: string; online: string };
  };
  courses: {
    path: string;
    title: string;
    subtitle: string;
    duration: string;
    price: string;
    initialize: string;
    back: string;
    endOfList: string;
    detail: {
      overview: string;
      syllabus: string;
      techStack: string;
      readyToDeploy: string;
      joinCohort: string;
      applyNow: string;
      backToList: string;
    };
    courseData: {
      frontend: CourseTranslations;
      qa: CourseTranslations;
      backend: CourseTranslations;
      uxdesign: CourseTranslations;
      mobile: CourseTranslations;
      devops: CourseTranslations;
    };
  };
  learn: {
    videoPlaceholder: string;
    nowPlaying: string;
    syllabus: string;
    loginRequired: string;
  };
  resources: {
    path: string;
    title: string;
    subtitle: string;
    sectionTitle: string;
    back: string;
    items: {
      roadmap: { title: string; description: string; category: string };
      mdn: { title: string; description: string; category: string };
      stackoverflow: { title: string; description: string; category: string };
      freecodecamp: { title: string; description: string; category: string };
      github: { title: string; description: string; category: string };
      devto: { title: string; description: string; category: string };
    };
  };
  careers: {
    path: string;
    title: string;
    subtitle: string;
    sectionTitle: string;
    back: string;
    stats: {
      salary: { label: string; value: string };
      hired: { label: string; value: string };
      growth: { label: string; value: string };
    };
    instructor: {
      title: string;
      description: string;
      benefits: string[];
      button: string;
    };
  };
  login: {
    path: string;
    title: string;
    subtitle: string;
    emailLabel: string;
    passwordLabel: string;
    buttonText: string;
    createAccount: string;
  };
  dashboard: {
    path: string;
    title: string;
    subtitle: string;
    enrolledCourses: string;
    progress: string;
    browseAll: string;
    endOfDashboard: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      courses: "Courses",
      resources: "Resources",
      careers: "Careers",
      login: "Login",
      dashboard: "Dashboard"
    },
    home: {
      path: "/home",
      title: "Baku Stack",
      subtitle: "// Master Coding. Build Future.",
      modulesTitle: "Modules",
      modules: {
        code: { title: "Code", description: "Write clean code. React, Next.js, TypeScript. Production ready." },
        learn: { title: "Learn", description: "System Design. Algorithms. Git workflow. Best practices." },
        earn: { title: "Earn", description: "High salary offers. Remote work. Contract opportunities." }
      },
      cta: { title: "Ready to Deploy?", button: "git commit -m \"Start Career\"" },
      footer: { title: "Baku Stack", copyright: "© 2025 No Rights Reserved.", status: "Status:", online: "Online" }
    },
    courses: {
      path: "/courses",
      title: "Select Path",
      subtitle: "Choose your environment variable.",
      duration: "Duration",
      price: "Price",
      initialize: "Initialize →",
      back: "← cd ..",
      endOfList: "END OF LIST",
      detail: {
        overview: "Course Overview",
        syllabus: "// Syllabus",
        techStack: "Tech Stack:",
        readyToDeploy: "Ready to deploy?",
        joinCohort: "Join the cohort. Start learning today. Pay after you get hired.",
        applyNow: "Apply Now",
        backToList: "← Back to List"
      },
      courseData: {
        frontend: { description: "Build interfaces. Master the most popular web stack.", price: "ISA Model (10% of salary)" },
        qa: { description: "Test quality. Automate processes. High hiring potential.", price: "ISA Model (300 AZN Deposit)" },
        backend: { description: "The brain of the website. Data processing. API Architecture.", price: "ISA Model (10% of salary)" },
        uxdesign: { description: "Design interfaces. Solve user problems.", price: "500 AZN Full Payment" },
        mobile: { description: "Write code once, get apps for iOS and Android.", price: "ISA Model (Pay Later)" },
        devops: { description: "Manage infrastructure. Automate releases.", price: "ISA Model (Pay Later)" }
      }
    },
    learn: {
      videoPlaceholder: "Video Player Placeholder",
      nowPlaying: "Now Playing",
      syllabus: "Syllabus",
      loginRequired: "Login required to view this lesson"
    },
    resources: {
      path: "/resources",
      title: "Knowledge Base",
      subtitle: "// Curated links for developers",
      sectionTitle: "// Useful Resources",
      back: "← Back to Home",
      items: {
        roadmap: { title: "Roadmap.sh", description: "Skill roadmaps for developers. Step by step guides and paths.", category: "Roadmaps" },
        mdn: { title: "MDN Web Docs", description: "Documentation for web technologies. HTML, CSS, JavaScript, APIs.", category: "Documentation" },
        stackoverflow: { title: "Stack Overflow", description: "Q&A for programmers. Find solutions to coding problems.", category: "Community" },
        freecodecamp: { title: "freeCodeCamp", description: "Learn to code for free. Interactive coding tutorials.", category: "Learning" },
        github: { title: "GitHub", description: "Version control and collaboration. Host and review code.", category: "Tools" },
        devto: { title: "Dev.to", description: "Community for developers. Articles, tutorials, discussions.", category: "Community" }
      }
    },
    careers: {
      path: "/careers",
      title: "Career & Income",
      subtitle: "// Build your future. Get hired.",
      sectionTitle: "// The Numbers",
      back: "← Back to Home",
      stats: {
        salary: { label: "Average Monthly Salary", value: "$1000+" },
        hired: { label: "Students Hired So Far", value: "0%" },
        growth: { label: "Market Growth", value: "HIGH" }
      },
      instructor: {
        title: "Become an Instructor",
        description: "Share your knowledge. Teach the next generation of developers. Join our team and help students build their careers.",
        benefits: ["Competitive compensation", "Flexible schedule", "Remote work", "Impact students' lives"],
        button: "Join Us"
      }
    },
    login: {
      path: "/login",
      title: "System Login",
      subtitle: "// Authenticate to access your cadet portal",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      buttonText: "System Login",
      createAccount: "// Create Account"
    },
    dashboard: {
      path: "/dashboard",
      title: "Student Dashboard",
      subtitle: "Welcome back, Cadet.",
      enrolledCourses: "Enrolled Courses",
      progress: "Progress",
      browseAll: "← Browse All Courses",
      endOfDashboard: "END OF DASHBOARD"
    }
  },
  az: {
    nav: {
      home: "Ana Səhifə",
      courses: "Kurslar",
      resources: "Resurslar",
      careers: "Karyera",
      login: "Giriş",
      dashboard: "Panel"
    },
    home: {
      path: "/ana-sehife",
      title: "Baku Stack",
      subtitle: "// Kodlaşdırmağı Öyrən. Gələcəyi Qur.",
      modulesTitle: "Modullar",
      modules: {
        code: { title: "Kod", description: "Təmiz kod yaz. React, Next.js, TypeScript. İstehsala hazır." },
        learn: { title: "Öyrən", description: "Sistem Dizaynı. Alqoritmlər. Git iş axını. Ən yaxşı təcrübələr." },
        earn: { title: "Qazan", description: "Yüksək maaş təklifləri. Uzaqdan iş. Müqavilə imkanları." }
      },
      cta: { title: "Hazırsan?", button: "git commit -m \"Karyeranı Başla\"" },
      footer: { title: "Baku Stack", copyright: "© 2025 Bütün Hüquqlar Qorunur.", status: "Status:", online: "Onlayn" }
    },
    courses: {
      path: "/kurslar",
      title: "Yolu Seç",
      subtitle: "Mühit dəyişənini seç.",
      duration: "Müddət",
      price: "Qiymət",
      initialize: "Başla →",
      back: "← cd ..",
      endOfList: "SİYAHIN SONU",
      detail: {
        overview: "Kurs Baxışı",
        syllabus: "// Sylabus",
        techStack: "Tech Stack:",
        readyToDeploy: "Hazırsan?",
        joinCohort: "Qrupa qoşul. Bu gün öyrənməyə başla. İşə qəbul olmuşdan sonra ödə.",
        applyNow: "Müraciət Et",
        backToList: "← Siyahıya Qayıt"
      },
      courseData: {
        frontend: { description: "İnterfeyslər yarat. Ən populyar veb steki öyrən.", price: "ISA Modeli (maaşın 10%-i)" },
        qa: { description: "Keyfiyyəti sına. Prosesləri avtomatlaşdır. İşə götürülme şansı yüksək.", price: "ISA Modeli (300 AZN Depozit)" },
        backend: { description: "Saytin beyni. Məlumat emi. API Arxitekturası.", price: "ISA Modeli (maaşın 10%-i)" },
        uxdesign: { description: "İnterfeyslər dizayn et. İstifadəçi problemlərini həll et.", price: "500 AZN Tam Ödəniş" },
        mobile: { description: "Bir dəfə kod yaz, iOS və Android üçün tətbiq al.", price: "ISA Modeli (Sonra Ödə)" },
        devops: { description: "İnfrastrukturaya idarə et. Relizləri avtomatlaşdır.", price: "ISA Modeli (Sonra Ödə)" }
      }
    },
    learn: {
      videoPlaceholder: "Video Pleyer Yeri",
      nowPlaying: "İndi Oynadılır",
      syllabus: "Sylabus",
      loginRequired: "Bu dərsi görmək üçün giriş etməlisiniz"
    },
    resources: {
      path: "/resurslar",
      title: "Bilik Bazası",
      subtitle: "// Developerlər üçün seçilmiş linklər",
      sectionTitle: "// Faydalı Resurslar",
      back: "← Ana Səhifəyə",
      items: {
        roadmap: { title: "Roadmap.sh", description: "Developerlər üçün yol xəritələri. Addım-addım bələdçilər.", category: "Xəritələr" },
        mdn: { title: "MDN Web Docs", description: "Veb texnologiyaları üçün sənədlər. HTML, CSS, JavaScript, API.", category: "Sənədlər" },
        stackoverflow: { title: "Stack Overflow", description: "Proqramçılar üçün SUAL-CAVAB. Kod problemlərinin həlli.", category: "İcması" },
        freecodecamp: { title: "freeCodeCamp", description: "Pulsuz kodlaşdırma öyrən. İnteraktiv təlimatlar.", category: "Öyrənmə" },
        github: { title: "GitHub", description: "Versiya nəzarəti və əməkdaşlıq. Kodun yerləşdirilməsi.", category: "Alətlər" },
        devto: { title: "Dev.to", description: "Developerlər üçün icma. Məqalələr, təlimatlar, müzakirələr.", category: "İcması" }
      }
    },
    careers: {
      path: "/karyera",
      title: "Karyera və Gəlir",
      subtitle: "// Gələcəyini qur. İşə qəbul ol.",
      sectionTitle: "// Rəqəmlər",
      back: "← Ana Səhifəyə",
      stats: {
        salary: { label: "Orta Aylıq Maaş", value: "$1000+" },
        hired: { label: "İşə Qəbul Olunanlar", value: "0%" },
        growth: { label: "Bazar Böyüməsi", value: "YÜKSƏK" }
      },
      instructor: {
        title: "Müəllim Ol",
        description: "Bilgini paylaş. Nəsil developerlərə öyrət. Komandamıza qoşul və tələbələrin karyeralarına kömək et.",
        benefits: ["Rəqabətli compensation", "Flexibly cədvəl", "Uzaqdan iş", "Tələbələrin həyatına təsir"],
        button: "Qoşul"
      }
    },
    login: {
      path: "/giris",
      title: "Sistem Girişi",
      subtitle: "// Kadet portala giriş üçün autentikasiya",
      emailLabel: "Email Ünvanı",
      passwordLabel: "Şifrə",
      buttonText: "Sistem Girişi",
      createAccount: "// Hesab Yarat"
    },
    dashboard: {
      path: "/panel",
      title: "Tələbə Paneli",
      subtitle: "Xoş gəldin, Kadet.",
      enrolledCourses: "Qeydiyyatdan Keçmiş Kurslar",
      progress: "İrəliləmə",
      browseAll: "← Bütün Kurslara Bax",
      endOfDashboard: "PANELİN SONU"
    }
  }
};

// Helper function to get course description and price by slug
export function getCourseTranslation(lang: Language, slug: string): CourseTranslations {
  const keyMap: Record<string, keyof Translations["courses"]["courseData"]> = {
    "frontend": "frontend",
    "qa": "qa",
    "backend": "backend",
    "ux-design": "uxdesign",
    "mobile": "mobile",
    "devops": "devops"
  };

  const key = keyMap[slug];
  if (!key) {
    return { description: "", price: "" };
  }

  return translations[lang].courses.courseData[key];
}
