"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import BlogCardCover from "./blog-card-cover";
import { formatPostDate } from "./format-post-date";

export interface BlogCardData {
  slug: string;
  title: string;
  image?: string;
  date?: string;
  excerpt?: string;
  readTime?: string;
}

interface BlogCardProps {
  post: BlogCardData;
  readMoreLabel: string;
}

// No animation of its own — the grid it's rendered in (blogs-client.tsx)
// wraps each card in a RevealGroup/RevealItem so the whole grid staggers in
// one card at a time from a single shared trigger, instead of each card
// racing its own independent viewport check.
export default function BlogCard({ post, readMoreLabel }: BlogCardProps) {
  const href = `/blogs/${post.slug}`;
  const date = formatPostDate(post.date);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(10,31,77,0.06),0_10px_30px_-18px_rgba(10,31,77,0.25)] transition-shadow duration-500 hover:shadow-[0_16px_36px_-20px_rgba(10,31,77,0.3)]">
      <Link href={href} aria-label={post.title} className="block">
        <BlogCardCover image={post.image} title={post.title} />
      </Link>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        {(date || post.readTime) && (
          <div className="flex items-center gap-2 text-[12px] font-medium text-[#2563EB]">
            {date && <span>{date}</span>}
            {date && post.readTime && <span aria-hidden className="h-1 w-1 rounded-full bg-[#2563EB]/40" />}
            {post.readTime && <span className="text-foreground/50">{post.readTime}</span>}
          </div>
        )}

        <h3 className="mt-3 line-clamp-2 font-heading text-xl font-semibold leading-snug text-[#0b0d12]">
          <Link href={href} className="transition-colors hover:text-[#2563EB]">
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/65">{post.excerpt}</p>
        )}

        <Link
          href={href}
          className="group/read mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#0A1F4D] transition-colors hover:text-[#E31B23]"
        >
          {readMoreLabel}
          <ArrowRight size={16} className="transition-transform duration-300 group-hover/read:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
