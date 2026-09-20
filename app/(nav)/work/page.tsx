"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, PenTool, Code, RefreshCw } from "lucide-react";
import { getBannerByImgName } from "@/lib/banners";


import GlobalCTA from "@/components/global-cta";
import SearchOverlay from "@/components/search-overlay";
import ContactModals from "@/components/contact-modals";
import { useLanguage } from "@/components/LanguageProvider";
import ProjectsGrid from "@/components/projects-grid";
import { useContactModals } from "@/lib/hooks/use-contact-modals";

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
    crumbSelf: language === "en" ? "OUR WORK " : "हाम्रो काम",
    heroTitle: language === "en" ? "Our work" : "हाम्रो काम",
    heroLead:
      language === "en"
        ? "A few projects and products we’re proud of—fast, accessible and built to last."
        : "छिटो, पहुँचयोग्य र दीर्घकालीन समाधानहरू—हाम्रा केही प्रोजेक्ट र प्रोडक्टहरू।",
    galleryTitle: language === "en" ? "Projects" : "प्रोजेक्टहरू",
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
        if (mounted) setBannerUrl(url || "/services.jpg"); 
      })
      .catch((err) => {
        console.error("Failed to load work banner:", err);
        if (mounted) setBannerUrl("/services.jpg"); 
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

  return (
    <>
      <main className="relative text-[#0b0d12]/80" style={{ backgroundColor: "var(--page-bg)" }}>
        <section className="relative z-10">
          <div className="relative min-h-[50vh] pt-28 lg:pt-32">
             <div
              className="absolute inset-0 bg-cover bg-center bg-fixed filter grayscale opacity-60"
              style={{
                backgroundImage: `url('${bannerUrl || "/services.jpg"}')`,
              }}
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="pointer-events-none absolute inset-0" />
            <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
              <div className="max-w-[1200px] text-left">
                <h1 className="mt-0 text-5xl font-heading font-semibold text-white sm:text-6xl text-left">
                  {t.heroTitle}
                </h1>
              </div>
              <nav
                aria-label="Breadcrumb"
                className="mt-4 text-sm text-white/80"
              >
                <ol className="flex items-center gap-3">
                  <li>
                    <Link
                      href="/"
                      className="font-medium tracking-wide hover:text-white"
                    >
                      NINJA INFOSYS
                    </Link>
                  </li>
                  <li aria-hidden className="inline-flex items-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-white/70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </li>
                  <li className="font-medium tracking-wide">{t.crumbSelf}</li>
                </ol>
              </nav>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1450px] w-full px-6 sm:px-10">
            <ProjectsGrid
              language={language === "en" ? "en" : "ne"}
              title={t.galleryTitle}
              variant="work"
            />
          </div>
        </section>

        <section className="border-t border-[#0b0d12]/10 py-12 sm:py-16" style={{ backgroundColor: "var(--page-bg)" }}>
          <div className="mx-auto max-w-[1450px] w-full px-6 sm:px-10">
            <h2 className="font-semibold text-[#0b0d12] text-[32px]">
              {t.featuredTitle}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {featured.map((cs) => (
                <article
                  key={cs.title}
                  className="group border border-[#0b0d12]/10 bg-white p-6 text-[#0b0d12] rounded-none transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#f0f0f2] hover:text-[#0b0d12]"
                >
                  <div className="text-[12px] font-semibold tracking-wider">
                    {cs.eyebrow}
                  </div>
                  <h3 className="mt-1 text-xl pt-1 font-semibold text-[#0b0d12] transition-colors group-hover:text-[#0b0d12]">
                    {cs.title}
                  </h3>
                  <div className="mt-3 grid gap-3 text-[#0b0d12]/85">
                    <p>
                      <span className="font-semibold text-[#0b0d12] transition-colors group-hover:text-[#0b0d12]">
                        {language === "en" ? "Problem:" : "समस्या:"}{" "}
                      </span>
                      <span className="ml-1 text-[#0b0d12]/85 transition-colors group-hover:text-[#0b0d12]">
                        {cs.problem}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold text-[#0b0d12] transition-colors group-hover:text-[#0b0d12]">
                        {language === "en" ? "Approach:" : "दृष्टिकोण:"}{" "}
                      </span>
                      <span className="ml-1 text-[#0b0d12]/85 transition-colors group-hover:text-[#0b0d12]">
                        {cs.approach}
                      </span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border border-[#0b0d12]/10 py-12 sm:py-16" style={{ backgroundColor: "var(--page-bg-alt)" }}>
          <div className="mx-auto max-w-[1450px] w-full px-6 sm:px-10">
            <h3 className="font-semibold text-[#0b0d12] text-[32px]">
              {t.processTitle}
            </h3>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  t: t.discover,
                  d: t.discoverDesc,
                  Icon: Search,
                },
                {
                  t: t.design,
                  d: t.designDesc,
                  Icon: PenTool,
                },
                {
                  t: t.build,
                  d: t.buildDesc,
                  Icon: Code,
                },
                {
                  t: t.evolve,
                  d: t.evolveDesc,
                  Icon: RefreshCw,
                },
              ].map((s) => (
                <li
                  key={s.t}
                  className="group border border-[#0b0d12]/15 bg-transparent p-5 transition-transform hover:-translate-y-0.5 hover:bg-gray-500/5 hover:border-[#0b0d12]/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 flex items-center justify-center bg-[#0b0d12]/5 text-[#0b0d12]">
                      {s.Icon ? (
                        <s.Icon size={16} className="text-current" />
                      ) : null}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{s.t}</div>
                      <p className="mt-1 text-[#0b0d12]/85">{s.d}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

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
