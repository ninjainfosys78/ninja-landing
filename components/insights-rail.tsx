"use client";

import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal, RevealGroup, RevealItem, StaggerWords } from "@/components/ui/reveal";

export type InsightCard = {
  title: string;
  title_ne: string;
  deck: string;
  deck_ne: string;
  readTime: string;
  url: string;
  image: string;
};

interface InsightsRailProps {
  language?: "en" | "ne";
  insights?: InsightCard[] | null;
}

// Temporary placeholder content — swap out once the CMS feed is wired up.
const DUMMY_INSIGHTS: InsightCard[] = [
  {
    title: "The Future of Smart Manufacturing",
    title_ne: "स्मार्ट उत्पादनको भविष्य",
    deck: "How AI and IoT are redefining the factory floor for the next decade of production.",
    deck_ne: "AI र IoT ले उत्पादनको अर्को दशकको लागि कारखानाको स्वरुपलाई कसरी पुनः परिभाषित गर्दैछन्।",
    readTime: "7 min",
    url: "/blogs/smart-manufacturing",
    image: "/digital-infrastructure-network-city.jpg",
  },
  {
    title: "Accelerating the Net-Zero Transition",
    title_ne: "नेट-जिरो संक्रमणलाई गति दिँदै",
    deck: "Strategic frameworks for organizations to achieve carbon neutrality while maintaining growth.",
    deck_ne: "विकास कायम राख्दै कार्बन तटस्थता हासिल गर्न संस्थाहरूको लागि रणनीतिक ढाँचाहरू।",
    readTime: "8 min",
    url: "/blogs/net-zero",
    image: "/sustainability-construction.jpg",
  },
  {
    title: "Unlocking Value in the Metaverse",
    title_ne: "मेटाभर्समा मूल्य अनलक गर्दै",
    deck: "Exploring the commercial potential and social implications of persistent virtual environments.",
    deck_ne: "स्थायी भर्चुअल वातावरणको व्यावसायिक सम्भावना र सामाजिक प्रभावहरूको अन्वेषण गर्दै।",
    readTime: "7 min",
    url: "/blogs/metaverse-value",
    image: "/assets/insights/metaverse.jpeg",
  },
];

export default function InsightsRail({
  language: propLanguage,
  insights,
}: InsightsRailProps) {
  const { language: ctxLanguage } = useLanguage();
  const language = propLanguage ?? ctxLanguage ?? "en";

  const content =
    language === "en"
      ? {
        title: "Blogs",
        viewAll: "View all blogs",
        readMore: "Read more",
      }
      : {
        title: "ब्लगहरू",
        viewAll: "सबै ब्लगहरू हेर्नुहोस्",
        readMore: "थप पढ्नुहोस्",
      };

  const safeInsights: InsightCard[] =
    Array.isArray(insights) && insights.length > 0 ? insights : DUMMY_INSIGHTS;

  return (
    <section
      id="insights"
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: 'var(--page-bg)', color: '#0b0d12' }}
      aria-labelledby="insights-title"
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <Reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <h2
            id="insights-title"
            className="text-[38px] md:text-[48px] leading-tight font-bold"
            style={{ color: '#0b0d12' }}
          >
            <StaggerWords text={content.title} amount={0.6} />
          </h2>

          <Link
            href="/blogs"
            className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors flex-shrink-0 hover:text-[#2563EB] group"
            style={{ color: '#0b0d12' }}
          >
            {content.viewAll}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {safeInsights.map((insight, idx) => (
            <RevealItem
              key={insight.url}
              className={`group relative cursor-pointer ${idx === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
            >
              <Link
                href={insight.url}
                className="relative flex flex-col h-full overflow-hidden transition-all duration-500 hover:-translate-y-2.5 bg-white border border-black/10 hover:border-[#2563EB]/50 hover:shadow-[0_28px_60px_-20px_rgba(37,99,235,0.28)]"
              >
                {/* Top accent bar */}
                <div className="h-[3px] w-full bg-gradient-to-r from-[#E31B23] to-[#2563EB] opacity-70 group-hover:opacity-100 transition-opacity" />

                {/* Corner Accents on hover */}
                <div className="absolute top-1 left-0 w-4 h-4 border-t-2 border-l-2 border-[#2563EB] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#2563EB] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 pointer-events-none" />

                {/* Diagonal shine sweep */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
                >
                  <div
                    className="absolute inset-y-0 -inset-x-full opacity-0 group-hover:opacity-100 group-hover:[animation:shine-sweep_1.1s_ease]"
                    style={{
                      background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)",
                    }}
                  />
                </div>

                <div className={`relative overflow-hidden ${idx === 0 ? "flex-1 min-h-[350px] md:min-h-[500px]" : "h-[200px] sm:h-[240px]"}`}>
                  <Image
                    src={insight.image || "/placeholder.jpg"}
                    alt={insight.title}
                    fill
                    sizes={idx === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    className="object-cover object-top grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110"
                  />
                </div>

                <div className={`p-5 sm:p-6 ${idx === 0 ? "md:p-8 md:pt-10 mt-auto" : ""}`}>
                  {insight.readTime && (
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#2563EB]">
                        <Clock size={12} />
                        {insight.readTime}
                      </span>
                    </div>
                  )}

                  <h3
                    className={`font-bold mb-2 sm:mb-3 text-balance transition-colors group-hover:text-[#2563EB] ${idx === 0
                        ? "text-xl sm:text-2xl md:text-3xl"
                        : "text-lg sm:text-xl"
                      }`}
                    style={{ color: '#0b0d12' }}
                  >
                    {language === "ne" ? (insight.title_ne || insight.title) : insight.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-pretty line-clamp-3" style={{ color: 'rgba(11,13,18,0.6)' }}>
                    {language === "ne" ? (insight.deck_ne || insight.deck) : insight.deck}
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-[#2563EB]">
                    {content.readMore}
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-8 sm:mt-12 text-center md:hidden">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors hover:text-[#2563EB]"
            style={{ color: '#0b0d12' }}
          >
            {content.viewAll}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
