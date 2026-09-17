import "server-only";
import { notFound } from "next/navigation";
import BlogPostClient from "@/components/blog-post-client";
import { getAllPostsMeta, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: paramsSlug } = await params;
  const decodedSlug = decodeURIComponent(paramsSlug);

  const post = await getPostBySlug(decodedSlug);
  if (!post) return notFound();

  const { meta, content, content_ne } = post;

  return <BlogPostClient meta={meta} content={content} content_ne={content_ne} />;
}
