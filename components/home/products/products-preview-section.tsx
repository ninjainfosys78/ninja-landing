"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { getProducts } from "@/components/work/products/product-items";

import ProductPreviewCard from "./product-preview-card";
import SectionHeading from "@/components/ui/section-heading";

const WORK_PAGE_HREF = "/products";

export default function ProductsPreviewSection() {
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "ne";
  const products = getProducts(lang);

  const copy =
    lang === "en"
      ? {
          title: "Products",
          description: "Platforms we've designed, built, and shipped for real institutions.",
          viewAll: "View all products",
        }
      : {
          title: "उत्पादनहरू",
          description: "वास्तविक संस्थाहरूका लागि हामीले डिजाइन, निर्माण र सञ्चालन गरेका प्लेटफर्महरू।",
          viewAll: "सबै उत्पादन हेर्नुहोस्",
        };

  return (
    <section
      aria-label={copy.title}
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ backgroundColor: "var(--page-bg-alt)" }}
    >
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-20 h-96 w-96 rounded-full bg-[#2563EB]/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading
              title={copy.title}
              description={copy.description}
              titleClassName="font-heading text-4xl font-semibold tracking-tight text-[#0b0d12] sm:text-5xl"
              descriptionClassName="mt-5 max-w-2xl text-lg leading-relaxed text-[#5b6472]"
            />
          </div>
          <Link
            href={WORK_PAGE_HREF}
            className="group inline-flex items-center gap-3 self-start rounded-full border border-[#0A1F4D] px-6 py-3 text-sm font-semibold text-[#0A1F4D] transition-colors duration-300 hover:bg-[#0A1F4D] hover:text-white sm:self-auto"
          >
            {copy.viewAll}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductPreviewCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
