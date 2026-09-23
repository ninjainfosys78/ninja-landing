"use client";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { useActiveIndexInView } from "@/lib/hooks/use-active-index-in-view";
import type { TimelineEntry } from "@/lib/about-content";
import StoryStickyPanel from "./story-sticky-panel";
import StoryItem from "./story-item";
import StoryBackground from "./story-background";

interface OurStorySectionProps {
  storyTitle: string;
  timeline: TimelineEntry[];
  language: "en" | "ne";
}

const STORY_LABEL: Record<"en" | "ne", string> = {
  en: "The Evolution",
  ne: "विकासक्रम",
};

const STORY_DESCRIPTION: Record<"en" | "ne", string> = {
  en: "A decade of engineering excellence, scaling from a small studio to a global technical partner.",
  ne: "एक दशकको उत्कृष्ट इन्जिनियरिङ, सानो स्टुडियोबाट वैश्विक प्राविधिक साझेदारसम्मको यात्रा।",
};

export default function OurStorySection({ storyTitle, timeline, language }: OurStorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const { itemRefs, activeIndex } = useActiveIndexInView<HTMLDivElement>(timeline.length);
  const [titleFirstWord, titleSecondWord] = storyTitle.split(" ");

  return (
    <section
      id="our-story"
      ref={sectionRef}
      className="relative z-10 isolate scroll-mt-28 overflow-clip"
    >
      <StoryBackground />
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
            <StoryStickyPanel
              label={STORY_LABEL[language]}
              titleFirstWord={titleFirstWord}
              titleSecondWord={titleSecondWord}
              description={STORY_DESCRIPTION[language]}
              timeline={timeline}
              activeIndex={activeIndex}
              progress={scrollYProgress}
            />
          </div>

          <div className="lg:w-2/3 overflow-x-hidden">
            <div className="relative space-y-32 lg:space-y-48 pb-32 lg:pl-16 ml-6 lg:ml-0">
              {/* Timeline spine: a visible base line plus a gradient fill
                  that grows with scroll progress, so the line itself shows
                  how far through the story you are. */}
              <div className="absolute inset-y-0 left-0 w-px bg-foreground/15" />
              <motion.div
                aria-hidden
                className="absolute inset-y-0 left-0 w-px origin-top bg-gradient-to-b from-[#2563EB] to-[#E31B23]"
                style={{ scaleY: scrollYProgress }}
              />

              {timeline.map((entry, index) => (
                <StoryItem
                  key={`${entry.year}-${index}`}
                  ref={(el) => {
                    itemRefs[index].current = el;
                  }}
                  entry={entry}
                  index={index}
                  isActive={index === activeIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
