"use client";

import { motion, type Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";

import ProductImageFrame from "./product-image-frame";
import { useMounted } from "@/components/ui/reveal";
import type { ProductItem, ProductLang } from "./product-items";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const IMAGE_DURATION_SECONDS = 1.8;
const TEXT_STAGGER_SECONDS = 0.25;
const TEXT_DELAY_CHILDREN_SECONDS = 0.6;
const ITEM_DURATION_SECONDS = 1;

const textContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: TEXT_STAGGER_SECONDS, delayChildren: TEXT_DELAY_CHILDREN_SECONDS },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: ITEM_DURATION_SECONDS, ease: EASE_OUT } },
};

interface ProductFeatureProps {
  product: ProductItem;
  index: number;
  language: ProductLang;
}

export default function ProductFeature({ product, index, language }: ProductFeatureProps) {
  const isReversed = index % 2 === 1;
  const visitSiteLabel = language === "en" ? "Visit site" : "साइटमा हेर्नुहोस्";
  // Framer Motion's SSR output bakes the already-visible "show" state instead
  // of "hidden" for whileInView-driven elements, so on refresh anything
  // already in view never visibly animates. Forcing "hidden" via an explicit
  // `animate` prop until mount guarantees a genuine hidden first paint (see
  // components/ui/reveal.tsx for the fuller explanation).
  const mounted = useMounted();

  return (
    <div id={product.id} className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <motion.div
        className={isReversed ? "lg:order-2" : undefined}
        initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        animate={!mounted ? { opacity: 0, x: isReversed ? 60 : -60 } : undefined}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: IMAGE_DURATION_SECONDS, ease: EASE_OUT }}
      >
        <ProductImageFrame src={product.image} alt={product.name} accent={product.accent} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        animate={!mounted ? "hidden" : undefined}
        viewport={{ once: true, amount: 0.4 }}
        variants={textContainerVariants}
      >
        <motion.h3
          variants={textItemVariants}
          className="mt-4 font-heading text-4xl font-semibold tracking-tight text-[#0b0d12] sm:text-5xl"
        >
          {product.name}
        </motion.h3>
        <motion.p
          variants={textItemVariants}
          className="mt-3 text-sm font-semibold normal-case tracking-[0.15em]"
          style={{ color: product.accent }}
        >
          {product.tagline}
        </motion.p>
        <motion.p variants={textItemVariants} className="mt-6 max-w-xl text-lg leading-relaxed text-[#5b6472]">
          {product.overview}
        </motion.p>

        <motion.ul variants={textItemVariants} className="mt-8 flex flex-wrap gap-3">
          {product.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[#D7E4FA] bg-white px-5 py-2 text-sm font-medium text-[#2E3A4E] shadow-sm"
            >
              {tag}
            </li>
          ))}
        </motion.ul>

        <motion.a
          variants={textItemVariants}
          href={product.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: product.accent }}
        >
          {visitSiteLabel}
          <ExternalLink size={16} />
        </motion.a>
      </motion.div>
    </div>
  );
}
