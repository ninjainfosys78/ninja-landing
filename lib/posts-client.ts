// Client-safe mirror of lib/posts.ts's getAllPostsMeta, for use in client
// components that need to fetch posts after mount (lib/posts.ts is
// server-only so it can't be imported from "use client" files).
import pb from "@/lib/pocketbase";
import type { PostMeta } from "@/lib/posts";

const BLOGS_COLLECTION = "Ninja_Blogs";

function getImageUrl(record: any): string {
  if (!record.Image) return "";
  return pb.files.getURL(record, record.Image);
}

function calculateReadTime(content: string): string {
  if (!content) return "";
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function buildExcerpt(content: string, maxLen = 220): string {
  if (!content) return "";
  const plain = content.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  if (!plain) return "";
  if (plain.length <= maxLen) return plain;
  return plain.slice(0, maxLen) + "...";
}

export async function getAllPostsMetaClient(): Promise<PostMeta[]> {
  try {
    const records = await pb.collection(BLOGS_COLLECTION).getFullList({
      sort: "-Published_date",
    });

    return records.map((r: any) => {
      const content: string = r.Content ?? "";
      const content_ne: string = r.Content_ne || content;
      const rawSlug = r.Slug || r.Title || "insight";
      const slug = rawSlug.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");

      return {
        slug,
        title: r.Title ?? "",
        title_ne: r.Title_ne || r.Title || "",
        deck: "",
        readTime: r.ReadTime || calculateReadTime(content),
        kicker: r.Kicker ?? "",
        date: r.Published_date ?? "",
        image: getImageUrl(r),
        excerpt: buildExcerpt(content),
        excerpt_ne: buildExcerpt(content_ne),
      };
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
