// Pages whose top section is a full-bleed banner/hero, so the navbar can sit
// transparently on top of it. Every other page opens on a light background and
// needs the solid navbar from the start.
const HERO_ROUTE_PREFIXES = ["/about", "/solutions", "/blogs", "/careers", "/products", "/contact", "/partners"];

export function hasHeroBanner(pathname: string): boolean {
  if (pathname === "/") return true;
  return HERO_ROUTE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function isActiveLink(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const LINK_BASE = "relative px-4 py-2 text-[15px] font-semibold transition-colors duration-300";

export function navLinkClass(active: boolean): string {
  const state = active ? "text-white" : "text-white/75 hover:text-white";
  return `${LINK_BASE} ${state}`;
}
