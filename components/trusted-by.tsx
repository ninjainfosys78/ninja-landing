import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { fetchTrustedLogos, TrustedLogoRecord } from "@/lib/trustedby";
import { Reveal, AmbientGlow, StaggerWords } from "@/components/ui/reveal";

interface TrustedByProps {
  initialLogos?: TrustedLogoRecord[];
}

// Every logo renders inside this same box (object-contain, so nothing is
// stretched or cropped) so the strip reads as one consistent row no matter
// how differently sized the uploaded source images are.
const LOGO_BOX_WIDTH = 160;
const LOGO_BOX_HEIGHT = 64;
const LOGO_GAP_DESKTOP = 24;
const LOGO_GAP_MOBILE = 12;

// The loop only ever repeats the two on-screen copies of one "group" of
// logos, so if the real logo count is small, a single group is narrower
// than the screen — the track finishes scrolling through it with empty
// space still left to fill before it can wrap, which reads as the strip
// "running out" before it loops. Repeating the source list until each
// group has at least this many items guarantees a group is always wide
// enough to fill the screen (and then some), so the wrap is never visible.
const MIN_GROUP_ITEMS = 14;
const MARQUEE_PX_PER_SECOND = 88;
const MIN_DURATION_SECONDS = 8;

function buildLoopGroup(list: TrustedLogoRecord[]): TrustedLogoRecord[] {
  if (list.length === 0) return [];
  const group: TrustedLogoRecord[] = [];
  while (group.length < MIN_GROUP_ITEMS) group.push(...list);
  return group;
}

function groupDurationSeconds(itemCount: number, boxWidth: number, gap: number): number {
  const groupWidthPx = itemCount * (boxWidth + gap);
  return Math.max(MIN_DURATION_SECONDS, groupWidthPx / MARQUEE_PX_PER_SECOND);
}

function TrustedLogoItem({ item }: { item: TrustedLogoRecord }) {
  return (
    <motion.div
      className="marquee__item"
      whileHover={{ y: -8, scale: 1.08 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
    >
      {item.logo ? (
        <Image
          src={item.logo}
          alt={item.logoName}
          width={LOGO_BOX_WIDTH}
          height={LOGO_BOX_HEIGHT}
          className="h-full w-full object-contain block hover:drop-shadow-[0_12px_24px_rgba(37,99,235,0.25)] transition-all duration-300"
        />
      ) : (
        <div className="text-[#0b0d12]/50 text-center font-bold text-lg tracking-wide whitespace-nowrap">
          {item.logoName}
        </div>
      )}
    </motion.div>
  );
}

export default function TrustedBy({ initialLogos = [] }: TrustedByProps) {
  const { language } = useLanguage();
  const [logos, setLogos] = useState<TrustedLogoRecord[]>(initialLogos);

  useEffect(() => {
    // Only fetch if we didn't get initialLogos (fallback)
    if (initialLogos.length > 0) return;

    let cancelled = false;
    fetchTrustedLogos()
      .then((data) => {
        if (cancelled) return;
        setLogos(data);
      })
      .catch(() => {
        if (cancelled) return;
        setLogos([]);
      });

    return () => {
      cancelled = true;
    };
  }, [initialLogos]);

  const list = logos;
  const group = buildLoopGroup(list);
  const desktopDuration = groupDurationSeconds(group.length, LOGO_BOX_WIDTH, LOGO_GAP_DESKTOP);
  const mobileDuration = groupDurationSeconds(group.length, 120, LOGO_GAP_MOBILE);

  return (
    <section
      id="partners"
      className="py-12 relative z-[5] overflow-hidden"
      style={{ backgroundColor: 'var(--page-bg-alt)', borderTop: '1px solid rgba(11,13,18,0.06)', borderBottom: '1px solid rgba(11,13,18,0.08)' }}
    >
      <AmbientGlow />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <StaggerWords
            text={language === "ne" ? "प्रमुख संस्थाहरूद्वारा विश्वास गरिएको" : "Trusted by leading organizations"}
            className="text-xl sm:text-2xl font-semibold tracking-tight text-center"
            amount={0.6}
          />
        </div>

        <Reveal delay={0.1} className="relative">
          {/* Edge fade masks so logos scroll in/out instead of clipping abruptly */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-20 bg-gradient-to-r from-[var(--page-bg-alt)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-20 bg-gradient-to-l from-[var(--page-bg-alt)] to-transparent" />

          <div
            className="marquee"
            aria-label={language === "ne" ? "विश्वास गर्ने लोगोहरू" : "Trusted logos"}
          >
            {/*
              Two back-to-back, byte-identical copies of `group` (the logo
              list, repeated until it's wide enough to fill the screen — see
              buildLoopGroup). The animation slides the track left by exactly
              one copy's width (translateX(-50%)) and repeats — so group 2
              lands exactly where group 1 started and the loop never visibly
              restarts or runs out, no matter how many real logos there are.
            */}
            <div className="marquee__inner" role="presentation">
              <div className="marquee__group" aria-hidden="false">
                {group.map((item, idx) => (
                  <TrustedLogoItem key={`g1-${item.id}-${idx}`} item={item} />
                ))}
              </div>

              <div className="marquee__group" aria-hidden="true">
                {group.map((item, idx) => (
                  <TrustedLogoItem key={`g2-${item.id}-${idx}`} item={item} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <style>{`
          .marquee {
            overflow: hidden;
            width: 100%;
            position: relative;
            padding: 20px 0;
          }

          .marquee__inner {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            animation: marquee-scroll ${desktopDuration}s linear infinite;
            will-change: transform;
            transform: translate3d(0,0,0);
          }

          .marquee:hover .marquee__inner,
          .marquee:focus-within .marquee__inner {
            animation-play-state: paused;
          }

          .marquee__group {
            display: flex;
            gap: 24px;
            align-items: center;
            flex: 0 0 auto;
            white-space: nowrap;
          }

          .marquee__item {
            flex: 0 0 auto;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: ${LOGO_BOX_WIDTH}px;
            height: ${LOGO_BOX_HEIGHT}px;
            padding: 6px 8px;
            box-sizing: border-box;
            transition: transform 220ms ease, opacity 220ms ease;
            will-change: transform, opacity;
          }

          .marquee__item img {
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.08));
          }

          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @media (prefers-reduced-motion: reduce) {
            .marquee__inner { animation: none; }
          }

          @media (max-width: 640px) {
            .marquee__group { gap: ${LOGO_GAP_MOBILE}px; }
            .marquee__item { width: 120px; height: 56px; padding: 6px 6px; }
            .marquee__inner { animation-duration: ${mobileDuration}s; }
          }
        `}</style>
      </div>
    </section>
  );
}
