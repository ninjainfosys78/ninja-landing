"use client";
import { motion, type MotionValue } from "framer-motion";
import type { TimelineEntry } from "@/lib/about-content";

interface StoryStickyPanelProps {
  label: string;
  titleFirstWord: string;
  titleSecondWord: string;
  description: string;
  timeline: TimelineEntry[];
  activeIndex: number;
  progress?: MotionValue<number>;
}

export default function StoryStickyPanel({
  label,
  titleFirstWord,
  titleSecondWord,
  description,
  timeline,
  activeIndex,
  progress,
}: StoryStickyPanelProps) {
  const activeEntry = timeline[activeIndex];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-6">
        {label}
      </h2>
      <h3 className="text-4xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tighter mb-8 italic">
        {titleFirstWord}
        <br />
        <span className="pl-4 lg:pl-10 text-[#2563EB]">{titleSecondWord}</span>
      </h3>
      <div className="h-1 w-20 bg-[#2563EB] mb-8" />
      <p className="text-base lg:text-lg text-foreground/50 leading-relaxed max-w-sm font-light">
        {description}
      </p>


    </motion.div>
  );
}
