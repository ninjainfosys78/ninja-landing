"use client";
import { useEffect, useMemo, useState, type RefObject } from "react";

// Tracks which item in a vertical list currently sits closest to the
// viewport center, so a sticky panel elsewhere on the page can mirror
// whichever step the user has scrolled to (pinned "how it works" pattern).
export function useActiveIndexInView<T extends HTMLElement = HTMLDivElement>(count: number) {
  const itemRefs = useMemo<RefObject<T | null>[]>(
    () => Array.from({ length: count }, () => ({ current: null })),
    [count]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        const closest = visible.reduce((a, b) =>
          Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top) ? a : b
        );
        const index = itemRefs.findIndex((ref) => ref.current === closest.target);
        if (index !== -1) setActiveIndex(index);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    itemRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [itemRefs]);

  return { itemRefs, activeIndex };
}
