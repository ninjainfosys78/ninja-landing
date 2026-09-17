"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Head from "next/head";

import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import SearchOverlay from "@/components/search-overlay";
import CookieBanner from "@/components/cookie-banner";
import { useLanguage } from "@/components/LanguageProvider";
import { useContactModals } from "@/lib/hooks/use-contact-modals";
import ContactModals from "@/components/contact-modals";
import type { InsightCard } from "@/components/insights-rail";
import type { TrustedLogoRecord } from "@/lib/trustedby";

const TrustedBy = dynamic(() => import("@/components/trusted-by"), {
  ssr: true,
  loading: () => <div className="h-40 animate-pulse bg-white/5" />,
});

const InsightsRail = dynamic(() => import("@/components/insights-rail"), {
  ssr: true,
  loading: () => <div className="h-80 animate-pulse bg-white/5" />,
});

const Testimonials = dynamic(() => import("@/components/testimonials"), {
  ssr: true,
  loading: () => <div className="h-60 animate-pulse bg-white/5" />,
});

const GlobalCTA = dynamic(() => import("@/components/global-cta"), {
  ssr: true,
});

const FeaturedCarousel = dynamic(() => import("@/components/featured-carousel"), {
  ssr: true,
  loading: () => <div className="h-[600px] animate-pulse bg-white/5" />,
});

const SustainabilitySection = dynamic(() => import("@/components/sustainability-section"), {
  ssr: true,
});

const AboutUsSection = dynamic(() => import("@/components/about-us-section"), {
  ssr: true,
});

interface HomePageClientProps {
  insights: InsightCard[];
  trustedLogos: TrustedLogoRecord[];
}

export default function HomePageClient({ insights, trustedLogos }: HomePageClientProps) {
  const { language } = useLanguage();
  const { 
    officesOpen, openOffices, closeOffices,
    bookingOpen, openBooking, closeBooking,
    quoteOpen, openQuote, closeQuote 
  } = useContactModals();
  const [searchOpen, setSearchOpen] = useState(false);

  const safeInsights: InsightCard[] = Array.isArray(insights) ? insights : [];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        closeOffices();
        closeBooking();
        closeQuote();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  // Metadata per language
  const meta = {
    en: {
      title: "Ninja Infosys — Global Consulting",
      description:
        "A global consulting company shaping decisive outcomes in complex environments.",
      ogImage: "/assets/og/og-default.jpg",
      siteName: "Ninja Infosys",
    },
    ne: {
      title: "निन्जा इन्फोसिस — ग्लोबल कन्सल्टिङ",
      description:
        "एक विश्वव्यापी कन्सल्टिङ कम्पनी जसले जटिल वातावरणमा निर्णायक परिणामहरू बनाउँछ।",
      ogImage: "/assets/og/og-default.jpg",
      siteName: "निन्जा इन्फोसिस",
    },
  } as const;

  const currentMeta = meta[(language ?? "en") as "en" | "ne"];

  return (
    <>
      {/* Dynamic Head tags */}
      <Head>
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.description} />
        <meta property="og:title" content={currentMeta.title} />
        <meta property="og:description" content={currentMeta.description} />
        <meta property="og:image" content={currentMeta.ogImage} />
        <meta property="og:site_name" content={currentMeta.siteName} />
        <meta name="twitter:title" content={currentMeta.title} />
        <meta name="twitter:description" content={currentMeta.description} />
        <meta name="twitter:image" content={currentMeta.ogImage} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Header />

      <main id="main-content" className="sharp-edges">
        {/* Above-the-fold: keep fast */}
        <Hero />

        {/* Core Identity: About Us */}
        <AboutUsSection />

        {/* Brand Initiative: Sustainability */}
        <SustainabilitySection />

        {/* Partner Ecosystem */}
        <TrustedBy initialLogos={trustedLogos} />

        {/* Editorial Carousel */}
        <FeaturedCarousel key={language} />

        {/* Global Insights */}
        <InsightsRail insights={safeInsights} />
        <Testimonials />
        <GlobalCTA
          onOfficesOpen={openOffices} 
          onBookingOpen={openBooking}
          onQuoteOpen={openQuote}
        />
      </main>

      <Footer />

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ContactModals 
        officesOpen={officesOpen}
        onOfficesClose={closeOffices}
        bookingOpen={bookingOpen}
        onBookingClose={closeBooking}
        quoteOpen={quoteOpen}
        onQuoteClose={closeQuote}
      />

      <CookieBanner />

      {/* Embedded JSON Content */}
      <script
        type="application/json"
        id="ni-content"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({}),
        }}
      />
    </>
  );
}
