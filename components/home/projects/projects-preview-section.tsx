"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import SectionHeading from "@/components/ui/section-heading";
import ProjectCard from "@/components/work/projects/project-card";
import { fetchProjects, type ProjectItem } from "@/lib/projects";

const WORK_PAGE_HREF = "/products";
const PREVIEW_PROJECT_COUNT = 3;

export default function ProjectsPreviewSection() {
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "ne";
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchProjects().then((items) => {
      if (mounted) setProjects(items.slice(0, PREVIEW_PROJECT_COUNT));
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (projects.length === 0) return null;

  const copy =
    lang === "en"
      ? {
          title: "Projects",
          description: "Recent engagements where we delivered outcomes for institutions across sectors.",
          viewAll: "View all projects",
        }
      : {
          title: "प्रोजेक्टहरू",
          description: "विभिन्न क्षेत्रका संस्थाहरूका लागि हामीले परिणाम दिएका हालका परियोजनाहरू।",
          viewAll: "सबै परियोजना हेर्नुहोस्",
        };

  return (
    <section aria-label={copy.title} className="py-20 sm:py-28" style={{ backgroundColor: "var(--page-bg)" }}>
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title={copy.title}
            description={copy.description}
            titleClassName="font-heading text-4xl font-semibold tracking-tight text-[#0b0d12] sm:text-5xl"
            descriptionClassName="mt-5 max-w-2xl text-lg leading-relaxed text-[#5b6472]"
          />
          <Link
            href={WORK_PAGE_HREF}
            className="group inline-flex items-center gap-3 self-start rounded-full border border-[#0A1F4D] px-6 py-3 text-sm font-semibold text-[#0A1F4D] transition-colors duration-300 hover:bg-[#0A1F4D] hover:text-white sm:self-auto"
          >
            {copy.viewAll}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard
              key={p.id}
              title={lang === "en" ? p.title_en : p.title_ne || p.title_en}
              blurb={lang === "en" ? p.blurb_en : p.blurb_ne || p.blurb_en}
              category={lang === "en" ? p.category_en : p.category_ne}
              image={p.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
