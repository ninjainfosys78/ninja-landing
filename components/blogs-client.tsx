"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import type { PostMeta } from "@/lib/posts";

// Use a minimal client-side post shape to avoid importing server-only modules
type ClientPost = {
  slug: string;
  title: string;
  image?: string;
  date?: string;
  deck?: string;
  excerpt?: string;
  readTime?: string; // ✅ added
};

type Post = ClientPost | PostMeta;

interface BlogsClientProps {
  posts: Post[];
  bannerUrl?: string;
  initialLanguage?: "en" | "ne";
}

// Temporary placeholder content — swap out once the CMS feed is wired up.
const DUMMY_POSTS: (ClientPost & { title_ne?: string; excerpt_ne?: string })[] = [
  {
    slug: "smart-manufacturing",
    title: "The Future of Smart Manufacturing",
    title_ne: "स्मार्ट उत्पादनको भविष्य",
    excerpt: "How AI and IoT are redefining the factory floor for the next decade of production.",
    excerpt_ne: "AI र IoT ले उत्पादनको अर्को दशकको लागि कारखानाको स्वरुपलाई कसरी पुनः परिभाषित गर्दैछन्।",
    readTime: "7 min",
    image: "/digital-infrastructure-network-city.jpg",
  },
  {
    slug: "net-zero",
    title: "Accelerating the Net-Zero Transition",
    title_ne: "नेट-जिरो संक्रमणलाई गति दिँदै",
    excerpt: "Strategic frameworks for organizations to achieve carbon neutrality while maintaining growth.",
    excerpt_ne: "विकास कायम राख्दै कार्बन तटस्थता हासिल गर्न संस्थाहरूको लागि रणनीतिक ढाँचाहरू।",
    readTime: "8 min",
    image: "/sustainability-construction.jpg",
  },
  {
    slug: "metaverse-value",
    title: "Unlocking Value in the Metaverse",
    title_ne: "मेटाभर्समा मूल्य अनलक गर्दै",
    excerpt: "Exploring the commercial potential and social implications of persistent virtual environments.",
    excerpt_ne: "स्थायी भर्चुअल वातावरणको व्यावसायिक सम्भावना र सामाजिक प्रभावहरूको अन्वेषण गर्दै।",
    readTime: "7 min",
    image: "/assets/insights/metaverse.jpeg",
  },
];

export default function BlogsClient({ posts, bannerUrl }: BlogsClientProps) {
  const { language } = useLanguage();
  const safePosts: Post[] = posts.length > 0 ? posts : DUMMY_POSTS;

  const labels = {
    insights: language === "en" ? "Insights" : "अन्तर्दृष्टि",
    readMore: language === "en" ? "Read more" : "थप पढ्नुहोस्",
    home: language === "en" ? "Ninja Infosys" : "निन्जा इन्फोसिस",
  };

  return (
    <main className="relative bg-background text-foreground transition-colors duration-300">
      {/* Hero */}
      <section className="relative z-10">
        <div className="relative min-h-[50vh] pt-28 lg:pt-32">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-60 grayscale"
            style={{
              backgroundImage: `url('${bannerUrl || "/futuristic-travel-technology-interface.jpg"}')`,
            }}
          />

          <div className="absolute inset-0 bg-[#0b0d12]/60" />
          <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
            <div className="max-w-[1200px] text-left">
              <nav
                aria-label="Breadcrumb"
                className="mt-4 text-sm text-white/50"
              >
                <ol className="flex items-center gap-3">
                  <li>
                    <Link
                      href="/"
                      className="font-normal tracking-wide hover:text-white"
                    >
                      {labels.home}
                    </Link>
                  </li>
                  <li
                    aria-hidden
                    className="inline-flex items-center text-white/30"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </li>
                  <li className="font-normal tracking-wide">
                    {labels.insights}
                  </li>
                </ol>
              </nav>
              <h1 className="mt-2 text-5xl font-serif font-medium text-white sm:text-6xl">
                {labels.insights}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="py-10 lg:py-12">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid gap-8 md:grid-cols-3">
            {safePosts.map((post) => {
              const p = post as any;
              const displayTitle = language === "ne" ? (p.title_ne || p.title) : p.title;
              const displayExcerpt = language === "ne" ? (p.excerpt_ne || p.excerpt) : p.excerpt;
              
              return (
                <div
                  key={p.slug}
                  className="group flex h-full flex-col border border-foreground/10 bg-card transition-all duration-300 hover:border-[#2563EB]/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                >
                  {/* Image */}
                  <div className="w-full overflow-hidden bg-muted">
                    {p.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image}
                        alt={displayTitle}
                        onError={(e) => {
                          const targ = e.currentTarget as HTMLImageElement;
                          if (!targ.src.endsWith("placeholder.jpg")) {
                            targ.src = "/placeholder.jpg";
                          }
                        }}
                        className="h-[220px] w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Meta & Deck */}
                  <div className="flex-1 px-6 py-5">
                    <h3 className="mb-2 line-clamp-2 font-heading text-xl font-semibold text-foreground hover:text-[#2563EB] transition-colors">
                      <Link href={`/blogs/${p.slug}`}>{displayTitle}</Link>
                    </h3>

                    {(p.date || p.readTime) && (
                      <div className="pt-3 mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/60 flex flex-wrap gap-2">
                        {p.date && <span>{p.date}</span>}
                        {p.date && p.readTime && <span>•</span>}
                        {p.readTime && <span>{p.readTime}</span>}
                      </div>
                    )}

                    {displayExcerpt && (
                      <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-foreground/70">
                        {displayExcerpt}
                      </p>
                    )}
                  </div>

                  {/* Read More */}
                  <div className="px-6 pb-6">
                    <Link
                      href={`/blogs/${p.slug}`}
                      className="inline-flex items-center gap-2 bg-[#E31B23] px-4 py-2 text-sm font-medium text-white cursor-pointer hover:brightness-110 transition"
                    >
                      {labels.readMore}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
