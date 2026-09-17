"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

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
    link: "/blogs/smart-manufacturing",
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
    link: "/blogs/net-zero",
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
    link: "/blogs/metaverse-value",
  },
];

export default function FeaturedCarousel() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { language } = useLanguage();

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % ITEMS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + ITEMS.length) % ITEMS.length);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(next, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, isHovered]);

  const labels = {
    readMore: language === "en" ? "Read more" : "थप पढ्नुहोस्",
  };

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-black group"
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
      
      {/* Slides */}
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
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={item.image}
                alt={title}
                fill
                className="object-cover"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-black/25 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 2xl:px-16 flex flex-col justify-center">
              <div className={`max-w-2xl transform transition-transform duration-1000 ${
                idx === current ? "translate-y-0" : "translate-y-10"
              }`}>
                <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-4">
                  {category}
                </div>
                <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                  {title}
                </h2>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  {description}
                </p>
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-3 text-white font-bold group/btn"
                >
                  <span className="text-lg underline underline-offset-8 decoration-2 decoration-[#2563EB] group-hover/btn:decoration-white transition-colors">
                    {labels.readMore}
                  </span>
                  <ArrowRight className="mt-1 transition-transform group-hover/btn:translate-x-2" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Buttons */}
      <div className="absolute bottom-12 left-6 sm:left-8 lg:left-12 2xl:left-16 z-20 flex items-center gap-4">
        <button
          onClick={prev}
          className="p-3 border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="p-3 border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
        
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
