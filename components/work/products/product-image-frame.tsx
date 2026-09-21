"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const PARALLAX_RANGE = ["-9%", "9%"];

interface ProductImageFrameProps {
  src: string;
  alt: string;
  accent: string;
}

export default function ProductImageFrame({ src, alt, accent }: ProductImageFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], PARALLAX_RANGE);

  return (
    <div ref={frameRef} className="group relative">
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-[2rem] opacity-15 blur-2xl"
        style={{ backgroundColor: accent }}
      />
      <div className="overflow-hidden rounded-3xl border border-[#D7E4FA] bg-white shadow-[0_30px_60px_-30px_rgba(10,31,77,0.35)] ">
        <div className="flex items-center gap-2 border-b border-[#D7E4FA] bg-[#F6F9FE] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E31B23]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#0A1F4D]/30" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.div className="absolute inset-[-10%]" style={{ y: imageY }}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
            />
          </motion.div>
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 mix-blend-multiply"
            style={{ background: `linear-gradient(135deg, ${accent}, transparent 60%)` }}
          />
        </div>
      </div>
    </div>
  );
}
