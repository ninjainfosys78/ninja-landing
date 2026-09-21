"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Eye, Target, Heart, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal, StaggerWords } from "@/components/ui/reveal";

// A deliberately bolder entrance than the shared Reveal/RevealItem primitives —
// this section's cards should announce themselves, not just fade up gently.
const cardContainerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 90, scale: 0.88, rotate: -3, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

interface Pillar {
  icon: LucideIcon;
  title: string;
  text: string;
  color: string;
}

function CapabilityCard({ pillar }: { pillar: Pillar }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = pillar.icon;

  // Cursor-tracked spotlight — set as CSS custom properties directly on the
  // node so the glow follows the pointer without a React re-render per move.
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    cardRef.current!.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    cardRef.current!.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative h-full overflow-hidden rounded-3xl border border-[#d7e4fa] bg-white p-8 shadow-[0_1px_2px_rgba(10,31,77,0.04),0_18px_40px_-18px_rgba(10,31,77,0.16)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_24px_-16px_rgba(10,31,77,0.22)] sm:p-10"
      style={{ color: pillar.color }}
    >
      {/* Spotlight glow that follows the cursor — the premium hover cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${pillar.color}17, transparent 70%)`,
        }}
      />

      <div className="relative mb-8">
        <div
          className="inline-flex rounded-2xl p-4 text-white transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
          style={{ backgroundColor: pillar.color, boxShadow: `0 12px 24px -10px ${pillar.color}` }}
        >
          <Icon size={28} className="text-white" />
        </div>
      </div>

      <h3 className="relative text-2xl font-heading font-bold text-[#0b0d12] mb-4 group-hover:text-current transition-colors">
        {pillar.title}
      </h3>
      <p className="relative text-[#0b0d12]/60 leading-relaxed font-sans text-[16px] mb-8">
        {pillar.text}
      </p>
    </div>
  );
}

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
        {/* Centered Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <Reveal>
            <div className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#2563EB] mb-6">
              {content.category}
            </div>
          </Reveal>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-[#0b0d12] mb-8 leading-[1.1] tracking-tight">
            <StaggerWords text={content.title} amount={0.6} />
          </h2>
          <Reveal delay={0.15}>
            <p className="text-xl text-[#0b0d12]/60 leading-relaxed max-w-3xl mx-auto font-sans">
              {content.description}
            </p>
          </Reveal>
        </div>

        {/* Capability cards — with a cursor-tracked spotlight on hover */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
          variants={cardContainerVariants}
        >
          {content.pillars.map((pillar, idx) => (
            <motion.div key={idx} variants={cardItemVariants}>
              <CapabilityCard pillar={pillar} />
            </motion.div>
          ))}
        </motion.div>

        {/* Centered CTA */}
        <Reveal className="mt-20 text-center" delay={0.1}>
          <Link
            href="/about"
            className="inline-flex items-center gap-4 bg-[#E31B23] text-white font-bold group px-10 py-5 transition-all hover:brightness-110 hover:shadow-md active:scale-95"
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
