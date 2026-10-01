"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, CalendarCheck, ShieldCheck, Wallet, LineChart, Users, Layers } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import ContactModals from "@/components/contact-modals";
import { useContactModals } from "@/lib/hooks/use-contact-modals";

import ProductImageFrame from "./product-image-frame";
import { getProducts, type ProductSource } from "./product-items";

const WORK_HREF = "/products";
const CAPABILITY_ICONS = [ShieldCheck, Wallet, LineChart, Users, Layers];

interface ProductDetailClientProps {
  product: ProductSource;
}

export default function ProductDetailClient({ product: source }: ProductDetailClientProps) {
  const { language } = useLanguage();
  const {
    officesOpen, closeOffices,
    bookingOpen, closeBooking,
    quoteOpen, closeQuote,
    openBooking,
  } = useContactModals();

  const lang = language === "en" ? "en" : "ne";
  const product = getProducts(lang, [source])[0];

  const t = lang === "en"
    ? {
        back: "Back to all projects",
        visitSite: "Visit site",
        requestDemo: "Request Demo",
        capabilitiesLabel: "Integrated capabilities",
        capabilitiesTitle: "Built for scale, accountability & impact",
        ctaLabel: "Ready for deployment",
        ctaTitle: `Empower your organization with ${product.name}`,
        ctaLead: "Connect with our system architects to schedule a sandbox demonstration configured to your workflows.",
        ctaPrimary: "Contact us",
      }
    : {
        back: "सबै प्रोजेक्टमा फर्कनुहोस्",
        visitSite: "साइटमा हेर्नुहोस्",
        requestDemo: "डेमो अनुरोध गर्नुहोस्",
        capabilitiesLabel: "एकीकृत क्षमताहरू",
        capabilitiesTitle: "स्केल र प्रभावका लागि निर्मित",
        ctaLabel: "प्रयोगका लागि तयार",
        ctaTitle: `${product.name} सँग आफ्नो संस्था सशक्त बनाउनुहोस्`,
        ctaLead: "तपाईंको कार्यप्रवाह अनुसार कन्फिगर गरिएको स्यान्डबक्स डेमोका लागि हाम्रा सिस्टम आर्किटेक्टहरूसँग सम्पर्क गर्नुहोस्।",
        ctaPrimary: "सम्पर्क गर्नुहोस्",
      };

  const capabilities = product.highlights.map((point) => {
    const splitAt = point.indexOf(":");
    return splitAt === -1
      ? { title: point, description: "" }
      : { title: point.slice(0, splitAt).trim(), description: point.slice(splitAt + 1).trim() };
  });

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
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
                style={{ backgroundColor: `${product.accent}14`, color: product.accent }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: product.accent }} />
                {product.tagline}
              </span>
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
                <button
                  type="button"
                  onClick={openBooking}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D7E4FA] bg-white px-6 py-3 text-sm font-semibold text-[#0b0d12] transition-colors hover:border-[#0b0d12]/20"
                >
                  <CalendarCheck size={16} />
                  {t.requestDemo}
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#D7E4FA] bg-white px-4 py-2 text-xs font-medium text-[#2E3A4E]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {product.stats.length > 0 && (
                <div className="mt-8 inline-flex flex-wrap items-stretch gap-x-8 gap-y-4 rounded-2xl border border-[#eef1f6] bg-white px-7 py-5 shadow-[0_1px_2px_rgba(10,31,77,0.03),0_8px_18px_-14px_rgba(10,31,77,0.10)]">
                  {product.stats.map((stat, idx) => (
                    <div
                      key={stat.label}
                      className={idx > 0 ? "border-l border-[#D7E4FA] pl-8" : ""}
                    >
                      <div className="font-heading text-2xl font-bold" style={{ color: product.accent }}>
                        {stat.value}
                      </div>
                      <div className="mt-1 text-xs text-[#5b6472]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <ProductImageFrame
              src={product.image}
              alt={product.name}
              accent={product.accent}
              fit={product.imageFit}
              siteUrl={product.siteUrl}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-[#0b0d12]/8 py-14 sm:py-20" style={{ backgroundColor: "var(--page-bg-alt)" }}>
        <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: product.accent }}>
              {t.capabilitiesLabel}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#0b0d12] sm:text-4xl">
              {t.capabilitiesTitle}
            </h2>
          </div>

          <div data-no-reveal className="mt-8 grid gap-4 sm:grid-cols-2">
            {capabilities.map((capability, idx) => {
              const Icon = CAPABILITY_ICONS[idx % CAPABILITY_ICONS.length];
              return (
                <div
                  key={capability.title}
                  className="flex items-start gap-4 rounded-xl border border-[#eef1f6] bg-white p-4 shadow-[0_1px_2px_rgba(10,31,77,0.03),0_8px_18px_-14px_rgba(10,31,77,0.10)]"
                >
                  <span
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${product.accent}14`, color: product.accent }}
                  >
                    <Icon size={16} />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-[#0b0d12]">{capability.title}</h3>
                    {capability.description && (
                      <p className="mt-1 text-sm leading-relaxed text-[#5b6472]">{capability.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-14 sm:pb-20" style={{ backgroundColor: "var(--page-bg-alt)" }}>
        <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
          <div
            data-no-reveal
            className="flex flex-col gap-8 rounded-3xl px-8 py-14 sm:px-12 lg:flex-row lg:items-center lg:justify-between"
            style={{ backgroundColor: "#0A1F4D" }}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/60">{t.ctaLabel}</p>
              <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-white sm:whitespace-nowrap sm:text-3xl">
                {t.ctaTitle}
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">{t.ctaLead}</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex flex-shrink-0 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: product.accent }}
            >
              {t.ctaPrimary}
            </Link>
          </div>
        </div>
      </section>

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
