"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import GlobalCTA from "@/components/global-cta";
import ContactModals from "@/components/contact-modals";
import { useContactModals } from "@/lib/hooks/use-contact-modals";

import ProductImageFrame from "./product-image-frame";
import { getProducts, type ProductSource } from "./product-items";

const WORK_HREF = "/products";

interface ProductDetailClientProps {
  product: ProductSource;
}

export default function ProductDetailClient({ product: source }: ProductDetailClientProps) {
  const { language } = useLanguage();
  const {
    officesOpen, openOffices, closeOffices,
    bookingOpen, openBooking, closeBooking,
    quoteOpen, openQuote, closeQuote,
  } = useContactModals();

  const lang = language === "en" ? "en" : "ne";
  const product = getProducts(lang, [source])[0];

  const t = lang === "en"
    ? { back: "Back to all projects", visitSite: "Visit site", highlights: "What it does" }
    : { back: "सबै प्रोजेक्टमा फर्कनुहोस्", visitSite: "साइटमा हेर्नुहोस्", highlights: "यसले के गर्छ" };

  return (
    <main className="text-[#0b0d12]/80" style={{ backgroundColor: "var(--page-bg)" }}>
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-20 h-96 w-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${product.accent}14` }}
        />

        <div className="relative mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
          <Link
            href={WORK_HREF}
            className="group mb-10 inline-flex items-center gap-2 text-[#0b0d12]/50 transition-colors hover:text-[#0b0d12]"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="text-xs font-bold uppercase tracking-widest">{t.back}</span>
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p
                className="text-sm font-semibold normal-case tracking-[0.15em]"
                style={{ color: product.accent }}
              >
                {product.tagline}
              </p>
              <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-[#0b0d12] sm:text-6xl">
                {product.name}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5b6472]">
                {product.overview}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={product.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: product.accent }}
                >
                  {t.visitSite}
                  <ExternalLink size={16} />
                </a>

                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#D7E4FA] bg-white px-4 py-2 text-xs font-medium text-[#2E3A4E]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <ProductImageFrame src={product.image} alt={product.name} accent={product.accent} fit={product.imageFit} />
          </div>

          {/* Stat badges in one elevated panel, divided by thin lines centered in real
              whitespace — the same "subtle yet classy" pattern beetechsolution.com uses
              for its own badge row, rather than plain text sitting in open space. */}
          {product.stats.length > 0 && (
            <div className="relative mt-10 inline-block overflow-hidden rounded-2xl border border-[#0b0d12]/5 bg-white px-6 py-5 shadow-[0_12px_40px_rgba(15,23,42,0.06),0_30px_60px_rgba(15,23,42,0.04)]">
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-x-8">
                {product.stats.map((stat, idx) => (
                  <div
                    key={stat.label}
                    className="border-[#0b0d12]/8 sm:border-l sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
                  >
                    <div className="font-heading text-2xl font-bold sm:text-3xl" style={{ color: product.accent }}>
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-[#5b6472]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-[#0b0d12]/8 py-20 sm:py-28" style={{ backgroundColor: "var(--page-bg-alt)" }}>
        <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
          <h2 className="mb-10 font-heading text-3xl font-bold tracking-tight text-[#0b0d12] sm:text-4xl">
            {t.highlights}
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {product.highlights.map((point) => (
              <div
                key={point}
                className="flex items-start gap-4 rounded-2xl border border-[#eef1f6] bg-white p-6 shadow-[0_1px_2px_rgba(10,31,77,0.03),0_8px_18px_-14px_rgba(10,31,77,0.10)]"
                style={{ borderLeftWidth: 4, borderLeftColor: product.accent }}
              >
                <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0" style={{ color: product.accent }} />
                <span className="text-[15px] leading-relaxed text-[#0b0d12]/75">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GlobalCTA onOfficesOpen={openOffices} onBookingOpen={openBooking} onQuoteOpen={openQuote} />

      <ContactModals
        officesOpen={officesOpen}
        onOfficesClose={closeOffices}
        bookingOpen={bookingOpen}
        onBookingClose={closeBooking}
        quoteOpen={quoteOpen}
        onQuoteClose={closeQuote}
      />
    </main>
  );
}
