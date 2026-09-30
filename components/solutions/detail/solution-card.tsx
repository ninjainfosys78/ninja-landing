import Image from "next/image";
import { Check } from "lucide-react";

import { SOLUTION_VISUALS, type SolutionKey } from "./solution-keys";

interface SolutionCardProps {
  solution: SolutionKey;
  title: string;
  lead: string;
  capabilitiesTitle: string;
  capabilities: readonly string[];
}

export default function SolutionCard({ solution, title, lead, capabilitiesTitle, capabilities }: SolutionCardProps) {
  const { image, accent, Icon } = SOLUTION_VISUALS[solution];

  return (
    <article
      id={solution}
      className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-[#D7E4FA] bg-white shadow-[0_1px_2px_rgba(10,31,77,0.04)] transition-shadow duration-500 hover:shadow-[0_16px_32px_-18px_rgba(10,31,77,0.25)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#F6F9FE]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F4D]/50 via-transparent to-transparent" />
        <span
          className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-lg"
          style={{ backgroundColor: accent }}
        >
          <Icon size={20} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-heading text-xl font-semibold leading-snug text-[#0b0d12] sm:text-2xl">
          {title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-[#5b6472]">{lead}</p>

        <p className="mt-5 border-t border-[#EEF2FB] pt-5 text-xs font-semibold uppercase tracking-wider text-[#5b6472]">
          {capabilitiesTitle}
        </p>
        <ul className="mt-3 flex-1 space-y-3">
          {capabilities.map((capability) => (
            <li key={capability} className="flex items-start gap-3">
              <span
                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
                style={{ backgroundColor: accent }}
              >
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="text-sm leading-relaxed text-[#0b0d12]">{capability}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
