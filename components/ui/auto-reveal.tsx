"use client";

import { useEffect } from "react";

const REVEAL_TARGETS = "h1, h2, h3, p, article, ul > li, ol > li, form, blockquote, figure";
const SKIP_ANCESTORS =
  'header, footer, nav, [role="dialog"], [data-no-reveal], [style*="opacity"], [style*="transform"]';
const MOTION_MANAGED_DESCENDANTS = '[style*="opacity"], [style*="transform"]';
const VISIBLE_CLASS = "is-visible";
const REVEAL_CLASS = "auto-reveal";
const PROCESSED_ATTR = "data-reveal-seen";
const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 5;
const CLEANUP_AFTER_MS = 1600;
const VIEWPORT_MARGIN = "0px 0px -8% 0px";

function isBelowFold(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const horizontallyOnScreen = rect.right > 0 && rect.left < window.innerWidth;
  return horizontallyOnScreen && rect.top > window.innerHeight * 0.95;
}

// Only ancestors inside the reveal root count: the page template's own wrapper carries
// inline opacity/transform and must not disqualify everything beneath it.
function hasSkippedAncestor(el: HTMLElement, root: HTMLElement): boolean {
  for (let node: HTMLElement | null = el; node && node !== root; node = node.parentElement) {
    if (node.matches(SKIP_ANCESTORS)) return true;
  }
  return false;
}

function isEligible(el: HTMLElement, root: HTMLElement): boolean {
  if (el.hasAttribute(PROCESSED_ATTR)) return false;
  if (hasSkippedAncestor(el, root)) return false;
  if (el.querySelector(MOTION_MANAGED_DESCENDANTS)) return false;
  return true;
}

function staggerDelayFor(el: HTMLElement): number {
  const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
  return Math.min(siblings.indexOf(el), MAX_STAGGER_STEPS) * STAGGER_MS;
}

function revealAndCleanUp(el: HTMLElement) {
  el.classList.add(VISIBLE_CLASS);
  // Drop the helper classes afterwards so they never override the element's own
  // hover/transition utilities.
  window.setTimeout(() => {
    el.classList.remove(REVEAL_CLASS, VISIBLE_CLASS);
    el.style.removeProperty("--reveal-delay");
  }, CLEANUP_AFTER_MS);
}

// Every page and section reveals as it scrolls into view — headings first,
// then text and cards staggered — without each page wiring its own animation.
// Elements already on screen, or already driven by framer-motion, are left alone.
export default function AutoReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          revealAndCleanUp(entry.target as HTMLElement);
        });
      },
      { threshold: 0.1, rootMargin: VIEWPORT_MARGIN },
    );

    // <main> can mount after this effect (streamed or dynamically loaded pages),
    // so it is looked up on every scan; pages without one fall back to the template wrapper.
    const scan = () => {
      const main = document.querySelector<HTMLElement>("main, [data-reveal-root]");
      if (!main) return;
      main.querySelectorAll<HTMLElement>(REVEAL_TARGETS).forEach((el) => {
        if (!isEligible(el, main)) return;
        el.setAttribute(PROCESSED_ATTR, "");
        if (!isBelowFold(el)) return;
        el.style.setProperty("--reveal-delay", `${staggerDelayFor(el)}ms`);
        el.classList.add(REVEAL_CLASS);
        observer.observe(el);
      });
    };

    let frame = 0;
    const scheduleScan = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    };

    scan();
    const mutations = new MutationObserver(scheduleScan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
