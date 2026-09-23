"use client";

import React from "react";
import BannerSubtitle from "@/components/ui/banner-subtitle";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import BlogPostBody from "@/components/blog-post-body";
import type { PostMeta } from "@/lib/posts";

interface BlogPostClientProps {
  meta: PostMeta;
  content: string;
  content_ne: string;
}

export default function BlogPostClient({ meta, content, content_ne }: BlogPostClientProps) {
  const { language } = useLanguage();

  const isNe = language === "ne";
  const displayTitle = isNe ? (meta.title_ne || meta.title) : meta.title;
  const displayContent = isNe ? (content_ne || content) : content;

  const labels = {
    home: isNe ? "निन्जा इन्फोसिस" : "Ninja Infosys",
    insights: isNe ? "ब्लगहरू" : "Blogs",
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Title Hero */}
      <section className="relative z-10 bg-background text-foreground">
        <div className="relative min-h-[44vh] overflow-hidden pt-24 lg:pt-28">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-60 blur-[8px] scale-110"
            style={{ backgroundImage: "url('/insights.jpg')" }}
          />
          <div className="absolute inset-0 hero-dark-overlay" />

          <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
            <div className="mx-auto max-w-[1200px] text-center">
              <nav aria-label="Breadcrumb" className="mt-4 text-sm text-white/80">
                <ol className="flex items-center justify-center gap-3">
                  <li>
                    <Link href="/" className="font-medium tracking-wide hover:text-white/80">
                      {labels.home}
                    </Link>
                  </li>
                  <li aria-hidden className="inline-flex items-center text-white/70">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </li>
                  <li>
                    <Link href="/blogs" className="font-medium tracking-wide hover:text-white/80">
                      {labels.insights}
                    </Link>
                  </li>
                </ol>
              </nav>

              <h1 className="mt-4 text-5xl font-heading font-semibold text-white sm:text-6xl">
                {labels.insights}
              </h1>
              <BannerSubtitle>
                {isNe
                  ? "प्रविधि, सुशासन र डिजिटल रूपान्तरणबारे हाम्रो टोलीका विचार, अन्तर्दृष्टि र कथाहरू।"
                  : "Insights, ideas and stories from our team on technology, governance and digital transformation."}
              </BannerSubtitle>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-12">
          {meta.image && (
            <div className="mb-8 w-full overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={meta.image}
                alt={displayTitle}
                className="w-full h-[300px] sm:h-[360px] object-cover transition"
              />
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl font-heading font-semibold mb-2">
            {displayTitle}
          </h2>

          <div className="text-sm text-foreground/60 mb-6 font-semibold uppercase tracking-wider">
            {meta.date} {meta.readTime && `• ${meta.readTime}`}
          </div>

          <BlogPostBody source={displayContent} />
        </div>
      </section>
    </main>
  );
}
