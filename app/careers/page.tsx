"use client";

import { useEffect, useState } from "react";
import SearchOverlay from "@/components/search-overlay";
import Link from "next/link";
import GlobalCTA from "@/components/global-cta";
import OfficesModal from "@/components/offices-modal";
import { useLanguage } from "@/components/LanguageProvider";
import { getBannerByImgName } from "@/lib/banners";

export default function CareersPage() {
  const { language } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);
  const [officesOpen, setOfficesOpen] = useState(false);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  const content = {
    en: {
      hero: { kicker: "LIFE AT NINJA INFOSYS", title: "Careers" },
      body: {
        noOpenings: "Currently, there are no active openings at Ninja Infosys.",
        stayTuned: "Please stay tuned — new opportunities will be announced here soon.",
        breadcrumbHome: "Ninja Infosys",
      },
    },
    ne: {
      hero: { kicker: "निन्जा इन्फोसिसमा जीवन", title: "क्यारियर" },
      body: {
        noOpenings: "हाल निन्जा इन्फोसिसमा कुनै सक्रिय अवसरहरू छैनन्।",
        stayTuned: "कृपया पर्खिनुहोस् — नयाँ अवसरहरू चाँडै यहाँ प्रकाशित गरिनेछ।",
        breadcrumbHome: "निन्जा इन्फोसिस",
      },
    },
  } as const;

  const t = content[language];

  useEffect(() => {
    let mounted = true;
    getBannerByImgName("career")
      .then((url) => {
        if (!mounted) return;
        if (url) setBannerUrl(url);
        else setBannerUrl(null);
      })
      .catch((err) => {
        console.error("Error loading career banner:", err);
        if (!mounted) return;
        setBannerUrl(null);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <main className="relative bg-background text-foreground">
        <section className="relative z-10">
          <div className="relative min-h-[70vh]">
            <div
              className="absolute inset-0 bg-center bg-fixed grayscale"
              style={{
                backgroundImage: `url('${bannerUrl || "/careers.png"}')`,
                backgroundSize: "cover",
              }}
            />
            <div className="absolute inset-0 bg-[#0b0d12]/65" />
            <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12 flex items-center min-h-[70vh]">
              <div className="max-w-[1200px] text-left">
                <nav aria-label="Breadcrumb" className="mt-0 text-sm text-white/80">
                  <ol className="flex items-center gap-3">
                    <li>
                      <Link href="/" className="font-medium tracking-wide hover:text-white">
                        {t.body.breadcrumbHome}
                      </Link>
                    </li>
                    <li aria-hidden className="inline-flex items-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-white/70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </li>
                    <li className="font-medium tracking-wide">{t.hero.title}</li>
                  </ol>
                </nav>

                <h1 className="pt-4 text-5xl sm:text-6xl font-heading font-semibold text-white">
                  {t.hero.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-foreground/10" style={{ backgroundColor: "#EFEDE7" }}>
          <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
            <div className="py-12 sm:py-16">
              <div className="max-w-3xl">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center border border-foreground/20 bg-foreground/5">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-foreground/90"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M9 9l6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-foreground/90">{t.body.noOpenings}</p>
                    <p className="mt-2 text-foreground/70 text-sm">{t.body.stayTuned}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <GlobalCTA onOfficesOpen={() => setOfficesOpen(true)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <OfficesModal isOpen={officesOpen} onClose={() => setOfficesOpen(false)} />
    </>
  );
}
