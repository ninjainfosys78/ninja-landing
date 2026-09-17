"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GlobalCTA from "@/components/global-cta";
import ContactModals from "@/components/contact-modals";
import { useContactModals } from "@/lib/hooks/use-contact-modals";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/LanguageProvider";

const OfficesModal = dynamic(() => import("@/components/offices-modal"), {
  ssr: false,
});

export default function SolutionDetailClient({ solution, bannerUrl }: { solution: any, bannerUrl: string | null }) {
  const { 
    officesOpen, openOffices, closeOffices,
    bookingOpen, openBooking, closeBooking,
    quoteOpen, openQuote, closeQuote 
  } = useContactModals();
  const { language } = useLanguage();

  const title = language === "ne" && solution.title_ne ? solution.title_ne : solution.title_en;
  const description = language === "ne" && solution.description_ne ? solution.description_ne : solution.description_en;

  const t = language === "en"
    ? {
        backToSolutions: "Back to Solutions",
        deepDive: "Deep Dive",
        engineeringFor: "Engineering for",
        scale: "Scale",
        approachText: `Our approach to ${solution.title_en} focuses on creating resilient, high-performance architectures that grow with your needs. We emphasize security, data integrity, and a seamless user experience across all digital touchpoints.`,
        securityFirst: "Security First",
        securityDesc: "End-to-end encryption and robust authentication protocols integrated into the core.",
        cloudNative: "Cloud Native",
        cloudDesc: "Built to scale automatically with modern cloud infrastructures and microservices.",
      }
    : {
        backToSolutions: "समाधानहरूमा फर्कने",
        deepDive: "गहन अन्वेषण",
        engineeringFor: "इन्जिनियरिङ",
        scale: "स्केलका लागि",
        approachText: `${title} प्रति हाम्रो दृष्टिकोण लचिलो, उच्च-प्रदर्शन आर्किटेक्चर सिर्जना गर्नमा केन्द्रित छ जुन तपाईंको आवश्यकतासँगै बढ्छ। हामी सुरक्षा, डेटा अखण्डता र सबै डिजिटल टचपोइन्टहरूमा निर्बाध प्रयोगकर्ता अनुभवलाई जोड दिन्छौं।`,
        securityFirst: "सुरक्षा पहिले",
        securityDesc: "कोरमा एकीकृत एन्ड-टु-एन्ड इन्क्रिप्सन र बलियो प्रमाणीकरण प्रोटोकलहरू।",
        cloudNative: "क्लाउड नेटिभ",
        cloudDesc: "आधुनिक क्लाउड पूर्वाधार र माइक्रोसेवाहरूसँग स्वचालित रूपमा स्केल गर्न निर्मित।",
      };

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grayscale opacity-40">
           <Image
             src={bannerUrl || "/digital-infrastructure-network-city.jpg"}
             alt="Banner"
             fill
             className="object-cover"
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d12]/60 to-[#0b0d12]" />

        <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16 mt-12">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#2563EB] transition-colors mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">{t.backToSolutions}</span>
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-5xl sm:text-6xl font-heading font-bold text-white leading-tight tracking-tighter mb-8">
              {title}
            </h1>
            <p className="text-xl lg:text-3xl text-white/70 font-light leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 border-t border-foreground/10" style={{ backgroundColor: "#EFEDE7" }}>
        <div className="mx-auto max-w-[1600px] px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12">
               <div className="space-y-6">
                 <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-[#2563EB]">{t.deepDive}</h2>
                 <h3 className="text-3xl lg:text-5xl font-heading font-bold">
                   {t.engineeringFor} <span className="text-[#2563EB]">{t.scale}</span>
                 </h3>
               </div>
               
               <p className="text-lg text-foreground/60 leading-relaxed max-w-xl">
                 {t.approachText}
               </p>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                  <div className="p-8 border border-foreground/10 bg-foreground/5 hover:border-[#2563EB]/30 transition-colors">
                     <h4 className="text-lg font-bold mb-4">{t.securityFirst}</h4>
                     <p className="text-sm text-foreground/50">{t.securityDesc}</p>
                  </div>
                  <div className="p-8 border border-foreground/10 bg-foreground/5 hover:border-[#2563EB]/30 transition-colors">
                     <h4 className="text-lg font-bold mb-4">{t.cloudNative}</h4>
                     <p className="text-sm text-foreground/50">{t.cloudDesc}</p>
                  </div>
               </div>
            </div>

            <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden rounded-none border border-foreground/10">
               {solution.imageUrl && (
                 <Image 
                   src={solution.imageUrl} 
                   alt={title} 
                   fill 
                   className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                 />
               )}
            </div>
          </div>
        </div>
      </section>

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
    </main>
  );
}
