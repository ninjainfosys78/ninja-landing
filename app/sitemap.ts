// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/posts";

const SITE_URL = "https://ninjainfosys.com";

// Also mark sitemap as static for `output: "export"`
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/solutions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const posts = await getAllPostsMeta();

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
