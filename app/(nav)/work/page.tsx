"use client";

import { useEffect, useState } from "react";
import { Search, PenTool, Code, RefreshCw } from "lucide-react";
import { getBannerByImgName } from "@/lib/banners";


import GlobalCTA from "@/components/global-cta";
import SearchOverlay from "@/components/search-overlay";
import ContactModals from "@/components/contact-modals";
import { useLanguage } from "@/components/LanguageProvider";
import ProductShowcase from "@/components/work/products/product-showcase";
import ProjectsGrid from "@/components/projects-grid";
import WorkHero from "@/components/work/hero/work-hero";
import FeaturedCaseStudies from "@/components/work/case-studies/featured-case-studies";
import ProcessSteps, { ProcessStep } from "@/components/work/process/process-steps";
import { useContactModals } from "@/lib/hooks/use-contact-modals";

const DEFAULT_BANNER = "/services.jpg";

export default function WorkPage() {
  const { language } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);
  const {
    officesOpen, openOffices, closeOffices,
    bookingOpen, openBooking, closeBooking,
    quoteOpen, openQuote, closeQuote,
  } = useContactModals();

  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  const t = {
    crumbSelf: language === "en" ? "Our work" : "हाम्रो काम",
    heroTitle: language === "en" ? "Our work" : "हाम्रो काम",
    heroLead:
      language === "en"
        ? "A few projects and products we’re proud of—fast, accessible and built to last."
        : "छिटो, पहुँचयोग्य र दीर्घकालीन समाधानहरू—हाम्रा केही प्रोजेक्ट र प्रोडक्टहरू।",
    productsTitle: language === "en" ? "Products" : "उत्पादनहरू",
    projectsTitle: language === "en" ? "Projects" : "प्रोजेक्टहरू",
    featuredTitle:
      language === "en" ? "Featured case studies" : "मुख्य केस स्टडीहरू",
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

  const featured = [
    {
      eyebrow: language === "en" ? "Municipality" : "नगरपालिका",
      title:
        language === "en"
          ? "E-Palika roll-out across 12 wards"
          : "१२ वडामा ई-पालिका विस्तार",
      problem:
        language === "en"
          ? "Fragmented counters, manual files, citizens waiting hours for simple services."
          : "छरिएको काउन्टर, म्यानुअल फाइल, नागरिकहरू साधारण सेवाका लागि घण्टौं कुर्दै।",
      approach:
        language === "en"
          ? "Citizen portal (Next.js + Carbon), role-based e-Office, payments, SMS/email alerts, dashboards."
          : "नागरिक पोर्टल (Next.js + Carbon), भूमिका-आधारित ई-कार्यालय, भुक्तानी, SMS/इमेल सूचना, ड्यासबोर्ड।",
      result:
        language === "en"
          ? [
              "-68% average queue time",
              "95% services online",
              "Full auditability",
            ]
          : ["-६८% औसत पंक्ति समय", "९५% सेवा अनलाइन", "पूर्ण अडिट क्षमता"],
    },
    {
      eyebrow: language === "en" ? "Education" : "शिक्षा",
      title:
        language === "en"
          ? "Admissions funnel for Greenfield School"
          : "ग्रीनफिल्ड विद्यालयका लागि भर्ना प्रक्रिया",
      problem:
        language === "en"
          ? "Admissions handled on paper; poor visibility on inquiries and conversions."
          : "कागजमा भर्ना प्रक्रिया; जिज्ञासा र रूपान्तरणमा कम दृश्यता।",
      approach:
        language === "en"
          ? "Accessible site, program pages, online applications, fee gateway, CRM export."
          : "पहुँचयोग्य साइट, कार्यक्रम पृष्ठ, अनलाइन आवेदन, शुल्क गेटवे, CRM निर्यात।",
      result:
        language === "en"
          ? ["+55% inquiries", "Application completion +31%", "LCP < 1.2s"]
          : ["+५५% जिज्ञासा", "आवेदन पूरा +३१%", "LCP < १.२s"],
    },
  ];

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

        <ProductShowcase
          language={language === "en" ? "en" : "ne"}
          title={t.productsTitle}
        />

        <section className="py-20 sm:py-28" style={{ backgroundColor: "var(--page-bg)" }}>
          <div className="mx-auto max-w-[1450px] px-6 sm:px-10">
            <ProjectsGrid language={language === "en" ? "en" : "ne"} title={t.projectsTitle} />
          </div>
        </section>

        <FeaturedCaseStudies
          title={t.featuredTitle}
          problemLabel={language === "en" ? "Problem" : "समस्या"}
          approachLabel={language === "en" ? "Approach" : "दृष्टिकोण"}
          studies={featured}
        />

        <ProcessSteps title={t.processTitle} steps={processSteps} />

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
