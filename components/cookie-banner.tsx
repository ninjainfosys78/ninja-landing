"use client"
import { useState, useEffect } from "react"
import { useLanguage } from "@/components/LanguageProvider"

export default function CookieBanner() {
  const { language } = useLanguage()
  const [visible, setVisible] = useState(false)

  const content =
    language === "en"
      ? {
          message:
            "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
          accept: "Accept",
          decline: "Decline",
        }
      : {
          message:
            "हामी तपाईंको अनुभव सुधार गर्न कुकीहरू प्रयोग गर्छौं। यो साइट भ्रमण जारी राखेर तपाईं हाम्रो कुकी प्रयोगमा सहमत हुनुहुन्छ।",
          accept: "स्वीकार गर्नुहोस्",
          decline: "अस्वीकार गर्नुहोस्",
        }

  useEffect(() => {
    if (typeof window === "undefined") return
    const consent = localStorage.getItem("ni-cookie-consent")
    if (!consent) setVisible(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem("ni-cookie-consent", "accepted")
    setVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("ni-cookie-consent", "declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#0b0d12]/10 text-ni-ink shadow-[0_-4px_20px_rgba(11,13,18,0.08)]"
      role="region"
      aria-label={language === "en" ? "Cookie consent" : "कुकी सहमति"}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between gap-4">
        <p className="text-sm text-ni-ink/80 flex-1 mr-4">{content.message}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecline}
            className="px-4 py-2 border bg-[#0b0d12]/[0.03] border-ni-ink/15 text-ni-ink text-sm font-medium"
            style={{ minHeight: 40 }}
          >
            {content.decline}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-[#E31B23] text-white text-sm font-medium"
            style={{ minHeight: 40 }}
          >
            {content.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
