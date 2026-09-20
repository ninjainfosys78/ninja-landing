"use client";

import React, { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface CountUpProps {
  to: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

// Animates a number from 0 up to `to` once it scrolls into view, instead of
// appearing as static text — reinforces a stat callout as a live result.
// Updates the DOM node directly via framer-motion's imperative `animate`,
// so the count doesn't cause a React re-render on every frame.
export function CountUp({ to, decimals = 0, duration = 1.4, prefix = "", suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, to, duration, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
