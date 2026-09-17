"use client"
import React from "react"
import Link from "next/link"
import { useLanguage } from "@/components/LanguageProvider"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
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
        background: "linear-gradient(180deg, #f6f8fc 0%, #eef1f8 100%)",
      }}
      aria-label="Hero section"
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 z-[5] opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* Full-bleed background photo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide]}
              alt="Technology Slideshow"
              fill
              className="object-cover"
              priority
            />
            {/* Light tinted wash so the photo carries the palette while staying legible */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 15% 25%, rgba(37,99,235,0.14) 0%, transparent 55%), " +
                  "radial-gradient(circle at 85% 75%, rgba(37,99,235,0.1) 0%, transparent 55%), " +
                  "linear-gradient(100deg, rgba(246,248,252,0.94) 0%, rgba(238,241,248,0.8) 38%, rgba(238,241,248,0.45) 65%, rgba(238,241,248,0.3) 100%)",
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      { backgroundOnly ? (
        children
      ) : (
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12 2xl:px-16 py-16">
          {children ? (
            children
          ) : showContent ? (
            <motion.div
              className="max-w-[680px]"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
              }}
            >
              {/* Label */}
              <motion.div
                className="mb-8 text-[11px] font-bold uppercase tracking-[0.22em] overflow-hidden"
                style={{ color: "#E31B23" }}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {content.label}
              </motion.div>

              {/* Headline */}
              <h1
                id="hero-title"
                className="mb-8 leading-[1.0]"
                style={{ fontFamily: "'Newsreader', serif" }}
              >
                <motion.span
                  className="block font-bold text-[#0b0d12] overflow-hidden"
                  style={{ fontSize: "clamp(52px, 7vw, 88px)" }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  {content.titleLine1}
                </motion.span>
                <motion.span
                  className="block font-bold text-[#0b0d12] overflow-hidden"
                  style={{ fontSize: "clamp(52px, 7vw, 88px)" }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  {content.titleLine2}
                </motion.span>
                <motion.span
                  className="block italic font-bold overflow-hidden"
                  style={{
                    fontSize: "clamp(52px, 7vw, 88px)",
                    color: "#2563EB",
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  {content.titleItalic}
                </motion.span>
              </h1>

              {/* Deck */}
              <motion.p
                className="mb-12 leading-relaxed"
                style={{
                  fontSize: "clamp(15px, 1.8vw, 19px)",
                  color: "rgba(11,13,18,0.6)",
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
                  className="inline-flex items-center justify-center px-8 py-4 text-[15px] font-bold text-white transition-all hover:brightness-110 hover:scale-[1.03] active:scale-95"
                  style={{ backgroundColor: "#E31B23" }}
                >
                  {content.cta}
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 text-[15px] font-bold transition-all hover:bg-[#0b0d12]/5 hover:scale-[1.03] active:scale-95"
                  style={{
                    color: "rgba(11,13,18,0.85)",
                    border: "1.5px solid rgba(11,13,18,0.25)",
                  }}
                >
                  {content.cta2}
                </Link>
              </motion.div>
            </motion.div>
          ) : null}
        </div>
      )}

      {/* Bottom-right geo tag */}
      <div
        className="absolute bottom-8 right-6 sm:right-12 z-10 pointer-events-none select-none"
        style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", letterSpacing: "0.18em" }}
      >
        {content.geo}
      </div>

      {/* Bottom fade - for the geo tag's legibility over the photo */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(11,13,18,0.35))",
        }}
      />
    </section>
  )
}
