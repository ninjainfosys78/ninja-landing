"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { CountUp } from "@/components/ui/count-up";
import { useMounted } from "@/components/ui/reveal";

// Directional entrance: the heading slides in from the right, the body copy
// rises from below, and the image slides in from the left — each element
// converging from a different side rather than everything just fading up.
const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 70 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const slideFromBottom: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -70 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// Achievement card's own lines still stagger bottom-up, one after another.
const staggerLine = slideFromBottom;

interface SolutionArea {
  label: string;
}

export default function SustainabilitySection() {
  const { language } = useLanguage();
  // Framer Motion's SSR output bakes the already-visible "show" state instead
  // of "hidden" for whileInView-driven elements, so on refresh anything
  // already in view never visibly animates. Forcing "hidden" via an explicit
  // `animate` prop until mount guarantees a genuine hidden first paint (see
  // components/ui/reveal.tsx for the fuller explanation).
  const mounted = useMounted();
  const forceHidden = !mounted ? "hidden" : undefined;
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: imgProgress } = useScroll({
    target: imageWrapRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(imgProgress, [0, 0.5, 1], [1.18, 1, 1.18]);

  const content =
    language === "en"
      ? {
          title: "Solutions Built for Every Institution",
          description:
            "From e-governance platforms to healthcare, education and fintech systems, we build custom web, mobile and cloud solutions that scale with your institution.",
          cta: "Explore Our Solutions",
          eyebrow: "Platform Delivery",
          statLabel1: "Uptime Goal",
          statLabel2: "Solution Areas",
          solutionAreas: [
            { label: "E-Governance" },
            { label: "Healthcare" },
            { label: "Education" },
            { label: "Fintech" },
          ],
        }
      : {
          title: "प्रत्येक संस्थाका लागि समाधान",
          description:
            "सरकारी, स्वास्थ्य, शिक्षा र फिनटेक प्रणालीदेखि लिएर, हामी तपाईंको संस्थासँगै विस्तार हुने वेब, मोबाइल र क्लाउड समाधानहरू निर्माण गर्छौं।",
          cta: "हाम्रा समाधानहरू हेर्नुहोस्",
          eyebrow: "प्लेटफर्म डेलिभरी",
          statLabel1: "अपटाइम लक्ष्य",
          statLabel2: "समाधान क्षेत्रहरू",
          solutionAreas: [
            { label: "इ-गभर्नेन्स" },
            { label: "स्वास्थ्य" },
            { label: "शिक्षा" },
            { label: "फिनटेक" },
          ],
        };

  return (
    <section
      className="relative overflow-hidden py-12 lg:py-16 border-t"
      style={{ backgroundColor: "var(--page-bg)", borderColor: "rgba(11,13,18,0.06)" }}
    >
      {/* Subtle noise + soft accent glows, matching the texture used on the About section */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-20 h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ backgroundColor: "#2563EB0a" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ backgroundColor: "#E31B230a" }}
      />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">

          {/* Content Side — label, heading, description and CTA each enter on their own beat */}
          <motion.div
            className="order-2 lg:order-1"
            initial="hidden"
            whileInView="show"
            animate={forceHidden}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={slideFromRight}
              className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold mb-10 leading-[1.05] tracking-tight text-[#0b0d12]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {content.title}
            </motion.h2>

            <motion.p variants={slideFromBottom} className="text-xl text-[#0b0d12]/60 mb-10 leading-relaxed max-w-xl">
              {content.description}
            </motion.p>

            <motion.div variants={staggerContainer} className="flex flex-col gap-4 mb-12 max-w-md">
              {content.solutionAreas.map((area, idx) => (
                <motion.div key={idx} variants={staggerLine} className="flex items-center gap-3">
                  <ChevronRight size={22} strokeWidth={3} className="flex-shrink-0 text-[#2563EB]" />
                  <span className="text-xl font-normal text-[#0b0d12]/80">{area.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={slideFromBottom}>
              <Link
                href="/solutions"
                className="cta-flat inline-flex items-center px-8 py-5 bg-[#E31B23] text-white font-bold transition-all hover:brightness-110 hover:scale-[1.03] active:scale-95 group"
              >
                <span className="mr-4 tracking-wider text-sm">
                  {content.cta}
                </span>
                <ArrowRight className="transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Side - Modern IT Frame */}
          <motion.div
            className="order-1 lg:order-2 relative group"
            initial="hidden"
            whileInView="show"
            animate={forceHidden}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
            variants={slideFromLeft}
            transition={{ delay: 0.15 }}
          >
            <div ref={imageWrapRef} className="relative aspect-[1/1] overflow-hidden rounded-3xl border border-[#d7e4fa] bg-[#e8f1ff] shadow-xl shadow-[#0b0d12]/5">
              <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
                <Image
                  src="/digital-infrastructure-network-city.jpg"
                  alt="Digital infrastructure powering government and institutional platforms"
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-105 group-hover:brightness-110"
                  priority
                />
              </motion.div>

              {/* Dynamic Overlay - neutral tint */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0b0d12]/70 via-transparent to-transparent opacity-70" />

              {/* Achievement Card — its own line and stats enter one after another */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 p-6 backdrop-blur-md bg-[#0b0d12]/50 border border-white/10 rounded-sm"
                initial="hidden"
                whileInView="show"
                animate={forceHidden}
                viewport={{ once: true, amount: 0.6 }}
                variants={staggerContainer}
              >
                <motion.div variants={staggerLine} className="flex items-center gap-4 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
                  <div className="text-white font-bold tracking-[0.2em] text-[10px] uppercase">
                    {content.eyebrow}
                  </div>
                </motion.div>
                <motion.div variants={staggerLine} className="flex gap-8">
                  <div>
                    <div className="text-white text-2xl font-bold mb-1">
                      <CountUp to={99.9} decimals={1} suffix="%" />
                    </div>
                    <div className="text-white/40 text-[10px] uppercase">
                      {content.statLabel1}
                    </div>
                  </div>
                  <div className="border-l border-white/10 pl-8">
                    <div className="text-[#2563EB] text-2xl font-bold mb-1">
                      <CountUp to={5} />
                    </div>
                    <div className="text-white/40 text-[10px] uppercase">
                      {content.statLabel2}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
