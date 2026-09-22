"use client";

import { motion, type Variants } from "framer-motion";

import SectionHeading from "@/components/ui/section-heading";

import SolutionCapabilityRow from "./solution-capability-row";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const HEADING_SLIDE_DISTANCE_PX = 72;
const ROW_STAGGER_SECONDS = 0.22;
const ROWS_DELAY_SECONDS = 0.4;
const VIEWPORT = { once: true, amount: 0.25 } as const;

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: ROW_STAGGER_SECONDS, delayChildren: ROWS_DELAY_SECONDS } },
};

interface SolutionCapabilitiesProps {
  title: string;
  capabilities: readonly string[];
}

export default function SolutionCapabilities({ title, capabilities }: SolutionCapabilitiesProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
      <motion.div
        className="lg:sticky lg:top-32 lg:self-start"
        initial={{ opacity: 0, x: -HEADING_SLIDE_DISTANCE_PX, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={VIEWPORT}
        transition={{ duration: 1.4, ease: EASE_OUT }}
      >
        <SectionHeading
          title={title}
          titleClassName="font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-[#0b0d12] sm:text-5xl lg:text-6xl"
        />
      </motion.div>

      <motion.div
        className="relative"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={listVariants}
      >
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px origin-left bg-[#D7E4FA]"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.4, ease: EASE_OUT } } }}
        />
        {capabilities.map((capability) => (
          <SolutionCapabilityRow key={capability} text={capability} />
        ))}
      </motion.div>
    </div>
  );
}
