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
      className="fixed inset-0 z-[100] backdrop-blur-sm flex items-center justify-center p-6 animate-fadeIn"
      style={{ backgroundColor: "rgba(20,23,28,0.8)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Office locations"
      onClick={onClose}
    >
      <div className="rounded-lg max-w-2xl w-full p-8 relative" style={{ backgroundColor: "#FFFFFF" }} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#0b0d12]/60 hover:text-[#0b0d12] transition-colors"
          aria-label="Close modal"
          style={{ minWidth: "44px", minHeight: "44px" }}
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-heading font-bold text-[#0b0d12] mb-8">
          {language === "en" ? "Our Offices" : "हाम्रा कार्यालयहरू"}
        </h2>

        <div className="space-y-6">
          {offices.map((office) => (
            <div
              key={office.city}
              className="p-6 border border-[#0b0d12]/10 rounded-lg hover:border-[#2563EB]/30 transition-colors"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="flex items-start gap-4">
                <MapPin className="text-[#2563EB] mt-1 flex-shrink-0" size={24} />
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-semibold text-[#0b0d12] mb-1">{office.city}</h3>
                  <p className="text-sm text-[#0b0d12]/60 mb-3">{office.label}</p>
                  <a
                    href={`mailto:${office.email}`}
                    className="inline-flex items-center gap-2 text-sm text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
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
