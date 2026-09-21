"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { getProducts, type ProductItem } from "@/components/work/products/product-items";

import ProjectDetailModal from "./project-detail-modal";
import ProjectPreviewCard from "./project-preview-card";
import SectionHeading from "@/components/ui/section-heading";

const WORK_PAGE_HREF = "/work";

export default function ProjectsPreviewSection() {
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "ne";
  const products = getProducts(lang);
  const [selected, setSelected] = useState<ProductItem | null>(null);

  const copy =
    lang === "en"
      ? { title: "Projects", viewAll: "View all projects", viewInSite: "View in site", keyFeatures: "Key features", close: "Close" }
      : { title: "प्रोजेक्टहरू", viewAll: "सबै परियोजना हेर्नुहोस्", viewInSite: "साइटमा हेर्नुहोस्", keyFeatures: "मुख्य विशेषताहरू", close: "बन्द गर्नुहोस्" };

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
              titleClassName="font-heading text-4xl font-semibold tracking-tight text-[#0b0d12] sm:text-5xl"
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
            <ProjectPreviewCard key={product.id} product={product} index={index} onSelect={setSelected} />
          ))}
        </div>
      </div>
      <ProjectDetailModal product={selected} copy={copy} onClose={() => setSelected(null)} />
    </section>
  );
}
