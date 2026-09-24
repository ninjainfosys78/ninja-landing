import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import type { InsightStory } from "./insight-story";

const FALLBACK_IMAGE = "/placeholder.jpg";

interface InsightListCardProps {
  story: InsightStory;
  number: string;
}

export default function InsightListCard({ story, number }: InsightListCardProps) {
  return (
    <Link
      href={story.url}
      className="group relative flex h-full items-center gap-5 overflow-hidden rounded-2xl border border-[#D7E4FA] bg-[#F6F9FE] p-4 shadow-[0_1px_2px_rgba(10,31,77,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-[#2563EB]/40 hover:shadow-[0_24px_48px_-24px_rgba(10,31,77,0.3)] sm:p-5"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-[#2563EB] transition-transform duration-500 group-hover:scale-y-100"
      />

      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-white sm:h-32 sm:w-36">
        <Image
          src={story.image || FALLBACK_IMAGE}
          alt={story.title}
          fill
          sizes="144px"
          className="object-cover transition-all duration-700 group-hover:scale-110"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2563EB]">
          <span>{number}</span>
          {story.readTime && (
            <span className="inline-flex items-center gap-1.5 text-[#0A1F4D]/50">
              <Clock size={11} />
              {story.readTime}
            </span>
          )}
        </div>
        <h3 className="mt-2 line-clamp-2 font-heading text-lg font-semibold leading-snug text-[#0b0d12] transition-colors group-hover:text-[#2563EB] sm:text-xl">
          {story.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#5b6472]">{story.deck}</p>
      </div>

      <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB] transition-colors duration-300 group-hover:bg-[#2563EB] group-hover:text-white sm:flex">
        <ArrowUpRight size={18} />
      </span>
    </Link>
  );
}
