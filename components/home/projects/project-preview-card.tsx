"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { ProductItem } from "@/components/work/products/product-items";
import { useMounted } from "@/components/ui/reveal";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const CARD_STAGGER_SECONDS = 0.22;

interface ProjectPreviewCardProps {
  product: ProductItem;
  index: number;
}

export default function ProjectPreviewCard({ product, index }: ProjectPreviewCardProps) {
  // Framer Motion's SSR output bakes the already-visible "show" state instead
  // of "hidden" for whileInView-driven elements, so on refresh anything
  // already in view never visibly animates. Forcing "hidden" via an explicit
  // `animate` prop until mount guarantees a genuine hidden first paint (see
  // components/ui/reveal.tsx for the fuller explanation).
  const mounted = useMounted();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={!mounted ? { opacity: 0, y: 50 } : undefined}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.3, delay: index * CARD_STAGGER_SECONDS, ease: EASE_OUT }}
    >
      <Link
        href={`/work/${product.id}`}
        className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-[#d7e4fa] shadow-[0_1px_2px_rgba(10,31,77,0.03),0_8px_18px_-14px_rgba(10,31,77,0.10)] transition-all duration-500 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-[0_2px_4px_rgba(10,31,77,0.04),0_14px_26px_-16px_rgba(37,99,235,0.22)]"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0A1F4D]/90 via-[#0A1F4D]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-7">
          <h3 className="font-heading text-2xl font-bold text-white">{product.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">{product.tagline}</p>
        </div>
      </Link>
    </motion.div>
  );
}
