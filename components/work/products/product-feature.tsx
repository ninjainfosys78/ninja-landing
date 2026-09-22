"use client";

import { motion } from "framer-motion";

import ProductImageFrame from "./product-image-frame";
import type { ProductItem } from "./product-items";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const FLOAT_STAGGER_SECONDS = 0.6;

interface ProductFeatureProps {
  product: ProductItem;
  index: number;
}

export default function ProductFeature({ product, index }: ProductFeatureProps) {
  const isReversed = index % 2 === 1;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <motion.div
        className={isReversed ? "lg:order-2" : undefined}
        initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
      >
        <ProductImageFrame src={product.image} alt={product.name} accent={product.accent} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.4, delay: 0.3, ease: EASE_OUT }}
      >
        <h3 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-[#0b0d12] sm:text-5xl">
          {product.name}
        </h3>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: product.accent }}>
          {product.tagline}
        </p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5b6472]">{product.description}</p>

        <ul className="mt-8 flex flex-wrap gap-3">
          {product.tags.map((tag, tagIndex) => (
            <motion.li
              key={tag}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: tagIndex * FLOAT_STAGGER_SECONDS,
              }}
              className="rounded-full border border-[#D7E4FA] bg-white px-5 py-2 text-sm font-medium text-[#2E3A4E] shadow-sm"
            >
              {tag}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
