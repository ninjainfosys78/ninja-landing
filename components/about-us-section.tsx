"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { PillarCardGrid } from "@/components/ui/pillar-card";

export default function AboutUsSection() {
  const { language } = useLanguage();

  const content =
    language === "en"
      ? {
          title: "Engineered for excellence, built for scale.",
          description:
            "Ninja Infosys is an IT technical solution provider. Our dedicated technical professionals offer services in IT Consultancy, Software Development, and Project-based solutions with a mission to establish lasting professional relationships provided through reliable technology.",
          pillars: [
            {
              title: "Our Purpose",
              text: "Build trustworthy software that helps teams move faster, operate safely, and deliver real outcomes."
            },
            {
              title: "Our Mission",
              text: "Enable enterprises with modern engineering practices and craft-focused teams—shipping measurable value."
            },
            {
              title: "Our Values",
              text: "Craft and clarity, integrity and ownership, partner mindset, and security by default."
            },
          ],
          cta: "Learn more about us",
        }
      : {
          title: "उत्कृष्टताको लागि इन्जिनियर गरिएको, स्केलको लागि निर्मित।",
          description:
            "निन्जा इन्फोसिस एक आईटी प्राविधिक समाधान प्रदायक हो। हाम्रा समर्पित प्राविधिक पेशेवरहरूले आईटी परामर्श, सफ्टवेयर विकास, र परियोजना-आधारित समाधानहरूमा सेवाहरू प्रदान गर्दछन्।",
          pillars: [
            {
              title: "हाम्रो उद्देश्य",
              text: "विश्वासयोग्य सफ्टवेयर बनाउनु—जसले टिमलाई छिटो र सुरक्षित रूपमा काम गर्न मद्दत गर्छ।"
            },
            {
              title: "हाम्रो मिशन",
              text: "आधुनिक इन्जिनियरिङ अभ्यास र कौशल केन्द्रित टोलीमार्फत मापनयोग्य मूल्य डेलिभर गराउने।"
            },
            {
              title: "हाम्रो मूल्यहरू",
              text: "कला र स्पष्टता, इमानदारी र स्वामित्व, साझेदारी सोच, र सुरक्षा-पहिले।"
            },
          ],
          cta: "हाम्रो बारेमा थप जान्नुहोस्",
        };

  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "var(--page-bg-alt)" }}>
      {/* Subtle noise + soft accent glows behind the header, so the section reads as textured rather than flat white */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ backgroundColor: "#2563EB0a" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-1/4 h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ backgroundColor: "#E31B230a" }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-[#0b0d12] mb-6 leading-[1.1] tracking-tight">
            <StaggerWords text={content.title} amount={0.6} />
          </h2>
          <Reveal delay={0.1}>
            <p className="text-lg text-[#0b0d12]/60 leading-relaxed font-sans">
              {content.description}
            </p>
          </Reveal>
        </div>

        <PillarCardGrid pillars={content.pillars} />

        <div className="mx-auto max-w-3xl text-center">
          <Reveal delay={0.2} className="mt-16">
            <Link
              href="/about"
              className="cta-flat inline-flex items-center gap-4 bg-[#E31B23] text-white font-bold group px-8 py-5 transition-all hover:brightness-110 active:scale-95"
            >
              <span className="text-lg tracking-widest">
                {content.cta}
              </span>
              <ArrowRight className="transition-transform group-hover:translate-x-2" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
