"use client";
import { motion, type MotionValue } from "framer-motion";
import type { TimelineEntry } from "@/lib/about-content";
import { useMounted } from "@/components/ui/reveal";

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
  // Framer Motion's SSR output bakes the already-visible "show" state instead
  // of "hidden" for whileInView-driven elements, so on refresh anything
  // already in view never visibly animates. Forcing "hidden" via an explicit
  // `animate` prop until mount guarantees a genuine hidden first paint (see
  // components/ui/reveal.tsx for the fuller explanation).
  const mounted = useMounted();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      animate={!mounted ? { opacity: 0, x: -20 } : undefined}
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
      <div className="h-1 w-20 bg-gradient-to-r from-[#2563EB] to-[#E31B23] mb-8 rounded-full" />
      <p className="text-base lg:text-lg text-foreground/70 leading-relaxed max-w-sm font-normal">
        {description}
      </p>
    </motion.div>
  );
}
