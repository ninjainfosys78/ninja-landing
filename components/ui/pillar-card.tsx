"use client";

import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";

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
  icon: LucideIcon;
  label?: string;
  labelClassName?: string;
}

export function PillarCard({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;
  return (
    <article className="flex h-full flex-col p-8 text-left sm:p-10">
      <span className="flex size-12 items-center justify-center rounded-full bg-[#0f1b33] text-white">
        <Icon size={20} strokeWidth={1.7} />
      </span>
      {pillar.label && (
        <span className={`mt-7 text-[11px] font-semibold uppercase tracking-[0.14em] ${pillar.labelClassName ?? "text-foreground/60"}`}>
          {pillar.label}
        </span>
      )}
      <h3 className={`font-heading text-xl font-bold text-foreground ${pillar.label ? "mt-1.5" : "mt-7"}`}>{pillar.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70 sm:text-base">{pillar.text}</p>
    </article>
  );
}

export function PillarCardGrid({ pillars }: { pillars: Pillar[] }) {
  return (
    <motion.div
      className="mx-auto grid max-w-[1600px] grid-cols-1 rounded-2xl bg-white shadow-[0_4px_16px_-4px_rgba(15,27,51,0.12)] lg:grid-cols-3"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
      variants={pillarListVariants}
    >
      {pillars.map((pillar) => (
        <motion.div key={pillar.title} variants={pillarItemVariants}>
          <PillarCard pillar={pillar} />
        </motion.div>
      ))}
    </motion.div>
  );
}
