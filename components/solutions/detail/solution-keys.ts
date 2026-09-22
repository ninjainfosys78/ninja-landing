import { Building2, GraduationCap, HeartPulse, Landmark, Wallet, type LucideIcon } from "lucide-react";

export type SolutionKey = "gov" | "edu" | "health" | "fin" | "corp";
export type SolutionLang = "en" | "ne";

export interface SolutionDetailContent {
  pageTitle: string;
  lead: string;
  bulletsCol1: readonly string[];
  bulletsCol2: readonly string[];
}

export interface SolutionVisual {
  image: string;
  accent: string;
  Icon: LucideIcon;
}

export const SOLUTION_VISUALS: Record<SolutionKey, SolutionVisual> = {
  gov: { image: "/goverment.jpg", accent: "#2563EB", Icon: Landmark },
  edu: { image: "/education.jpg", accent: "#E31B23", Icon: GraduationCap },
  health: { image: "/healthcare.jpg", accent: "#0A1F4D", Icon: HeartPulse },
  fin: { image: "/fintech.jpg", accent: "#2563EB", Icon: Wallet },
  corp: { image: "/corporate.jpg", accent: "#E31B23", Icon: Building2 },
};
