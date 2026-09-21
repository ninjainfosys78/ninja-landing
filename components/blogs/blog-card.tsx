"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const COLUMNS = 3;
const COLUMN_STAGGER_SECONDS = 0.12;
const PLACEHOLDER_IMAGE = "placeholder.jpg";

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
  index: number;
  readMoreLabel: string;
}

export default function BlogCard({ post, index, readMoreLabel }: BlogCardProps) {
  const href = `/blogs/${post.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay: (index % COLUMNS) * COLUMN_STAGGER_SECONDS, ease: EASE_OUT }}
      className="h-full"
    >
      <div className="group flex h-full flex-col border border-foreground/10 bg-card transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_-16px_rgba(10,31,77,0.22)]">
        <div className="w-full overflow-hidden bg-muted">
          {post.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image}
              alt={post.title}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith(PLACEHOLDER_IMAGE)) target.src = `/${PLACEHOLDER_IMAGE}`;
              }}
              className="h-[220px] w-full object-cover grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
          )}
        </div>

        <div className="flex-1 px-6 py-5">
          <h3 className="mb-2 line-clamp-2 font-heading text-xl font-semibold text-foreground transition-colors hover:text-[#2563EB]">
            <Link href={href}>{post.title}</Link>
          </h3>

          {(post.date || post.readTime) && (
            <div className="mb-4 flex flex-wrap gap-2 pt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/60">
              {post.date && <span>{post.date}</span>}
              {post.date && post.readTime && <span>•</span>}
              {post.readTime && <span>{post.readTime}</span>}
            </div>
          )}

          {post.excerpt && (
            <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-foreground/70">{post.excerpt}</p>
          )}
        </div>

        <div className="px-6 pb-6">
          <Link
            href={href}
            className="group/read inline-flex items-center gap-2 bg-[#E31B23] px-4 py-2 text-sm font-medium text-white transition hover:brightness-110"
          >
            {readMoreLabel}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 transition-transform duration-300 group-hover/read:translate-x-1"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
