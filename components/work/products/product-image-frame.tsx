"use client";

import Image from "next/image";

interface ProductImageFrameProps {
  src: string;
  alt: string;
  accent: string;
}

// No parallax/oversize crop here on purpose — these are product marketing
// screenshots with text (wordmarks, headlines, CTAs) placed right up to the
// edges, so any crop margin cuts real content off instead of just trimming
// empty background like a generic photo would tolerate.
export default function ProductImageFrame({ src, alt, accent }: ProductImageFrameProps) {
  return (
    <div className="group relative">
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-[2rem] opacity-15 blur-2xl"
        style={{ backgroundColor: accent }}
      />
      <div className="overflow-hidden rounded-3xl border border-[#D7E4FA] bg-white shadow-[0_30px_60px_-30px_rgba(10,31,77,0.35)] ">
        <div className="relative aspect-[16/10]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
          />
        </div>
      </div>
    </div>
  );
}
