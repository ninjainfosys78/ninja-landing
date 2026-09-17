"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Eye, Target, Heart } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

export default function AboutUsSection() {
  const { language } = useLanguage();

  const content =
    language === "en"
      ? {
          category: "Capabilities",
          title: "Engineered for excellence, built for scale.",
          description:
            "Ninja Infosys is an IT technical solution provider. Our dedicated technical professionals offer services in IT Consultancy, Software Development, and Project-based solutions with a mission to establish lasting professional relationships provided through reliable technology.",
          pillars: [
            {
              icon: Eye,
              title: "Our Purpose",
              text: "Build trustworthy software that helps teams move faster, operate safely, and deliver real outcomes.",
              color: "#2563EB"
            },
            {
              icon: Target,
              title: "Our Mission",
              text: "Enable enterprises with modern engineering practices and craft-focused teams—shipping measurable value.",
              color: "#E31B23"
            },
            {
              icon: Heart,
              title: "Our Values",
              text: "Craft and clarity, integrity and ownership, partner mindset, and security by default.",
              color: "#2563EB"
            },
          ],
          cta: "Learn more about us",
        }
      : {
          category: "क्षमताहरू",
          title: "उत्कृष्टताको लागि इन्जिनियर गरिएको, स्केलको लागि निर्मित।",
          description:
            "निन्जा इन्फोसिस एक आईटी प्राविधिक समाधान प्रदायक हो। हाम्रा समर्पित प्राविधिक पेशेवरहरूले आईटी परामर्श, सफ्टवेयर विकास, र परियोजना-आधारित समाधानहरूमा सेवाहरू प्रदान गर्दछन्।",
          pillars: [
            {
              icon: Eye,
              title: "हाम्रो उद्देश्य",
              text: "विश्वासयोग्य सफ्टवेयर बनाउनु—जसले टिमलाई छिटो र सुरक्षित रूपमा काम गर्न मद्दत गर्छ।",
              color: "#2563EB"
            },
            {
              icon: Target,
              title: "हाम्रो मिशन",
              text: "आधुनिक इन्जिनियरिङ अभ्यास र कौशल केन्द्रित टोलीमार्फत मापनयोग्य मूल्य डेलिभर गराउने।",
              color: "#E31B23"
            },
            {
              icon: Heart,
              title: "हाम्रो मूल्यहरू",
              text: "कला र स्पष्टता, इमानदारी र स्वामित्व, साझेदारी सोच, र सुरक्षा-पहिले।",
              color: "#2563EB"
            },
          ],
          cta: "हाम्रो बारेमा थप जान्नुहोस्",
        };

  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
      {/* Technological Background Elements */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(11,13,18,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-0 left-0 w-full h-full" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(227,27,35,0.05) 0%, transparent 70%)'
        }} />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Centered Header */}
        <Reveal className="max-w-4xl mx-auto text-center mb-20">
          <div className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#2563EB] mb-6">
            {content.category}
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-[#0b0d12] mb-8 leading-[1.1] tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl text-[#0b0d12]/60 leading-relaxed max-w-3xl mx-auto font-sans">
            {content.description}
          </p>
        </Reveal>

        {/* Individual Technological Boxes */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <RevealItem key={idx}>
                <div
                  className="group relative p-8 bg-white border border-[#0b0d12]/10 shadow-sm hover:border-current/40 hover:shadow-md transition-all duration-500 hover:-translate-y-2 text-center h-full"
                  style={{ color: p.color }}
                >
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="mb-8 flex justify-center">
                     <div className="inline-flex p-4 bg-[#0b0d12]/[0.04] border border-[#0b0d12]/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon size={28} className="text-current" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-[#0b0d12] mb-4 group-hover:text-current transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[#0b0d12]/60 leading-relaxed font-sans text-[16px]">
                    {p.text}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Centered CTA */}
        <Reveal className="mt-20 text-center" delay={0.1}>
          <Link
            href="/about"
            className="inline-flex items-center gap-4 bg-[#E31B23] text-white font-bold group px-10 py-5 transition-all hover:brightness-110 hover:shadow-lg active:scale-95"
          >
            <span className="text-lg tracking-widest uppercase">
              {content.cta}
            </span>
            <ArrowRight className="transition-transform group-hover:translate-x-2" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
