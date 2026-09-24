"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const SLOW_REVEAL_SECONDS = 1.3;
const SLOW_REVEAL_STAGGER_SECONDS = 0.25;
const SLOW_REVEAL_AMOUNT = 0.3;
import { getInsightCopy } from "@/components/home/insights/insight-copy";
import InsightFeatureCard from "@/components/home/insights/insight-feature-card";
import InsightListCard from "@/components/home/insights/insight-list-card";
import InsightsSectionHeader from "@/components/home/insights/insights-section-header";
import type { InsightStory } from "@/components/home/insights/insight-story";

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

function toStory(insight: InsightCard, language: "en" | "ne"): InsightStory {
  const isNepali = language === "ne";
  return {
    url: insight.url,
    title: isNepali ? insight.title_ne || insight.title : insight.title,
    deck: isNepali ? insight.deck_ne || insight.deck : insight.deck,
    readTime: insight.readTime,
    image: insight.image,
  };
}

const listNumber = (index: number) => String(index + 2).padStart(2, "0");

export default function InsightsRail({ language: propLanguage, insights }: InsightsRailProps) {
  const { language: ctxLanguage } = useLanguage();
  const language: "en" | "ne" = propLanguage ?? ctxLanguage ?? "en";
  const copy = getInsightCopy(language);

  const source = Array.isArray(insights) && insights.length > 0 ? insights : DUMMY_INSIGHTS;
  const [featured, ...rest] = source.map((insight) => toStory(insight, language));

  return (
    <section
      id="insights"
      className="relative overflow-hidden border-y border-[#D7E4FA] py-20 md:py-28"
      style={{ backgroundColor: "var(--page-bg)", color: "#0b0d12" }}
      aria-labelledby="insights-title"
    >

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <InsightsSectionHeader copy={copy} />

        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8" amount={SLOW_REVEAL_AMOUNT} stagger={SLOW_REVEAL_STAGGER_SECONDS}>
          <RevealItem className="lg:col-span-7" duration={SLOW_REVEAL_SECONDS}>
            <InsightFeatureCard story={featured} featuredLabel={copy.featured} readLabel={copy.readArticle} />
          </RevealItem>

          <RevealGroup
            className="flex flex-col gap-6 lg:col-span-5 lg:gap-8"
            amount={SLOW_REVEAL_AMOUNT}
            stagger={SLOW_REVEAL_STAGGER_SECONDS}
          >
            {rest.map((story, index) => (
              <RevealItem key={story.url} className="flex-1" duration={SLOW_REVEAL_SECONDS}>
                <InsightListCard story={story} number={listNumber(index)} />
              </RevealItem>
            ))}
          </RevealGroup>
        </RevealGroup>
      </div>
    </section>
  );
}
