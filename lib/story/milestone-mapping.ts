import type { TimelineEntry } from "@/lib/about-content";
import type { DcmSubContentSummary } from "@/lib/dcm-client";

import { toNepaliDigits } from "./nepali-digits";
import type { StoryMilestone } from "./story-milestone";

const YEAR_LENGTH = 4;

function yearFromPublishedDate(publishedDate: string | null): string {
  return publishedDate ? publishedDate.slice(0, YEAR_LENGTH) : "";
}

// Either language may be left blank in the admin panel; fall back to the
// other so a half-filled milestone still renders instead of showing empty text.
export function toStoryMilestone(item: DcmSubContentSummary): StoryMilestone {
  const titleNe = item.name?.trim() ?? "";
  const titleEn = item.eng_name?.trim() ?? "";
  const textNe = item.description?.trim() ?? "";
  const textEn = item.eng_description?.trim() ?? "";

  return {
    id: item.id,
    year: yearFromPublishedDate(item.published_date),
    title_en: titleEn || titleNe,
    title_ne: titleNe || titleEn,
    text_en: textEn || textNe,
    text_ne: textNe || textEn,
  };
}

// Timeline reads oldest → newest; milestones without a date go last.
export function compareByYear(a: StoryMilestone, b: StoryMilestone): number {
  if (!a.year) return b.year ? 1 : 0;
  if (!b.year) return -1;
  return a.year.localeCompare(b.year);
}

export function toTimelineEntry(milestone: StoryMilestone, language: "en" | "ne"): TimelineEntry {
  const isEnglish = language === "en";
  return {
    year: isEnglish ? milestone.year : toNepaliDigits(milestone.year),
    title: isEnglish ? milestone.title_en : milestone.title_ne,
    text: isEnglish ? milestone.text_en : milestone.text_ne,
  };
}
