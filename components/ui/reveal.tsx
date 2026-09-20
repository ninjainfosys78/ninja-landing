"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

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

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export function RevealGroup({
  children,
  className,
  once = true,
  amount = 0.05,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -5% 0px" }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
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
  const words = text.split(" ");
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
