"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { ProductItem } from "@/components/work/products/product-items";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const CARD_STAGGER_SECONDS = 0.22;

interface ProjectPreviewCardProps {
  product: ProductItem;
  index: number;
}

export default function ProjectPreviewCard({ product, index }: ProjectPreviewCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.3, delay: index * CARD_STAGGER_SECONDS, ease: EASE_OUT }}
      className="group relative overflow-hidden rounded-2xl border border-[#d7e4fa] bg-white shadow-[0_1px_2px_rgba(10,31,77,0.03),0_8px_18px_-14px_rgba(10,31,77,0.10)] transition-all duration-500 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-[0_2px_4px_rgba(10,31,77,0.04),0_14px_26px_-16px_rgba(37,99,235,0.22)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0A1F4D]/80 via-[#0A1F4D]/10 to-transparent"
        />
        <h3 className="absolute bottom-5 left-5 right-5 font-sans text-2xl font-semibold text-white">
          {product.name}
        </h3>
      </div>
      <div className="p-7">
        <p className="text-sm font-semibold normal-case tracking-[0.15em]" style={{ color: product.accent }}>
          {product.tagline}
        </p>
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-[#5b6472]">{product.description}</p>
      </div>
    </motion.article>
  );
}
