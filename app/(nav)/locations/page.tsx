"use client";

import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const OFFICES = {
  en: [
    {
      city: "Kathmandu",
      address: "Anamnagar, Kathmandu, Nepal",
      phone: "+977-9851343348",
      email: "info@ninjainfosys.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5085889754915!2d85.32286631506188!3d27.70587948279337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198db7c6a1b7%3A0x4ea343ea75b2b439!2sAnamnagar%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1682260000000!5m2!1sen!2snp"
    }
  ],
  ne: [
    {
      city: "काठमाडौं",
      address: "अनामनगर, काठमाडौं, नेपाल",
      phone: "+977-9851343348",
      email: "info@ninjainfosys.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5085889754915!2d85.32286631506188!3d27.70587948279337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198db7c6a1b7%3A0x4ea343ea75b2b439!2sAnamnagar%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1682260000000!5m2!1sen!2snp"
    }
  ]
};

const content = {
  en: {
    heading: "Our Locations",
    subheading: "Strategically positioned to deliver critical infrastructure solutions across complex environments.",
  },
  ne: {
    heading: "हाम्रा स्थानहरू",
    subheading: "जटिल वातावरणमा महत्वपूर्ण पूर्वाधार समाधानहरू प्रदान गर्न रणनीतिक रूपमा अवस्थित।",
  }
};

export default function LocationsPage() {
  const { language } = useLanguage();
  const lang = (language ?? "en") as "en" | "ne";
  const t = content[lang];
  const offices = OFFICES[lang];

  return (
    <>
      <main className="pt-32 pb-24 min-h-screen" style={{ backgroundColor: "var(--page-bg)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-16">
            <h1 className="text-5xl sm:text-6xl font-heading font-bold text-[#0b0d12] mb-4">{t.heading}</h1>
            <p className="text-xl text-[#0b0d12]/60 max-w-2xl">{t.subheading}</p>
          </div>

          <div className="grid grid-cols-1 max-w-2xl gap-12">
            {offices.map((office, idx) => (
              <div key={idx} className="bg-white border border-[#0b0d12]/10 rounded-lg overflow-hidden group hover:border-[#2563EB]/50 transition-all duration-300">
                <div className="h-64 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <iframe
                    src={office.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-heading font-bold text-[#0b0d12] mb-10 underline decoration-[#2563EB] decoration-4 underline-offset-8">
                    {office.city}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 text-[#0b0d12]/70">
                      <MapPin size={20} className="text-[#2563EB] mt-1 shrink-0" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-start gap-4 text-[#0b0d12]/70">
                      <Phone size={20} className="text-[#2563EB] mt-1 shrink-0" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-start gap-4 text-[#0b0d12]/70">
                      <Mail size={20} className="text-[#2563EB] mt-1 shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:text-[#2563EB] transition-colors">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
