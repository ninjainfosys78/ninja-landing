"use client";
import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import type { TimelineEntry } from "@/lib/about-content";
import StoryProgressRail from "./story-progress-rail";

interface StoryStickyPanelProps {
  label: string;
  titleFirstWord: string;
  titleSecondWord: string;
  description: string;
  timeline: TimelineEntry[];
  activeIndex: number;
  progress: MotionValue<number>;
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

      <div className="mt-12 flex items-baseline gap-2">
        <span className="font-heading text-sm font-bold text-[#2563EB] tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="text-xs text-foreground/30 tabular-nums">
          / {String(timeline.length).padStart(2, "0")}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeEntry.year}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mt-3"
        >
          <div className="text-2xl lg:text-3xl font-heading font-semibold text-foreground">
            {activeEntry.year}
          </div>
          <div className="text-sm text-foreground/50 mt-1">{activeEntry.title}</div>
        </motion.div>
      </AnimatePresence>

      <StoryProgressRail stepCount={timeline.length} activeIndex={activeIndex} progress={progress} timeline={timeline} />
    </motion.div>
  );
}
