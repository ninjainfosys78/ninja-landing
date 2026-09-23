"use client";

import React from "react";
import { ArrowRight, Mail, MapPin, Calendar } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem, StaggerWords, AmbientGlow } from "@/components/ui/reveal";

const CONTACT_HREF = "/contact";

interface GlobalCTAProps {
  onOfficesOpen: () => void;
  onBookingOpen: () => void;
  onQuoteOpen: () => void;
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
      className="relative overflow-hidden pt-24 pb-36 sm:pb-44 border-t border-[#0b0d12]/8"
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <AmbientGlow />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Header Area */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="h-px w-14 mx-auto mb-6 bg-gradient-to-r from-[#E31B23] to-[#2563EB]" />
          <h2 className="text-[36px] sm:text-[48px] font-heading font-bold text-[#0b0d12] leading-[1.15] mb-5">
            <StaggerWords text={content.title} />
          </h2>
          <Reveal>
            <p className="text-lg text-[#0b0d12]/55 leading-relaxed">
              {content.subtitle}
            </p>
          </Reveal>
        </div>

        {/* 3-Column Interaction Grid */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.actions.map((action, idx) => {
            const Icon = action.icon;
            const isRed = idx === 1;

            return (
              <RevealItem key={idx} className="h-full group">
                <Link
                  href={CONTACT_HREF}
                  className="card-premium flex flex-col justify-between h-full p-8 sm:p-10 text-[#0b0d12] hover:-translate-y-1.5"
                >
                  <div>
                    <span className={`icon-tile ${isRed ? "icon-tile-red" : ""} mb-7 h-14 w-14 transition-transform duration-500 group-hover:scale-105`}>
                      <Icon size={24} />
                    </span>
                    <h3 className="text-xl font-heading font-bold mb-3">{action.title}</h3>
                    <p className="text-[15px] leading-relaxed text-[#0b0d12]/55">
                      {action.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#0b0d12]/8 flex items-center justify-between">
                    <span className="text-sm font-bold uppercase tracking-wider text-[#E31B23]">
                      {action.cta}
                    </span>
                    <ArrowRight
                      size={18}
                      className="text-[#0b0d12]/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#E31B23]"
                    />
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

      </div>
    </section>
  );
}
