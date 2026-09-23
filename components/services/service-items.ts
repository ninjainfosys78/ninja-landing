export type ServiceLang = "en" | "ne";

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  bullets: string[];
  image: string;
  accent: string;
}

interface ServiceSource {
  id: string;
  name: Record<ServiceLang, string>;
  description: Record<ServiceLang, string>;
  bullets: Record<ServiceLang, string[]>;
  image: string;
  accent: string;
}

const SERVICE_SOURCES: ServiceSource[] = [
  {
    id: "web-development",
    name: { en: "Web Development", ne: "वेब विकास" },
    description: {
      en: "We design and build fast, accessible websites and web applications tailored to your organization — from marketing sites to complex internal platforms.",
      ne: "हामी तपाईंको संस्थाका लागि छिटो, पहुँचयोग्य वेबसाइट र वेब एप्लिकेसनहरू डिजाइन र निर्माण गर्छौं — मार्केटिङ साइटदेखि जटिल आन्तरिक प्लेटफर्महरूसम्म।",
    },
    bullets: {
      en: [
        "Custom websites & web applications",
        "E-commerce & payment integrations",
        "API integrations & backend services",
        "Performance, SEO & accessibility",
      ],
      ne: [
        "अनुकूल वेबसाइट र वेब एप्लिकेसन",
        "ई-कमर्स र भुक्तानी एकीकरण",
        "API एकीकरण र ब्याकइन्ड सेवा",
        "प्रदर्शन, SEO र पहुँचयोग्यता",
      ],
    },
    image: "/webdevelopment.jpg",
    accent: "#2563EB",
  },
  {
    id: "mobile-app-development",
    name: { en: "Mobile App Development", ne: "मोबाइल एप विकास" },
    description: {
      en: "Native and cross-platform mobile apps that put your services in your users' pockets — built for reliability, offline support, and smooth performance.",
      ne: "तपाईंको सेवालाई प्रयोगकर्ताको हातमा पुर्‍याउने नेटिभ र क्रस-प्ल्याटफर्म मोबाइल एपहरू — विश्वसनीयता, अफलाइन सपोर्ट र सहज प्रदर्शनका लागि निर्मित।",
    },
    bullets: {
      en: [
        "iOS & Android native apps",
        "Cross-platform apps (Flutter/React Native)",
        "Push notifications & offline sync",
        "App store publishing & maintenance",
      ],
      ne: [
        "iOS र Android नेटिभ एप",
        "क्रस-प्ल्याटफर्म एप (Flutter/React Native)",
        "पुश नोटिफिकेसन र अफलाइन सिंक",
        "एप स्टोर प्रकाशन र मर्मत",
      ],
    },
    image: "/mobileapp.jpg",
    accent: "#4F7F14",
  },
  {
    id: "marketing",
    name: { en: "Marketing", ne: "मार्केटिङ" },
    description: {
      en: "Data-driven digital marketing that grows your reach and converts visitors into customers — from SEO to social campaigns to analytics.",
      ne: "तपाईंको पहुँच बढाउने र आगन्तुकलाई ग्राहकमा परिणत गर्ने डेटा-संचालित डिजिटल मार्केटिङ — SEO देखि सामाजिक अभियान र विश्लेषणसम्म।",
    },
    bullets: {
      en: [
        "SEO & content strategy",
        "Social media & ad campaigns",
        "Email & SMS marketing",
        "Analytics, tracking & reporting",
      ],
      ne: [
        "SEO र कन्टेन्ट रणनीति",
        "सामाजिक सञ्जाल र विज्ञापन अभियान",
        "इमेल र SMS मार्केटिङ",
        "विश्लेषण, ट्र्याकिङ र रिपोर्टिङ",
      ],
    },
    image: "/marketing.jpg",
    accent: "#E31B23",
  },
  {
    id: "software-development",
    name: { en: "Software Development & Engineering", ne: "सफ्टवेयर विकास र इन्जिनियरिङ" },
    description: {
      en: "Custom software engineering for complex, business-critical systems — from architecture and backend services to integrations that scale with your organization.",
      ne: "जटिल, व्यवसायका लागि महत्त्वपूर्ण प्रणालीहरूका लागि अनुकूल सफ्टवेयर इन्जिनियरिङ — आर्किटेक्चर र ब्याकइन्ड सेवादेखि तपाईंको संस्थासँगै विस्तार हुने एकीकरणसम्म।",
    },
    bullets: {
      en: [
        "Custom software & platform engineering",
        "System architecture & backend services",
        "Third-party & legacy system integrations",
        "Scalable, secure & maintainable codebases",
      ],
      ne: [
        "अनुकूल सफ्टवेयर र प्लेटफर्म इन्जिनियरिङ",
        "प्रणाली आर्किटेक्चर र ब्याकइन्ड सेवा",
        "तेस्रो-पक्ष र लिगेसी प्रणाली एकीकरण",
        "स्केलेबल, सुरक्षित र मर्मतयोग्य कोडबेस",
      ],
    },
    image: "/cloud.jpg",
    accent: "#0A1F4D",
  },
];

export function getServices(language: ServiceLang): ServiceItem[] {
  return SERVICE_SOURCES.map(({ name, description, bullets, ...rest }) => ({
    ...rest,
    name: name[language],
    description: description[language],
    bullets: bullets[language],
  }));
}
