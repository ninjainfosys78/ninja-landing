"use client";

import { SOLUTION_VISUALS, type SolutionKey } from "./solution-keys";

export interface SolutionTab {
  key: SolutionKey;
  label: string;
}

interface SolutionCategoryTabsProps {
  tabs: SolutionTab[];
  active: SolutionKey;
  onSelect: (key: SolutionKey) => void;
}

export default function SolutionCategoryTabs({ tabs, active, onSelect }: SolutionCategoryTabsProps) {
  return (
    <div role="tablist" className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
      {tabs.map(({ key, label }) => {
        const { Icon } = SOLUTION_VISUALS[key];
        const isActive = key === active;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(key)}
            className={`inline-flex shrink-0 items-center gap-2.5 rounded-full border px-6 py-3 text-[15px] font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 ${
              isActive
                ? "border-[#0A1F4D] bg-[#0A1F4D] text-white shadow-[0_12px_28px_-12px_rgba(10,31,77,0.6)]"
                : "border-[#D7E4FA] bg-white text-[#2E3A4E] hover:-translate-y-0.5 hover:border-[#2563EB]/50 hover:text-[#2563EB]"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
