"use client";
import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
const Testimonials: React.ComponentType<any> = dynamic(
  () => import("@/components/testimonials").then((m) => m.default ?? m),
  { ssr: false }
);
import { motion } from "framer-motion";
import Link from "next/link";
import GlobalCTA from "@/components/global-cta";
import ContactModals from "@/components/contact-modals";
import OurStorySection from "@/components/about/our-story-section";
import WhoWeAreSection from "@/components/about/who-we-are-section";
import LeadershipSection from "@/components/about/team/leadership-section";
import TeamMarqueeSection from "@/components/about/team/team-marquee-section";
import { useContactModals } from "@/lib/hooks/use-contact-modals";
import { useLanguage } from "@/components/LanguageProvider";
import { getBannerByImgName } from "@/lib/banners";
import { getAboutContent } from "@/lib/about-content";
import type { TeamMember } from "@/lib/team";

interface AboutClientProps {
  teamMembers: TeamMember[];
  teamGridMembers?: TeamMember[];
}

export default function AboutClient({ teamMembers, teamGridMembers = [] }: AboutClientProps) {
  const { language } = useLanguage();
  const {
    officesOpen, openOffices, closeOffices,
    bookingOpen, openBooking, closeBooking,
    quoteOpen, openQuote, closeQuote
  } = useContactModals();
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [secondImageUrl, setSecondImageUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    getBannerByImgName("about")
      .then((url) => {
        if (!mounted) return;
        setBannerUrl(url || "/about.jpg");
      })
      .catch(() => {
        if (!mounted) return;
        setBannerUrl("/about.jpg");
      });

    getBannerByImgName("about-2")
      .then((url) => {
        if (!mounted) return;
        setSecondImageUrl(url || "/about-2.png");
      })
      .catch(() => {
        if (!mounted) return;
        setSecondImageUrl("/about-2.png");
      });

    return () => {
      mounted = false;
    };
  }, []);

  const content = useMemo(
    () => getAboutContent(language, teamMembers, teamGridMembers),
    [language, teamMembers, teamGridMembers]
  );

  return (
    <>
      <main className="relative bg-background text-foreground transition-colors duration-300">
        <section className="relative z-10">
          <div className="relative min-h-[50vh] pt-28 lg:pt-32">
            <div
              className="absolute inset-0 bg-center bg-fixed filter grayscale"
              style={{
                backgroundImage: `url('${bannerUrl || "/about.jpg"}')`,
                backgroundSize: "cover",
              }}
            />
            <div className="absolute inset-0 bg-[#0b0d12]/80" />

            <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
              <div className="max-w-[1600px] text-left">
                <nav
                  aria-label="Breadcrumb"
                  className="mt-0 text-sm text-white"
                >
                  <ol className="flex items-center gap-3">
                    <li>
                      <Link
                        href="/"
                        className="font-medium tracking-wide hover:text-white/80"
                      >
                        {content.brand}
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
                    <li className="font-medium tracking-wide">
                      {content.heroTitle}
                    </li>
                  </ol>
                </nav>

                <h1 className="pt-4 text-5xl font-heading font-semibold text-white sm:text-6xl text-left">
                  {content.heroTitle}
                </h1>
              </div>
            </div>
          </div>
        </section>

        <WhoWeAreSection
          who={content.who}
          whoDesc={content.whoDesc}
          features={content.features}
          imageUrl={secondImageUrl}
        />

        <section id="our-core" className="relative z-10 bg-background">
          <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto mb-14 lg:mb-16 text-center">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight"
              >
                {content.coreTitle}
              </motion.h3>
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
              {content.core.map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="card-premium group flex flex-col items-center p-8 py-12 text-center lg:p-10 lg:py-14"
                >
                  <span className="icon-tile mb-7 h-16 w-16">
                    <Icon size={30} />
                  </span>
                  <h3 className="mb-3 text-xl font-heading font-bold text-foreground text-center">
                    {title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-foreground/65 text-center">
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="engineering-principles" className="relative z-10 bg-muted">
          <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
            <div className="max-w-2xl mb-14 lg:mb-16">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight"
              >
                {content.principlesTitle}
              </motion.h3>
            </div>

            <div className="border-t border-foreground/10">
              {content.principles.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="group grid grid-cols-1 items-start gap-5 border-b border-foreground/10 py-10 transition-colors duration-300 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-12"
                  >
                    <span className="font-heading text-5xl font-bold text-foreground/10 transition-colors duration-300 group-hover:text-[#2563EB]/25 lg:col-span-2">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-4 lg:col-span-4">
                      <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] transition-all duration-300 group-hover:bg-[#2563EB] group-hover:text-white">
                        <Icon size={20} />
                      </span>
                      <h3 className="text-xl font-heading font-bold text-foreground text-left">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/60 lg:col-span-6">
                      {p.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <LeadershipSection
          eyebrow={content.teamEyebrow}
          title={language === 'en' ? 'Get to Know' : 'चिनौं'}
          accent={language === 'en' ? 'Our Leaders' : 'हाम्रा नेतृत्वकर्ता'}
          members={content.leaders}
        />

        <TeamMarqueeSection
          title={language === 'en' ? 'The People Behind' : 'काम पछाडिका'}
          accent={language === 'en' ? 'the Work' : 'मानिसहरू'}
          subtitle={content.teamSubtitle}
          members={content.team}
        />

        <OurStorySection
          storyTitle={content.storyTitle}
          timeline={content.timeline}
          language={language}
        />

        <GlobalCTA
          onOfficesOpen={openOffices}
          onBookingOpen={openBooking}
          onQuoteOpen={openQuote}
        />
      </main>

      <ContactModals
        officesOpen={officesOpen}
        onOfficesClose={closeOffices}
        bookingOpen={bookingOpen}
        onBookingClose={closeBooking}
        quoteOpen={quoteOpen}
        onQuoteClose={closeQuote}
      />
    </>
  );
}
