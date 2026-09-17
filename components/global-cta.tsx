"use client";

import React from "react";
import { ArrowRight, Mail, MapPin, Calendar } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem, StaggerWords } from "@/components/ui/reveal";

interface GlobalCTAProps {
  onOfficesOpen: () => void;
  onBookingOpen: () => void;
  onQuoteOpen: () => void;
}

export default function GlobalCTA({ onOfficesOpen, onBookingOpen, onQuoteOpen }: GlobalCTAProps) {
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
              href: "#",
              primary: true,
              isAction: true,
              actionType: "booking"
            },
            {
              icon: Mail,
              title: "Request a Quote",
              desc: "Get a detailed technical and financial estimate.",
              cta: "Get started",
              href: "#",
              primary: false,
              isAction: true,
              actionType: "quote"
            },
            {
              icon: MapPin,
              title: "Talk to Our Team",
              desc: "Visit our global offices or speak to a regional lead.",
              cta: "Find a location",
              href: "/locations",
              primary: false,
              isAction: false
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
              href: "#",
              primary: true,
              isAction: true,
              actionType: "booking"
            },
            {
              icon: Mail,
              title: "उद्धरण अनुरोध गर्नुहोस्",
              desc: "विस्तृत प्राविधिक र आर्थिक अनुमान प्राप्त गर्नुहोस्।",
              cta: "सुरु गर्नुहोस्",
              href: "#",
              primary: false,
              isAction: true,
              actionType: "quote"
            },
            {
              icon: MapPin,
              title: "हाम्रो टोलीसँग कुरा गर्नुहोस्",
              desc: "हाम्रा विश्वव्यापी कार्यालयहरूमा जानुहोस् वा क्षेत्रीय प्रमुखसँग कुरा गर्नुहोस्।",
              cta: "स्थान खोज्नुहोस्",
              href: "/locations",
              primary: false,
              isAction: false
            }
          ]
        };

  return (
    <section
      id="contact"
      className="relative overflow-hidden pt-24 pb-36 sm:pb-44 border-t border-[#0b0d12]/8"
      style={{ backgroundColor: '#F7F6F2' }}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Header Area */}
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <h2 className="text-[42px] sm:text-[56px] font-heading font-bold text-[#0b0d12] leading-[1.1] mb-6">
            <StaggerWords text={content.title} />
          </h2>
          <Reveal>
            <p className="text-xl text-[#0b0d12]/60 leading-relaxed">
              {content.subtitle}
            </p>
          </Reveal>
        </div>

        {/* 3-Column Interaction Grid */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.actions.map((action, idx) => {
            const Icon = action.icon;
            const Wrapper = action.isAction ? 'button' : Link;

            return (
              <RevealItem key={idx} className="h-full">
                <div
                  className={`p-10 flex flex-col justify-between transition-all duration-300 border h-full hover:-translate-y-1.5 ${
                    action.primary
                      ? 'bg-[#E31B23] border-[#E31B23] text-white shadow-xl shadow-[#E31B23]/20'
                      : 'bg-white border-[#0b0d12]/8 text-[#0b0d12] shadow-[0_10px_30px_-18px_rgba(11,13,18,0.25)] hover:border-[#173C80]/40 hover:shadow-[0_20px_40px_-18px_rgba(23,60,128,0.25)]'
                  }`}
                >
                  <div>
                    <div className={`mb-6 p-3 inline-block transition-transform duration-500 group-hover:scale-110 ${action.primary ? 'bg-white/20' : 'bg-[#0b0d12]/[0.04]'}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-4">{action.title}</h3>
                    <p className={`mb-10 text-[15px] leading-relaxed ${action.primary ? 'text-white/80' : 'text-[#0b0d12]/60'}`}>
                      {action.desc}
                    </p>
                  </div>

                  {action.isAction ? (
                    <button
                      onClick={() => {
                        if ((action as any).actionType === "booking") onBookingOpen();
                        if ((action as any).actionType === "quote") onQuoteOpen();
                        if (action.title.includes("Team") || action.title.includes("टोली")) onOfficesOpen();
                      }}
                      className={`inline-flex items-center gap-3 font-bold group cursor-pointer ${action.primary ? 'text-white' : 'text-[#173C80]'}`}
                    >
                      <span className="underline underline-offset-8 decoration-2">{action.cta}</span>
                      <ArrowRight className="mt-1 transition-transform group-hover:translate-x-2" size={18} />
                    </button>
                  ) : (
                    <Link
                      href={action.href}
                      className={`inline-flex items-center gap-3 font-bold group ${action.primary ? 'text-white' : 'text-[#173C80]'}`}
                    >
                      <span className="underline underline-offset-8 decoration-2">{action.cta}</span>
                      <ArrowRight className="mt-1 transition-transform group-hover:translate-x-2" size={18} />
                    </Link>
                  )}
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

      </div>
    </section>
  );
}
