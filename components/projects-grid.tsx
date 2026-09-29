"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchProjects, ProjectItem, ProjectCategory } from "@/lib/projects";
import ProjectCard from "@/components/work/projects/project-card";
import ProjectFilterChips from "@/components/work/projects/project-filter-chips";
import SectionHeading from "@/components/ui/section-heading";

type Lang = "en" | "ne";
type Cat = "All" | ProjectCategory;

interface ProjectsGridProps {
  language: Lang;
  title: string;
}

export default function ProjectsGrid({
  language,
  title,
}: ProjectsGridProps) {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [projActive, setProjActive] = useState<Cat>("All");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchProjects()
      .then((data) => {
        if (mounted) setProjects(data);
      })
      .catch((err) => {
        console.error("Error loading projects from PocketBase", err);
      })
      .finally(() => {
        if (mounted) setLoaded(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const categoryLabels = useMemo(() => {
    const map = new Map<
      string,
      {
        en: string;
        ne: string;
      }
    >();

    projects.forEach((p) => {
      const key = p.category_en || "";
      if (!key) return;
      if (!map.has(key)) {
        map.set(key, {
          en: p.category_en,
          ne: p.category_ne || p.category_en,
        });
      }
    });

    return map;
  }, [projects]);

  const filters: Cat[] = useMemo(() => {
    const unique: string[] = [];
    projects.forEach((p) => {
      const key = p.category_en || "";
      if (!key) return;
      if (!unique.includes(key)) unique.push(key);
    });
    return ["All", ...unique];
  }, [projects]);

  const translateCat = (cat: Cat) => {
    if (cat === "All") return language === "en" ? "All" : "सबै";
    const entry = categoryLabels.get(cat);
    if (!entry) return cat;
    return language === "en" ? entry.en : entry.ne;
  };

  const filtered = useMemo(
    () =>
      projActive === "All"
        ? projects
        : projects.filter((p) => p.category_en === projActive),
    [projActive, projects]
  );

  useEffect(() => {
    setProjActive("All");
  }, [language]);

  const filterOptions = filters.map((f) => ({ value: f, label: translateCat(f) }));

  if (!loaded || projects.length === 0) return null;

  return (
    <section className="py-20 sm:py-28" style={{ backgroundColor: "var(--page-bg)" }}>
      <div className="mx-auto max-w-[1450px] px-6 sm:px-10">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          title={title}
          titleClassName="font-heading text-4xl font-semibold tracking-tight text-[#0b0d12] sm:text-5xl"
        />
        <ProjectFilterChips
          options={filterOptions}
          active={projActive}
          onChange={(value) => setProjActive(value as Cat)}
        />
      </header>

      <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard
            key={p.id}
            title={language === "en" ? p.title_en : p.title_ne || p.title_en}
            blurb={language === "en" ? p.blurb_en : p.blurb_ne || p.blurb_en}
            category={translateCat(p.category_en)}
            image={p.image}
          />
        ))}
      </div>
      </div>
    </section>
  );
}
