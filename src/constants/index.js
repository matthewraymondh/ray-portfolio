// index.js
export const servicesData = [
  {
    title: "AI & Intelligent Automation",
    description:
      "Designing retrieval-augmented systems, GenAI copilots, and production-ready ML that unlock measurable efficiency gains.",
    items: [
      {
        title: "Retrieval-Augmented Generation",
        description:
          "End-to-end RAG pipelines, evaluation, grounding, observability",
      },
      {
        title: "Computer Vision",
        description: "YOLOv5, optical flow, Google ML Kit, real-time analytics",
      },
      {
        title: "LLM Workflow Automation",
        description: "Prompt engineering, fine-tuning, governance & safety",
      },
    ],
  },
  {
    title: "Platform & Full-Stack Engineering",
    description:
      "Architecting resilient web platforms from concept to scale with Next.js, Node.js, TypeScript, and pragmatic system design.",
    items: [
      {
        title: "System Architecture",
        description: "Multi-tenant SaaS, loyalty platforms, ERP workflows",
      },
      {
        title: "Frontend Engineering",
        description: "Next.js, React, design systems, accessibility",
      },
      {
        title: "Backend Services",
        description: "Node.js, Express, REST/GraphQL, Prisma, PostgreSQL",
      },
    ],
  },
  {
    title: "Mobile Experiences",
    description:
      "Shipping Flutter apps that stay in sync with web platforms and deliver reliable, native-quality experiences.",
    items: [
      {
        title: "Flutter Engineering",
        description: "Single codebase delivery for Android & iOS",
      },
      {
        title: "Realtime Sync",
        description: "Shared databases, offline readiness, background tasks",
      },
      {
        title: "Product Readiness",
        description: "CI/CD, QA automation, release governance",
      },
    ],
  },
  {
    title: "Cloud, DevOps & Data",
    description:
      "Building cloud foundations with IaC, container orchestration, and DevSecOps practices that keep teams shipping fast.",
    items: [
      {
        title: "Cloud Platforms",
        description: "Alibaba Cloud, AWS, ECR, S3, managed services",
      },
      {
        title: "Observability & Ops",
        description: "IaC, automated deployments, SLO dashboards",
      },
      {
        title: "Data Engineering",
        description: "Event pipelines, analytics lakes, secure storage",
      },
    ],
  },
];

export const projects = [
  {
    id: 1,
    name: "e-ARIA: Artificial Responsive Intelligence Assistant",
    description:
      "RAG-powered operational assistant with drag-and-drop ingestion, streaming chat, citation protocol, and tunable retrieval controls, deployed on Vercel for ERELA teams.",
    href: "https://www.linkedin.com/in/matthewraymond-hartono-915310176",
    image: "/assets/projects/apple-tech-store.jpg",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "PostgreSQL" },
      { id: 4, name: "Google Gemini" },
    ],
  },
  {
    id: 2,
    name: "ERELA Sales Superapp",
    description:
      "Flutter + Go sales platform with offline sync, GPS visit tracking, and multi-role analytics for field and HQ stakeholders.",
    href: "https://www.linkedin.com/in/matthewraymond-hartono-915310176",
    image: "/assets/projects/mobile-accessories-store.jpg",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "Flutter" },
      { id: 2, name: "Go" },
      { id: 3, name: "PostgreSQL" },
      { id: 4, name: "AWS" },
    ],
  },
  {
    id: 3,
    name: "ERELA Customer Loyalty Platform",
    description:
      "Next.js + Flutter loyalty ecosystem with OCR-powered onboarding, AWS S3 storage, role-based auth, and shadcn/ui admin panel.",
    href: "https://www.linkedin.com/in/matthewraymond-hartono-915310176",
    image: "/assets/projects/electronics-store.jpg",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "Flutter" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Prisma" },
      { id: 4, name: "AWS S3" },
    ],
  },
  {
    id: 4,
    name: "ERELA Event Management Suite",
    description:
      "Events platform with attendance scanning, lucky draw automation, and AWS-backed media storage for nationwide activations.",
    href: "https://www.linkedin.com/in/matthewraymond-hartono-915310176",
    image: "/assets/projects/game-store.jpg",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "PostgreSQL" },
      { id: 3, name: "AWS S3" },
      { id: 4, name: "Tailwind" },
    ],
  },
  {
    id: 5,
    name: "DINUS e-SARPRAS Mobile",
    description:
      "Flutter facility management app connected to campus systems for realtime maintenance intake and technician coordination.",
    href: "https://www.linkedin.com/in/matthewraymond-hartono-915310176",
    image: "/assets/projects/plant-shop.jpg",
    bgImage: "/assets/backgrounds/table.jpg",
    frameworks: [
      { id: 1, name: "Flutter" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "Prisma" },
      { id: 4, name: "AWS" },
    ],
  },
  {
    id: 6,
    name: "DINUS e-SARPRAS Web Platform",
    description:
      "Next.js 15 facility management hub with AuthJS, AI chatbot assistant, and automated workflows for campus operations.",
    href: "https://www.linkedin.com/in/matthewraymond-hartono-915310176",
    image: "/assets/projects/home-decor-store.jpg",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Tailwind" },
      { id: 3, name: "PostgreSQL" },
      { id: 4, name: "OpenAI" },
    ],
  },
  {
    id: 7,
    name: "FIK UDINUS Partnership Manager",
    description:
      "Partnership lifecycle dashboard with JWT auth, CRUD workflows, document storage, and data visualizations for faculty agreements.",
    href: "https://www.linkedin.com/in/matthewraymond-hartono-915310176",
    image: "/assets/projects/mobile-accessories-store.jpg",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Prisma" },
      { id: 3, name: "PostgreSQL" },
      { id: 4, name: "Recharts" },
    ],
  },
  {
    id: 8,
    name: "Scholar Publication Scraper",
    description:
      "Proxy-rotated Google Scholar ingestion pipeline syncing authors and publications into Postgres with resilient Next.js APIs.",
    href: "https://www.linkedin.com/in/matthewraymond-hartono-915310176",
    image: "/assets/projects/electronics-store.jpg",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Prisma" },
      { id: 4, name: "Proxy Rotation" },
    ],
  },
  {
    id: 9,
    name: "Brociz Entertainment Website",
    description:
      "Interactive Next.js 13 company profile with modular Tailwind components, GSAP storytelling, and export-ready deployment.",
    href: "https://www.linkedin.com/in/matthewraymond-hartono-915310176",
    image: "/assets/projects/home-decor-store.jpg",
    bgImage: "/assets/backgrounds/table.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Tailwind" },
      { id: 3, name: "GSAP" },
      { id: 4, name: "TypeScript" },
    ],
  },
  {
    id: 10,
    name: "KRS Input System",
    description:
      "Role-aware academic registration system with PDF export, built on Next.js 15, NextAuth v5, Prisma, and Tailwind UI.",
    href: "https://github.com/matthewraymondh/siakad-next15",
    image: "/assets/projects/mobile-accessories-store.jpg",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "NextAuth" },
      { id: 3, name: "Prisma" },
      { id: 4, name: "Tailwind" },
    ],
  },
  {
    id: 11,
    name: "YOLOv9 Vehicle Analytics",
    description:
      "Real-time vehicle detection, tracking, and speed estimation with YOLOv9, DeepSORT, and Streamlit dashboards.",
    href: "https://www.linkedin.com/in/matthewraymond-hartono-915310176",
    image: "/assets/projects/game-store.jpg",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "YOLOv9" },
      { id: 2, name: "DeepSORT" },
      { id: 3, name: "Streamlit" },
      { id: 4, name: "Python" },
    ],
  },
  {
    id: 12,
    name: "Advanced Intrusion Detection",
    description:
      "Snort + pfSense security stack on Xubuntu delivering IDS/IPS capabilities with automated alerting and policy enforcement.",
    href: "https://www.linkedin.com/in/matthewraymond-hartono-915310176",
    image: "/assets/projects/electronics-store.jpg",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "Snort" },
      { id: 2, name: "pfSense" },
      { id: 3, name: "Linux" },
      { id: 4, name: "IDS/IPS" },
    ],
  },
  {
    id: 13,
    name: "Football Analytics Research",
    description:
      "SINTA 2 publication using YOLOv5 + Optical Flow for football tracking, team assignment, and speed estimation at 94% mAP.",
    href: "https://www.linkedin.com/in/matthewraymond-hartono-915310176",
    image: "/assets/projects/plant-shop.jpg",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "YOLOv5" },
      { id: 2, name: "Optical Flow" },
      { id: 3, name: "Python" },
      { id: 4, name: "OpenCV" },
    ],
  },
  {
    id: 14,
    name: "Crop Yield Prediction",
    description:
      "CNN-LSTM pipeline forecasting agricultural output from climate and pollution time series with TensorFlow.",
    href: "https://github.com/matthewraymondh/Crop-Yield-Prediction-using-CNN-LSTM",
    image: "/assets/projects/apple-tech-store.jpg",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "TensorFlow" },
      { id: 2, name: "CNN" },
      { id: 3, name: "LSTM" },
      { id: 4, name: "Python" },
    ],
  },
  {
    id: 15,
    name: "Arindo HRIS",
    description:
      "Biometric-integrated HRIS automating attendance and payroll for 2,000+ employees on Laravel + MySQL.",
    href: "https://www.linkedin.com/in/matthewraymond-hartono-915310176",
    image: "/assets/projects/home-decor-store.jpg",
    bgImage: "/assets/backgrounds/table.jpg",
    frameworks: [
      { id: 1, name: "Laravel" },
      { id: 2, name: "MySQL" },
      { id: 3, name: "Redis" },
      { id: 4, name: "Docker" },
    ],
  },
];

export const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/matthewraymond-hartono-915310176",
  },
  {
    name: "Email",
    href: "mailto:raymondhartono76@gmail.com",
  },
  {
    name: "Phone",
    href: "tel:+6287712346050",
  },
];
