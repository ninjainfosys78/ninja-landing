"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

// Framer Motion's server-rendered output for these components resolves to
// the already-visible "show" state instead of the "hidden" starting state
// (verified against the raw pre-hydration HTML) — so on a fresh load, a hard
// refresh, or a browser restoring scroll position into a section, whatever
// is on screen at that moment never visibly animates; it's already finished
// before the first paint. Deferring every reveal to a real post-mount state
// flip forces SSR/first paint to render hidden and makes the reveal a
// genuine, guaranteed-visible client-side transition. Every component below
// renders a plain, style-matched placeholder until mounted, then swaps to
// the real motion element — the swap is visually seamless since both render
// the identical hidden styles at that instant.
//
// A per-component useState/useEffect pair would flip at a different tick
// for every instance — React commits child effects before parent effects,
// so a RevealItem could become a real motion.div (with only `variants`, no
// initial of its own) one render before its parent RevealGroup does, with
// no animating ancestor yet to inherit "hidden" from, rendering it visible
// with no way to recover once mounted. A single shared store flipped once
// via a microtask lets every consumer that registered interest during the
// current commit flip to "mounted" in the exact same render pass, so a
// RevealGroup and its RevealItem children always swap together.
let hasMounted = false;
let mountScheduled = false;
const mountListeners = new Set<() => void>();

function scheduleMountFlip() {
  if (mountScheduled) return;
  mountScheduled = true;
  queueMicrotask(() => {
    hasMounted = true;
    mountListeners.forEach((listener) => listener());
  });
}

function subscribeMounted(listener: () => void) {
  mountListeners.add(listener);
  return () => mountListeners.delete(listener);
}

function getMountedSnapshot() {
  return hasMounted;
}

function getServerMountedSnapshot() {
  return false;
}

export function useMounted(): boolean {
  const mounted = useSyncExternalStore(subscribeMounted, getMountedSnapshot, getServerMountedSnapshot);
  useEffect(() => {
    scheduleMountFlip();
  }, []);
  return mounted;
}

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

  if (!mounted) {
    return (
      <div className={className} style={{ opacity: 0, transform: `translateY(${y}px) scale(0.96)`, filter: "blur(8px)" }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.96, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

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
  hidden: x !== undefined ? { opacity: 0, x, scale: 0.96, filter: "blur(5px)" } : { opacity: 0, y: 32, scale: 0.96, filter: "blur(5px)" },
  show: {
    opacity: 1,
    ...(x !== undefined ? { x: 0 } : { y: 0 }),
    scale: 1,
    filter: "blur(0px)",
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

  // The container itself carries no visual state (its "hidden" variant is
  // `{}`) — only orchestrates children — so pre-mount it just needs to stay
  // a plain, non-animating wrapper; each RevealItem child hides itself.
  if (!mounted) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
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
  const mounted = useMounted();

  if (!mounted) {
    const translate = x !== undefined ? `translateX(${x}px)` : "translateY(32px)";
    return (
      <div className={className} style={{ opacity: 0, transform: `${translate} scale(0.96)`, filter: "blur(5px)" }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div className={className} variants={staggerItem(duration, x)}>
      {children}
    </motion.div>
  );
}

// Word-by-word staggered fade-in for headings — each word animates in
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

  if (!mounted) {
    return (
      <span className={className}>
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <span className={`inline-block ${wordClassName ?? ""}`} style={{ opacity: 0, transform: "translateY(18px)", filter: "blur(4px)" }}>
              {word}
            </span>
            {i < words.length - 1 ? " " : ""}
          </React.Fragment>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
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
              hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
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
