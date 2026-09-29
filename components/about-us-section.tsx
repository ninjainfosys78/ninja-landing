"use client";

import React from "react";
import { CircleDot, Compass, Heart } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { PillarCardGrid } from "@/components/ui/pillar-card";

const PILLAR_ICONS = [Compass, CircleDot, Heart];
const PILLAR_LABEL_CLASSES = ["text-[#1d4ed8]", "text-[#b91c1c]", "text-[#475569]"];

export default function AboutUsSection() {
  const { language } = useLanguage();

  const content =
    language === "en"
      ? {
          pillars: [
            {
              label: "Foundational drive",
              title: "Our Purpose",
              text: "Build trustworthy software that helps teams move faster, operate safely, and deliver real outcomes for citizens and enterprises."
            },
            {
              label: "Daily execution",
              title: "Our Mission",
              text: "Enable enterprises with modern engineering practices and craft-focused teams—shipping measurable value with zero compromise."
            },
            {
              label: "Core tenets",
              title: "Our Values",
              text: "Craft and clarity, integrity and ownership, partner mindset, and security by default embedded in every layer of code."
            },
          ],
        }
      : {
          pillars: [
            {
              label: "आधारभूत प्रेरणा",
              title: "हाम्रो उद्देश्य",
              text: "विश्वासयोग्य सफ्टवेयर बनाउनु—जसले टिमलाई छिटो र सुरक्षित रूपमा काम गर्न मद्दत गर्छ।"
            },
            {
              label: "दैनिक कार्यान्वयन",
              title: "हाम्रो मिशन",
              text: "आधुनिक इन्जिनियरिङ अभ्यास र कौशल केन्द्रित टोलीमार्फत मापनयोग्य मूल्य डेलिभर गराउने।"
            },
            {
              label: "मूल सिद्धान्त",
              title: "हाम्रो मूल्यहरू",
              text: "कला र स्पष्टता, इमानदारी र स्वामित्व, साझेदारी सोच, र सुरक्षा-पहिले।"
            },
          ],
        };

  return (
    <section className="relative overflow-hidden py-16 sm:py-20" style={{ backgroundColor: "var(--page-bg-alt)" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
        />
        <div
          className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{ backgroundColor: "#2563EB0a" }}
        />
        <div
          className="absolute -bottom-32 right-1/4 h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{ backgroundColor: "#E31B230a" }}
        />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <PillarCardGrid pillars={content.pillars.map((pillar, i) => ({ ...pillar, icon: PILLAR_ICONS[i], labelClassName: PILLAR_LABEL_CLASSES[i] }))} />
      </div>
    </section>
  );
}
