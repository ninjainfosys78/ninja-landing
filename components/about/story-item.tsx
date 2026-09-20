"use client";
import { forwardRef } from "react";
import { motion, useTransform, type MotionValue, type Variants } from "framer-motion";
import type { TimelineEntry } from "@/lib/about-content";

interface StoryItemProps {
  entry: TimelineEntry;
  index: number;
  scrollYProgress: MotionValue<number>;
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
  ({ entry, index, scrollYProgress, isActive }, ref) => {
    const y = useTransform(scrollYProgress, [0, 1], [80 * (index + 1), -80 * (index + 1)]);

    return (
      <div
        ref={ref}
        className={`relative group transition-all duration-500 ${
          isActive ? "opacity-100 scale-100" : "opacity-40 scale-[0.98]"
        }`}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div
            style={{ y }}
            className="absolute -top-8 -left-4 lg:-left-12 text-[50px] lg:text-[100px] font-heading font-black text-foreground select-none pointer-events-none opacity-[0.01] transition-opacity duration-1000 group-hover:text-[#2563EB] group-hover:opacity-10"
          >
            {entry.year}
          </motion.div>

          <div className="relative z-10">
            <motion.div variants={itemVariants} className="flex items-center gap-6 mb-8">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border font-heading text-lg shadow-sm transition-all duration-500 ${
                  isActive
                    ? "border-[#2563EB] bg-[#2563EB] text-white"
                    : "border-[#2563EB]/20 text-[#2563EB]"
                }`}
              >
                {entry.year.slice(-2)}
              </div>
              <div
                className={`h-px bg-[#2563EB]/20 transition-all duration-500 ${
                  isActive ? "w-20" : "w-10"
                }`}
              />
              <span className="text-xs font-bold tracking-[0.2em] text-[#2563EB] uppercase">
                {entry.year}
              </span>
            </motion.div>

            <motion.h4
              variants={itemVariants}
              className="text-xl lg:text-3xl font-heading font-semibold text-foreground mb-4 tracking-tight"
            >
              {entry.title}
            </motion.h4>

            <motion.p
              variants={itemVariants}
              className="text-base lg:text-lg text-foreground/60 leading-relaxed max-w-2xl font-light"
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
