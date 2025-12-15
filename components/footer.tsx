"use client"
import React from "react"
import Link from "next/link"
import { Mail, MapPin, Smartphone, Phone, Linkedin, Facebook, Twitter } from "lucide-react"
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
            { label: "Insights", href: "/blogs" },
            { label: "Careers", href: "/careers" },
            { label: "About Us", href: "/about" },
          ],
          socialLinks: "Follow Us",
          links: [
            { type: "LinkedIn", value: "LinkedIn", href: "https://www.linkedin.com/company/ninja-infosys-official" },
            { type: "Facebook", value: "Facebook", href: "https://www.facebook.com/infosysninja" },
            { type: "X", value: "X", href: "https://x.com/NinjaPvt" },
          ],
          connectHeading: "Get in Touch",
          connect: [
            { type: "address", value: "Baneshwor-10, Kathmandu, Nepal" },
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
            { label: "इनसाइट्स", href: "/blogs" },
            { label: "क्यारियर", href: "/careers" },
            { label: "हामीबारे", href: "/about" },
          ],
          socialLinks: "हामीलाई फलो गर्नुहोस्",
          links: [
            { type: "LinkedIn", value: "लिंक्डइन", href: "https://www.linkedin.com/company/ninja-infosys" },
            { type: "Facebook", value: "फेसबुक", href: "https://www.facebook.com/ninjainfosys" },
            { type: "X", value: "X", href: "https://twitter.com/ninjainfosys" },
          ],
          connectHeading: "हामीसँग जडान हुनुहोस्",
          connect: [
            { type: "address", value: "बानेश्वर–१०, काठमाडौं, नेपाल" },
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
      return "Visit Ninja Infosys on social media"
    } else {
      if (key.includes("linkedin")) return "निन्जा इन्फोसिसको लिंक्डइन पेज खोल्नुहोस्"
      if (key.includes("facebook")) return "निन्जा इन्फोसिसको फेसबुक पेज खोल्नुहोस्"
      if (key === "x" || key.includes("twitter")) return "निन्जा इन्फोसिसको X (ट्विटर) पेज खोल्नुहोस्"
      return "निन्जा इन्फोसिसको सामाजिक सञ्जाल पेज खोल्नुहोस्"
    }
  }

  return (
    <footer className="bg-[#000000] text-ni-paper" role="contentinfo">
      <div className="w-full border-t border-ni-paper/12" />
      <div className="mx-auto w-full max-w-screen-2xl px-6 sm:px-8 lg:px-12 2xl:px-16">
        <div className="h-10" />
        <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between gap-8 mb-5 mt-8">
          <div>
            <Link href="/#hero" className="inline-block">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/logo.png"
                  alt="Ninja Infosys logo"
                  width={48}
                  height={48}
                  className="h-8 sm:h-10 w-auto object-contain"
                />
                <h2 className="text-2xl font-bold">NINJA INFOSYS</h2>
              </div>
            </Link>
            <p className="text-ni-paper/60 max-w-md text-pretty font-normal">
              {language === "en"
                ? "Turning intent into infrastructure — building reliable, scalable, and impactful digital systems for modern organizations."
                : "इरादालाई पूर्वाधारमा रूपान्तरण गर्दै - आधुनिक संस्थाहरूका लागि विश्वसनीय, मापनयोग्य, र प्रभावकारी डिजिटल प्रणालीहरू निर्माण गर्दै।"}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 mt-8 lg:mt-0">
            <div className="w-max md:mr-40">
              <div className="mb-5">
                <h3 className="font-semibold text-ni-paper/90 text-lg">{content.quickHeading}</h3>
              </div>
              <ul className="space-y-2">
                {content.quickLinks.map((link: any) => (
                  <li key={String(link.label)}>
                    <Link
                      href={link.href}
                      className="text-ni-paper/60 hover:text-ni-paper transition-colors max-w-md font-normal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-max md:mr-25">
              <div className="mb-5">
                <h3 className="font-semibold text-ni-paper/90 text-lg mb-4">{content.connectHeading}</h3>
              </div>
              <div className="text-ni-paper/60 hover:text-ni-paper transition-colors max-w-md font-normal">
                {content.connect.map((c: any, i: number) => {
                  if (c.type === "phone" || c.type === "mobile") {
                    const parts = String(c.value)
                      .split(",")
                      .map((p: string) => p.trim())
                      .filter(Boolean)

                    const landlines = parts.filter((p: string) => p.startsWith("01"))
                    const mobiles = parts.filter((p: string) => !p.startsWith("01"))

                    return (
                      <div key={i} className="space-y-2">
                        {mobiles.length > 0 && (
                          <div className="flex items-start gap-3">
                            <span className="mt-1">
                              <Smartphone size={18} />
                            </span>
                            <div>{mobiles.join(", ")}</div>
                          </div>
                        )}

                        {landlines.map((p: string, idx: number) => (
                          <div className="flex items-start gap-3" key={idx}>
                            <span className="mt-1">
                              <Phone size={18} />
                            </span>
                            <div>{p}</div>
                          </div>
                        ))}
                      </div>
                    )
                  }

                  return (
                    <div className="flex items-start gap-3" key={i}>
                      <span className="mt-1">
                        {c.type === "email" && <Mail size={18} />}
                        {c.type === "address" && <MapPin size={18} />}
                      </span>
                      <div>{c.value}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="w-max">
              <div className="mb-5 text-center">
                <h3 className="font-semibold text-ni-paper/90 text-lg">{content.socialLinks}</h3>
              </div>
              <ul className="flex flex-row items-center gap-3">
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
                        className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-ni-paper/10 hover:bg-[#d52020] transition-colors"
                      >
                        {typeOrValue === "LinkedIn" || typeOrValue === "लिंक्डइन" ? (
                          <Linkedin size={16} className="text-ni-paper" aria-hidden="true" />
                        ) : null}
                        {typeOrValue === "Facebook" || typeOrValue === "फेसबुक" ? (
                          <Facebook size={16} className="text-ni-paper" aria-hidden="true" />
                        ) : null}
                        {typeOrValue === "X" || typeOrValue.toLowerCase().includes("twitter") ? (
                          <Twitter size={16} className="text-ni-paper" aria-hidden="true" />
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

        <div className="pt-4 pb-4 border-t-2 border-ni-paper/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left w-full sm:w-auto">
              <p className="text-sm text-ni-paper/60 font-normal">{content.copyright}</p>
            </div>
            <div className="w-full sm:w-auto">
              <div className="flex items-center justify-start sm:justify-end gap-3 text-sm text-ni-paper/60">
                {content.legalLinks.map((link: any, idx: number) => (
                  <span key={String(link.label)} className="flex items-center">
                    <Link
                      href={link.href}
                      className="text-sm text-ni-paper/60 hover:text-ni-paper transition-colors font-normal"
                    >
                      {link.label}
                    </Link>
                    {idx < content.legalLinks.length - 1 && (
                      <span className="mx-3 text-ni-paper/30 font-normal">|</span>
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
