"use client";

import { Check } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const ROW_SLIDE_DISTANCE_PX = 64;
const TICK_POP_DELAY_SECONDS = 0.4;

const rowVariants: Variants = {
  hidden: { opacity: 0, x: ROW_SLIDE_DISTANCE_PX },
  show: { opacity: 1, x: 0, transition: { duration: 1.2, ease: EASE_OUT } },
};

const dividerVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.4, ease: EASE_OUT } },
};

const tickVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -20 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { delay: TICK_POP_DELAY_SECONDS, type: "spring", stiffness: 150, damping: 15 },
  },
};

interface SolutionCapabilityRowProps {
  text: string;
}

export default function SolutionCapabilityRow({ text }: SolutionCapabilityRowProps) {
  return (
    <motion.div
      variants={rowVariants}
      className="group relative flex items-start gap-5 px-2 py-6 transition-colors duration-300 hover:bg-white/70 sm:px-4"
    >
      <motion.span
        variants={tickVariants}
        className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white shadow-[0_6px_12px_-8px_rgba(37,99,235,0.4)]"
      >
        <Check size={18} strokeWidth={3} />
      </motion.span>
      <p className="text-lg font-medium leading-relaxed text-[#0b0d12] sm:text-xl">{text}</p>
      <motion.span
        aria-hidden
        variants={dividerVariants}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-[#D7E4FA]"
      />
    </motion.div>
  );
}
