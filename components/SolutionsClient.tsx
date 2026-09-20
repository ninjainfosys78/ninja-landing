"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

import GlobalCTA from "@/components/global-cta";
import ContactModals from "@/components/contact-modals";
import { useContactModals } from "@/lib/hooks/use-contact-modals";
import { useLanguage } from "@/components/LanguageProvider";
import { getSolutionsCards, type SolutionCard } from "@/lib/solutions";
import { getBannerByImgName } from "@/lib/banners";

type Lang = "en" | "ne";
type Key = "gov" | "edu" | "health" | "fin" | "corp";

const ProjectsGrid = dynamic(() => import("@/components/projects-grid"), {
  ssr: false,
});

const SearchOverlay = dynamic(() => import("@/components/search-overlay"), {
  ssr: false,
});

const OfficesModal = dynamic(() => import("@/components/offices-modal"), {
  ssr: false,
});

const SOLUTIONS_CONTENT = {
  gov: {
    en: {
      pageTitle: "GOVERNMENT & MUNICIPALITY",
      lead: "Digital public services that are safe, simple, and accountable. We design citizen portals and back-office workflows that reduce queues, cut errors, and make services auditable by default.",
      bulletsCol1: [
        "Citizen self-service (applications, payments, certificates)",
        "Case management and approvals with roles & audit trails",
        "eKYC/ID, digital signatures, and document vaults",
      ],
      bulletsCol2: [
        "Revenue modules: billing, tax, fees, and reconciliation",
        "Grievance redressal & RTI tracking",
        "Dashboards for programs, budgets, and SLAs",
      ],
    },
    ne: {
      pageTitle: "सरकार र नगरपालिका",
      lead: "सुरक्षित, सरल र जवाफदेही डिजिटल सार्वजनिक सेवाहरू। हामीले नागरिक पोर्टल र ब्याक-अफिस वर्कफ्लो डिजाइन गर्छौं जसले पंक्ति घटाउँछ, त्रुटि घटाउँछ, र सेवाहरूलाई अडिटयोग्य बनाउँछ।",
      bulletsCol1: [
        "नागरिक स्वयं-सेवा (आवेदन, भुक्तानी, प्रमाणपत्र)",
        "केस व्यवस्थापन र भूमिकाहरू सहित अनुमोदन र अडिट ट्रेल",
        "eKYC/ID, डिजिटल हस्ताक्षर र दस्तावेज भण्डारण",
      ],
      bulletsCol2: [
        "राजस्व मोड्युलहरू: बिलिङ, कर, शुल्क र मिलान",
        "न्यायालय परिमार्जन र RTI ट्र्याकिङ",
        "कार्यक्रम, बजेट र SLA का लागि ड्यासबोर्ड",
      ],
    },
  },
  edu: {
    en: {
      pageTitle: "EDUCATION",
      lead: "Modern digital campus from admissions to alumni. We build student, faculty, and parent portals with secure payments, attendance, LMS, exams, and analytics that help institutions run smoothly.",
      bulletsCol1: [
        "Admissions & enrollment with merit lists and fee payments",
        "Student, faculty, and parent portals (SIS integration)",
        "Attendance, timetable, and course management",
      ],
      bulletsCol2: [
        "LMS & virtual classroom, assignments & grading",
        "Exam scheduling, evaluation, and results publishing",
        "Accreditation & NAAC reporting dashboards",
      ],
    },
    ne: {
      pageTitle: "शिक्षा",
      lead: "भर्ना देखि एलुमनाइ सम्म आधुनिक डिजिटल क्याम्पस। हामी विद्यार्थी, शिक्षक र अभिभावक पोर्टलहरू बनाउँछौं जसमा सुरक्षित भुक्तानी, उपस्थिति, LMS, परीक्षाहरू र विश्लेषणहरू हुन्छन्।",
      bulletsCol1: [
        "भर्ना र नामांकन (मेरिट सूची र शुल्क भुक्तानी सहित)",
        "विद्यार्थी, शिक्षक र अभिभावक पोर्टल (SIS एकीकरण)",
        "उपस्थिति, समयतालिका, र पाठ्यक्रम व्यवस्थापन",
      ],
      bulletsCol2: [
        "LMS र भर्चुअल कक्षालय, कार्य र ग्रेडिङ",
        "परीक्षा तालिका, मूल्यांकन र नतिजा प्रकाशन",
        "मान्यता र रिपोर्टिङ ड्यासबोर्ड",
      ],
    },
  },
  health: {
    en: {
      pageTitle: "HEALTHCARE",
      lead: "Patient-centric systems for hospitals and public programs. We deliver EMR/EHR, OPD/IPD, pharmacy, lab integrations (HL7), claims, and telemedicine—privacy-first and reliable.",
      bulletsCol1: [
        "EMR/EHR with role-based access and audit logs",
        "OPD/IPD, appointments, queues, and bed management",
        "Pharmacy, inventory, and e-prescriptions",
      ],
      bulletsCol2: [
        "Lab integrations (HL7), radiology & reports",
        "Insurance/TPA claims and billing",
        "Telemedicine and remote care with consent",
      ],
    },
    ne: {
      pageTitle: "स्वास्थ्य",
      lead: "अस्पताल र सार्वजनिक कार्यक्रमहरूका लागि रोगी-केंद्रित प्रणालीहरू। हामी EMR/EHR, OPD/IPD, फार्मेसी, ल्याब इंटीग्रेशन (HL7), दावी र टेलिमेडिसिन प्रदान गर्छौं—गोपनीयता केन्द्रित र विश्वसनीय।",
      bulletsCol1: [
        "भूमिका-आधारित पहुँच र अडिट लग सहित EMR/EHR",
        "OPD/IPD, अपोइन्टमेन्ट, पंक्ति र बेड व्यवस्थापन",
        "फार्मेसी, भण्डारण र ई-प्रिस्क्रिप्सन",
      ],
      bulletsCol2: [
        "ल्याब इंटीग्रेशन (HL7), रेडियोलोजी र रिपोर्ट",
        "बिमा/TPA दावी र बिलिङ",
        "स्वीकृतिको साथ टेलिमेडिसिन र दूरस्थ हेरचाह",
      ],
    },
  },
  fin: {
    en: {
      pageTitle: "FINTECH",
      lead: "Payments, lending, and compliance platforms engineered for reliability and scale. We ship secure APIs, dashboards, and data pipelines with audits and observability built in.",
      bulletsCol1: [
        "Payments: collections, payouts, reconciliation and settlement",
        "KYC/eKYC, AML checks and risk rules",
        "Ledgering, statements and dispute workflows",
      ],
      bulletsCol2: [
        "Lending: onboarding, scoring, LOS/LMS integrations",
        "Dashboards for operations and compliance reporting",
        "Data warehouse, observability and alerting",
      ],
    },
    ne: {
      pageTitle: "फिनटेक",
      lead: "भुक्तानी, ऋण र अनुपालन प्लेटफर्महरू जो विश्वसनीय र स्केलेबल छन्। हामी सुरक्षित API, ड्यासबोर्ड र डेटा पाइपलाइनहरू डेलिभर गर्छौं।",
      bulletsCol1: [
        "भुक्तानी: सङ्कलन, भुक्तानी, मिलान र निकासा",
        "KYC/eKYC, AML जाँच र जोखिम नियमहरू",
        "लेजरिंग, विवरण र विवाद कार्यप्रवाह",
      ],
      bulletsCol2: [
        "ऋण: अनबोर्डिङ, स्कोरिङ, LOS/LMS एकीकरण",
        "अपरेशन र अनुपालन रिपोर्टिङका लागि ड्यासबोर्ड",
        "डेटा वेयरहाउस, अव्जर्भेबिलिटी र अलर्टिंग",
      ],
    },
  },
  corp: {
    en: {
      pageTitle: "CORPORATE SOLUTIONS",
      lead: "Internal platforms and customer portals that move the needle built with strong design systems, clean APIs, and a focus on security, cost, and reliability.",
      bulletsCol1: [
        "Customer portals and partner ecosystems",
        "Product websites, pricing, quotes and checkout",
        "APIs for CRM/ERP integrations and automation",
      ],
      bulletsCol2: [
        "Internal developer platforms (IDP) for faster delivery",
        "Analytics, experimentation and performance budgets",
        "SSO, RBAC, audit trails and compliance reporting",
      ],
    },
    ne: {
      pageTitle: "कर्पोरेट समाधान",
      lead: "आन्तरिक प्लेटफर्म र ग्राहक पोर्टलहरू जो बलियो डिजाइन सिस्टम, सफा API र सुरक्षा, लागत र विश्वसनीयतामा केन्द्रित छन्।",
      bulletsCol1: [
        "ग्राहक पोर्टल र साझेदार पारिस्थितिकी तन्त्र",
        "उत्पादन वेबसाइटहरू, मूल्य निर्धारण, कोट र चेकआउट",
        "CRM/ERP एकीकरणका लागि API र अटोमेसन",
      ],
      bulletsCol2: [
        "भित्रि डेभलपर प्लेटफर्म (IDP) द्रुत डेलिभरीका लागि",
        "एनालिटिक्स, परीक्षण र प्रदर्शन बजेट",
        "SSO, RBAC, अडिट ट्रेल र अनुपालन रिपोर्टिङ",
      ],
    },
  },
} as const;

const LEFT_NAV = [
  {
    label: { en: "Government & Municipality", ne: "सरकार/पालिका" },
    key: "gov" as Key,
  },
  { label: { en: "Education", ne: "शिक्षा" }, key: "edu" as Key },
  { label: { en: "Healthcare", ne: "स्वास्थ्य" }, key: "health" as Key },
  { label: { en: "FinTech", ne: "फिनटेक" }, key: "fin" as Key },
  {
    label: { en: "Corporate Solutions", ne: "कर्पोरेट समाधान" },
    key: "corp" as Key,
  },
];

export default function SolutionsClient() {
  const { language } = useLanguage();
  const {
    officesOpen, openOffices, closeOffices,
    bookingOpen, openBooking, closeBooking,
    quoteOpen, openQuote, closeQuote
  } = useContactModals();
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState<Key | null>(null);
  const [cards, setCards] = useState<SolutionCard[]>([]);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    Promise.all([getBannerByImgName("solutions"), getSolutionsCards()])
      .then(([bannerUrlRaw, cardsData]) => {
        setBannerUrl(bannerUrlRaw || null);
        setCards(cardsData);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const cat = (params.get("cat") || "").toLowerCase() as Key;
    const allowed: Key[] = ["gov", "edu", "health", "fin", "corp"];
    if (allowed.includes(cat)) setActive(cat);
    else setActive(null);
  }, [params]);

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

  const content = SOLUTIONS_CONTENT;
  const detail = active ? content[active][language as Lang] : null;
  const galleryTitle = language === "en" ? "Projects" : "प्रोजेक्टहरू";

  const activate = (key: Key) => {
    setActive(key);
    router.replace(`/solutions?cat=${key}`);
  };

  return (
    <>
      <main className="relative bg-background text-foreground">
        <section className="relative z-10">
          <div className="relative min-h-[50vh] pt-28 lg:pt-32">
            <div className="absolute inset-0 grayscale">
              <Image
                src={bannerUrl || "/digital-infrastructure-network-city.jpg"}
                alt="Banner"
                fill
                priority
                fetchPriority="high"
                quality={70}
                className="object-cover object-center"
              />
            </div>

            <div className="absolute inset-0 bg-[#0b0d12]/70" />
            <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
              <div className="max-w-[1200px] text-left">
                <nav
                  aria-label="Breadcrumb"
                  className="mt-0 text-sm text-white/80"
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
                    <li>
                      <Link
                        href="/solutions"
                        onClick={() => setActive(null)}
                        className="font-medium tracking-wide hover:text-white"
                      >
                        {language === "en" ? "SOLUTIONS" : "समाधान"}
                      </Link>
                    </li>
                    {active && (
                      <>
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
                        <li className="font-medium tracking-wide">
                          {detail?.pageTitle}
                        </li>
                      </>
                    )}
                  </ol>
                </nav>

                <h1 className="pt-4 text-5xl font-heading font-semibold text-white sm:text-6xl">
                  {active
                    ? detail?.pageTitle
                    : language === "en"
                    ? "Industry we serve"
                    : "हामीले सेवा दिने उद्योग"}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {!active && loading && (
          <section className="py-32 relative flex items-center justify-center" style={{ backgroundColor: "var(--page-bg)" }}>
            <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
          </section>
        )}

        {!active && !loading && cards.length > 0 && (
          <section className="py-14 relative" style={{ backgroundColor: "var(--page-bg-alt)" }}>
            <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
              <div className="grid gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                {cards.map((card) => (
                  <Link
                    href={`/solutions/${card.id}`}
                    key={card.id}
                    className="solutions-card text-left group relative block select-none w-full h-full rounded-none transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] hover:ring-1 hover:ring-foreground/20 border border-foreground/10 flex flex-col"
                  >
                    <div className="relative aspect-[16/10] w-full flex-none overflow-hidden">
                      {card.imageUrl && (
                        <Image
                          src={card.imageUrl}
                          alt={
                            language === "en"
                              ? card.title_en
                              : card.title_ne || card.title_en
                          }
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={70}
                          className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-[#0b0d12]/40 group-hover:bg-[#0b0d12]/10 transition-colors" />
                    </div>

                    <div className="p-6 sm:p-7 bg-background transition-colors duration-500 group-hover:bg-card flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl sm:text-2xl pb-2 font-heading font-semibold text-foreground group-hover:text-[#2563EB] transition-colors line-clamp-2 min-h-[3.5rem] sm:min-h-[4.5rem] flex-1">
                          {language === "en"
                            ? card.title_en
                            : card.title_ne || card.title_en}
                        </h3>
                        <div className="flex-none h-10 w-10 border border-foreground/10 flex items-center justify-center group-hover:border-[#2563EB] transition-colors">
                          <svg viewBox="0 0 24 24" className="h-5 w-5 text-foreground/50 group-hover:text-[#2563EB]" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-foreground/60 transition-colors duration-300 group-hover:text-foreground/80 flex-1">
                        {language === "en"
                          ? card.description_en
                          : card.description_ne || card.description_en}
                      </p>

                      <div className="mt-8 flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
                          {language === "en" ? "Explore Solution" : "विवरण हेर्नुहोस्"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {active && detail && (
          <>
            <section className="py-12 sm:py-16 bg-background text-foreground">
              <div className="mx-auto max-w-[1200px] w-full px-6 sm:px-10">
                <div className="grid gap-10 lg:grid-cols-12">
                  <aside className="lg:col-span-4 xl:col-span-3">
                    <div className="space-y-4">
                      {LEFT_NAV.map((item) => (
                        <button
                          key={item.key}
                          onClick={() => activate(item.key)}
                          className={`w-full text-left flex items-center justify-between border border-foreground/20 bg-background px-5 py-5 text-[18px] font-medium transition-colors ${
                            item.key === active ? "ring-1 ring-foreground" : ""
                          }`}
                        >
                          <span className="text-foreground">
                            {item.label[language as Lang]}
                          </span>
                          <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5 text-foreground/70"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M5 12h14" />
                            <path d="M13 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </aside>

                  <div className="lg:col-span-8 xl:col-span-9">
                    <header className="max-w-3xl">
                      <div className="mb-4">
                        <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-foreground">
                          {detail.pageTitle}
                        </h2>
                      </div>
                      <p className="mt-3 text-[17px] leading-7 text-foreground/80">
                        {detail.lead}
                      </p>
                    </header>

                    <div className="mt-8">
                      <h3 className="mt-8 text-2xl font-semibold text-foreground">
                        {language === "en"
                          ? "What we deliver"
                          : "हामीले के प्रदान गर्छौँ"}
                      </h3>
                    </div>

                    <div className="mt-4 grid gap-6 sm:grid-cols-2">
                      {[detail.bulletsCol1, detail.bulletsCol2].map(
                        (col, idx) => (
                          <ul key={idx} className="space-y-3">
                            {col.map((line) => (
                              <li
                                key={line}
                                className="group flex items-start gap-3"
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  className="mt-[3px] h-5 w-5 flex-none text-foreground/80"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M5 12h14" />
                                  <path d="M13 5l7 7-7 7" />
                                </svg>
                                <span className="text-[16px] leading-7 text-foreground/85">
                                  {line}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-t border-foreground/10 py-12 sm:py-16" style={{ backgroundColor: "var(--page-bg)" }}>
              <div className="mx-auto max-w-[1200px] w-full px-6 sm:px-10">
                <ProjectsGrid
                  language={language as Lang}
                  title={galleryTitle}
                  variant="solutions"
                />
              </div>
            </section>
          </>
        )}

        <GlobalCTA 
          onOfficesOpen={openOffices} 
          onBookingOpen={openBooking}
          onQuoteOpen={openQuote}
        />
      </main>

      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <ContactModals 
        officesOpen={officesOpen}
        onOfficesClose={closeOffices}
        bookingOpen={bookingOpen}
        onBookingClose={closeBooking}
        quoteOpen={quoteOpen}
        onQuoteClose={closeQuote}
      />

      <style jsx global>{`
        .solutions-card::after,
        .solutions-card::before {
          display: none !important;
          content: none !important;
        }

        .solutions-card {
          border-bottom: 0 !important;
          box-shadow: none !important;
        }
      `}</style>
    </>
  );
}
