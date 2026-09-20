"use client";
import { motion, type MotionValue } from "framer-motion";
import type { TimelineEntry } from "@/lib/about-content";

interface StoryProgressRailProps {
  stepCount: number;
  activeIndex: number;
  progress: MotionValue<number>;
  timeline?: TimelineEntry[];
}

export default function StoryProgressRail({
  stepCount,
  activeIndex,
  progress,
  timeline = [],
}: StoryProgressRailProps) {
  return (
    <div className="hidden lg:flex items-center gap-6 mt-12">
      {/* Thin animated progress line */}
      <div className="relative h-px w-32 bg-foreground/10 flex-shrink-0">
        <motion.div
          className="absolute top-0 left-0 h-full bg-foreground/60 origin-left"
          style={{ scaleX: progress }}
        />
      </div>

      {/* Year labels */}
      <div className="flex items-center gap-4">
        {Array.from({ length: stepCount }, (_, index) => {
          const isActive = index === activeIndex;
          const entry = timeline[index];
          return (
            <span
              key={index}
              className={`text-[11px] tracking-widest tabular-nums font-mono transition-all duration-500 ${
                isActive
                  ? "text-foreground opacity-100"
                  : "text-foreground opacity-20"
              }`}
            >
              {entry?.year ?? `${index + 1}`}
            </span>
          );
        })}
      </div>
    </div>
  );
}
