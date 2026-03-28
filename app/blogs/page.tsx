// app/blogs/page.tsx
import Header from "@/components/header";
import Footer from "@/components/footer";
import BlogsClient from "@/components/blogs-client";
import { getAllPostsMeta } from "@/lib/posts";

import { getBannerByImgName } from "@/lib/banners";

export const dynamic = "force-dynamic";
// Or use revalidation:
// export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogsPage() {
  const posts = await getAllPostsMeta();
  const bannerUrl = await getBannerByImgName("insights");

  return (
    <>
      <Header />

      <main>
        <BlogsClient posts={posts} bannerUrl={bannerUrl || undefined} />
      </main>

      <Footer />
    </>
  );
}
