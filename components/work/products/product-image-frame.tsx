"use client";

import Image from "next/image";

import type { ProductImageFit } from "./product-types";

interface ProductImageFrameProps {
  src: string;
  alt: string;
  accent: string;
  fit?: ProductImageFit;
  siteUrl?: string;
  aspectClassName?: string;
  heightClassName?: string;
}

// No parallax/oversize crop here on purpose — these are product marketing
// screenshots with text (wordmarks, headlines, CTAs) placed right up to the
// edges, so any crop margin cuts real content off instead of just trimming
// empty background like a generic photo would tolerate.
export default function ProductImageFrame({
  src,
  alt,
  accent,
  fit = "cover",
  siteUrl,
  aspectClassName = "aspect-[16/10]",
  heightClassName,
}: ProductImageFrameProps) {
  const host = siteUrl ? siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : undefined;

  return (
    <div
      className={`group relative max-w-full ${heightClassName ?? ""}`}
      style={heightClassName ? { aspectRatio: "16 / 10" } : undefined}
    >
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-[2rem] opacity-15 blur-2xl"
        style={{ backgroundColor: accent }}
      />
      <div className="h-full overflow-hidden rounded-3xl border border-[#D7E4FA] bg-white shadow-[0_30px_60px_-30px_rgba(10,31,77,0.35)] ">
        {host && (
          <div className="flex items-center gap-3 border-b border-[#EEF2FB] bg-[#F6F9FE] px-4 py-2.5">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </span>
            <span className="flex-1 truncate rounded-full bg-white px-3 py-1 text-center text-[11px] font-medium text-[#5b6472]">
              {host}
            </span>
          </div>
        )}
        <div
          className={`relative ${heightClassName ? "h-full" : aspectClassName}`}
          style={fit === "contain" ? { backgroundColor: `${accent}0D` } : undefined}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`${fit === "contain" ? "object-contain p-12 sm:p-16" : "object-cover"} transition-transform duration-1000 group-hover:scale-[1.02]`}
          />
        </div>
      </div>
    </div>
  );
}
