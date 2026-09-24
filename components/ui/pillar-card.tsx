"use client";

import { motion, type Variants } from "framer-motion";

// A deliberately bolder entrance than the shared Reveal/RevealItem primitives —
// these cards still announce themselves one by one, but without the blur filter
// or heavy scale jump, which read as janky rather than smooth on most displays.
export const pillarListVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.35, delayChildren: 0.1 } },
};

export const pillarItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

interface Pillar {
  title: string;
  text: string;
}

export function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#eef1f6] border-l-4 border-l-[#2563EB] bg-white p-8 text-left shadow-[0_8px_25px_-6px_rgba(10,31,77,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_-10px_rgba(10,31,77,0.16)] sm:p-10">
      <h3 className="mb-3 font-heading text-xl font-bold text-foreground sm:text-2xl">{pillar.title}</h3>
      <p className="text-sm leading-relaxed text-foreground/65 sm:text-base">{pillar.text}</p>
    </article>
  );
}

export function PillarCardGrid({ pillars }: { pillars: Pillar[] }) {
  return (
    <motion.div
      className="mx-auto mt-16 grid max-w-[1600px] grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
      variants={pillarListVariants}
    >
      {pillars.map((pillar, idx) => (
        <motion.div key={idx} variants={pillarItemVariants}>
          <PillarCard pillar={pillar} />
        </motion.div>
      ))}
    </motion.div>
  );
}
