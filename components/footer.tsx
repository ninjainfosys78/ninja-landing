"use client"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Smartphone, Phone, Linkedin, Facebook, Twitter, Youtube, ChevronRight } from "lucide-react"
import { useLanguage } from "@/components/LanguageProvider"

export default function Footer() {
  const { language } = useLanguage()

  const content =
    language === "en"
      ? {
        copyright: "© 2025 Ninja Infosys. All rights reserved.",
        quickHeading: "Explore",
        quickLinks: [
          { label: "Solutions", href: "/solutions" },
          { label: "Services", href: "/services" },
          { label: "Blogs", href: "/blogs" },
          { label: "Partners", href: "/partners" },
          { label: "Careers", href: "/careers" },
          { label: "About Us", href: "/about" },
        ],
        socialLinks: "Follow Us",
        links: [
          { type: "LinkedIn", value: "LinkedIn", href: "https://www.linkedin.com/company/ninja-infosys-official" },
          { type: "Facebook", value: "Facebook", href: "https://www.facebook.com/infosysninja" },
          { type: "X", value: "X", href: "https://x.com/NinjaPvt" },
          { type: "YouTube", value: "YouTube", href: "https://www.youtube.com/@NINJAINFOSYSPVTLTD" },
        ],
        connectHeading: "Get in Touch",
        connect: [
          { type: "address", value: "Anamnagar, Kathmandu, Nepal" },
          { type: "address", value: "Ninja Infosys LLC, 1500 N Grant St, Ste R, Denver, CO 80203, US" },
          { type: "email", value: "info@ninjainfosys.com" },
          { type: "mobile", value: "+977-9851343348, +977-9858042433, +977-9858042647, 01-5922361" },
        ],
        legalLinks: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
        ],
      }
      : {
        copyright: "© 2025 Ninja Infosys. सर्वाधिकार सुरक्षित।",
        quickHeading: "अन्वेषण गर्नुहोस्",
        quickLinks: [
          { label: "समाधानहरू", href: "/solutions" },
          { label: "सेवाहरू", href: "/services" },
          { label: "ब्लगहरू", href: "/blogs" },
          { label: "साझेदारहरू", href: "/partners" },
          { label: "क्यारियर", href: "/careers" },
          { label: "हामीबारे", href: "/about" },
        ],
        socialLinks: "हामीलाई फलो गर्नुहोस्",
        links: [
          { type: "LinkedIn", value: "लिंक्डइन", href: "https://www.linkedin.com/company/ninja-infosys" },
          { type: "Facebook", value: "फेसबुक", href: "https://www.facebook.com/ninjainfosys" },
          { type: "X", value: "X", href: "https://twitter.com/ninjainfosys" },
          { type: "YouTube", value: "युट्युब", href: "https://www.youtube.com/@NINJAINFOSYSPVTLTD" },
        ],
        connectHeading: "हामीसँग जडान हुनुहोस्",
        connect: [
          { type: "address", value: "अनामनगर, काठमाडौं, नेपाल" },
          { type: "address", value: "Ninja Infosys LLC, 1500 N Grant St, Ste R, Denver, CO 80203, US" },
          { type: "email", value: "info@ninjainfosys.com" },
          { type: "mobile", value: "+९७७-९८५१३४३३४८, +९७७-९८५८०४२४३३, +९७७-९८५८०४२६४७, ०१-५९२२३६१" },
        ],
        legalLinks: [
          { label: "गोपनीयता नीति", href: "/privacy" },
          { label: "सेवाका सर्तहरू", href: "/terms" },
        ],
      }

  // 🔊 Accessible label for icon-only social links
  const getSocialAriaLabel = (typeOrValue: string): string => {
    const key = typeOrValue.toLowerCase()
    if (language === "en") {
      if (key.includes("linkedin")) return "Visit Ninja Infosys on LinkedIn"
      if (key.includes("facebook")) return "Visit Ninja Infosys on Facebook"
      if (key === "x" || key.includes("twitter")) return "Visit Ninja Infosys on X (Twitter)"
      if (key.includes("youtube")) return "Visit Ninja Infosys on YouTube"
      return "Visit Ninja Infosys on social media"
    } else {
      if (key.includes("linkedin")) return "निन्जा इन्फोसिसको लिंक्डइन पेज खोल्नुहोस्"
      if (key.includes("facebook")) return "निन्जा इन्फोसिसको फेसबुक पेज खोल्नुहोस्"
      if (key === "x" || key.includes("twitter")) return "निन्जा इन्फोसिसको X (ट्विटर) पेज खोल्नुहोस्"
      if (key.includes("youtube") || key.includes("युट्युब")) return "निन्जा इन्फोसिसको युट्युब च्यानल खोल्नुहोस्"
      return "निन्जा इन्फोसिसको सामाजिक सञ्जाल पेज खोल्नुहोस्"
    }
  }

  return (
    <footer
      role="contentinfo"
      style={{ backgroundColor: 'var(--footer-bg)', color: '#ffffff' }}
      className="transition-colors duration-300 border-t border-white/10"
    >
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 sm:px-8 lg:px-12 2xl:px-16">
        <div className="h-16 sm:h-20" />
        <div className="flex flex-col xl:flex-row items-start justify-between gap-8 xl:gap-24 mb-5 mt-8">
          <div>
            <Link
              href="/"
              className="flex items-center gap-3 group mb-3"
              aria-label="Ninja Infosys home"
            >
              <div className="relative w-12 h-12 transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Ninja Infosys Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold text-white">NINJA INFOSYS</span>
            </Link>
            <p className="max-w-md text-pretty font-normal text-white/75">
              {language === "en"
                ? "Turning intent into infrastructure — building reliable, scalable, and impactful digital systems for modern organizations."
                : "इरादालाई पूर्वाधारमा रूपान्तरण गर्दै - आधुनिक संस्थाहरूका लागि विश्वसनीय, मापनयोग्य, र प्रभावकारी डिजिटल प्रणालीहरू निर्माण गर्दै।"}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:flex-wrap gap-x-16 gap-y-10 mt-8 xl:mt-0 min-w-0">
            <div className="min-w-0">
              <div className="mb-5">
                <h3 className="font-semibold text-lg text-white mb-3">{content.quickHeading}</h3>
                <div className="h-[3px] w-10 bg-[#E31B23]" />
              </div>
              <ul className="space-y-2">
                {content.quickLinks.map((link: any) => (
                  <li key={String(link.label)}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 font-normal transition-colors hover:text-white text-white/75"
                    >
                      <ChevronRight size={14} className="text-[#E31B23] transition-transform group-hover:translate-x-1" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <div className="mb-5">
                <h3 className="font-semibold text-lg text-white mb-3">{content.connectHeading}</h3>
                <div className="h-[3px] w-10 bg-[#E31B23]" />
              </div>
              <div className="font-normal space-y-3 text-white/75 mt-4">
                {content.connect.map((c: any, i: number) => {
                  if (c.type === "phone" || c.type === "mobile") {
                    const parts = String(c.value)
                      .split(",")
                      .map((p: string = "") => p.trim())
                      .filter(Boolean)

                    const landlines = parts.filter((p: string) => p.startsWith("01"))
                    const mobiles = parts.filter((p: string) => !p.startsWith("01"))

                    return (
                      <div key={i} className="space-y-2">
                        {mobiles.length > 0 && (
                          <div className="flex items-start gap-3">
                            <span className="mt-1 text-[#E31B23]"><Smartphone size={18} /></span>
                            <div>{mobiles.join(", ")}</div>
                          </div>
                        )}
                        {landlines.map((p: string, idx: number) => (
                          <div className="flex items-start gap-3" key={idx}>
                            <span className="mt-1 text-[#E31B23]"><Phone size={18} /></span>
                            <div>{p}</div>
                          </div>
                        ))}
                      </div>
                    )
                  }

                  return (
                    <div className="flex items-start gap-3" key={i}>
                      <span className="mt-1 text-[#E31B23]">
                        {c.type === "email" && <Mail size={18} />}
                        {c.type === "address" && <MapPin size={18} />}
                      </span>
                      <div>{c.value}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="min-w-0">
              <div className="mb-5">
                <h3 className="font-semibold text-lg text-white mb-3">{content.socialLinks}</h3>
                <div className="h-[3px] w-10 bg-[#E31B23]" />
              </div>
              <ul className="flex flex-row items-center gap-4 mt-4">
                {(content.links || []).map((link: any, idx: number) => {
                  const typeOrValue = String(link.type ?? link.value ?? "")
                  const ariaLabel = getSocialAriaLabel(typeOrValue)

                  return (
                    <li key={String(link.label ?? link.type ?? link.value ?? idx)}>
                      <a
                        href={link.href || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={ariaLabel}
                        className="inline-flex items-center justify-center text-[#E31B23] transition-all hover:brightness-125 hover:scale-110"
                      >
                        {typeOrValue === "LinkedIn" || typeOrValue === "लिंक्डइन" ? (
                          <Linkedin size={22} aria-hidden="true" />
                        ) : null}
                        {typeOrValue === "Facebook" || typeOrValue === "फेसबुक" ? (
                          <Facebook size={22} aria-hidden="true" />
                        ) : null}
                        {typeOrValue === "X" || typeOrValue.toLowerCase().includes("twitter") ? (
                          <Twitter size={22} aria-hidden="true" />
                        ) : null}
                        {typeOrValue === "YouTube" || typeOrValue.includes("युट्युब") ? (
                          <Youtube size={22} aria-hidden="true" />
                        ) : null}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="my-[42px]" />

        <div className="pt-8 pb-12 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left w-full sm:w-auto">
              <p className="text-sm font-normal text-white/70">{content.copyright}</p>
            </div>
            <div className="w-full sm:w-auto">
              <div className="flex items-center justify-start sm:justify-end gap-6 text-sm">
                {content.legalLinks.map((link: any, idx: number) => (
                  <span key={String(link.label)} className="flex items-center">
                    <Link
                      href={link.href}
                      className="text-sm font-normal transition-colors hover:text-white text-white/75"
                    >
                      {link.label}
                    </Link>
                    {idx < content.legalLinks.length - 1 && (
                      <span className="mx-3 font-normal text-white/15">|</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
