"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import React from "react"
import { useLanguage } from "@/components/LanguageProvider"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const { language } = useLanguage()

  const placeholder =
    language === "en"
      ? "Search perspectives, ideas, and cases…"
      : "दृष्टिकोण, विचार, केसहरू खोज्नुहोस्…"

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      if (typeof document !== "undefined") document.body.style.overflow = "hidden"
    } else {
      if (typeof document !== "undefined") document.body.style.overflow = "unset"
      setQuery("")
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-white/97 backdrop-blur-md flex items-start justify-center pt-32 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="w-full max-w-3xl px-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ni-ink/40" size={24} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-14 pr-14 py-6 bg-ni-ink/[0.04] border border-ni-ink/15 rounded-lg text-2xl text-ni-ink placeholder:text-ni-ink/40 focus:outline-none focus:border-ni-accent"
            aria-label="Search input"
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-ni-ink/60 hover:text-ni-ink transition-colors"
            aria-label="Close search"
            style={{ minWidth: "44px", minHeight: "44px" }}
          >
            <X size={24} />
          </button>
        </div>

        {query && (
          <div className="mt-8 text-ni-ink/60 text-center">
            <p className="text-sm">
              {language === "en"
                ? "Search functionality would filter insights, practices, and case studies here."
                : "खोज कार्यक्षमताले यहाँ इनसाइट्स, प्रयासहरू, र केस स्टडीहरू फिल्टर गर्नेछ।"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
