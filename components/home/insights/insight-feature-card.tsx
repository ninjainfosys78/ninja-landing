import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import type { InsightStory } from "./insight-story";

const FALLBACK_IMAGE = "/placeholder.jpg";

interface InsightFeatureCardProps {
  story: InsightStory;
  featuredLabel: string;
  readLabel: string;
}

export default function InsightFeatureCard({ story, featuredLabel, readLabel }: InsightFeatureCardProps) {
  return (
    <Link
      href={story.url}
      className="group relative flex h-full min-h-[440px] flex-col justify-end overflow-hidden rounded-3xl bg-[#0A1F4D] shadow-[0_30px_60px_-30px_rgba(10,31,77,0.5)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-30px_rgba(10,31,77,0.6)] lg:min-h-[560px]"
    >
      <Image
        src={story.image || FALLBACK_IMAGE}
        alt={story.title}
        fill
        sizes="(max-width: 1024px) 100vw, 58vw"
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#0A1F4D] via-[#0A1F4D]/55 to-[#0A1F4D]/5"
      />

      <div className="absolute left-6 top-6 flex items-center gap-3 sm:left-8 sm:top-8">
        <span className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md">
          {featuredLabel}
        </span>
        {story.readTime && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/80">
            <Clock size={12} />
            {story.readTime}
          </span>
        )}
      </div>

      <div className="relative p-6 sm:p-8 lg:p-10">
        <h3 className="max-w-2xl text-balance font-heading text-3xl font-semibold leading-tight text-white lg:text-4xl">
          {story.title}
        </h3>
        <p className="mt-4 line-clamp-2 max-w-xl text-base leading-relaxed text-white/75">{story.deck}</p>
        <span className="mt-7 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-white">
          {readLabel}
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0A1F4D] transition-all duration-300 group-hover:bg-[#E31B23] group-hover:text-white">
            <ArrowUpRight size={18} />
          </span>
        </span>
      </div>
    </Link>
  );
}
