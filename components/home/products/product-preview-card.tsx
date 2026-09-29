"use client";

import Image from "next/image";
import Link from "next/link";

import type { ProductItem } from "@/components/work/products/product-items";

interface ProductPreviewCardProps {
  product: ProductItem;
}

export default function ProductPreviewCard({ product }: ProductPreviewCardProps) {
  const isContained = product.imageFit === "contain";

  return (
    <Link
      href={`/products/${product.id}`}
      style={isContained ? { backgroundColor: `${product.accent}0D` } : undefined}
      className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-[#d7e4fa] shadow-[0_1px_2px_rgba(10,31,77,0.03),0_8px_18px_-14px_rgba(10,31,77,0.10)] transition-all duration-500 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-[0_2px_4px_rgba(10,31,77,0.04),0_14px_26px_-16px_rgba(37,99,235,0.22)]"
    >
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className={`${isContained ? "object-contain p-12 sm:p-16" : "object-cover"} transition-transform duration-1000 group-hover:scale-[1.03]`}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#0A1F4D]/90 via-[#0A1F4D]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-7">
        <h3 className="font-heading text-2xl font-bold text-white">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">{product.tagline}</p>
      </div>
    </Link>
  );
}
