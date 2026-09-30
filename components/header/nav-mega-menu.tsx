"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export interface MegaMenuSidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
  active?: boolean;
}

export interface MegaMenuGridItem {
  icon?: LucideIcon;
  label: string;
  description?: string;
  href: string;
}

export interface MegaMenuColumn {
  title?: string;
  items: MegaMenuGridItem[];
}

export interface MegaMenuPromo {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  image: string;
}

interface NavMegaMenuProps {
  label: string;
  href: string;
  active: boolean;
  sidebar?: MegaMenuSidebarItem[];
  columns: MegaMenuColumn[];
  promo?: MegaMenuPromo;
  /** When true, sidebar items act as tabs: hovering one filters the middle list to that column's items. Requires sidebar.length === columns.length. */
  interactiveSidebar?: boolean;
  /** When true, all columns' items are flattened into a single wrapping grid instead of laid out as separate side-by-side columns. */
  flatGrid?: boolean;
}

function MegaMenuItem({ item }: { item: MegaMenuGridItem }) {
  return (
    <Link
      href={item.href}
      className="group/item flex h-full flex-col items-start gap-2 rounded-xl p-4 transition-colors duration-300 hover:bg-white/5"
    >
      {item.icon && (
        <item.icon className="h-5 w-5 shrink-0 text-white/60 transition-colors duration-300 group-hover/item:text-[#E31B23]" strokeWidth={1.5} />
      )}
      <span className="block w-full break-words text-sm font-semibold text-white transition-colors duration-300 group-hover/item:text-white">
        {item.label}
      </span>
      {item.description && (
        <span className="block w-full break-words text-xs leading-snug text-white/50">{item.description}</span>
      )}
    </Link>
  );
}

export default function NavMegaMenu({
  label,
  href,
  active,
  sidebar,
  columns,
  promo,
  interactiveSidebar,
  flatGrid,
}: NavMegaMenuProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibleItems = interactiveSidebar
    ? columns[activeIndex].items
    : flatGrid
      ? columns.flatMap((c) => c.items)
      : null;

  useEffect(() => {
    setMounted(true);
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = () => {
    cancelClose();
    setOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
      <Link
        href={href}
        className={`relative flex items-center gap-1 px-4 py-2 text-[15px] font-semibold transition-colors duration-300 ${
          active ? "text-white" : "text-white/75 hover:text-white"
        }`}
      >
        {label}
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span
          className={`absolute bottom-0 left-4 right-4 h-[2px] origin-left rounded-full bg-[#E31B23] transition-transform duration-300 ${
            active || open ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </Link>

      {mounted &&
        createPortal(
          <div
            className={`fixed left-0 right-0 top-[89px] z-50 transition-all duration-300 ${
              open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
            }`}
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 2xl:px-16">
              <div className="flex overflow-hidden rounded-b-2xl border border-t-0 border-white/10 bg-[#111111] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                {sidebar && (
                  <div className="w-[220px] shrink-0 border-r border-white/10 p-3">
                    {sidebar.map((item, index) => {
                      const isActive = interactiveSidebar ? index === activeIndex : item.active;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onMouseEnter={interactiveSidebar ? () => setActiveIndex(index) : undefined}
                          onClick={
                            interactiveSidebar
                              ? (e: MouseEvent) => {
                                  e.preventDefault();
                                  setActiveIndex(index);
                                }
                              : undefined
                          }
                          className={`group/side flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors duration-300 focus-visible:ring-0 ${
                            isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <item.icon className="h-4 w-4" strokeWidth={1.75} />
                            {item.label}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-300 group-hover/side:opacity-100" />
                        </Link>
                      );
                    })}
                  </div>
                )}

                {visibleItems ? (
                  <div className="grid min-w-0 flex-1 content-start grid-cols-3 gap-x-10 gap-y-6 p-8 pt-2">
                    {visibleItems.map((item) => (
                      <MegaMenuItem key={item.href} item={item} />
                    ))}
                  </div>
                ) : (
                  <div
                    className="grid min-w-0 flex-1 items-start gap-x-10 gap-y-5 p-8 pt-2"
                    style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
                  >
                    {columns.map((column, colIndex) => (
                      <div key={colIndex} className="flex flex-col gap-4">
                        {column.title && (
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">{column.title}</h4>
                        )}
                        <div className="grid grid-cols-1 gap-y-6">
                          {column.items.map((item) => (
                            <MegaMenuItem key={item.href} item={item} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {promo && (
                  <div className="relative ml-auto w-[280px] shrink-0 overflow-hidden border-l border-white/10 bg-[#111111] py-8 pl-0 pr-8">
                    <div className="relative -mt-8 h-[140px] w-full">
                      <Image src={promo.image} alt="" fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]" />
                    </div>
                    <div className="relative mt-6 pl-3">
                      <h3 className="text-lg font-bold font-heading text-white">{promo.title}</h3>
                      <p className="mt-2 break-words text-xs leading-relaxed text-white/60">{promo.description}</p>
                      <Link
                        href={promo.href}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#E31B23] transition-colors hover:text-[#ff4d55]"
                      >
                        {promo.ctaLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
