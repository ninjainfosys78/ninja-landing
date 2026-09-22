import type { SolutionLang } from "./solution-keys";

export interface SolutionDetailCopy {
  capabilitiesTitle: string;
}

const COPY: Record<SolutionLang, SolutionDetailCopy> = {
  en: {
    capabilitiesTitle: "What we deliver",
  },
  ne: {
    capabilitiesTitle: "हामीले के प्रदान गर्छौँ",
  },
};

export const getSolutionDetailCopy = (language: SolutionLang): SolutionDetailCopy => COPY[language];
