import type { ProductSource } from "../product-types";

export const ICMS_SOURCE: ProductSource = {
  id: "icms",
  name: "ICMS",
  siteUrl: "https://fansep.moald.gov.np/",
  tagline: { en: "Integrated Content Management System", ne: "एकीकृत सामग्री व्यवस्थापन प्रणाली" },
  description: {
    en: "A dynamic website builder for local governments and public offices, with notices, services, downloads and galleries managed from one place.",
    ne: "स्थानीय तह तथा सार्वजनिक कार्यालयका लागि डाइनामिक वेबसाइट निर्माता, जसमा सूचना, सेवा, डाउनलोड र ग्यालरी एकै ठाउँबाट व्यवस्थापन गर्न सकिन्छ।",
  },
  overview: {
    en: "ICMS lets a local government or public office run its own official website without writing code. Staff publish notices, news, services, legal documents, staff directories and photo galleries from a simple admin panel, and the public site is served in Nepali and English with built-in accessibility support.",
    ne: "आईसीएमएसले स्थानीय तह वा सार्वजनिक कार्यालयलाई कोड नलेखी आफ्नै आधिकारिक वेबसाइट चलाउन दिन्छ। कर्मचारीहरूले सरल एडमिन प्यानलबाट सूचना, समाचार, सेवा, कानुनी कागजात, कर्मचारी विवरण र फोटो ग्यालरी प्रकाशन गर्छन्, र सार्वजनिक साइट नेपाली तथा अंग्रेजीमा पहुँचयोग्यता सुविधासहित चल्छ।",
  },
  highlights: {
    en: [
      "Dynamic website builder made for local governments and public offices",
      "Manage notices, news, services, downloads and galleries from one admin panel",
      "Staff directory, legal documents and citizen-facing service links built in",
      "Bilingual Nepali and English site with an accessibility widget",
    ],
    ne: [
      "स्थानीय तह तथा सार्वजनिक कार्यालयका लागि बनाइएको डाइनामिक वेबसाइट निर्माता",
      "सूचना, समाचार, सेवा, डाउनलोड र ग्यालरी एउटै एडमिन प्यानलबाट व्यवस्थापन",
      "कर्मचारी विवरण, कानुनी कागजात र नागरिक सेवाका लिङ्क समावेश",
      "पहुँचयोग्यता विजेटसहित नेपाली र अंग्रेजी द्विभाषिक साइट",
    ],
  },
  stats: [],
  tags: { en: ["CMS", "Local Government", "Website Builder"], ne: ["CMS", "स्थानीय तह", "वेबसाइट निर्माता"] },
  image: "/icms-visual.svg",
  accent: "#0447AF",
};
