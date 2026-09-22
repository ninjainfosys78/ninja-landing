"use client";
import { forwardRef } from "react";
import { motion, type Variants } from "framer-motion";
import type { TimelineEntry } from "@/lib/about-content";
import StoryYearMark from "./story-year-mark";

interface StoryItemProps {
  entry: TimelineEntry;
  index: number;
  isActive: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const StoryItem = forwardRef<HTMLDivElement, StoryItemProps>(
  ({ entry, index, isActive }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative group origin-left transition-all duration-500 ${
          isActive ? "opacity-100 scale-100" : "opacity-75 scale-[0.98]"
        }`}
      >
        {/* Active-chapter spotlight — a soft glow card instead of just
            dimming everything else, so the current entry reads as
            "in focus" rather than the rest reading as barely-there. */}
        <div
          aria-hidden
          className={`absolute -inset-x-6 -inset-y-6 -z-10 rounded-3xl bg-gradient-to-br from-[#2563EB]/[0.06] to-transparent transition-opacity duration-500 lg:-inset-x-10 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <div className="relative z-10">
            <motion.div variants={itemVariants}>
              <StoryYearMark year={entry.year} index={index} isActive={isActive} />
            </motion.div>

            <motion.h4
              variants={itemVariants}
              className="text-xl lg:text-3xl font-heading font-bold text-foreground mb-4 tracking-tight"
            >
              {entry.title}
            </motion.h4>

            <motion.p
              variants={itemVariants}
              className="text-base lg:text-lg text-foreground/75 leading-relaxed max-w-2xl font-normal"
            >
              {entry.text}
            </motion.p>
          </div>
        </motion.div>
      </div>
    );
  }
);
StoryItem.displayName = "StoryItem";

export default StoryItem;
