"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import BannerSubtitle from "@/components/ui/banner-subtitle"
import { getBannerByImgName } from "@/lib/banners"

interface PageBannerProps {
  bannerName: string
  fallbackImage: string
  homeLabel: string
  title: string
  subtitle?: string
}

export default function PageBanner({ bannerName, fallbackImage, homeLabel, title, subtitle }: PageBannerProps) {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null)

  useEffect(() => {
    getBannerByImgName(bannerName).then(setBannerUrl)
  }, [bannerName])

  return (
    <section id="hero" className="relative isolate min-h-[34vh] overflow-hidden pt-28 lg:pt-32">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('${bannerUrl || fallbackImage}')` }}
      />
      <div className="hero-dark-overlay absolute inset-0 -z-10" />

      <div className="mx-auto max-w-[1600px] px-6 pb-12 lg:px-16">
        <div className="mx-auto max-w-[1200px] text-center">
          <nav aria-label="Breadcrumb" className="mt-4 text-sm text-white/70">
            <ol className="flex items-center justify-center gap-3">
              <li>
                <Link href="/" className="font-normal tracking-wide hover:text-white">
                  {homeLabel}
                </Link>
              </li>
              <li aria-hidden className="inline-flex items-center text-white/40">
                <ChevronRight size={16} />
              </li>
              <li className="font-normal tracking-wide text-white">{title}</li>
            </ol>
          </nav>
          <h1 className="mt-2 font-heading text-5xl font-bold text-white sm:text-6xl">{title}</h1>
          {subtitle && <BannerSubtitle>{subtitle}</BannerSubtitle>}
        </div>
      </div>
    </section>
  )
}
