"use client";

import { motion } from "framer-motion";

import ImageFrame from "@/components/ui/image-frame";
import { useMounted } from "@/components/ui/reveal";

import { SOLUTION_VISUALS, type SolutionKey } from "./solution-keys";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface SolutionOverviewProps {
  solution: SolutionKey;
  label: string;
  lead: string;
}

export default function SolutionOverview({ solution, label, lead }: SolutionOverviewProps) {
  const { image, accent, Icon } = SOLUTION_VISUALS[solution];

  // This section sits well down a long page (5 categories stacked
  // vertically) — a mount-triggered animation would fire immediately for
  // every category at once and finish long before a reader scrolls to the
  // later ones. whileInView instead waits until each section is actually
  // scrolled into view; the `animate` override below only forces the hidden
  // state for the brief pre-hydration window (see components/ui/reveal.tsx).
  const mounted = useMounted();

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <motion.div
        key={`${solution}-text`}
        initial="hidden"
        whileInView="show"
        animate={!mounted ? "hidden" : undefined}
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.22, delayChildren: 0.1 } },
        }}
      >
        <motion.span
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
          style={{ backgroundColor: accent, boxShadow: `0 10px 20px -12px ${accent}66` }}
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.8 },
            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_OUT } },
          }}
        >
          <Icon size={26} />
        </motion.span>
        <motion.h2
          className="mt-6 font-heading text-4xl font-semibold tracking-tight text-[#0b0d12] sm:text-5xl"
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
          }}
        >
          {label}
        </motion.h2>
        <motion.p
          className="mt-6 max-w-xl text-lg leading-relaxed text-[#5b6472]"
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
          }}
        >
          {lead}
        </motion.p>
      </motion.div>

      <motion.div
        key={`${solution}-image`}
        initial={{ opacity: 0, x: 48 }}
        whileInView={{ opacity: 1, x: 0 }}
        animate={!mounted ? { opacity: 0, x: 48 } : undefined}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE_OUT }}
      >
        <ImageFrame src={image} alt={label} accent={accent} />
      </motion.div>
    </div>
  );
}
