"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal, StaggerWords } from "@/components/ui/reveal";

import type { InsightCopy } from "./insight-copy";

const BLOGS_HREF = "/blogs";

export default function InsightsSectionHeader({ copy }: { copy: InsightCopy }) {
  return (
    <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <h2
          id="insights-title"
          className="font-heading text-4xl font-semibold leading-tight tracking-tight text-[#0b0d12] md:text-6xl"
        >
          <StaggerWords text={copy.title} amount={0.6} />
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-[#5b6472]">{copy.description}</p>
      </div>

      <Link
        href={BLOGS_HREF}
        className="group inline-flex items-center gap-3 self-start rounded-full border border-[#0A1F4D] px-6 py-3 text-sm font-semibold text-[#0A1F4D] transition-colors duration-300 hover:bg-[#0A1F4D] hover:text-white lg:self-auto"
      >
        {copy.viewAll}
        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
      </Link>
    </Reveal>
  );
}
