"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import AutoReveal from "@/components/ui/auto-reveal";

const TRANSITION = { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const };

/**
 * Cross-fades between pages: the outgoing page fades out while the incoming
 * one fades in, at the same time, in the same spot — so there's never a
 * frame with nothing on screen (the "blink" a plain fade-in-only version has
 * the instant the old page unmounts) and never a moment where both pages are
 * visible stacked on top of each other in the document flow (what happens if
 * you drop AnimatePresence's `mode="wait"` without also taking the exiting
 * page out of flow).
 *
 * Both pages share one CSS Grid cell (`grid-area: 1 / 1`) so they overlap
 * instead of stacking vertically — no `position: absolute` bookkeeping
 * needed, and no dependency on a positioned ancestor.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-[minmax(0,1fr)]">
      <AnimatePresence initial={false}>
        <motion.div
          key={pathname}
          data-reveal-root
          className="[grid-area:1/1] min-w-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={TRANSITION}
        >
          <AutoReveal />
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
