import { Search, BarChart3, PenTool, Code } from "lucide-react";
import type { ProcessStep } from "@/components/work/process/process-steps";

type Lang = "en" | "ne";

export function getServiceProcessSteps(lang: Lang): ProcessStep[] {
  const en = lang === "en";
  return [
    {
      title: en ? "Identify / Uncover" : "पहिचान / खोज",
      description: en
        ? "Pinpointing pain points, business goals, existing bottlenecks, and core user friction."
        : "समस्याहरू, व्यावसायिक लक्ष्य, अवरोधहरू र प्रयोगकर्ताका मुख्य कठिनाइहरू पहिचान गर्ने।",
      Icon: Search,
    },
    {
      title: en ? "Investigate / Analyze" : "अनुसन्धान / विश्लेषण",
      description: en
        ? "User research, data telemetry, root-cause analysis, and feasibility assessments."
        : "प्रयोगकर्ता अनुसन्धान, डेटा टेलिमेट्री, मूल कारण विश्लेषण र सम्भाव्यता मूल्याङ्कन।",
      Icon: BarChart3,
    },
    {
      title: en ? "Design / Architect" : "डिजाइन / संरचना",
      description: en
        ? "Wireframing, system architecture, UX flows, and UI prototyping."
        : "वायरफ्रेम, प्रणाली संरचना, UX फ्लो र UI प्रोटोटाइप।",
      Icon: PenTool,
    },
    {
      title: en ? "Build / Execute" : "निर्माण / कार्यान्वयन",
      description: en
        ? "Writing clean code, CI/CD pipelines, testing, and continuous deployment."
        : "सफा कोड, CI/CD पाइपलाइन, परीक्षण र निरन्तर डिप्लोयमेन्ट।",
      Icon: Code,
    },
  ];
}
