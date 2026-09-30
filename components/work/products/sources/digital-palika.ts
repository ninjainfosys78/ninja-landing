import type { ProductSource } from "../product-types";

export const DIGITAL_PALIKA_SOURCE: ProductSource = {
  id: "digital-epalika",
  name: "Digital Palika",
  siteUrl: "https://digitalpalika.com/",
  tagline: { en: "Technology-enabled, technology-friendly municipalities", ne: "प्रविधिमैत्री, प्रविधि-सक्षम नगरपालिका" },
  description: {
    en: "A cloud-based mobile and web platform that brings all municipal services and activities into one place for officials and citizens.",
    ne: "क्लाउडमा आधारित मोबाइल र वेब प्लेटफर्म, जसले नगरपालिकाका सबै सेवा र गतिविधि पदाधिकारी र नागरिकका लागि एकै ठाउँमा ल्याउँछ।",
  },
  overview: {
    en: "Digital Palika is designed to save time and make citizens' tasks easier through modern technology, information systems and municipality management, transforming local bodies into technology-enabled digital municipalities. It offers direct-contact services for residents through the municipality's computerised system, and helps manage the municipality's investments and employment growth.",
    ne: "डिजिटल पालिका आधुनिक प्रविधि, सूचना प्रणाली र नगरपालिका व्यवस्थापनमार्फत समय बचत गर्न र नागरिकका कार्य सहज बनाउन डिजाइन गरिएको हो, जसले स्थानीय तहलाई प्रविधि-सक्षम डिजिटल नगरपालिकामा रूपान्तरण गर्छ। यसले नगरपालिकाको कम्प्युटरकृत प्रणालीमार्फत बासिन्दासँग प्रत्यक्ष सम्पर्क सेवा दिन्छ र लगानी तथा रोजगारी वृद्धि व्यवस्थापनमा सहयोग गर्छ।",
  },
  highlights: {
    en: [
      "Cloud-based mobile and web platform for every municipal service",
      "Direct-contact services for residents through a computerised system",
      "Manage the municipality's investments and employment growth with ease",
      "Demo and onboarding to help your municipality go digital",
    ],
    ne: [
      "सबै नगरपालिका सेवाका लागि क्लाउडमा आधारित मोबाइल र वेब प्लेटफर्म",
      "कम्प्युटरकृत प्रणालीमार्फत बासिन्दासँग प्रत्यक्ष सम्पर्क सेवा",
      "नगरपालिकाको लगानी र रोजगारी वृद्धि सहज रूपमा व्यवस्थापन",
      "तपाईंको नगरपालिकालाई डिजिटल बनाउन डेमो र सहयोग",
    ],
  },
  stats: [
    { value: "70+", label: { en: "Local levels served", ne: "सेवा पाएका स्थानीय तह" } },
    { value: "800,000+", label: { en: "Beneficiary citizens", ne: "लाभान्वित नागरिक" } },
    { value: "2,500+", label: { en: "Beneficiary representatives", ne: "लाभान्वित प्रतिनिधि" } },
  ],
  tags: { en: ["Citizen portal", "Cloud", "Mobile + Web"], ne: ["नागरिक पोर्टल", "क्लाउड", "मोबाइल + वेब"] },
  image: "/palika-herosection.png",
  accent: "#2563EB",
};
