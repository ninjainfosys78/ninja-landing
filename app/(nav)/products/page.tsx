"use client";

import { useEffect, useState } from "react";
import { Search, PenTool, Code, RefreshCw } from "lucide-react";
import { getBannerByImgName } from "@/lib/banners";

import SearchOverlay from "@/components/search-overlay";
import ContactModals from "@/components/contact-modals";
import { useLanguage } from "@/components/LanguageProvider";
import ProductShowcase from "@/components/work/products/product-showcase";
import ProjectsGrid from "@/components/projects-grid";
import WorkHero from "@/components/work/hero/work-hero";
import ProcessSteps, { ProcessStep } from "@/components/work/process/process-steps";
import { useContactModals } from "@/lib/hooks/use-contact-modals";

const DEFAULT_BANNER = "/services.jpg";

export default function WorkPage() {
  const { language } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);
  const {
    officesOpen, closeOffices,
    bookingOpen, closeBooking,
    quoteOpen, closeQuote,
  } = useContactModals();

  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  const t = {
    crumbSelf: language === "en" ? "Products" : "उत्पादनहरू",
    heroTitle: language === "en" ? "Products" : "उत्पादनहरू",
    heroLead:
      language === "en"
        ? "Products we've built and shipped — fast, accessible and built to last."
        : "छिटो, पहुँचयोग्य र दीर्घकालीन समाधानहरू—हाम्रा केही प्रोजेक्ट र प्रोडक्टहरू।",
    projectsTitle: language === "en" ? "Projects" : "प्रोजेक्टहरू",
    processTitle: language === "en" ? "How we work" : "हामी कसरी काम गर्छौं",
    discover: language === "en" ? "Discover" : "पत्ता लगाउनुहोस्",
    discoverDesc:
      language === "en"
        ? "Goals, users, constraints. We pick a thin slice tied to outcomes."
        : "लक्ष्य, प्रयोगकर्ता, सीमाहरू। हामी परिणामसँग सम्बन्धित भाग छान्छौं।",
    design: language === "en" ? "Design" : "डिजाइन",
    designDesc:
      language === "en"
        ? "IA, flows, accessible UI using our Carbon-based system."
        : "IA, फ्लोहरू, हाम्रो कार्बन-आधारित प्रणाली प्रयोग गरी पहुँचयोग्य UI।",
    build: language === "en" ? "Build" : "निर्माण",
    buildDesc:
      language === "en"
        ? "Small releases, reviews, CI/CD, telemetry, performance budgets."
        : "सानो रिलीज, समीक्षा, CI/CD, टेलीमेट्री, प्रदर्शन बजेट।",
    evolve: language === "en" ? "Evolve" : "विकास गर्नुहोस्",
    evolveDesc:
      language === "en"
        ? "A/B tests, analytics, and roadmaps—no drama launches."
        : "A/B परीक्षण, विश्लेषण, रोडम्याप—साधारण लन्च।",
  };

useEffect(() => {
    let mounted = true;
    getBannerByImgName("work")
      .then((url) => {
        if (mounted) setBannerUrl(url || DEFAULT_BANNER);
      })
      .catch((err) => {
        console.error("Failed to load work banner:", err);
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
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const processSteps: ProcessStep[] = [
    { title: t.discover, description: t.discoverDesc, Icon: Search },
    { title: t.design, description: t.designDesc, Icon: PenTool },
    { title: t.build, description: t.buildDesc, Icon: Code },
    { title: t.evolve, description: t.evolveDesc, Icon: RefreshCw },
  ];

  return (
    <>
      <main className="relative text-[#0b0d12]/80" style={{ backgroundColor: "var(--page-bg)" }}>
        <WorkHero
          title={t.heroTitle}
          lead={t.heroLead}
          crumbSelf={t.crumbSelf}
          bannerUrl={bannerUrl || DEFAULT_BANNER}
        />

        <ProductShowcase language={language === "en" ? "en" : "ne"} />

        <ProjectsGrid language={language === "en" ? "en" : "ne"} title={t.projectsTitle} />

        <ProcessSteps title={t.processTitle} steps={processSteps} />

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
