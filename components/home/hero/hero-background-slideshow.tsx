"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

// object-position keeps each photo's faces inside the short, wide hero crop
// and on the right, away from the headline.
const SLIDES = [
  { src: "/asocio-award-1.jpg", position: "75% 22%" },
  { src: "/asocio-award-2.jpg", position: "75% 88%" },
  // { src: "/asocio-award-3.jpg", position: "75% 58%" },
]
const SLIDE_DURATION_MS = 6000
const CROSSFADE_SECONDS = 1.4
const TEXT_SIDE_FADE =
  "linear-gradient(90deg, rgba(10,31,77,0.94) 0%, rgba(10,31,77,0.82) 32%, rgba(18,48,107,0.35) 62%, rgba(37,99,235,0.08) 100%)"

export default function HeroBackgroundSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length), SLIDE_DURATION_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden bg-[#0A1F4D]">
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: CROSSFADE_SECONDS, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: SLIDE_DURATION_MS / 1000, ease: "easeOut" }}
          >
            <Image
              src={SLIDES[currentSlide].src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: SLIDES[currentSlide].position }}
              priority
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0" style={{ background: TEXT_SIDE_FADE }} />
    </div>
  )
}
