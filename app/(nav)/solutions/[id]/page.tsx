import { Metadata } from "next";
import { getSolutionById, getSolutionsCards } from "@/lib/solutions";
import { getBannerByImgName } from "@/lib/banners";
import SolutionDetailClient from "@/components/SolutionDetailClient";
import { notFound } from "next/navigation";

export const dynamicParams = false;

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const solutions = await getSolutionsCards();
  return solutions.map((s) => ({
    id: s.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const solution = await getSolutionById(id);
  if (!solution) return {};

  return {
    title: `${solution.title_en} — NinjaInfosys`,
    description: solution.description_en,
  };
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [solution, bannerUrlRaw] = await Promise.all([
    getSolutionById(id),
    getBannerByImgName("solutions"),
  ]);

  if (!solution) {
    notFound();
  }

  return <SolutionDetailClient solution={solution} bannerUrl={bannerUrlRaw || null} />;
}

