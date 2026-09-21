import "server-only";

import { fetchDcmContentList } from "@/lib/dcm-client";

import { compareByYear, toStoryMilestone } from "./milestone-mapping";
import type { StoryMilestone } from "./story-milestone";

// The timeline is a "list"-type DCM content under the tenant's category: each
// sub-content item is one milestone (title, description, published date = year).
const STORY_CONTENT_SLUG = "our-story";

/** Milestones authored in DCM, oldest first. Empty until the content exists there. */
export async function getStoryMilestones(): Promise<StoryMilestone[]> {
  const list = await fetchDcmContentList(STORY_CONTENT_SLUG);
  return (list?.items ?? []).map(toStoryMilestone).sort(compareByYear);
}
