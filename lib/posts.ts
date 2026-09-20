import "server-only";
import {
  fetchDcmContentList,
  fetchDcmSubContent,
  type DcmSubContentDetail,
  type DcmSubContentSummary,
} from "@/lib/dcm-client";

export type PostMeta = {
  slug: string;
  title: string;
  title_ne: string;
  deck: string;
  readTime: string;
  kicker: string;
  date: string;
  image: string;
  excerpt: string;
  excerpt_ne: string;
};

// Insight/blog posts are authored as sub-content items under this DCM
// content slug, inside the tenant's single DCM category (env.DCM_CATEGORY_SLUG).
const CONTENT_SLUG = "blogs";

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

function toPostMeta(item: DcmSubContentSummary | DcmSubContentDetail): PostMeta {
  const contentNe = item.description ?? "";
  const content = item.eng_description || contentNe;
  const files = "files" in item ? item.files : undefined;

  return {
    slug: item.slug,
    title: item.eng_name || item.name,
    title_ne: item.name,
    deck: "",
    readTime: calculateReadTime(content),
    kicker: "",
    date: item.published_date ?? "",
    image: files?.[0]?.file_url ?? "",
    excerpt: buildExcerpt(content),
    excerpt_ne: buildExcerpt(contentNe),
  };
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  const list = await fetchDcmContentList(CONTENT_SLUG);
  const items = list?.items ?? [];

  const posts = await Promise.all(
    items.map(async (item) => {
      const detail = await fetchDcmSubContent(CONTENT_SLUG, item.slug);
      return toPostMeta(detail?.item ?? item);
    })
  );

  return posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export async function getPostBySlug(slug: string): Promise<{
  meta: PostMeta;
  content: string;
  content_ne: string;
} | null> {
  const detail = await fetchDcmSubContent(CONTENT_SLUG, slug);
  if (!detail?.item) return null;

  const contentNe = detail.item.description ?? "";
  const content = detail.item.eng_description || contentNe;

  return { meta: toPostMeta(detail.item), content, content_ne: contentNe };
}
