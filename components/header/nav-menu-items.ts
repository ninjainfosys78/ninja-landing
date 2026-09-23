import type { NavDropdownItem } from "./nav-dropdown";

export const ABOUT_MENU_ITEMS: NavDropdownItem[] = [
  { label: "Who we are", labelNe: "हामी को हौं", href: "/about#who-we-are" },
  { label: "Our Core", labelNe: "हाम्रो मूल", href: "/about#our-core" },
  { label: "Engineering Principles", labelNe: "सिद्धान्तहरू", href: "/about#engineering-principles" },
  { label: "Leadership", labelNe: "नेतृत्व", href: "/about#leadership" },
  { label: "Our story", labelNe: "हाम्रो कथा", href: "/about#our-story" },
];

export const SOLUTIONS_MENU_ITEMS: NavDropdownItem[] = [
  { label: "Government & Municipality", labelNe: "सरकार तथा नगरपालिका", href: "/solutions#gov" },
  { label: "Education", labelNe: "शिक्षा", href: "/solutions#edu" },
  { label: "Healthcare", labelNe: "स्वास्थ्य", href: "/solutions#health" },
  { label: "Fintech", labelNe: "फिनटेक", href: "/solutions#fin" },
  { label: "Corporate Solutions", labelNe: "कर्पोरेट समाधान", href: "/solutions#corp" },
];
