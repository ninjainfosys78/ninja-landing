import type { ProductSource } from "../product-types";

export const ESHASAN_SOURCE: ProductSource = {
  id: "eshasan",
  name: "eShasan",
  siteUrl: "https://eshasan.com/",
  tagline: { en: "E-governance platform for digital transformation", ne: "डिजिटल रूपान्तरणका लागि ई-गभर्नेन्स प्लेटफर्म" },
  description: {
    en: "A unified ERP platform for governments, NGOs and enterprises, built for transparency, efficiency and intelligence.",
    ne: "सरकार, गैरसरकारी संस्था र उद्यमहरूका लागि एकीकृत ERP प्लेटफर्म, पारदर्शिता, दक्षता र बुद्धिमत्ताका लागि निर्मित।",
  },
  overview: {
    en: "eShasan integrates every aspect of institutional management into a single, intelligent ecosystem. Pick and deploy only the modules you need and scale as you grow, on a cloud-native architecture with granular role-based access and a full audit trail for every action.",
    ne: "ईशासनले संस्थागत व्यवस्थापनका सबै पक्षलाई एउटै बुद्धिमान इकोसिस्टममा एकीकृत गर्छ। आवश्यक मोड्युल मात्र छानेर चलाउनुहोस् र आवश्यकता अनुसार विस्तार गर्नुहोस्। क्लाउड-नेटिभ संरचना, भूमिकामा आधारित पहुँच र हरेक कार्यको पूर्ण अडिट ट्रेलसहित।",
  },
  highlights: {
    en: [
      "Governance automation: streamlined workflows and compliance across government functions",
      "Financial and HR management: budget tracking, payroll, procurement and people in one place",
      "Data integration and analytics: real-time dashboards and intelligent reporting",
      "Citizen engagement: transparent portals, real-time tracking and seamless service delivery",
    ],
    ne: [
      "शासन स्वचालन: सरकारी कार्यहरूमा सुव्यवस्थित कार्यप्रवाह र अनुपालन",
      "वित्त तथा जनशक्ति व्यवस्थापन: बजेट, पेरोल, खरिद र जनशक्ति एकै ठाउँमा",
      "डेटा एकीकरण र विश्लेषण: रियल-टाइम ड्यासबोर्ड र बुद्धिमान रिपोर्टिङ",
      "नागरिक सहभागिता: पारदर्शी पोर्टल, रियल-टाइम ट्र्याकिङ र सहज सेवा प्रवाह",
    ],
  },
  stats: [
    { value: "99.9%", label: { en: "Uptime SLA", ne: "अपटाइम SLA" } },
    { value: "4", label: { en: "Sectors served", ne: "सेवा दिइएका क्षेत्र" } },
    { value: "7", label: { en: "Interaction models", ne: "अन्तरक्रिया मोडेल" } },
  ],
  tags: { en: ["ERP", "Governance", "Analytics"], ne: ["ERP", "शासन", "विश्लेषण"] },
  image: "/eshasan-visual.png",
  accent: "#2563EB",
};
