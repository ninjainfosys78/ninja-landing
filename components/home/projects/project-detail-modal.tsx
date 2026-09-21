"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

import type { ProductItem } from "@/components/work/products/product-items";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export interface ProjectDetailCopy {
  viewInSite: string;
  keyFeatures: string;
  close: string;
}

interface ProjectDetailModalProps {
  product: ProductItem | null;
  copy: ProjectDetailCopy;
  onClose: () => void;
}

function useDismissOnEscape(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);
}

export default function ProjectDetailModal({ product, copy, onClose }: ProjectDetailModalProps) {
  useDismissOnEscape(product !== null, onClose);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1F4D]/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={copy.close}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#0A1F4D] shadow transition-colors hover:bg-white"
            >
              <X size={20} />
            </button>

            <div className="relative aspect-[16/8] overflow-hidden">
              <Image src={product.image} alt={product.name} fill sizes="768px" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0A1F4D]/70 to-transparent" />
              <h3 className="absolute bottom-5 left-6 right-6 font-heading text-3xl font-semibold text-white sm:text-4xl">
                {product.name}
              </h3>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: product.accent }}>
                {product.tagline}
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#3d4655]">{product.overview}</p>

              {product.stats.length > 0 && (
                <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {product.stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-[#D7E4FA] bg-[#F6F9FE] p-4">
                      <dt className="text-xs text-[#5b6472]">{stat.label}</dt>
                      <dd className="mt-1 font-heading text-2xl font-semibold" style={{ color: product.accent }}>
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <h4 className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#0A1F4D]">{copy.keyFeatures}</h4>
              <ul className="mt-3 space-y-2">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-[15px] leading-relaxed text-[#3d4655]">
                    <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: product.accent }} />
                    {highlight}
                  </li>
                ))}
              </ul>

              <a
                href={product.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: product.accent }}
              >
                {copy.viewInSite}
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
