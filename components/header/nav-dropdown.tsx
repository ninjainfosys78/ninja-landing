import Link from "next/link";

import { navLinkClass } from "./nav-styles";

export interface NavDropdownItem {
  label: string;
  labelNe: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  href: string;
  active: boolean;
  items: NavDropdownItem[];
  language: "en" | "ne";
  panelWidthClass: string;
}

export default function NavDropdown({ label, href, active, items, language, panelWidthClass }: NavDropdownProps) {
  return (
    <div className="group/dropdown relative">
      <Link href={href} className={`${navLinkClass(active)} flex items-center gap-1`}>
        {label}
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 transition-transform duration-300 group-hover/dropdown:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Link>

      <div className="invisible absolute left-0 top-full translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 group-hover/dropdown:opacity-100">
        <div
          className={`${panelWidthClass} flex flex-col gap-1 rounded-2xl border border-white/15 bg-[#0A1F4D]/90 p-2 shadow-[0_24px_48px_-16px_rgba(4,10,28,0.7)] backdrop-blur-xl`}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group/item flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/75 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              <span className="h-1.5 w-1.5 scale-0 rounded-full bg-[#E31B23] transition-transform duration-300 group-hover/item:scale-100" />
              {language === "en" ? item.label : item.labelNe}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
