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

export async function fetchProjects(): Promise<ProjectItem[]> {
  try {
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
  } catch (error) {
    console.warn("Error fetching projects:", error);
    return [];
  }
}
