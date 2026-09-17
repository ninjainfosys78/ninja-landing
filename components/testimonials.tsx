"use client"
import React, { useEffect, useMemo, useState } from "react"
import { useLanguage } from "@/components/LanguageProvider"
import { fetchTestimonials, TestimonialRecord } from "@/lib/testimonials"
import { Reveal } from "@/components/ui/reveal"

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
      style={{ backgroundColor: '#EFEDE7', color: '#0b0d12', borderColor: 'rgba(11,13,18,0.06)' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <Reveal>
          <h3 className="text-[32px] md:text-[48px] font-bold text-left mb-10" style={{ color: '#0b0d12' }}>
            {language === "en" ? "What our clients say" : "हाम्रा ग्राहकहरूले के भन्छन्"}
          </h3>
        </Reveal>

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
                        className="p-8 min-h-[200px] flex gap-5 items-start shadow-sm"
                        style={{ backgroundColor: '#ffffff', border: '1px solid rgba(11,13,18,0.08)' }}
                        aria-label={item.name}
                      >
                        <div
                          aria-hidden
                          className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden flex-none font-bold text-lg"
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
                            <div
                              aria-hidden
                              className="text-[40px] leading-[1] select-none"
                              style={{ color: 'rgba(11,13,18,0.15)' }}
                            >
                              "
                            </div>
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
                    className={`
                      relative
                      inline-flex items-center justify-center
                      rounded-full
                      cursor-pointer border-none
                      transition-all duration-200

                      /* Minimum touch target (44×44) */
                      w-11 h-11 sm:w-12 sm:h-12

                      /* Visually small dot inside */
                      before:absolute before:rounded-full before:transition-all before:duration-200
                      ${i === page
                        ? "before:bg-[#2563EB] before:w-3 before:h-3"
                        : "before:bg-[rgba(11,13,18,0.15)] before:w-2 before:h-2"
                      }
                    `}
                  >
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
