export interface StoryMilestone {
  id: string;
  /** Four-digit year taken from the DCM item's published date; empty when none is set. */
  year: string;
  title_en: string;
  title_ne: string;
  text_en: string;
  text_ne: string;
}
