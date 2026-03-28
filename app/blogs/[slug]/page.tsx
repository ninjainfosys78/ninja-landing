import "server-only";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import BlogPostBody from "@/components/blog-post-body";
import { getAllPostsMeta, getPostBySlug } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);

  const post = await getPostBySlug(decodedSlug);
  if (!post) return notFound();

  const { meta, content } = post;

  return (
    <>
      <Header />

      <section className="relative z-10 bg-black text-white">
        <div className="relative min-h-[44vh] pt-24 lg:pt-28">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-60"
            style={{ backgroundImage: "url('/insights.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
            <div className="max-w-[1200px] text-left">
              <nav aria-label="Breadcrumb" className="mt-4 text-sm text-white/80">
                <ol className="flex items-center gap-3">
                  <li>
                    <Link href="/" className="font-medium tracking-wide hover:text-gray-200">
                      Ninja Infosys
                    </Link>
                  </li>
                  <li aria-hidden className="inline-flex items-center text-white/70">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </li>
                  <li>
                    <Link href="/blogs" className="font-medium tracking-wide hover:text-gray-200">
                      Insights
                    </Link>
                  </li>
                </ol>
              </nav>

              <h1 className="mt-4 text-5xl font-heading font-semibold text-white sm:text-6xl">
                Insights
              </h1>
            </div>
          </div>
        </div>
      </section>

      <main className="bg-black text-white">
        <div className="mx-auto max-w-3xl px-6 py-12">
          {meta.image && (
            <div className="mb-8 w-full overflow-hidden bg-black">
              <img
                src={meta.image}
                alt={meta.title}
                className="w-full h-[300px] sm:h-[360px] object-cover grayscale transition"
              />
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl font-heading font-semibold mb-2">
            {meta.title}
          </h2>

          <div className="text-sm text-white/60 mb-6">
            {meta.date} • {meta.readTime}
          </div>

          <BlogPostBody source={content} />

          <div className="mt-10">
            <Link
              href="/blogs"
              className="text-sm font-medium text-white/60 hover:text-white transition"
            >
              ← Back to Insights
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
