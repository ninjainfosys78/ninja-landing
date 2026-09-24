"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Mail, MapPin, Calendar, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem, StaggerWords, AmbientGlow, useMounted } from "@/components/ui/reveal";

const CONTACT_HREF = "/contact";
const SLOW_REVEAL_SECONDS = 1.3;
const SLOW_REVEAL_STAGGER_SECONDS = 0.25;
const SLOW_REVEAL_AMOUNT = 0.3;

// Each piece of a card's own text/icon reveals on its own, slightly after the
// card itself has settled — icon pops in with a playful spring, then title,
// description and the CTA row rise into place one after another.
const CARD_CONTENT_STAGGER: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.15 } },
};

const CARD_ICON_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -25 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 220, damping: 14 } },
};

const CARD_TEXT_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const CARD_CTA_VARIANTS: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

interface CardAction {
  icon: LucideIcon;
  title: string;
  desc: string;
  cta: string;
}

interface GlobalCTAProps {
  onOfficesOpen: () => void;
  onBookingOpen: () => void;
  onQuoteOpen: () => void;
}

function CardContent({ action, accent }: { action: CardAction; accent: string }) {
  const Icon = action.icon;
  const mounted = useMounted();

  // Framer Motion's SSR output bakes the already-visible "show" state instead
  // of "hidden", so a plain, style-matched placeholder renders until the real
  // whileInView-driven version mounts client-side (see components/ui/reveal.tsx).
  if (!mounted) {
    return (
      <div className="flex h-full flex-col justify-between">
        <div>
          <span
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundColor: `${accent}14`, color: accent, opacity: 0, transform: "scale(0.4) rotate(-25deg)" }}
          >
            <Icon size={26} />
          </span>
          <h3 className="text-2xl font-heading font-bold mb-3" style={{ opacity: 0, transform: "translateY(22px)", filter: "blur(6px)" }}>
            {action.title}
          </h3>
          <p className="text-[15px] leading-relaxed text-[#0b0d12]/55" style={{ opacity: 0, transform: "translateY(22px)", filter: "blur(6px)" }}>
            {action.desc}
          </p>
        </div>

        <div
          className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
          style={{ color: accent, opacity: 0, transform: "translateX(-18px)" }}
        >
          {action.cta}
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="flex h-full flex-col justify-between"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={CARD_CONTENT_STAGGER}
    >
      <div>
        <motion.span
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundColor: `${accent}14`, color: accent }}
          variants={CARD_ICON_VARIANTS}
        >
          <Icon size={26} />
        </motion.span>
        <motion.h3 className="text-2xl font-heading font-bold mb-3" variants={CARD_TEXT_VARIANTS}>
          {action.title}
        </motion.h3>
        <motion.p className="text-[15px] leading-relaxed text-[#0b0d12]/55" variants={CARD_TEXT_VARIANTS}>
          {action.desc}
        </motion.p>
      </div>

      <motion.div
        className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
        style={{ color: accent }}
        variants={CARD_CTA_VARIANTS}
      >
        {action.cta}
        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
      </motion.div>
    </motion.div>
  );
}

export default function GlobalCTA({}: GlobalCTAProps) {
  const { language } = useLanguage();

  const content =
    language === "en"
      ? {
          title: "Let's Build What's Next. Together.",
          subtitle: "Connect with our experts to turn your strategic intent into resilient infrastructure.",
          actions: [
            {
              icon: Calendar,
              title: "Schedule a Consultation",
              desc: "Discuss your project goals with our lead consultants.",
              cta: "Book now",
            },
            {
              icon: Mail,
              title: "Request a Quote",
              desc: "Get a detailed technical and financial estimate.",
              cta: "Get started",
            },
            {
              icon: MapPin,
              title: "Talk to Our Team",
              desc: "Visit our global offices or speak to a regional lead.",
              cta: "Find a location",
            }
          ]
        }
      : {
          title: "आउनुहोस्, सँगै के अगाडि छ निर्माण गरौं।",
          subtitle: "तपाईंको रणनीतिक इरादालाई लचिलो पूर्वाधारमा परिणत गर्न हाम्रा विशेषज्ञहरूसँग जोड्नुहोस्।",
          actions: [
            {
              icon: Calendar,
              title: "परामर्श तालिका बनाउनुहोस्",
              desc: "हाम्रा प्रमुख परामर्शदाताहरूसँग तपाईंको परियोजना लक्ष्यहरू छलफल गर्नुहोस्।",
              cta: "अहिले बुक गर्नुहोस्",
            },
            {
              icon: Mail,
              title: "उद्धरण अनुरोध गर्नुहोस्",
              desc: "विस्तृत प्राविधिक र आर्थिक अनुमान प्राप्त गर्नुहोस्।",
              cta: "सुरु गर्नुहोस्",
            },
            {
              icon: MapPin,
              title: "हाम्रो टोलीसँग कुरा गर्नुहोस्",
              desc: "हाम्रा विश्वव्यापी कार्यालयहरूमा जानुहोस् वा क्षेत्रीय प्रमुखसँग कुरा गर्नुहोस्।",
              cta: "स्थान खोज्नुहोस्",
            }
          ]
        };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 border-t border-[#0b0d12]/8"
      style={{ backgroundColor: '#E4EAF5' }}
    >
      <AmbientGlow />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* One large elevated panel, lifted off the tinted page background by a big soft shadow */}
        <Reveal
          className="mx-auto max-w-[1400px] rounded-xl border border-[#0b0d12]/5 bg-white px-6 py-14 shadow-[0_12px_40px_rgba(15,23,42,0.06),0_40px_80px_rgba(15,23,42,0.05)] sm:px-16 sm:py-20"
          duration={SLOW_REVEAL_SECONDS}
          amount={SLOW_REVEAL_AMOUNT}
          y={48}
        >

          {/* Header Area */}
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-[36px] sm:text-[48px] font-heading font-bold text-[#0b0d12] leading-[1.15] mb-5">
              <StaggerWords text={content.title} staggerDelay={0.1} amount={0.6} />
            </h2>
            <Reveal duration={SLOW_REVEAL_SECONDS} delay={0.3}>
              <p className="text-lg text-[#0b0d12]/55 leading-relaxed">
                {content.subtitle}
              </p>
            </Reveal>
          </div>

          {/* 3-Column Interaction Grid — each item is its own bordered card so the three
              are unmistakably separate units, not just text sitting in a row. Each card's
              accent is pulled straight from our own logo's red/blue duotone. */}
          <RevealGroup
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
            amount={SLOW_REVEAL_AMOUNT}
            stagger={SLOW_REVEAL_STAGGER_SECONDS}
          >
            {content.actions.map((action, idx) => {
              const isRed = idx === 1;
              const accent = isRed ? "#E31B23" : "#2563EB";

              return (
                <RevealItem key={idx} className="h-full group" duration={SLOW_REVEAL_SECONDS}>
                  <Link
                    href={CONTACT_HREF}
                    className="flex h-full flex-col justify-between rounded-lg border border-l-4 border-[#0b0d12]/10 p-6 text-[#0b0d12] transition-transform duration-500 hover:-translate-y-1.5 sm:p-8"
                    style={{
                      backgroundColor: `${accent}0D`,
                      borderLeftColor: accent,
                      boxShadow: `0 16px 32px -28px ${accent}40`,
                    }}
                  >
                    <CardContent action={action} accent={accent} />
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>

        </Reveal>
      </div>
    </section>
  );
}
