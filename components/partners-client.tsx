"use client"

import React from "react";
import Image from "next/image";
import ContactModals from "@/components/contact-modals";
import { useContactModals } from "@/lib/hooks/use-contact-modals";
import { useLanguage } from "@/components/LanguageProvider";
import type { Partner } from "@/lib/partners";
import PageBanner from "@/components/ui/page-banner";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const SLOW_REVEAL_SECONDS = 1.1;
const SLOW_REVEAL_STAGGER_SECONDS = 0.2;
const SLOW_REVEAL_AMOUNT = 0.3;

interface PartnersClientProps {
  partners: Partner[];
}

function PartnerCard({ name, description, logoUrl }: { name: string; description: string; logoUrl: string }) {
  return (
    <div className="group relative bg-white border border-[#0b0d12]/10 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-16px_rgba(10,31,77,0.22)] flex flex-col h-full">
      <div className="h-24 flex items-center justify-center mb-4 bg-[#0b0d12]/[0.02] overflow-hidden group-hover:bg-[#0b0d12]/[0.05] transition-all duration-500 p-2.5">
        <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-110">
          <Image src={logoUrl} alt={name} fill className="object-contain" />
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="text-base font-heading font-bold text-[#0b0d12] mb-2">{name}</h3>
        <p className="text-[#0b0d12]/60 leading-relaxed text-sm font-sans">{description}</p>
      </div>
      <div className="mt-3 h-1 w-10 bg-[#2563EB]/20 group-hover:w-full transition-all duration-500" />
    </div>
  );
}

export default function PartnersClient({ partners }: PartnersClientProps) {
  const { language } = useLanguage();
  const {
    officesOpen, closeOffices,
    bookingOpen, closeBooking,
    quoteOpen, closeQuote
  } = useContactModals();

  const content = language === "en"
    ? {
        title: "Our Global Network",
        subtitle: "We collaborate with industry leaders and innovators to build resilient infrastructure and impactful digital systems.",
      }
    : {
        title: "हाम्रो विश्वव्यापी सञ्जाल",
        subtitle: "हामी लचिलो पूर्वाधार र प्रभावकारी डिजिटल प्रणालीहरू निर्माण गर्न उद्योग प्रमुखहरू र आविष्कारकहरूसँग सहकार्य गर्छौं।",
      };

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
                <Reveal className="flex items-center gap-4 mb-16" y={16} duration={SLOW_REVEAL_SECONDS} amount={SLOW_REVEAL_AMOUNT}>
                  <div className="h-px bg-[#2563EB] w-12" />
                  <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">
                    {category}
                  </h2>
                </Reveal>

                <RevealGroup
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                  amount={SLOW_REVEAL_AMOUNT}
                  stagger={SLOW_REVEAL_STAGGER_SECONDS}
                >
                  {items.map((p) => (
                    <RevealItem key={p.id} duration={SLOW_REVEAL_SECONDS}>
                      <PartnerCard
                        name={isNe ? p.name_ne : p.name_en}
                        description={isNe ? p.description_ne : p.description_en}
                        logoUrl={p.logoUrl}
                      />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </section>
            ))}
          </div>

        </div>
      </main>
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
