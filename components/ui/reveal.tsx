"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

// Framer Motion's server-rendered output for these components resolves to
// the already-visible "show" state instead of the "hidden" starting state
// (verified against the raw pre-hydration HTML) — so on a fresh load, a hard
// refresh, a browser restoring scroll position, or a component that first
// mounts later (e.g. after an async fetch resolves), whatever's on screen at
// that moment never visibly animates; it's already finished before the first
// paint. Every component below stays a real motion element at all times
// (never swaps element type on mount — a type swap tears down and rebuilds
// the subtree, which breaks Framer's parent→child variant inheritance and
// can leave children stuck visible) and instead force-pins the hidden state
// via an explicit `animate` override until its OWN first mount has committed,
// then hands control back to the normal initial/whileInView transition.
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

// Curtain-style wipe: content is unmasked from the top down while rising
// slightly. The final inset is negative so shadows and glows are never clipped.
const WIPE_OVERSCAN_PX = 60;
const WIPE_CLOSED = `inset(-${WIPE_OVERSCAN_PX}px -${WIPE_OVERSCAN_PX}px 100% -${WIPE_OVERSCAN_PX}px)`;
const WIPE_OPEN = `inset(-${WIPE_OVERSCAN_PX}px -${WIPE_OVERSCAN_PX}px -${WIPE_OVERSCAN_PX}px -${WIPE_OVERSCAN_PX}px)`;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  amount?: number;
};

// Viewport-triggered reveal: plays a fixed-duration animation once the
// element enters view, so it always reads as a visible animation no
// matter how fast the user scrolls past it (a scroll-linked version can
// be blown through in a single wheel/trackpad tick with no perceptible
// motion at all).
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  y = 32,
  once = true,
  amount = 0.2,
}: RevealProps) {
  const mounted = useMounted();
  const hidden = { clipPath: WIPE_CLOSED, y };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={{ clipPath: WIPE_OPEN, y: 0 }}
      animate={!mounted ? hidden : undefined}
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const WORD_CLOSED = "inset(0 0 100% 0)";
const WORD_OPEN = "inset(-0.3em -0.1em -0.3em -0.1em)";

const DEFAULT_STAGGER_SECONDS = 0.12;
const DEFAULT_ITEM_DURATION_SECONDS = 0.65;

const staggerContainer = (stagger: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: 0 } },
});

// `x` swaps the item's entrance from the default bottom-up slide to a
// horizontal one (negative = from the left, positive = from the right) —
// used to bring two side-by-side items in from opposite directions.
const staggerItem = (duration: number, x?: number): Variants => ({
  hidden: x !== undefined ? { clipPath: WIPE_CLOSED, x } : { clipPath: WIPE_CLOSED, y: 32 },
  show: {
    clipPath: WIPE_OPEN,
    ...(x !== undefined ? { x: 0 } : { y: 0 }),
    transition: { duration, ease: [0.16, 1, 0.3, 1] },
  },
});

export function RevealGroup({
  children,
  className,
  style,
  once = true,
  amount = 0.05,
  stagger = DEFAULT_STAGGER_SECONDS,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
  amount?: number;
  stagger?: number;
}) {
  const mounted = useMounted();

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      animate={!mounted ? "hidden" : undefined}
      viewport={{ once, amount, margin: "0px 0px -5% 0px" }}
      variants={staggerContainer(stagger)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  duration = DEFAULT_ITEM_DURATION_SECONDS,
  x,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  x?: number;
}) {
  // No mounted-gate of its own: it inherits "hidden"/"show" from its parent
  // RevealGroup, which (always a real motion.div, never type-swapped) is
  // itself already SSR/first-paint-safe. A separate gate here would let this
  // child flip to a real motion.div on a different render than its parent —
  // exactly the parent/child desync that used to leave items stuck visible.
  return (
    <motion.div className={className} variants={staggerItem(duration, x)}>
      {children}
    </motion.div>
  );
}

// Word-by-word staggered wipe-up for headings — each word animates in
// with a small delay after the previous one, instead of the whole
// heading fading in as a single block. Words stay inline so the
// heading still wraps naturally at any viewport width.
export function StaggerWords({
  text,
  className,
  wordClassName,
  amount = 0.4,
  staggerDelay = 0.045,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  amount?: number;
  staggerDelay?: number;
}) {
  const mounted = useMounted();
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      animate={!mounted ? "hidden" : undefined}
      viewport={{ once: true, amount, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            variants={{
              hidden: { clipPath: WORD_CLOSED, y: "0.6em" },
              show: {
                clipPath: WORD_OPEN,
                y: 0,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </motion.span>
  );
}

// Two large, slow-drifting blurred color blobs used as an ambient backdrop
// for premium sections. Pure CSS (not framer) so it never competes with
// scroll-triggered motion and costs nothing on the main thread.
export function AmbientGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <div
        className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.10), transparent 70%)",
          animation: "ambient-drift-a 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-32 -right-16 w-[480px] h-[480px] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(227,27,35,0.08), transparent 70%)",
          animation: "ambient-drift-b 26s ease-in-out infinite",
        }}
      />
    </div>
  );
}

// Scroll-linked parallax wrapper for images/media — moves slower (or
// faster) than the page scroll to add depth. `strength` in px controls
// how far it travels across the scroll range.
export function ParallaxImage({
  children,
  className,
  strength = 60,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div style={{ y: translateY, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}
