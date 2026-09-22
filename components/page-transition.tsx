"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import AutoReveal from "@/components/ui/auto-reveal";

const TRANSITION = { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };

/**
 * Cross-fades between pages instead of the outgoing page just vanishing the
 * instant navigation starts (which is what made routing feel like a hard
 * refresh). Lives in the root layout — which never remounts on navigation —
 * so AnimatePresence can hold the outgoing page on screen, fading it out,
 * while the incoming one fades in. A `template.tsx` can't do this: Next
 * tears down and remounts it per navigation, so there's never a moment where
 * both the old and new page exist for AnimatePresence to animate between.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        data-reveal-root
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={TRANSITION}
      >
        <AutoReveal />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
