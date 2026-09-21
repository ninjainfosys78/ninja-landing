"use client";

import React from "react";

import { Reveal, StaggerWords } from "@/components/ui/reveal";

const TITLE_WORD_STAGGER_SECONDS = 0.045;
const DESCRIPTION_GAP_SECONDS = 0.2;

interface SectionHeadingProps {
  title: string;
  description?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

// Title animates in word by word, then the description rises in once the
// title has finished, so a section reads top-down as it scrolls into view.
export default function SectionHeading({
  title,
  description,
  as: Tag = "h2",
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const titleDuration = title.split(" ").length * TITLE_WORD_STAGGER_SECONDS;

  return (
    <div className={className}>
      <Tag className={titleClassName}>
        <StaggerWords text={title} staggerDelay={TITLE_WORD_STAGGER_SECONDS} />
      </Tag>
      {description && (
        <Reveal delay={titleDuration + DESCRIPTION_GAP_SECONDS} y={20}>
          <p className={descriptionClassName}>{description}</p>
        </Reveal>
      )}
    </div>
  );
}
