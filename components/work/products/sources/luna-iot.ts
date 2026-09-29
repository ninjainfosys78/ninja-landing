import type { ProductSource } from "../product-types";

export const LUNA_IOT_SOURCE: ProductSource = {
  id: "luna-iot",
  name: "Luna IoT",
  siteUrl: "https://mylunago.com/",
  tagline: { en: "GPS tracking, made in Nepal", ne: "नेपालमै बनेको GPS ट्र्याकिङ" },
  description: {
    en: "An indigenous GPS vehicle tracking and IoT platform for fleet management and smart tracking services in Nepal and abroad.",
    ne: "नेपाल र विदेशमा फ्लिट व्यवस्थापन र स्मार्ट ट्र्याकिङ सेवाका लागि स्वदेशी GPS सवारी ट्र्याकिङ तथा IoT प्लेटफर्म।",
  },
  overview: {
    en: "Luna IoT is a GPS tracking and IoT system built locally in Nepal by Pathibhara Sensor Solution. Through the Luna IoT app it powers vehicle tracking, fleet management and smart IoT services, with the goal of making Nepal digitally capable through homegrown technology.",
    ne: "लुना IoT पथिभरा सेन्सर सोलुसनले नेपालमै विकास गरेको GPS ट्र्याकिङ तथा IoT प्रणाली हो। लुना IoT एपमार्फत यसले सवारी ट्र्याकिङ, फ्लिट व्यवस्थापन र स्मार्ट IoT सेवा उपलब्ध गराउँछ, र स्वदेशी प्रविधिमार्फत नेपाललाई डिजिटल रूपमा सक्षम बनाउने लक्ष्य राख्छ।",
  },
  highlights: {
    en: [
      "Real-time vehicle tracking with running, idle and stopped status",
      "Fleet management for organizations and government bodies",
      "Trip distance, fuel, odometer and altitude at a glance",
      "Designed and built in Nepal",
    ],
    ne: [
      "चलिरहेको, निष्क्रिय र रोकिएको अवस्थासहित रियल-टाइम सवारी ट्र्याकिङ",
      "संस्था र सरकारी निकायका लागि फ्लिट व्यवस्थापन",
      "दूरी, इन्धन, ओडोमिटर र उचाइ एकै नजरमा",
      "नेपालमै डिजाइन र निर्माण",
    ],
  },
  stats: [],
  tags: { en: ["GPS", "IoT", "Fleet"], ne: ["GPS", "IoT", "फ्लिट"] },
  image: "/luna-iot-visual.jpg",
  accent: "#7B1FA2",
};
