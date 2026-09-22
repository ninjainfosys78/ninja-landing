import { ArrowUpRight } from "lucide-react";

const FALLBACK_IMAGE = "/placeholder.jpg";

interface ProjectCardProps {
  title: string;
  blurb: string;
  category: string;
  image: string;
}

export default function ProjectCard({ title, blurb, category, image }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#D7E4FA] bg-white shadow-[0_1px_2px_rgba(10,31,77,0.04)] transition-shadow duration-500 hover:shadow-[0_16px_32px_-18px_rgba(10,31,77,0.25)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F6F9FE]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image || FALLBACK_IMAGE}
          alt={title}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.endsWith(FALLBACK_IMAGE)) return;
            target.src = FALLBACK_IMAGE;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F4D]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2563EB] shadow-sm backdrop-blur">
            {category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-xl font-semibold leading-snug text-[#0b0d12]">
          {title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-relaxed text-[#5b6472]">
          {blurb}
        </p>
        <div className="mt-5 h-px w-10 bg-[#2563EB]/40 transition-all duration-500 group-hover:w-full" />
        <span className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F6F9FE] text-[#2563EB] transition-colors duration-300 group-hover:bg-[#2563EB] group-hover:text-white">
          <ArrowUpRight size={16} />
        </span>
      </div>
    </article>
  );
}
