"use client";

import { useEffect, useState } from "react";
import { getBannerByImgName } from "@/lib/banners";

import SearchOverlay from "@/components/search-overlay";
import ContactModals from "@/components/contact-modals";
import { useLanguage } from "@/components/LanguageProvider";
import { useContactModals } from "@/lib/hooks/use-contact-modals";
import WorkHero from "@/components/work/hero/work-hero";
import ServicesList from "@/components/services/services-list";
import { getServices } from "@/components/services/service-items";
import { getServiceProcessSteps } from "@/components/services/service-process-steps";
import ProcessSteps from "@/components/work/process/process-steps";

const DEFAULT_BANNER = "/services.jpg";

export default function ServicesPage() {
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "ne";
  const [searchOpen, setSearchOpen] = useState(false);
  const {
    officesOpen, closeOffices,
    bookingOpen, closeBooking,
    quoteOpen, closeQuote,
  } = useContactModals();

  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  const t = {
    crumbSelf: lang === "en" ? "Services" : "सेवाहरू",
    heroTitle: lang === "en" ? "Our services" : "हाम्रा सेवाहरू",
    heroLead:
      lang === "en"
        ? "From websites to government systems — the services we build for organizations and municipalities."
        : "वेबसाइटदेखि सरकारी प्रणालीसम्म — हामीले संस्था र नगरपालिकाहरूका लागि निर्माण गर्ने सेवाहरू।",
    processTitle: lang === "en" ? "How we work" : "हामी कसरी काम गर्छौं",
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

        <ServicesList services={services} />

        <ProcessSteps title={t.processTitle} steps={getServiceProcessSteps(lang)} />

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
