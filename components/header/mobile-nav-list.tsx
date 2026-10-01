"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { MegaMenuColumn } from "@/components/header/nav-mega-menu";
import {
  ABOUT_COLUMNS,
  PRODUCTS_COLUMNS,
  SERVICES_COLUMNS,
  SOLUTIONS_COLUMNS,
} from "@/components/header/nav-mega-menu-items";

interface MobileNavEntry {
  label: string;
  href: string;
  columns?: MegaMenuColumn[];
}

const MOBILE_NAV_ENTRIES: MobileNavEntry[] = [
  { label: "About Us", href: "/about", columns: ABOUT_COLUMNS },
  { label: "Solutions", href: "/solutions", columns: SOLUTIONS_COLUMNS },
  { label: "Products", href: "/products", columns: PRODUCTS_COLUMNS },
  { label: "Services", href: "/services", columns: SERVICES_COLUMNS },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const ENTRY_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

interface MobileNavListProps {
  onNavigate: () => void;
}

export default function MobileNavList({ onNavigate }: MobileNavListProps) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const toggle = (label: string) => setOpenLabel((current) => (current === label ? null : label));

  return (
    <nav className="flex flex-col gap-8 text-2xl font-bold font-heading">
      {MOBILE_NAV_ENTRIES.map((entry) => {
        const subItems = entry.columns?.flatMap((column) => column.items) ?? [];
        const isOpen = openLabel === entry.label;
        return (
          <motion.div key={entry.label} variants={ENTRY_VARIANTS}>
            <div className="flex items-center justify-between gap-4">
              <Link href={entry.href} onClick={onNavigate} className="text-white hover:text-[#7FA8FF] transition-colors">
                {entry.label}
              </Link>
              {subItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => toggle(entry.label)}
                  aria-expanded={isOpen}
                  aria-label={`${entry.label} submenu`}
                  className="p-2 -mr-2 text-white/70 hover:text-white transition-colors"
                >
                  <ChevronDown size={22} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
              )}
            </div>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.ul
                  className="overflow-hidden flex flex-col gap-2 border-l-2 border-[#E31B23] pl-3 text-base"
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {subItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        className="flex items-center justify-between rounded-lg bg-white/[0.07] px-4 py-3 font-semibold text-white/90 hover:bg-white/15 hover:text-white transition-colors"
                      >
                        {item.label}
                        <ChevronRight size={16} className="text-[#E31B23]" />
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </nav>
  );
}
