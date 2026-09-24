import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PRODUCT_SOURCES } from "@/components/work/products/product-items";
import ProductDetailClient from "@/components/work/products/product-detail-client";

export const dynamicParams = false;

export async function generateStaticParams() {
  return PRODUCT_SOURCES.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCT_SOURCES.find((item) => item.id === id);
  if (!product) return {};

  return {
    title: `${product.name} — Ninja Infosys`,
    description: product.description.en,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCT_SOURCES.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
