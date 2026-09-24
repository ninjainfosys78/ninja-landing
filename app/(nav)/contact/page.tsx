"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/components/LanguageProvider"
import Link from "next/link"
import { toast } from "sonner"

import SearchOverlay from "@/components/search-overlay"
import PageBanner from "@/components/ui/page-banner"
import { Reveal, RevealGroup, RevealItem, StaggerWords } from "@/components/ui/reveal"

const SLIDE_DISTANCE_PX = 90


export default function ContactPage() {
  const { language } = useLanguage()
  const [searchOpen, setSearchOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [logoOffset, setLogoOffset] = useState<number | null>(null)

  const t =
    language === "en"
      ? {
          formTitle: "Interested in Learning More?",
          firstName: "First name",
          lastName: "Last name",
          email: "Email",
          message: "Message",
          required: "*",
          agreeLabel: "I agree to receive other communications from Ninja Infosys.",
          send: "Submit",
          locationEyebrow: "Our Location",
          locationTitle: "Find",
          locationAccent: "Us Here",
          city: "Kathmandu",
          addressLine1: "Anamnagar, Kathmandu 44600",
          phone: "01-555051203",
          getDirection: "Get Direction →",
          mapTitle: "Where to find us",
          mapCaption: "Ninja Infosys, Anamnagar, Kathmandu, Nepal",
        }
      : {
          formTitle: "थप जानकारी चाहनुहुन्छ?",
          firstName: "पहिलो नाम",
          lastName: "थर",
          email: "इमेल",
          message: "सन्देश",
          required: "*",
          agreeLabel: "म Ninja Infosys बाट अन्य सञ्चार प्राप्त गर्न सहमत छु।",
          send: "पठाउनुहोस्",
          locationEyebrow: "हाम्रो स्थान",
          locationTitle: "हामी",
          locationAccent: "यहाँ छौं",
          city: "काठमाडौं",
          addressLine1: "अनामनगर, काठमाडौं ४४६००",
          phone: "०१-५५५०५१२०३",
          getDirection: "दिशा प्राप्त गर्नुहोस् →",
          mapTitle: "हामी कहाँ छौं",
          mapCaption: "निन्जा इन्फोसिस, अनामनगर, काठमाडौं, नेपाल",
        }

  useEffect(() => {
    const computeOffset = () => {
      if (typeof window === "undefined" || window.innerWidth < 768) {
        setLogoOffset(null)
        return
      }

      // try common logo selectors (adjust if your header uses a custom selector)
      const logo = document.querySelector(
        'header img[src*="logo"], header img, [data-site-logo] img, .site-logo img, .logo img, [data-logo]'
      ) as HTMLElement | null
      const container = containerRef.current
      if (!logo || !container) {
        setLogoOffset(null)
        return
      }

      const logoRect = logo.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      // align to logo center (change to logoRect.left for left edge)
      const logoCenter = logoRect.left + logoRect.width / 2
      const offset = Math.round(logoCenter - containerRect.left)

      setLogoOffset(Math.max(0, offset))
    }

    computeOffset()
    window.addEventListener("resize", computeOffset)
    const mo = new MutationObserver(computeOffset)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      window.removeEventListener("resize", computeOffset)
      mo.disconnect()
    }
  }, [])

  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const form = e.currentTarget
    const payload = {
      firstName: String(fd.get("firstName") || ""),
      lastName: String(fd.get("lastName") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
      consent: Boolean(fd.get("consent")),
      website: String(fd.get("website") || ""),
    }
    
    setLoading(true)
    try {
      const resp = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (resp.ok) {
        toast.success(language === "en" ? "Thanks! We’ll get back to you shortly." : "धन्यवाद! हामी छिट्टै सम्पर्क गर्नेछौं।")
        form.reset()
      } else {
        toast.error(language === "en" ? "Failed to send. Please try again." : "पठाउन असफल। कृपया फेरि प्रयास गर्नुहोस्।")
      }
    } catch (err: any) {
      console.error("Fetch error:", err)
      toast.error(language === "en" ? `Error: ${err.message || err}` : `त्रुटि: ${err.message || err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageBanner
        bannerName="contact"
        fallbackImage="/digital-infrastructure-network-city.jpg"
        homeLabel={language === "en" ? "Ninja Infosys" : "निन्जा इन्फोसिस"}
        title={language === "en" ? "Contact" : "सम्पर्क"}
        subtitle={
          language === "en"
            ? "Tell us about your project and our team will get back to you shortly."
            : "आफ्नो परियोजनाबारे हामीलाई बताउनुहोस्, हाम्रो टोलीले छिट्टै सम्पर्क गर्नेछ।"
        }
      />
      <section className="relative min-h-screen text-[#0b0d12]/80 pt-12" style={{ backgroundColor: "var(--page-bg)" }} aria-label="Contact section">
        {/* measured container: left padding set so the form starts under the logo */}
        <div
          ref={containerRef}
          className="max-w-[1600px] mx-auto px-6 sm:px-8"
          style={logoOffset !== null ? { paddingLeft: `${logoOffset}px` } : undefined}
        >
          <RevealGroup className="grid grid-cols-1 md:grid-cols-[560px_1fr] items-stretch gap-0" amount={0.3}>
            <RevealItem className="pr-8 flex flex-col h-[620px]" duration={1.1} x={-SLIDE_DISTANCE_PX}>
              <div className="max-w-[560px] flex flex-col h-full pt-10">
                <h2 className="font-heading text-[#0b0d12] leading-tight mb-8 font-source-serif">
                  <span className="block text-[40px] md:text-[64px] leading-[0.95]">
                    <StaggerWords text={t.formTitle} amount={0.5} />
                  </span>
                </h2>

                <div className="w-24 h-px bg-[#0b0d12]/15 mb-8" />

                <form onSubmit={onSubmit} className="flex flex-col gap-4 h-full">
                  <div className="grid grid-cols-2 gap-x-6">
                    <label className="block">
                      <span className="block text-sm text-[#0b0d12]/60 mb-2">{t.firstName} <span className="text-[#2563EB]">*</span></span>
                      <input name="firstName" type="text" required placeholder={t.firstName}
                        className="w-full bg-transparent text-[#0b0d12] placeholder:text-[#0b0d12]/40 outline-none border-b border-[#0b0d12]/20 py-2" />
                    </label>

                    <label className="block">
                      <span className="block text-sm text-[#0b0d12]/60 mb-2">{t.lastName} <span className="text-[#2563EB]">*</span></span>
                      <input name="lastName" type="text" required placeholder={t.lastName}
                        className="w-full bg-transparent text-[#0b0d12] placeholder:text-[#0b0d12]/40 outline-none border-b border-[#0b0d12]/20 py-2" />
                    </label>
                  </div>

                  <label className="block">
                    <span className="block text-sm text-[#0b0d12]/60 mb-2">{t.email} <span className="text-[#2563EB]">*</span></span>
                    <input name="email" type="email" required placeholder="you@example.com"
                      className="w-full bg-transparent text-[#0b0d12] placeholder:text-[#0b0d12]/40 outline-none border-b border-[#0b0d12]/20 py-2" />
                  </label>

                  <label className="block">
                    <span className="block text-sm text-[#0b0d12]/60 mb-2">{t.message}</span>
                    <textarea name="message" rows={3} placeholder={t.message}
                      className="w-full bg-transparent text-[#0b0d12] placeholder:text-[#0b0d12]/40 outline-none border-b border-[#0b0d12]/20 py-2 resize-none h-20" />
                  </label>

                  <label className="flex items-start gap-3 text-sm text-[#0b0d12]/60">
                    <input name="consent" type="checkbox" className="w-4 h-4 accent-[#2563EB] mt-1" />
                    <span className="text-sm">{t.agreeLabel}</span>
                  </label>

                  {/* Honeypot field - hidden from users, but bots will fill it */}
                  <div className="hidden" aria-hidden="true">
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="mt-auto">
                    <button disabled={loading} type="submit" className="inline-flex items-center justify-center bg-[#E31B23] px-6 py-3 font-semibold text-white hover:opacity-95 transition disabled:opacity-50">
                      {loading ? (language === "en" ? "Sending..." : "पठाउँदै...") : t.send}
                    </button>
                  </div>
                </form>
              </div>
            </RevealItem>

            <RevealItem className="hidden md:block" duration={1.1} x={SLIDE_DISTANCE_PX}>
              <div className="h-[620px] w-full overflow-hidden" aria-hidden>
                <div className="relative h-full w-full contact-clip">
                  <img src="/contact.png" alt="" className="w-full h-full object-cover object-right" />
                  <div className="absolute inset-0 bg-[#0A1F4D]/80 mix-blend-color" />
                </div>
              </div>
            </RevealItem>
          </RevealGroup>

          <div className="mt-20 pt-16 pb-16 md:mt-28 md:pt-20 md:pb-20 border-t border-[#0b0d12]/10">
            <div className="mb-8">
              <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-[#0b0d12]/60">{t.locationEyebrow}</h2>
              <h3 className="font-heading text-4xl font-normal leading-tight tracking-tight text-[#0b0d12] lg:text-5xl">
                <StaggerWords text={`${t.locationTitle} `} amount={0.5} />
                <span className="font-bold text-[#E31B23]">{t.locationAccent}</span>
              </h3>
            </div>
            <Reveal amount={0.3}>
              <p className="text-sm text-[#0b0d12]/60 mb-6">{t.mapCaption || "Ninja Infosys, Anamnagar, Kathmandu, Nepal"}</p>

              <div className="mb-6">
                <Link
                  href="https://www.google.com/maps?q=Anamnagar%20Kathmandu%20Nepal"
                  className="inline-flex items-center gap-2 text-sm text-[#2563EB] hover:underline"
                >
                  <span>{t.getDirection}</span>
                </Link>
              </div>

              <div className="mt-6 w-full">
                <iframe
                  title={t.mapTitle || "Anamnagar map"}
                  src={"https://www.google.com/maps?q=Anamnagar%20Kathmandu%20Nepal&output=embed"}
                  className="w-full h-[380px] md:h-[420px] block"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}