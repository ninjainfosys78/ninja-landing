"use client";

import { useEffect, useState } from "react";
import { getBannerByImgName } from "@/lib/banners";

import GlobalCTA from "@/components/global-cta";
import SearchOverlay from "@/components/search-overlay";
import ContactModals from "@/components/contact-modals";
import { useLanguage } from "@/components/LanguageProvider";
import { useContactModals } from "@/lib/hooks/use-contact-modals";
import WorkHero from "@/components/work/hero/work-hero";
import ServicesList from "@/components/services/services-list";
import { getServices } from "@/components/services/service-items";

const DEFAULT_BANNER = "/services.jpg";

export default function ServicesPage() {
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "ne";
  const [searchOpen, setSearchOpen] = useState(false);
  const {
    officesOpen, openOffices, closeOffices,
    bookingOpen, openBooking, closeBooking,
    quoteOpen, openQuote, closeQuote,
  } = useContactModals();

  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  const t = {
    crumbSelf: lang === "en" ? "Services" : "सेवाहरू",
    heroTitle: lang === "en" ? "Our services" : "हाम्रा सेवाहरू",
    heroLead:
      lang === "en"
        ? "From websites to government systems — the services we build for organizations and municipalities."
        : "वेबसाइटदेखि सरकारी प्रणालीसम्म — हामीले संस्था र नगरपालिकाहरूका लागि निर्माण गर्ने सेवाहरू।",
    listTitle: lang === "en" ? "What we do" : "हामी के गर्छौं",
    listDescription:
      lang === "en"
        ? "We don't just build software — we craft experiences. Every engagement pairs thoughtful design with reliable engineering."
        : "हामी सफ्टवेयर मात्र बनाउँदैनौं — अनुभव सिर्जना गर्छौं। हरेक कामले सोचविचारपूर्ण डिजाइनलाई भरपर्दो इन्जिनियरिङसँग जोड्छ।",
  };

  useEffect(() => {
    let mounted = true;
    getBannerByImgName("services")
      .then((url) => {
        if (mounted) setBannerUrl(url || DEFAULT_BANNER);
      })
      .catch((err) => {
        console.error("Failed to load services banner:", err);
        if (mounted) setBannerUrl(DEFAULT_BANNER);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        closeOffices();
        closeBooking();
        closeQuote();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const services = getServices(lang);

  return (
    <>
      <main className="relative text-[#0b0d12]/80" style={{ backgroundColor: "var(--page-bg)" }}>
        <WorkHero
          title={t.heroTitle}
          lead={t.heroLead}
          crumbSelf={t.crumbSelf}
          bannerUrl={bannerUrl || DEFAULT_BANNER}
        />

        <ServicesList
          title={t.listTitle}
          description={t.listDescription}
          services={services}
        />

        <GlobalCTA onOfficesOpen={openOffices} onBookingOpen={openBooking} onQuoteOpen={openQuote} />
      </main>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
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
