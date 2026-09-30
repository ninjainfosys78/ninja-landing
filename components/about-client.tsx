"use client";
import React, { useState, useEffect, useMemo } from "react";
import BannerSubtitle from "@/components/ui/banner-subtitle";
import { motion } from "framer-motion";
import Link from "next/link";
import ContactModals from "@/components/contact-modals";
import OurStorySection from "@/components/about/our-story-section";
import WhoWeAreSection from "@/components/about/who-we-are-section";
import FounderSpotlight from "@/components/about/team/founder-spotlight";
import LeadershipSection from "@/components/about/team/leadership-section";
import { useContactModals } from "@/lib/hooks/use-contact-modals";
import { useLanguage } from "@/components/LanguageProvider";
import { getBannerByImgName } from "@/lib/banners";
import { getAboutContent } from "@/lib/about-content";
import type { StoryMilestone } from "@/lib/story/story-milestone";
import type { TeamMember } from "@/lib/team";
import { StaggerWords, useMounted } from "@/components/ui/reveal";
import { PillarCardGrid } from "@/components/ui/pillar-card";

interface AboutClientProps {
  teamMembers: TeamMember[];
  storyMilestones?: StoryMilestone[];
  teamGridMembers?: TeamMember[];
}

export default function AboutClient({
  teamMembers,
  teamGridMembers = [],
  storyMilestones = [],
}: AboutClientProps) {
  const { language } = useLanguage();
  // Framer Motion's SSR output bakes the already-visible "show" state instead
  // of "hidden" for whileInView-driven elements, so on refresh anything
  // already in view never visibly animates. Forcing "hidden" via an explicit
  // `animate` prop until mount guarantees a genuine hidden first paint (see
  // components/ui/reveal.tsx for the fuller explanation).
  const mounted = useMounted();
  const {
    officesOpen, closeOffices,
    bookingOpen, closeBooking,
    quoteOpen, closeQuote
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
    () => getAboutContent(language, teamMembers, teamGridMembers, storyMilestones),
    [language, teamMembers, teamGridMembers, storyMilestones]
  );

  return (
    <>
      <main className="relative bg-background text-foreground transition-colors duration-300">
        <section className="relative z-10">
          <div className="relative min-h-[34vh] overflow-hidden pb-12 pt-28 lg:pb-14 lg:pt-32">
            <div
              className="absolute inset-0 bg-center bg-fixed"
              style={{
                backgroundImage: `url('${bannerUrl || "/about.jpg"}')`,
                backgroundSize: "cover",
              }}
            />
            <div className="absolute inset-0 hero-dark-overlay" />

            <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
              <div className="mx-auto max-w-[1200px] text-center">
                <nav
                  aria-label="Breadcrumb"
                  className="mt-0 text-sm text-white"
                >
                  <ol className="flex items-center justify-center gap-3">
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

                <h1 className="pt-4 text-5xl font-heading font-semibold text-white sm:text-6xl text-center">
                  <StaggerWords text={content.heroTitle} />
                </h1>
                <BannerSubtitle>
                  {language === 'en'
                    ? 'Meet the people, the values and the story behind the digital systems we build for institutions across Nepal.'
                    : 'नेपालभरका संस्थाहरूका लागि हामीले बनाउने डिजिटल प्रणालीहरूको पछाडिका मानिस, मूल्य र कथा चिन्नुहोस्।'}
                </BannerSubtitle>
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
                animate={!mounted ? { opacity: 0, y: 20 } : undefined}
                viewport={{ once: true }}
                className="text-4xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight"
              >
                {content.coreTitle}
              </motion.h3>
            </div>

            <PillarCardGrid pillars={content.core.map(({ icon, title, body }) => ({ icon, title, text: body }))} />
          </div>
        </section>

        <section id="engineering-principles" className="relative z-10 bg-muted">
          <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
            <div className="max-w-2xl mb-14 lg:mb-16">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={!mounted ? { opacity: 0, y: 20 } : undefined}
                viewport={{ once: true }}
                className="text-4xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight"
              >
                {content.principlesTitle}
              </motion.h3>
            </div>

            <div className="border-t border-foreground/10">
              {content.principles.map((p, idx) => {
                const Icon = p.icon;
                const fromLeft = idx % 2 === 0;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: fromLeft ? -80 : 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    animate={!mounted ? { opacity: 0, x: fromLeft ? -80 : 80 } : undefined}
                    viewport={{ once: true, amount: 0.5, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 1.2, delay: idx * 0.18, ease: [0.16, 1, 0.3, 1] }}
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

        <FounderSpotlight
          eyebrow={content.founderEyebrow}
          title={language === 'en' ? 'Meet the' : 'चिनौं'}
          accent={language === 'en' ? 'Founder' : 'हाम्रा संस्थापक'}
          member={content.founder}
        />

        <LeadershipSection
          eyebrow={content.teamEyebrow}
          title={language === 'en' ? 'The People' : 'हाम्रो काम'}
          accent={language === 'en' ? 'Behind the Work' : 'पछाडिका व्यक्तिहरू'}
          members={content.otherLeaders}
        />

        <OurStorySection
          storyTitle={content.storyTitle}
          timeline={content.timeline}
          language={language}
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
