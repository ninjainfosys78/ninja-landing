"use client";

import SolutionCapabilities from "./solution-capabilities";
import SolutionCategoryTabs, { type SolutionTab } from "./solution-category-tabs";
import { getSolutionDetailCopy } from "./solution-detail-copy";
import SolutionOverview from "./solution-overview";
import type { SolutionDetailContent, SolutionKey, SolutionLang } from "./solution-keys";

interface SolutionDetailViewProps {
  language: SolutionLang;
  active: SolutionKey;
  detail: SolutionDetailContent;
  tabs: SolutionTab[];
  onSelect: (key: SolutionKey) => void;
}

export default function SolutionDetailView({ language, active, detail, tabs, onSelect }: SolutionDetailViewProps) {
  const copy = getSolutionDetailCopy(language);
  const activeLabel = tabs.find((tab) => tab.key === active)?.label ?? detail.pageTitle;
  const capabilities = [...detail.bulletsCol1, ...detail.bulletsCol2];

  return (
    <>
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-[#2563EB]/[0.08] blur-3xl" />
        <div className="relative mx-auto max-w-[1450px] px-6 sm:px-10">
          <SolutionCategoryTabs tabs={tabs} active={active} onSelect={onSelect} />
          <div className="mt-16">
            <SolutionOverview solution={active} label={activeLabel} lead={detail.lead} />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24" style={{ backgroundColor: "var(--page-bg-alt)" }}>
        <div className="mx-auto max-w-[1450px] px-6 sm:px-10">
          <SolutionCapabilities
            key={active}
            title={copy.capabilitiesTitle}
            capabilities={capabilities}
          />
        </div>
      </section>
    </>
  );
}
