import pb from "@/lib/pocketbase";

export type ProjectCategory = string;

export type ProjectItem = {
  id: string;
  title_en: string;
  title_ne: string;
  blurb_en: string;
  blurb_ne: string;
  href: string;
  category_en: ProjectCategory;
  category_ne: string;
  image: string;
};

const PROJECTS_COLLECTION = "NinjaLanding_ProjectsCard";
const RETRY_DELAYS_MS = [500, 1500];

// Cached across the whole client session (survives client-side route
// changes) so navigating back to the projects grid doesn't re-fetch.
let cache: ProjectItem[] | null = null;
let inFlight: Promise<ProjectItem[]> | null = null;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchProjectsOnce(): Promise<ProjectItem[]> {
  const records = await pb.collection(PROJECTS_COLLECTION).getFullList({
    sort: "-created",
  });

  return records.map((r: any) => ({
    id: r.id,
    title_en: r.Title_En ?? "",
    title_ne: r.Title_Ne ?? "",
    blurb_en: r.Blurb_EN ?? "",
    blurb_ne: r.Blurb_Ne ?? "",
    href: r.Href ?? "",
    category_en: r.Category_En ?? "",
    category_ne: r.Category_Ne ?? r.Category_En ?? "",
    image: r.Image ? pb.files.getURL(r, r.Image) : "",
  }));
}

async function fetchWithRetry(): Promise<ProjectItem[]> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fetchProjectsOnce();
    } catch (error) {
      if (attempt >= RETRY_DELAYS_MS.length) {
        console.warn(`Giving up fetching projects after ${attempt + 1} attempts:`, error);
        return [];
      }
      await delay(RETRY_DELAYS_MS[attempt]);
    }
  }
}

export async function fetchProjects(): Promise<ProjectItem[]> {
  if (cache) return cache;

  if (!inFlight) {
    inFlight = fetchWithRetry().then((result) => {
      // Only cache a genuine result — an empty list after exhausting retries
      // likely means the server was unreachable, so let the next caller try again.
      if (result.length > 0) cache = result;
      inFlight = null;
      return result;
    });
  }

  return inFlight;
}
