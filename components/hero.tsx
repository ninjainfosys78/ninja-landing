"use client"
import React from "react"
import Link from "next/link"
import { useLanguage } from "@/components/LanguageProvider"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import HeroVideoBackground from "@/components/home/hero/hero-video-background"
import { Typewriter } from "@/components/ui/typewriter"

interface HeroProps {
  showContent?: boolean
  backgroundOnly?: boolean
  children?: React.ReactNode
}

const HERO_ACCENT_ON_DARK = "#FF5A61"
const HERO_GRADIENT_TEXT = "linear-gradient(90deg, #6EA0FF 0%, #A78BFA 50%, #FF5A61 100%)"

export default function Hero({ showContent = true, backgroundOnly = false, children }: HeroProps) {
  const { language } = useLanguage()
  const content =
    language === "en"
      ? {
          label: "ESTABLISHED VISIONARY STRATEGY",
          titleLine1: "Turning Intent",
          titleLine2: "into",
          titleItalic: "Infrastructure",
          deck: "Bridging the gap between conceptual high-stakes engineering and the physical reality of future-proof urban environments.",
          cta: "Explore Projects",
          cta2: "Our Methodology",
        }
      : {
          label: "स्थापित दूरदर्शी रणनीति",
          titleLine1: "इरादालाई",
          titleLine2: "रूपान्तरण",
          titleItalic: "पूर्वाधारमा",
          deck: "वैचारिक उच्च-जोखिम इन्जिनियरिङ र भविष्यको शहरी वातावरणको भौतिक वास्तविकताबीचको अन्तर पुर्दै।",
          cta: "परियोजनाहरू अन्वेषण गर्नुहोस्",
          cta2: "हाम्रो कार्यप्रणाली",
        }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        paddingTop: "80px",
        backgroundColor: "#0A1F4D",
      }}
      aria-label="Hero section"
    >

      <HeroVideoBackground />

      { backgroundOnly ? (
        children
      ) : (
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12 2xl:px-16 pt-28 sm:pt-28 lg:pt-32 pb-12 flex items-center">
          {children ? (
            children
          ) : showContent ? (
            <>
            <motion.div
              className="max-w-[720px]"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
              }}
            >
              {/* Label */}
              <motion.div
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2 backdrop-blur"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: HERO_ACCENT_ON_DARK }} />
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: HERO_ACCENT_ON_DARK }}
                >
                  {content.label}
                </span>
              </motion.div>

              {/* Headline */}
              <h1
                id="hero-title"
                className="mb-12 leading-[1.05]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <motion.span
                  className="block font-extrabold not-italic tracking-tight text-white overflow-hidden"
                  style={{ fontSize: "clamp(40px, 5.6vw, 72px)" }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  {content.titleLine1} {content.titleLine2}
                </motion.span>
                <motion.span
                  className="block font-extrabold not-italic tracking-tight overflow-hidden"
                  style={{
                    fontSize: "clamp(40px, 5.6vw, 72px)",
                    backgroundImage: HERO_GRADIENT_TEXT,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  {language === "en" ? (
                    <Typewriter words={["Infrastructure", "Innovation", "Impact", "Excellence"]} />
                  ) : (
                    content.titleItalic
                  )}
                </motion.span>
              </h1>

              {/* Deck */}
              <motion.p
                className="mb-10 leading-relaxed"
                style={{
                  fontSize: "clamp(16px, 1.8vw, 20px)",
                  color: "rgba(255,255,255,0.75)",
                  maxWidth: "640px",
                }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {content.deck}
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-bold text-white transition-all hover:brightness-110 hover:scale-[1.03] active:scale-95"
                  style={{ backgroundColor: "#E31B23" }}
                >
                  {content.cta}
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full px-8 py-4 text-[15px] font-bold transition-all hover:bg-white/10 hover:scale-[1.03] active:scale-95"
                  style={{
                    color: "#FFFFFF",
                    border: "1.5px solid rgba(255,255,255,0.45)",
                  }}
                >
                  {content.cta2}
                </Link>
              </motion.div>
            </motion.div>

            </>
          ) : null}
        </div>
      )}
    </section>
  )
}
