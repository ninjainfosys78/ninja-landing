import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { fetchTrustedLogos, TrustedLogoRecord } from "@/lib/trustedby";
import { Reveal, AmbientGlow, StaggerWords } from "@/components/ui/reveal";

interface TrustedByProps {
  initialLogos?: TrustedLogoRecord[];
}

export default function TrustedBy({ initialLogos = [] }: TrustedByProps) {
  const { language } = useLanguage();
  const [logos, setLogos] = useState<TrustedLogoRecord[]>(initialLogos);
  const [dbg, setDbg] = useState<any>({
    innerWidth: 0,
    parentWidth: 0,
    animationName: "",
    animationPlayState: "",
    reducedMotion: false,
  });
  const marqueeRootRef = useRef<HTMLElement | null>(null);

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
            className="text-[12px] font-bold uppercase tracking-[0.2em] text-center"
            amount={0.6}
          />
          <motion.span
            aria-hidden="true"
            className="mt-4 h-[2px] w-16 rounded-full"
            style={{ background: 'linear-gradient(90deg, #E31B23, #2563EB)', transformOrigin: 'center' }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <Reveal delay={0.1} className="relative">
          {/* Edge fade masks so logos scroll in/out instead of clipping abruptly */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-20 bg-gradient-to-l from-white to-transparent" />

          <div
            ref={marqueeRootRef as any}
            className="marquee"
            aria-hidden={false}
            aria-label={language === "ne" ? "विश्वास गर्ने लोगोहरू" : "Trusted logos"}
          >
            <div className="marquee__inner" role="presentation">
              <div className="marquee__group" aria-hidden="true">
                {list.map((item, idx) => (
                  <motion.div
                    className="marquee__item"
                    key={`g1-${item.id}-${idx}`}
                    whileHover={{ y: -8, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  >
                    {item.logo ? (
                      <Image
                        src={item.logo}
                        alt={item.logoName}
                        width={160}
                        height={64}
                        className="h-16 w-auto object-contain block grayscale opacity-60 hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_12px_24px_rgba(37,99,235,0.25)] transition-all duration-300"
                      />
                    ) : (
                      <div className="text-[#0b0d12]/50 text-center font-bold text-lg tracking-wide whitespace-nowrap">
                        {item.logoName}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="marquee__group" aria-hidden="true">
                {list.map((item, idx) => (
                  <motion.div
                    className="marquee__item"
                    key={`g2-${item.id}-${idx}`}
                    whileHover={{ y: -8, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  >
                    {item.logo ? (
                      <Image
                        src={item.logo}
                        alt={item.logoName}
                        width={160}
                        height={64}
                        className="h-16 w-auto object-contain block grayscale opacity-60 hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_12px_24px_rgba(37,99,235,0.25)] transition-all duration-300"
                      />
                    ) : (
                      <div className="text-[#0b0d12]/50 text-center font-bold text-lg tracking-wide whitespace-nowrap">
                        {item.logoName}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div
          id="trusted-by-debug"
          className="hidden absolute right-2 top-2 z-[60] bg-black/60 text-white text-xs px-2 py-1 rounded-md pointer-events-none leading-[1.2]"
          aria-hidden="true"
        >
          <DebugInfo dbg={dbg} />
        </div>

        <MarqueeDebugger setDbg={setDbg} marqueeRootRef={marqueeRootRef} />

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
            animation: marquee-scroll 18s linear infinite;
            animation-timing-function: linear;
            will-change: transform;
            transform: translate3d(0,0,0);
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
            min-width: 120px;
            padding: 6px 8px;
            box-sizing: border-box;
            transition: transform 220ms ease, opacity 220ms ease;
            will-change: transform, opacity;
            opacity: 1;
          }

          .marquee__item img {
            display: block;
            height: 72px;
            width: auto;
            max-width: 100%;
            object-fit: contain;
            transition: all 300ms ease;
            will-change: opacity, transform;
            opacity: 1;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.08));
          }.marquee:hover .marquee__inner,
          .marquee:focus-within .marquee__inner {
            animation-play-state: paused;
          }

          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @media (max-width: 640px) {
            .marquee__group { gap: 12px; }
            .marquee__item { min-width: 90px; padding: 6px 6px; }
            .marquee__inner { animation-duration: 26s; }
          }
        `}</style>
      </div>
    </section>
  );
}

function DebugInfo({ dbg }: { dbg: any }) {
  return (
    <div>
      <div>inner: {Math.round(dbg.innerWidth)}px</div>
      <div>parent: {Math.round(dbg.parentWidth)}px</div>
      <div>anim: {dbg.animationName || "—"}</div>
      <div>state: {dbg.animationPlayState || "—"}</div>
      <div>reduced: {dbg.reducedMotion ? "yes" : "no"}</div>
    </div>
  );
}

function MarqueeDebugger({
  setDbg,
  marqueeRootRef,
}: {
  setDbg: (v: any) => void;
  marqueeRootRef?: React.RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      const inner = document.querySelector(".marquee__inner") as HTMLElement | null;
      const parent = inner?.parentElement as HTMLElement | null;
      const computed = inner ? getComputedStyle(inner) : null;
      const animationName = computed ? computed.animationName : "";
      const animationPlayState = computed ? computed.animationPlayState : "";
      const innerW = inner ? inner.getBoundingClientRect().width : 0;
      const parentW = parent ? parent.getBoundingClientRect().width : 0;
      const reducedMotion =
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setDbg({
        innerWidth: innerW,
        parentWidth: parentW,
        animationName,
        animationPlayState,
        reducedMotion,
      });
      console.log("TrustedBy debug:", {
        innerW,
        parentW,
        animationName,
        animationPlayState,
        reducedMotion,
      });

      const needJSFallback =
        reducedMotion ||
        animationPlayState === "paused" ||
        animationName === "none" ||
        (innerW && parentW && innerW <= parentW + 1);

      if (!inner) return;

      if (!needJSFallback) {
        inner.style.animation = "marquee-scroll 18s linear infinite";
        inner.style.transform = "";
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        return;
      }

      inner.style.animation = "none";
      const groupWidth = inner.scrollWidth / 2 || 0;
      if (!groupWidth) return;
      const speed = 50;
      let start = performance.now();

      const step = (time: number) => {
        const elapsed = (time - start) / 1000;
        const shift = (elapsed * speed) % groupWidth;
        inner.style.transform = `translateX(-${shift}px)`;
        rafId = requestAnimationFrame(step);
      };
      if (!rafId) rafId = requestAnimationFrame(step);
    };

    update();
    window.addEventListener("resize", update);
    const obs = new MutationObserver(update);
    const root = marqueeRootRef?.current ?? document.querySelector(".marquee");
    if (root) obs.observe(root, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("resize", update);
      obs.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [setDbg, marqueeRootRef]);
  return null;
}
