"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ImageFrame from "@/components/ui/image-frame";

import { SOLUTION_VISUALS, type SolutionKey } from "./solution-keys";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface SolutionOverviewProps {
  solution: SolutionKey;
  label: string;
  lead: string;
}

export default function SolutionOverview({ solution, label, lead }: SolutionOverviewProps) {
  const { image, accent, Icon } = SOLUTION_VISUALS[solution];

  // Mirrors the hero fix: SSR can't run a mount animation, so it would bake the
  // final "show" state directly and the entrance would never play. Deferring
  // to a real post-mount state flip forces a genuine, visible client transition,
  // and staggerChildren makes the icon, title and description follow turn by turn.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <motion.div
        key={`${solution}-text`}
        initial="hidden"
        animate={mounted ? "show" : "hidden"}
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
        animate={mounted ? { opacity: 1, x: 0 } : { opacity: 0, x: 48 }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE_OUT }}
      >
        <ImageFrame src={image} alt={label} accent={accent} />
      </motion.div>
    </div>
  );
}
