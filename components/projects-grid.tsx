"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { fetchProjects, ProjectItem, ProjectCategory } from "@/lib/projects";

type Lang = "en" | "ne";
type Cat = "All" | ProjectCategory;
type Variant = "work" | "solutions";

interface ProjectsGridProps {
  language: Lang;
  title: string;
  variant?: Variant;
}

export default function ProjectsGrid({
  language,
  title,
  variant = "work",
}: ProjectsGridProps) {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [projActive, setProjActive] = useState<Cat>("All");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchProjects()
      .then((data) => {
        if (mounted) setProjects(data);
      })
      .catch((err) => {
        console.error("Error loading projects from PocketBase", err);
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

  const isWork = variant === "work";

  useEffect(() => {
    setProjActive("All");
  }, [language]);

  return (
    <>
      <header className="flex items-center justify-between gap-4">
        <h2
          className={
            isWork
              ? "font-semibold text-[32px]"
              : "text-2xl font-semibold text-[#0b0d12]"
          }
        >
          {title}
        </h2>

        <div className="relative flex items-center gap-2">
          <button
            onClick={() => {
              setProjActive("All");
              setFilterOpen(false);
            }}
            className={
              isWork
                ? `px-4 py-2 text-sm font-medium border transition-colors ${
                    projActive === "All"
                      ? "border-[#0b0d12] text-[#0b0d12]"
                      : "border-[#0b0d12]/20 text-[#0b0d12] hover:border-[#0b0d12]/60"
                  }`
                : `px-4 py-2 text-sm font-medium border rounded-[4px] transition-colors ${
                    projActive === "All"
                      ? "border-[#0b0d12] text-[#0b0d12]"
                      : "border-[#0b0d12]/20 text-[#0b0d12] hover:border-[#0b0d12]/60"
                  }`
            }
          >
            {language === "en" ? "All" : "सबै"}
          </button>

          <button
            onClick={() => setFilterOpen((s) => !s)}
            aria-expanded={filterOpen}
            className={
              isWork
                ? "px-4 py-2 text-sm font-medium border inline-flex items-center gap-1"
                : "px-4 py-2 text-sm font-medium border border-[#0b0d12]/20 text-[#0b0d12] hover:border-[#0b0d12]/60 inline-flex items-center gap-1 rounded-[4px]"
            }
          >
            {language === "en" ? "Filter" : "फिल्टर"}
            <ChevronDown
              size={16}
              className={`transition-transform ${
                filterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {filterOpen && filters.length > 1 && (
            <div
              role="menu"
              className={
                isWork
                  ? "absolute right-0 top-12 w-56 border border-[#0b0d12]/10 bg-white shadow-xl ring-1 ring-black/5 p-2 z-20"
                  : "absolute right-0 top-12 w-56 border border-[#0b0d12]/10 bg-white text-[#0b0d12] shadow-xl ring-1 ring-black/5 p-2 z-20 rounded-[4px]"
              }
            >
              {filters
                .filter((c) => c !== "All")
                .map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setProjActive(c);
                      setFilterOpen(false);
                    }}
                    role="menuitem"
                    aria-selected={projActive === c}
                    className={
                      isWork
                        ? `w-full cursor-pointer text-left px-3 py-2 text-sm transition-colors ${
                            projActive === c
                              ? "text-[#141414] font-medium bg-[#FFFFFF]"
                              : "text-[#0b0d12]/90"
                          } hover:bg-[#0b0d12]/5 hover:text-[#0b0d12] hover:border hover:border-[#0b0d12]/30 focus:outline-none focus:ring-2 focus:ring-[#0b0d12]/30`
                        : `w-full cursor-pointer text-left px-3 py-2 rounded-[4px] text-sm transition-colors ${
                            projActive === c
                              ? "bg-[#0b0d12]/[0.06] text-[#0b0d12] font-medium"
                              : "text-[#0b0d12]/80 hover:bg-[#0b0d12]/[0.06] hover:text-[#0b0d12]"
                          }`
                    }
                  >
                    {translateCat(c)}
                  </button>
                ))}
            </div>
          )}
        </div>
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => {
          const titleText =
            language === "en" ? p.title_en : p.title_ne || p.title_en;
          const blurbText =
            language === "en" ? p.blurb_en : p.blurb_ne || p.blurb_en;
          const imageSrc = p.image || "/placeholder.jpg";
          const categoryLabel = translateCat(p.category_en);

          return (
            <div
              key={p.id}
              className={
                isWork
                  ? "group relative block select-none overflow-hidden border border-[#0b0d12]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  : "group relative block select-none overflow-hidden border border-[#0b0d12]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-[#0b0d12]/30"
              }
            >
              <div
                className={
                  isWork
                    ? "relative aspect-[16/10] bg-[#FFFFFF]/60 flex items-center justify-center text-[#0b0d12]/50 overflow-hidden"
                    : "relative aspect-[16/10] bg-[#0b0d12]/5 flex items-center justify-center text-[#0b0d12]/40 overflow-hidden"
                }
              >
                <img
                  src={imageSrc}
                  alt={titleText}
                  className="object-cover w-full h-full grayscale"
                  onError={(e) => {
                    const targ = e.currentTarget as HTMLImageElement;
                    if (targ.src.endsWith("placeholder.jpg")) return;
                    targ.src = "/placeholder.jpg";
                  }}
                />
              </div>
              <div className="p-6">
                <div
                  className={
                    isWork
                      ? "text-xs font-semibold tracking-wide text-[#0b0d12]/80"
                      : "text-xs font-semibold tracking-wide text-[#0b0d12]/80"
                  }
                >
                  {categoryLabel}
                </div>
                <h3 className="mt-1 text-xl py-2 font-semibold transition-colors">
                  {titleText}
                </h3>
                <p
                  className={
                    isWork ? "mt-2 text-[#0b0d12]/80" : "mt-2 text-[#0b0d12]/80"
                  }
                >
                  {blurbText}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
