"use client"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Smartphone, Phone, Linkedin, Facebook, Twitter } from "lucide-react"
import { useLanguage } from "@/components/LanguageProvider"
import { StaggerWords } from "@/components/ui/reveal"

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
          { label: "Partners", href: "/partners" },
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
          { type: "address", value: "Anamnagar, Kathmandu, Nepal" },
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
          { label: "साझेदारहरू", href: "/partners" },
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
          { type: "address", value: "अनामनगर, काठमाडौं, नेपाल" },
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

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        const data = await response.json();
        setError(data.error || "Subscription failed.");
      }
    } catch (err) {
      setError("Failed to connect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      role="contentinfo"
      style={{ backgroundColor: '#071730', color: '#ffffff' }}
      className="transition-colors duration-300 border-t border-white/10"
    >
      {/* Newsletter Band */}
      <div className="relative z-10" style={{ background: 'linear-gradient(160deg, #123163 0%, #0b2450 55%, #071a3a 100%)' }}>
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 8% 20%, rgba(37,99,235,0.25) 0%, transparent 45%), " +
              "radial-gradient(circle at 92% 85%, rgba(37,99,235,0.25) 0%, transparent 45%)",
          }}
        />
        <div className="mx-auto w-full max-w-screen-2xl px-6 sm:px-8 lg:px-12 2xl:px-16 pt-16 sm:pt-20 pb-16 sm:pb-20 relative z-10">
          <div
            className="relative border border-white/15 shadow-[0_25px_70px_-15px_rgba(7,23,48,0.55)] px-8 py-10 sm:px-14 sm:py-14 overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #16386f 0%, #0d2a56 60%, #091f42 100%)' }}
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-10">
              <div className="max-w-xl text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
                  <StaggerWords text={language === 'en' ? 'Stay ahead of the curve.' : 'अगाडि रहनुहोस्।'} />
                </h3>
                <p className="text-white/60 text-[15px] leading-relaxed">
                  {language === 'en'
                    ? 'Get the latest insights on infrastructure, technology, and sustainability delivered to your inbox.'
                    : 'पूर्वाधार, प्रविधि, र दिगोपनका नवीनतम अन्तर्दृष्टि आफ्नो इनबक्समा प्राप्त गर्नुहोस्।'}
                </p>
              </div>

              {submitted ? (
                <div className="flex items-center gap-3 text-white">
                  <div className="w-6 h-6 rounded-full bg-[#E31B23] flex items-center justify-center text-xs font-bold text-white">✓</div>
                  <span className="font-semibold">{language === 'en' ? 'You\'re subscribed!' : 'सदस्यता लिइयो!'}</span>
                </div>
              ) : (
                <div className="flex flex-col w-full md:w-auto flex-shrink-0">
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full md:w-auto gap-3 sm:gap-0">
                    <input
                      type="email"
                      required
                      disabled={loading}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={language === 'en' ? 'Enter your email' : 'इमेल हाल्नुहोस्'}
                      className="flex-1 sm:w-72 px-5 py-4 text-[15px] bg-white text-[#0b0d12] placeholder-black/35 border border-white/20 outline-none focus:border-[#173C80] transition-colors disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-7 py-4 bg-[#E31B23] text-white font-bold text-[15px] hover:brightness-110 transition-all active:scale-95 whitespace-nowrap cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (language === 'en' ? 'Subscribing...' : 'पर्खनुहोस्...') : (language === 'en' ? 'Subscribe' : 'सदस्यता')}
                    </button>
                  </form>
                  {error && <p className="text-[#ff6b6b] text-xs mt-2">{error}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 sm:px-8 lg:px-12 2xl:px-16">
        <div className="h-10" />
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-5 mt-8">
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
            <p className="max-w-md text-pretty font-normal text-white/55">
              {language === "en"
                ? "Turning intent into infrastructure — building reliable, scalable, and impactful digital systems for modern organizations."
                : "इरादालाई पूर्वाधारमा रूपान्तरण गर्दै - आधुनिक संस्थाहरूका लागि विश्वसनीय, मापनयोग्य, र प्रभावकारी डिजिटल प्रणालीहरू निर्माण गर्दै।"}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 mt-8 lg:mt-0">
            <div className="w-max md:mr-40">
              <div className="mb-5">
                <h3 className="font-semibold text-lg text-white">{content.quickHeading}</h3>
              </div>
              <ul className="space-y-2">
                {content.quickLinks.map((link: any) => (
                  <li key={String(link.label)}>
                    <Link
                      href={link.href}
                      className="font-normal transition-colors hover:text-white text-white/55"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-max md:mr-25">
              <div className="mb-5">
                <h3 className="font-semibold text-lg mb-4 text-white">{content.connectHeading}</h3>
              </div>
              <div className="font-normal space-y-3 text-white/55">
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
                            <span className="mt-1 text-white/40"><Smartphone size={18} /></span>
                            <div>{mobiles.join(", ")}</div>
                          </div>
                        )}
                        {landlines.map((p: string, idx: number) => (
                          <div className="flex items-start gap-3" key={idx}>
                            <span className="mt-1 text-white/40"><Phone size={18} /></span>
                            <div>{p}</div>
                          </div>
                        ))}
                      </div>
                    )
                  }

                  return (
                    <div className="flex items-start gap-3" key={i}>
                      <span className="mt-1 text-white/40">
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
              <div className="mb-5">
                <h3 className="font-semibold text-lg text-white">{content.socialLinks}</h3>
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
                        className="inline-flex items-center justify-center w-11 h-11 rounded-full transition-all hover:bg-[#173C80] hover:border-[#173C80] hover:scale-110 group bg-white/5 border border-white/15"
                      >
                        {typeOrValue === "LinkedIn" || typeOrValue === "लिंक्डइन" ? (
                          <Linkedin size={16} className="text-white" aria-hidden="true" />
                        ) : null}
                        {typeOrValue === "Facebook" || typeOrValue === "फेसबुक" ? (
                          <Facebook size={16} className="text-white" aria-hidden="true" />
                        ) : null}
                        {typeOrValue === "X" || typeOrValue.toLowerCase().includes("twitter") ? (
                          <Twitter size={16} className="text-white" aria-hidden="true" />
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
                      className="text-sm font-normal transition-colors hover:text-white text-white/55"
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
