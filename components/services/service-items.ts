export type ServiceLang = "en" | "ne";

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  bullets: string[];
  image: string;
  accent: string;
  cta: string;
}

interface ServiceSource {
  id: string;
  name: Record<ServiceLang, string>;
  description: Record<ServiceLang, string>;
  bullets: Record<ServiceLang, string[]>;
  image: string;
  accent: string;
  cta: Record<ServiceLang, string>;
}

const SERVICE_SOURCES: ServiceSource[] = [
  {
    id: "eshasan",
    name: { en: "E-Governance & Public Administration", ne: "ई-गभर्नेन्स र सार्वजनिक प्रशासन" },
    description: {
      en: "Core administrative functions run on a single, secure system — reducing manual work and giving citizens faster, more reliable access to public services.",
      ne: "मुख्य प्रशासनिक कार्यहरू एउटै सुरक्षित प्रणालीमा सञ्चालन हुन्छन् — म्यानुअल काम घटाउँछ र नागरिकलाई सार्वजनिक सेवामा छिटो, भरपर्दो पहुँच दिन्छ।",
    },
    bullets: {
      en: [
        "Streamlined workflows across administrative functions",
        "Centralized financial and human resource management",
        "Real-time dashboards for oversight and reporting",
        "Transparent, trackable services for citizens",
      ],
      ne: [
        "प्रशासनिक कार्यहरूमा सुव्यवस्थित कार्यप्रवाह",
        "केन्द्रीकृत वित्तीय तथा जनशक्ति व्यवस्थापन",
        "निगरानी र रिपोर्टिङका लागि रियल-टाइम ड्यासबोर्ड",
        "नागरिकका लागि पारदर्शी, ट्र्याक गर्न मिल्ने सेवा",
      ],
    },
    image: "/eshasan-visual.png",
    accent: "#2563EB",
    cta: { en: "Get in touch", ne: "सम्पर्क गर्नुहोस्" },
  },
  {
    id: "epahichan",
    name: { en: "Digital Signature & Document Security", ne: "डिजिटल हस्ताक्षर र कागजात सुरक्षा" },
    description: {
      en: "Documents get signed and verified electronically instead of on paper — legally valid, tamper-evident, and ready for organizations that want to digitize paperwork end to end.",
      ne: "कागजातहरू कागजमा नभई विद्युतीय रूपमा हस्ताक्षर र प्रमाणीकरण हुन्छन् — कानुनी रूपमा मान्य, हेरफेर पत्ता लाग्ने, र कागजात पूर्ण रूपमा डिजिटल बनाउन चाहने संस्थाका लागि तयार।",
    },
    bullets: {
      en: [
        "Legally recognized digital signatures in Nepal",
        "Browser-based signing with independent verification",
        "Cryptographically secure — cannot be forged without the private key",
        "Detects any tampering with a document after signing",
      ],
      ne: [
        "नेपालमा कानुनी मान्यता प्राप्त डिजिटल हस्ताक्षर",
        "ब्राउजरमै हस्ताक्षर, स्वतन्त्र प्रमाणीकरणसहित",
        "निजी कुञ्जीबिना नक्कली बनाउन नसकिने सुरक्षित हस्ताक्षर",
        "हस्ताक्षरपछि कागजातमा भएको हेरफेर पत्ता लगाउने",
      ],
    },
    image: "/epahichan-visual.png",
    accent: "#C8102E",
    cta: { en: "Get digital signatures", ne: "डिजिटल हस्ताक्षर लिनुहोस्" },
  },
  {
    id: "icms",
    name: { en: "Government & Office Websites", ne: "सरकारी तथा कार्यालय वेबसाइट" },
    description: {
      en: "A self-service publishing platform for offices to deliver notices, records, and services to the public — fully bilingual, fully staff-managed.",
      ne: "कार्यालयले आफैं सूचना, अभिलेख र सेवा सर्वसाधारणसमक्ष प्रकाशन गर्न सक्ने व्यावसायिक वेबसाइट, आफ्नै कर्मचारीले नेपाली र अंग्रेजी दुवै भाषामा सम्हाल्ने।",
    },
    bullets: {
      en: [
        "Ready-to-manage website for offices and municipalities",
        "Publish notices, news, services, downloads and photo galleries",
        "Staff directory and official documents included",
        "Available in both Nepali and English",
      ],
      ne: [
        "कार्यालय र नगरपालिकाका लागि व्यवस्थापन गर्न तयार वेबसाइट",
        "सूचना, समाचार, सेवा, डाउनलोड र फोटो ग्यालरी प्रकाशन",
        "कर्मचारी विवरण र आधिकारिक कागजात समावेश",
        "नेपाली र अंग्रेजी दुवै भाषामा उपलब्ध",
      ],
    },
    image: "/webdevelopment.jpg",
    accent: "#0447AF",
    cta: { en: "Launch your office website", ne: "आफ्नो कार्यालय वेबसाइट सुरु गर्नुहोस्" },
  },
  {
    id: "airfone",
    name: { en: "AI-Powered Call Handling", ne: "AI-संचालित कल ह्यान्डलिङ" },
    description: {
      en: "Business phone calls get answered automatically, so no customer is left waiting — built for shops, clinics, schools and restaurants that can't staff a phone line around the clock.",
      ne: "व्यावसायिक कलहरू स्वचालित रूपमा उठाइन्छन्, ताकि कुनै पनि ग्राहकलाई कुर्न नपरोस् — पसल, क्लिनिक, विद्यालय र रेस्टुरेन्टका लागि जसले सधैं फोन उठाउन जनशक्ति राख्न सक्दैनन्।",
    },
    bullets: {
      en: [
        "AI agent that answers and responds to calls on mobile",
        "Made for shops, clinics, schools and restaurants",
        "Handles common queries without a human on the line",
        "Quick setup — just your business number",
      ],
      ne: [
        "मोबाइलमा कल उठाउने र जवाफ दिने AI एजेन्ट",
        "पसल, क्लिनिक, विद्यालय र रेस्टुरेन्टका लागि",
        "मान्छे नभई सामान्य प्रश्नहरूको जवाफ",
        "छिटो सेटअप — तपाईंको व्यावसायिक नम्बर मात्र चाहिन्छ",
      ],
    },
    image: "/airfone-visual.png",
    accent: "#4F7F14",
    cta: { en: "Bring AI calls to your business", ne: "आफ्नो व्यवसायमा AI कल ल्याउनुहोस्" },
  },
  {
    id: "luna-iot",
    name: { en: "Vehicle Tracking & Fleet Management", ne: "सवारी ट्र्याकिङ र फ्लिट व्यवस्थापन" },
    description: {
      en: "Every vehicle's location and usage is visible in real time — helping organizations and fleets track running, idle and stopped vehicles instead of guessing where they are.",
      ne: "हरेक सवारीको स्थान र प्रयोग रियल-टाइममा देख्न सकिन्छ — संस्था र फ्लिटलाई चलिरहेको, निष्क्रिय र रोकिएको सवारी अनुमानको भरमा नभई सजिलै ट्र्याक गर्न सहयोग गर्छ।",
    },
    bullets: {
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
    image: "/luna-iot-visual.jpg",
    accent: "#7B1FA2",
    cta: { en: "Track your fleet", ne: "आफ्नो फ्लिट ट्र्याक गर्नुहोस्" },
  },
  {
    id: "one-door-system",
    name: { en: "Centralized Organization Monitoring", ne: "केन्द्रीकृत संस्था अनुगमन" },
    description: {
      en: "Every branch, department and activity of an organization becomes visible from one platform — giving leadership a single view instead of checking each unit separately.",
      ne: "संस्थाको हरेक शाखा, विभाग र गतिविधि एउटै प्लेटफर्मबाट देख्न सकिन्छ — नेतृत्वलाई हरेक इकाई छुट्टाछुट्टै हेर्नुको सट्टा एउटै दृश्य दिन्छ।",
    },
    bullets: {
      en: [
        "One dashboard covering every branch's activity and performance",
        "Real-time status across units without visiting each one",
        "Centralized oversight for coordination across the organization",
        "Consistent reporting across all connected branches",
      ],
      ne: [
        "हरेक शाखाको गतिविधि र प्रदर्शन समेट्ने एउटै ड्यासबोर्ड",
        "प्रत्येक इकाई नगई रियल-टाइम स्थिति हेर्न सकिने",
        "संस्थाभर समन्वयका लागि केन्द्रीकृत निगरानी",
        "सबै जोडिएका शाखामा एकरूप रिपोर्टिङ",
      ],
    },
    image: "/opendata.jpg",
    accent: "#2563EB",
    cta: { en: "See it in action", ne: "प्रयोगमा हेर्नुहोस्" },
  },
  {
    id: "drive",
    name: { en: "Secure Data Storage & Management", ne: "सुरक्षित डेटा भण्डारण तथा व्यवस्थापन" },
    description: {
      en: "Sensitive files stay organized and access-controlled, with safe backups and a clear record of who opened what — built for organizations that can't afford to lose records.",
      ne: "संवेदनशील फाइल व्यवस्थित र पहुँच-नियन्त्रित रहन्छ, सुरक्षित ब्याकअप र कसले के हेर्यो भन्ने स्पष्ट रेकर्डसहित — रेकर्ड गुमाउन नसक्ने संस्थाका लागि निर्मित।",
    },
    bullets: {
      en: [
        "Centralized, access-controlled file storage",
        "Role-based permissions and activity logs",
        "Secure backups and data recovery",
        "Built for organizations handling sensitive records",
      ],
      ne: [
        "केन्द्रीकृत, पहुँच-नियन्त्रित फाइल भण्डारण",
        "भूमिकामा आधारित अनुमति र गतिविधि लग",
        "सुरक्षित ब्याकअप र डेटा पुनर्प्राप्ति",
        "संवेदनशील रेकर्ड राख्ने संस्थाका लागि निर्मित",
      ],
    },
    image: "/delivery.jpg",
    accent: "#0447AF",
    cta: { en: "Secure your data", ne: "आफ्नो डेटा सुरक्षित गर्नुहोस्" },
  },
  {
    id: "citizen-charter",
    name: { en: "Public Display & Notice Screens", ne: "सार्वजनिक प्रदर्शन तथा सूचना स्क्रिन" },
    description: {
      en: "Service counters, offices and waiting areas display live notices, queue information and announcements on a screen — updated remotely and instantly, replacing printed notices pinned to a wall.",
      ne: "सेवा काउन्टर, कार्यालय र प्रतीक्षा कक्षमा प्रत्यक्ष सूचना, लाइन जानकारी र घोषणा स्क्रिनमा देखाइन्छ — टाढैबाट र तुरुन्तै अपडेट हुने, भित्तामा टाँसिएको छापिएको सूचनाको सट्टा।",
    },
    bullets: {
      en: [
        "Live notices and announcements shown on screen",
        "Content updated remotely from anywhere, in real time",
        "Works on smart TVs and displays at counters, offices and waiting areas",
        "Reduces printed notices and manual updates",
      ],
      ne: [
        "स्क्रिनमा प्रत्यक्ष सूचना र घोषणा देखिने",
        "जहाँबाट पनि टाढैबाट रियल-टाइममा अपडेट हुने",
        "काउन्टर, कार्यालय र प्रतीक्षा कक्षका स्मार्ट टिभी तथा डिस्प्लेमा प्रयोग",
        "छापिएका सूचना र म्यानुअल अपडेट घटाउँछ",
      ],
    },
    image: "/cms.jpg",
    accent: "#7B1FA2",
    cta: { en: "Set up your display screens", ne: "आफ्नो डिस्प्ले स्क्रिन जडान गर्नुहोस्" },
  },
];

export function getServices(language: ServiceLang): ServiceItem[] {
  return SERVICE_SOURCES.map(({ name, description, bullets, cta, ...rest }) => ({
    ...rest,
    name: name[language],
    description: description[language],
    bullets: bullets[language],
    cta: cta[language],
  }));
}
