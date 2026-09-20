// app/blogs/page.tsx
import BlogsClient from "@/components/blogs-client";
import { getAllPostsMeta } from "@/lib/posts";

export default async function BlogsPage() {
  const posts = await getAllPostsMeta();
  return <BlogsClient initialPosts={posts} />;
}
