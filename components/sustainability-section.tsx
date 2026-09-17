"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal, StaggerWords } from "@/components/ui/reveal";

export default function SustainabilitySection() {
  const { language } = useLanguage();
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: imgProgress } = useScroll({
    target: imageWrapRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(imgProgress, [0, 0.5, 1], [1.18, 1, 1.18]);

  const content =
    language === "en"
      ? {
          category: "Digital Sustainability",
          title: "Engineering a Greener Digital Future",
          description:
            "Architecting energy-efficient digital infrastructure and sustainable codebases that minimize carbon footprints without compromising high-stakes performance.",
          cta: "Our Green IT Framework",
        }
      : {
          category: "डिजिटल दिगोपन",
          title: "हरियाली डिजिटल भविष्यको निर्माण",
          description:
            "ऊर्जा-कुशल डिजिटल पूर्वाधार र दिगो कोडबेसहरूको निर्माण जसले उच्च-स्तरको प्रदर्शनमा सम्झौता नगरी कार्बन पदचिह्नलाई न्यूनीकरण गर्दछ।",
          cta: "हाम्रो ग्रीन आईटी फ्रेमवर्क",
        };

  return (
    <section
      className="relative overflow-hidden py-12 lg:py-16 border-t"
      style={{ background: 'linear-gradient(180deg, #f6f8fc 0%, #eef1f8 100%)', borderColor: "rgba(11,13,18,0.06)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle at 15% 10%, rgba(37,99,235,0.08) 0%, transparent 50%), " +
            "radial-gradient(circle at 85% 90%, rgba(37,99,235,0.08) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">

          {/* Content Side */}
          <Reveal className="order-2 lg:order-1" y={36}>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-gradient-to-r from-[#E31B23] to-[#2563EB]" />
              <div className="text-[12px] font-bold uppercase tracking-[0.4em] text-[#2563EB]">
                {content.category}
              </div>
            </div>

            <h2
              className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold mb-10 leading-[1.0] text-[#0b0d12]"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              <StaggerWords text={content.title} />
            </h2>

            <p className="text-xl text-[#0b0d12]/60 mb-12 leading-relaxed max-w-xl">
              {content.description}
            </p>

            <Link
              href="/solutions"
              className="inline-flex items-center px-10 py-5 bg-[#E31B23] text-white font-bold transition-all hover:brightness-110 hover:scale-[1.03] active:scale-95 group shadow-sm"
            >
              <span className="mr-4 tracking-wider uppercase text-sm">
                {content.cta}
              </span>
              <ArrowRight className="transition-transform group-hover:translate-x-2" />
            </Link>
          </Reveal>

          {/* Image Side - Modern IT Frame */}
          <Reveal className="order-1 lg:order-2 relative group" y={36}>
            <div ref={imageWrapRef} className="relative aspect-[1/1] overflow-hidden rounded-sm border border-[#0b0d12]/10 bg-[#f2f2f3] shadow-xl shadow-[#0b0d12]/5">
              <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
                <Image
                  src="/sustainability-construction.jpg"
                  alt="Construction Sustainability"
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-105 group-hover:brightness-110"
                  priority
                />
              </motion.div>

              {/* Dynamic Overlay - neutral tint */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0b0d12]/70 via-transparent to-transparent opacity-70" />

              {/* Achievement Card */}
              <div className="absolute bottom-6 left-6 right-6 p-6 backdrop-blur-md bg-[#0b0d12]/50 border border-white/10 rounded-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
                  <div className="text-white font-bold tracking-[0.2em] text-[10px] uppercase">
                    {language === "en" ? "Operational Efficiency" : "सञ्चालन दक्षता"}
                  </div>
                </div>
                <div className="flex gap-8">
                  <div>
                    <div className="text-white text-2xl font-bold mb-1">99.9%</div>
                    <div className="text-white/40 text-[10px] uppercase">
                      {language === "en" ? "Uptime Goal" : "अपटाइम लक्ष्य"}
                    </div>
                  </div>
                  <div className="border-l border-white/10 pl-8">
                    <div className="text-[#2563EB] text-2xl font-bold mb-1">-40%</div>
                    <div className="text-white/40 text-[10px] uppercase">
                      {language === "en" ? "Carbon Offset" : "कार्बन अफसेट"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
