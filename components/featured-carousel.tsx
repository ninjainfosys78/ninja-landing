"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const AUTOPLAY_MS = 6000;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const IMAGE_REVEAL_SECONDS = 1.1;
const TEXT_ENTRANCE_DELAY_SECONDS = 0.7;
const TEXT_SLIDE_DISTANCE_PX = 80;
const IMAGE_HIDDEN_CLIP = "inset(0 100% 0 0)";
const IMAGE_SHOWN_CLIP = "inset(0 0% 0 0)";

const textStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: TEXT_ENTRANCE_DELAY_SECONDS } },
};

const textItem: Variants = {
  hidden: { opacity: 0, x: TEXT_SLIDE_DISTANCE_PX, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

interface CarouselItem {
  id: string;
  title: string;
  title_ne: string;
  category: string;
  category_ne: string;
  image: string;
  link: string;
  description: string;
  description_ne: string;
}

const ITEMS: CarouselItem[] = [
  {
    id: "1",
    category: "Operations",
    category_ne: "सञ्चालन",
    title: "The Future of Smart Manufacturing",
    title_ne: "स्मार्ट उत्पादनको भविष्य",
    description: "How AI and IoT are redefining the factory floor for the next decade of production.",
    description_ne: "AI र IoT ले उत्पादनको अर्को दशकको लागि कारखानाको स्वरुपलाई कसरी पुनः परिभाषित गर्दैछन्।",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600",
    link: "/blogs/1789721497503",
  },
  {
    id: "2",
    category: "Sustainability",
    category_ne: "दिगोपन",
    title: "Accelerating the Net-Zero Transition",
    title_ne: "नेट-जिरो संक्रमणलाई गति दिँदै",
    description: "Strategic frameworks for organizations to achieve carbon neutrality while maintaining growth.",
    description_ne: "विकास कायम राख्दै कार्बन तटस्थता हासिल गर्न संस्थाहरूको लागि रणनीतिक ढाँचाहरू।",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1600",
    link: "/blogs/1789974152069",
  },
  {
    id: "3",
    category: "Digital",
    category_ne: "डिजिटल",
    title: "Unlocking Value in the Metaverse",
    title_ne: "मेटाभर्समा मूल्य अनलक गर्दै",
    description: "Exploring the commercial potential and social implications of persistent virtual environments.",
    description_ne: "स्थायी भर्चुअल वातावरणको व्यावसायिक सम्भावना र सामाजिक प्रभावहरूको अन्वेषण गर्दै।",
    image: "/assets/insights/metaverse.jpeg",
    link: "/blogs/1789974402995",
  },
];

export default function FeaturedCarousel() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });
  const { language } = useLanguage();

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % ITEMS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + ITEMS.length) % ITEMS.length);
  }, []);

  useEffect(() => {
    if (isInView && !isHovered) {
      timerRef.current = setInterval(next, AUTOPLAY_MS);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, isHovered, isInView]);

  const labels = {
    readMore: language === "en" ? "Read more" : "थप पढ्नुहोस्",
  };

  return (
    <section ref={sectionRef} className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-black group"
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>

      {/* Slides — the picture wipes in from the left the first time the section scrolls into view */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: IMAGE_HIDDEN_CLIP }}
        animate={{ clipPath: isInView ? IMAGE_SHOWN_CLIP : IMAGE_HIDDEN_CLIP }}
        transition={{ duration: IMAGE_REVEAL_SECONDS, ease: EASE_OUT }}
      >
      {ITEMS.map((item, idx) => {
        const title = language === "ne" ? item.title_ne : item.title;
        const description = language === "ne" ? item.description_ne : item.description;
        const category = language === "ne" ? item.category_ne : item.category;

        return (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with slow Ken Burns drift while active */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ scale: idx === current ? 1.12 : 1 }}
                transition={{ duration: AUTOPLAY_MS / 1000 + 1, ease: "linear" }}
              >
                <Image
                  src={item.image}
                  alt={title}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/25 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 2xl:px-16 flex flex-col justify-center">
              <motion.div
                className="max-w-2xl"
                variants={textStagger}
                initial="hidden"
                animate={idx === current && isInView ? "show" : "hidden"}
              >
                <motion.div variants={textItem} className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-4">
                  {category}
                </motion.div>
                <motion.h2 variants={textItem} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                  {title}
                </motion.h2>
                <motion.p variants={textItem} className="text-xl text-white/80 mb-8 leading-relaxed">
                  {description}
                </motion.p>
                <motion.div variants={textItem}>
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-3 text-white font-bold group/btn"
                  >
                    <span className="text-lg underline underline-offset-8 decoration-2 decoration-[#2563EB] group-hover/btn:decoration-white transition-colors">
                      {labels.readMore}
                    </span>
                    <ArrowRight className="mt-1 transition-transform group-hover/btn:translate-x-2" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Autoplay progress bar */}
            {idx === current && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
                <div
                  key={`${item.id}-${current}`}
                  className="h-full origin-left bg-gradient-to-r from-[#E31B23] to-[#2563EB]"
                  style={{
                    animation: `progress-fill ${AUTOPLAY_MS}ms linear`,
                    animationPlayState: isHovered ? "paused" : "running",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-12 left-6 sm:left-8 lg:left-12 2xl:left-16 z-20 flex items-center gap-4">
        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="p-3 rounded-full border border-white/20 text-white transition-colors duration-300 hover:bg-[#E31B23]/30 hover:border-[#E31B23]/60"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          onClick={next}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="p-3 rounded-full border border-white/20 text-white transition-colors duration-300 hover:bg-[#E31B23]/30 hover:border-[#E31B23]/60"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </motion.button>

        {/* Indicators */}
        <div className="ml-8 flex gap-2">
          {ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-[2px] transition-all duration-500 ${
                idx === current ? "w-12 bg-[#2563EB]" : "w-6 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
