"use client";

import React, { useEffect, useState } from "react";
import BannerSubtitle from "@/components/ui/banner-subtitle";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import type { PostMeta } from "@/lib/posts";
import { getBannerByImgName } from "@/lib/banners";
import { StaggerWords, RevealGroup, RevealItem } from "@/components/ui/reveal";
import BlogCard from "@/components/blogs/blog-card";

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
  initialPosts?: PostMeta[];
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

export default function BlogsClient({ initialPosts = [] }: BlogsClientProps) {
  const { language } = useLanguage();
  const [bannerUrl, setBannerUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    getBannerByImgName("insights").then((bannerUrlRaw) => setBannerUrl(bannerUrlRaw || undefined));
  }, []);

  const safePosts: Post[] = initialPosts.length > 0 ? initialPosts : DUMMY_POSTS;

  const labels = {
    insights: language === "en" ? "Blogs" : "ब्लगहरू",
    readMore: language === "en" ? "Read more" : "थप पढ्नुहोस्",
    home: language === "en" ? "Ninja Infosys" : "निन्जा इन्फोसिस",
  };

  return (
    <main className="relative bg-background text-foreground transition-colors duration-300">
      {/* Hero */}
      <section className="relative z-10">
        <div className="relative min-h-[34vh] overflow-hidden pb-12 pt-28 lg:pb-14 lg:pt-32">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('${bannerUrl || "/futuristic-travel-technology-interface.jpg"}')`,
            }}
          />

          <div className="absolute inset-0 hero-dark-overlay" />
          <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
            <div className="mx-auto max-w-[1200px] text-center">
              <nav
                aria-label="Breadcrumb"
                className="mt-4 text-sm text-white/50"
              >
                <ol className="flex items-center justify-center gap-3">
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
              <h1 className="mt-2 text-5xl font-heading font-bold text-white sm:text-6xl">
                <StaggerWords text={labels.insights} />
              </h1>
              <BannerSubtitle>
                {language === "en"
                  ? "Insights, ideas and stories from our team on technology, governance and digital transformation."
                  : "प्रविधि, सुशासन र डिजिटल रूपान्तरणबारे हाम्रो टोलीका विचार, अन्तर्दृष्टि र कथाहरू।"}
              </BannerSubtitle>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="py-10 lg:py-12">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <RevealGroup className="grid gap-8 md:grid-cols-3" amount={0.3} stagger={0.15}>
            {safePosts.map((post) => {
              const p = post as Post & { title_ne?: string; excerpt_ne?: string };
              return (
                <RevealItem key={p.slug} className="h-full" duration={0.9}>
                  <BlogCard
                    readMoreLabel={labels.readMore}
                    post={{
                      slug: p.slug,
                      title: language === "ne" ? p.title_ne || p.title : p.title,
                      excerpt: language === "ne" ? p.excerpt_ne || p.excerpt : p.excerpt,
                      image: p.image,
                      date: p.date,
                      readTime: p.readTime,
                    }}
                  />
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>
    </main>
  );
}
