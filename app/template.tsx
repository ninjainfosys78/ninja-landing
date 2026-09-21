"use client";

import { motion } from "framer-motion";

import AutoReveal from "@/components/ui/auto-reveal";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      data-reveal-root
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <AutoReveal />
      {children}
    </motion.div>
  );
}
