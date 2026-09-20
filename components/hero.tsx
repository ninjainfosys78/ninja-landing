"use client"
import React from "react"
import Link from "next/link"
import { useLanguage } from "@/components/LanguageProvider"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Typewriter } from "@/components/ui/typewriter"

interface HeroProps {
  showContent?: boolean
  backgroundOnly?: boolean
  children?: React.ReactNode
}

export default function Hero({ showContent = true, backgroundOnly = false, children }: HeroProps) {
  const { language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    "/asocio-award-1.jpg",
    "/asocio-award-2.jpg",
    "/asocio-award-3.jpg"
  ]

  const SLIDE_DURATION = 6000

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [slides.length])

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
          geo: "KATHMANDU — ANAMNAGAR",
        }
      : {
          label: "स्थापित दूरदर्शी रणनीति",
          titleLine1: "इरादालाई",
          titleLine2: "रूपान्तरण",
          titleItalic: "पूर्वाधारमा",
          deck: "वैचारिक उच्च-जोखिम इन्जिनियरिङ र भविष्यको शहरी वातावरणको भौतिक वास्तविकताबीचको अन्तर पुर्दै।",
          cta: "परियोजनाहरू अन्वेषण गर्नुहोस्",
          cta2: "हाम्रो कार्यप्रणाली",
          geo: "काठमाडौं — अनामनगर",
        }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        paddingTop: "80px",
        backgroundColor: "var(--page-bg)",
      }}
      aria-label="Hero section"
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 z-[5] opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      { backgroundOnly ? (
        children
      ) : (
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12 2xl:px-16 pt-36 sm:pt-40 lg:pt-44 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {children ? (
            children
          ) : showContent ? (
            <>
            <motion.div
              className="max-w-[560px]"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
              }}
            >
              {/* Label */}
              <motion.div
                className="mb-10 flex items-center gap-3 overflow-hidden"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <span aria-hidden="true" style={{ display: "inline-block", width: 28, height: 1.5, backgroundColor: "#E31B23" }} />
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: "#E31B23" }}
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
                  className="block font-extrabold not-italic tracking-tight text-[#0b0d12] overflow-hidden"
                  style={{ fontSize: "clamp(44px, 6vw, 76px)" }}
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
                    fontSize: "clamp(44px, 6vw, 76px)",
                    color: "#E31B23",
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
                className="mb-14 leading-relaxed"
                style={{
                  fontSize: "clamp(15px, 1.8vw, 19px)",
                  color: "rgba(11,13,18,0.65)",
                  maxWidth: "440px",
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
                  className="inline-flex items-center justify-center rounded-full px-8 py-4 text-[15px] font-bold transition-all hover:bg-black/5 hover:scale-[1.03] active:scale-95"
                  style={{
                    color: "rgba(11,13,18,0.85)",
                    border: "1.5px solid rgba(11,13,18,0.25)",
                  }}
                >
                  {content.cta2}
                </Link>
              </motion.div>
            </motion.div>

            {/* Photo panel — continuous crossfade + Ken Burns creep to read as motion footage, not a static slideshow */}
            <motion.div
              className="relative w-full h-[320px] sm:h-[420px] lg:h-[560px] xl:h-[620px] rounded-[28px] overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.06 }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slides[currentSlide]}
                      alt="Technology Slideshow"
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                  {/* Keeps the panel's own bottom-right geo tag legible against whatever the photo shows there */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(11,13,18,0.55) 0%, transparent 35%)",
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Geo tag */}
              <div
                className="absolute bottom-6 right-6 z-10 pointer-events-none select-none"
                style={{ color: "rgba(255,255,255,0.75)", fontSize: "11px", letterSpacing: "0.18em" }}
              >
                {content.geo}
              </div>
            </motion.div>
            </>
          ) : null}
        </div>
      )}
    </section>
  )
}
