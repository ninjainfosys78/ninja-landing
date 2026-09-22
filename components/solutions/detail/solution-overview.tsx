"use client";

import { motion } from "framer-motion";

import ProductImageFrame from "@/components/work/products/product-image-frame";

import { SOLUTION_VISUALS, type SolutionKey } from "./solution-keys";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface SolutionOverviewProps {
  solution: SolutionKey;
  label: string;
  lead: string;
}

export default function SolutionOverview({ solution, label, lead }: SolutionOverviewProps) {
  const { image, accent, Icon } = SOLUTION_VISUALS[solution];

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <motion.div
        key={`${solution}-text`}
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
          style={{ backgroundColor: accent, boxShadow: `0 16px 32px -12px ${accent}` }}
        >
          <Icon size={26} />
        </span>
        <h2 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-[#0b0d12] sm:text-5xl">
          {label}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5b6472]">{lead}</p>
      </motion.div>

      <motion.div
        key={`${solution}-image`}
        initial={{ opacity: 0, x: 48 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
      >
        <ProductImageFrame src={image} alt={label} accent={accent} />
      </motion.div>
    </div>
  );
}
