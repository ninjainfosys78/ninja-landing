"use client"
import React, { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/LanguageProvider"
import { fetchTestimonials, TestimonialRecord } from "@/lib/testimonials"
import { StaggerWords } from "@/components/ui/reveal"

interface Testimonial {
  name: string
  role: string
  quote: string
  image?: string
}

export default function Testimonials() {
  const { language } = useLanguage()

  const [records, setRecords] = useState<TestimonialRecord[]>([])
  const [perView, setPerView] = useState<number>(1)
  const [page, setPage] = useState<number>(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchTestimonials()
      .then((data) => {
        if (!cancelled) {
          setRecords(data)
          setPage(0)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRecords([])
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const initial = window.innerWidth >= 768 ? 2 : 1
    setPerView(initial)
  }, [])

  useEffect(() => {
    function onResize() {
      const next = window.innerWidth >= 768 ? 2 : 1
      setPerView((prev) => {
        if (prev !== next) {
          const firstIndex = page * prev
          const newPage = Math.floor(firstIndex / next)
          setPage(newPage)
        }
        return next
      })
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [page])

  const items: Testimonial[] = useMemo(
    () =>
      records.reduce<Testimonial[]>((acc, r) => {
        const name =
          language === "en"
            ? r.nameEn
            : r.nameNe || r.nameEn
        const quote =
          language === "en"
            ? r.quoteEn
            : r.quoteNe || r.quoteEn
        if (!name || !quote) return acc
        acc.push({
          name,
          role: "",
          quote,
          image: r.image,
        })
        return acc
      }, []),
    [records, language]
  )

  const pageCount = Math.max(1, Math.ceil(items.length / perView))

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setPage((p) => (p + 1) % pageCount)
    }, 4500)
    return () => clearInterval(id)
  }, [pageCount, isPaused])

  if (!items.length) return null

  const slides: Testimonial[][] = []
  for (let i = 0; i < items.length; i += perView) {
    slides.push(items.slice(i, i + perView))
  }

  const trackWidthPercent = slides.length * 100

  function goTo(i: number) {
    setPage(i % slides.length)
  }

  return (
    <section
      aria-label="Testimonials"
      className="relative pt-20 pb-16 border-t"
      style={{ backgroundColor: 'var(--page-bg-alt)', color: '#0b0d12', borderColor: 'rgba(11,13,18,0.06)' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <h3 className="text-[32px] md:text-[48px] font-bold text-left mb-10" style={{ color: '#0b0d12' }}>
          <StaggerWords text={language === "en" ? "What our clients say" : "हाम्रा ग्राहकहरूले के भन्छन्"} amount={0.6} />
        </h3>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              aria-live="polite"
              className="flex transform translate-x-[var(--track-trans)] transition-transform duration-[520ms] ease-[cubic-bezier(.2,.9,.2,1)]"
              style={{
                width: `${trackWidthPercent}%`,
                ["--track-trans" as any]: `-${page * (100 / slides.length)}%`,
              }}
            >
              {slides.map((group, slideIndex) => (
                <div
                  key={slideIndex}
                  style={{ width: `${100 / slides.length}%` }}
                  className="pr-4"
                >
                  <div
                    className="grid gap-6"
                    style={{
                      gridTemplateColumns: `repeat(${perView}, 1fr)`,
                      alignItems: "stretch",
                    }}
                  >
                    {group.map((item, idx) => (
                      <article
                        key={`${slideIndex}-${idx}-${item.name}`}
                        className="p-8 min-h-[200px] flex gap-5 items-start shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_24px_-16px_rgba(10,31,77,0.22)]"
                        style={{ backgroundColor: '#ffffff', border: '1px solid rgba(11,13,18,0.08)' }}
                        aria-label={item.name}
                      >
                        <div
                          aria-hidden
                          className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden flex-none font-bold text-lg ring-2 ring-transparent transition-all duration-500 hover:ring-[#2563EB]/40"
                          style={{ backgroundColor: '#2E3A4E', color: '#ffffff' }}
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <span>{item.name[0]}</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div
                              className="font-bold text-[16px]"
                              style={{ color: '#0b0d12' }}
                            >
                              {item.name}
                            </div>
                            <motion.div
                              aria-hidden
                              className="text-[40px] leading-[1] select-none"
                              style={{ color: 'rgba(11,13,18,0.15)' }}
                              initial={{ opacity: 0, scale: 0.6 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            >
                              "
                            </motion.div>
                          </div>

                          <p
                            className="mt-3 text-[15px] leading-[1.75] italic"
                            style={{ color: 'rgba(11,13,18,0.7)' }}
                          >
                            {item.quote}
                          </p>
                        </div>
                      </article>
                    ))}
                    {group.length < perView && <div className="min-h-[1px]" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-3">
              {slides.map((_, i) => (
                <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonials page ${i + 1}`}
                    className="relative inline-flex items-center justify-center rounded-full cursor-pointer border-none w-11 h-11 sm:w-12 sm:h-12"
                  >
                    {i === page ? (
                      <motion.span
                        layoutId="testimonial-active-dot"
                        className="absolute rounded-full w-3 h-3"
                        style={{ backgroundColor: "#2563EB" }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    ) : (
                      <span
                        className="absolute rounded-full w-2 h-2 transition-colors duration-200"
                        style={{ backgroundColor: "rgba(11,13,18,0.15)" }}
                      />
                    )}
                  </button>

              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          section :global(article) {
            border-radius: 2px;
          }
        }
      `}</style>
    </section>
  )
}
