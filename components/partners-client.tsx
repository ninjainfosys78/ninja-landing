"use client"

import React from "react";
import Image from "next/image";
import GlobalCTA from "@/components/global-cta";
import ContactModals from "@/components/contact-modals";
import { useContactModals } from "@/lib/hooks/use-contact-modals";
import { useLanguage } from "@/components/LanguageProvider";
import type { Partner } from "@/lib/partners";
import PageBanner from "@/components/ui/page-banner";

interface PartnersClientProps {
  partners: Partner[];
}

export default function PartnersClient({ partners }: PartnersClientProps) {
  const { language } = useLanguage();
  const {
    officesOpen, openOffices, closeOffices,
    bookingOpen, openBooking, closeBooking,
    quoteOpen, openQuote, closeQuote
  } = useContactModals();

  const content = language === "en"
    ? {
        title: "Our Global Network",
        subtitle: "We collaborate with industry leaders and innovators to build resilient infrastructure and impactful digital systems.",
        cta: "Become a Partner",
      }
    : {
        title: "हाम्रो विश्वव्यापी सञ्जाल",
        subtitle: "हामी लचिलो पूर्वाधार र प्रभावकारी डिजिटल प्रणालीहरू निर्माण गर्न उद्योग प्रमुखहरू र आविष्कारकहरूसँग सहकार्य गर्छौं।",
        cta: "साझेदार बन्नुहोस्",
      };

  // Group partners by category
  const isNe = language === "ne";
  const grouped = partners.reduce<Record<string, Partner[]>>((acc, p) => {
    const cat = isNe ? p.category_ne : p.category_en;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  const categoryGroups = Object.entries(grouped);

  return (
    <>
      <PageBanner
        bannerName="partners"
        fallbackImage="/diverse-professionals-collaboration.jpg"
        homeLabel={isNe ? "निन्जा इन्फोसिस" : "Ninja Infosys"}
        title={content.title}
        subtitle={content.subtitle}
      />
      <main className="pb-24 pt-20" style={{ backgroundColor: "var(--page-bg)" }}>
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">

          {/* Partners Grid — grouped by category */}
          <div className="space-y-32">
            {categoryGroups.map(([category, items], idx) => (
              <section key={idx}>
                <div className="flex items-center gap-4 mb-16">
                  <div className="h-px bg-[#2563EB] w-12" />
                  <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">
                    {category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {items.map((p) => {
                    const displayName = isNe ? p.name_ne : p.name_en;
                    const displayDesc = isNe ? p.description_ne : p.description_en;

                    return (
                      <div
                        key={p.id}
                        className="group relative bg-white border border-[#0b0d12]/10 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-16px_rgba(10,31,77,0.22)] flex flex-col h-full"
                      >
                        <div className="h-24 flex items-center justify-center mb-4 bg-[#0b0d12]/[0.02] rounded-none overflow-hidden group-hover:bg-[#0b0d12]/[0.05] transition-all duration-500 p-2.5">
                          <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-110">
                            <Image
                              src={p.logoUrl}
                              alt={displayName}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-base font-heading font-bold text-[#0b0d12] mb-2">
                            {displayName}
                          </h3>
                          <p className="text-[#0b0d12]/60 leading-relaxed text-sm font-sans">
                            {displayDesc}
                          </p>
                        </div>
                        <div className="mt-3 h-1 w-10 bg-[#2563EB]/20 group-hover:w-full transition-all duration-500" />
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

        </div>
      </main>
      <GlobalCTA
        onOfficesOpen={openOffices}
        onBookingOpen={openBooking}
        onQuoteOpen={openQuote}
      />
      <ContactModals
        officesOpen={officesOpen}
        onOfficesClose={closeOffices}
        bookingOpen={bookingOpen}
        onBookingClose={closeBooking}
        quoteOpen={quoteOpen}
        onQuoteClose={closeQuote}
      />
    </>
  );
}
