import { useEffect, useState } from "react";

import type { CarouselApi } from "@/components/ui/carousel";

const AUTOPLAY_INTERVAL_MS = 3500;

export function useCarouselAutoplay() {
  const [api, setApi] = useState<CarouselApi>();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api || paused) return;
    const timer = window.setInterval(() => api.scrollNext(), AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [api, paused]);

  const pauseHandlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
  };

  return { setApi, pauseHandlers };
}
