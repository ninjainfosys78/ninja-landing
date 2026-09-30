import type { MegaMenuColumn, MegaMenuPromo } from "./nav-mega-menu";

export const SOLUTIONS_COLUMNS: MegaMenuColumn[] = [
  {
    items: [
      {
        label: "Government & Municipality",
        description: "Digital systems built for public institutions and local government.",
        href: "/solutions#gov",
      },
      {
        label: "Education",
        description: "Platforms that support learning, administration and campus operations.",
        href: "/solutions#edu",
      },
      {
        label: "Healthcare",
        description: "Reliable systems for clinics, hospitals and health networks.",
        href: "/solutions#health",
      },
      {
        label: "Fintech",
        description: "Secure, compliant solutions for financial services and payments.",
        href: "/solutions#fin",
      },
      {
        label: "Corporate Solutions",
        description: "Custom software that fits how your business actually works.",
        href: "/solutions#corp",
      },
    ],
  },
];

export const SOLUTIONS_PROMO: MegaMenuPromo = {
  title: "Build what's next",
  description:
    "From idea to impact, we help businesses create innovative, scalable and sustainable technology solutions.",
  href: "/solutions",
  ctaLabel: "Explore our solutions",
  image: "/abstract-blue-geometric-network-pattern.jpg",
};

export const ABOUT_PROMO: MegaMenuPromo = {
  title: "Meet the people behind it",
  description:
    "We're a team of engineers and builders driven by craft, curiosity and a bias for shipping.",
  href: "/about",
  ctaLabel: "Learn more about us",
  image: "/about.jpg",
};

export const PRODUCTS_PROMO: MegaMenuPromo = {
  title: "See them in action",
  description:
    "Real products already running for institutions, businesses and citizens across Nepal.",
  href: "/products",
  ctaLabel: "Explore all products",
  image: "/digital-infrastructure-network-city.jpg",
};

export const SERVICES_PROMO: MegaMenuPromo = {
  title: "What we do",
  description:
    "We don't just build software — we craft experiences, pairing thoughtful design with reliable engineering.",
  href: "/services",
  ctaLabel: "Explore all services",
  image: "/webdevelopment.jpg",
};

export const SERVICES_COLUMNS: MegaMenuColumn[] = [
  {
    items: [
      {
        label: "E-Governance & Public Administration",
        description: "Core administrative functions on a single, secure system for government offices.",
        href: "/services#eshasan",
      },
      {
        label: "Digital Signature & Document Security",
        description: "Legally valid, tamper-evident electronic signing and verification of documents.",
        href: "/services#epahichan",
      },
      {
        label: "Government & Office Websites",
        description: "Self-managed websites for offices to publish notices, records and services.",
        href: "/services#icms",
      },
      {
        label: "AI-Powered Call Handling",
        description: "Automatic call answering so no customer is left waiting.",
        href: "/services#airfone",
      },
      {
        label: "Vehicle Tracking & Fleet Management",
        description: "Real-time vehicle location and usage tracking for organizations and fleets.",
        href: "/services#luna-iot",
      },
      {
        label: "Centralized Organization Monitoring",
        description: "Visibility into every branch and department's activity from one platform.",
        href: "/services#one-door-system",
      },
      {
        label: "Secure Data Storage & Management",
        description: "Access-controlled file storage with safe backups and activity logs.",
        href: "/services#drive",
      },
      {
        label: "Public Display & Notice Screens",
        description: "Live notices and announcements shown on smart TVs and displays, updated remotely.",
        href: "/services#citizen-charter",
      },
    ],
  },
];

export const PRODUCTS_COLUMNS: MegaMenuColumn[] = [
  {
    items: [
      {
        label: "eShasan",
        description: "E-governance platform for digital transformation.",
        href: "/products#eshasan",
      },
      {
        label: "ePahichan",
        description: "One digital signature, for every Nepali.",
        href: "/products#epahichan",
      },
      {
        label: "Digital Palika",
        description: "Technology-enabled, technology-friendly municipalities.",
        href: "/products#digital-epalika",
      },
      {
        label: "ICMS",
        description: "Integrated Content Management System.",
        href: "/products#icms",
      },
      {
        label: "AirFone",
        description: "Your AI call agent is on its way.",
        href: "/products#airfone",
      },
      {
        label: "Luna IoT",
        description: "GPS tracking, made in Nepal.",
        href: "/products#luna-iot",
      },
    ],
  },
];

export const ABOUT_COLUMNS: MegaMenuColumn[] = [
  {
    items: [
      {
        label: "Who we are",
        description: "Get to know the team and mission behind Ninja Infosys.",
        href: "/about#who-we-are",
      },
      {
        label: "Leadership",
        description: "The people guiding our vision and direction.",
        href: "/about#leadership",
      },
      {
        label: "Our story",
        description: "How we got here and where we're headed.",
        href: "/about#our-story",
      },
      {
        label: "Our Core",
        description: "The values that shape how we build and work.",
        href: "/about#our-core",
      },
      {
        label: "Engineering Principles",
        description: "How we approach quality, reliability and craft.",
        href: "/about#engineering-principles",
      },
    ],
  },
];
