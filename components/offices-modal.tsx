"use client"

import React, { useEffect } from "react"
import { useLanguage } from "@/components/LanguageProvider"
import { X, MapPin, Mail } from "lucide-react"

interface OfficesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function OfficesModal({ isOpen, onClose }: OfficesModalProps) {
  const { language } = useLanguage()
  const offices =
    language === "en"
      ? [
          { city: "Kathmandu", label: "Primary hub (Asia)", email: "hello@ninjainfosys.com" },
          { city: "Remote", label: "Global network", email: "hello@ninjainfosys.com" },
        ]
      : [
          { city: "काठमाडौँ", label: "प्रमुख हब (एशिया)", email: "hello@ninjainfosys.com" },
          { city: "Remote", label: "वैश्विक नेटवर्क", email: "hello@ninjainfosys.com" },
        ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-ni-ink/80 backdrop-blur-sm flex items-center justify-center p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Office locations"
      onClick={onClose}
    >
      <div className="bg-ni-paper rounded-lg max-w-2xl w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-ni-slate hover:text-ni-ink transition-colors"
          aria-label="Close modal"
          style={{ minWidth: "44px", minHeight: "44px" }}
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-heading font-bold text-ni-ink mb-8">
          {language === "en" ? "Our Offices" : "हाम्रा कार्यालयहरू"}
        </h2>

        <div className="space-y-6">
          {offices.map((office) => (
            <div
              key={office.city}
              className="p-6 border border-ni-graphite/10 rounded-lg hover:border-ni-accent/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <MapPin className="text-ni-accent mt-1 flex-shrink-0" size={24} />
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-semibold text-ni-ink mb-1">{office.city}</h3>
                  <p className="text-sm text-ni-slate mb-3">{office.label}</p>
                  <a
                    href={`mailto:${office.email}`}
                    className="inline-flex items-center gap-2 text-sm text-ni-accent hover:text-[#1D4ED8] transition-colors"
                  >
                    <Mail size={16} />
                    {office.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
