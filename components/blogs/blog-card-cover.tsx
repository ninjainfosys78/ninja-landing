"use client"

import { useState } from "react"

const COVER_FALLBACK_BACKGROUND =
  "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.55), transparent 55%), radial-gradient(circle at 85% 85%, rgba(227,27,35,0.35), transparent 50%), linear-gradient(135deg, #0A1F4D, #12306B)"
const FALLBACK_INITIAL_LENGTH = 1

interface BlogCardCoverProps {
  image?: string
  title: string
}

export default function BlogCardCover({ image, title }: BlogCardCoverProps) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(image) && !failed

  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={title}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div
          aria-hidden
          className="grid h-full w-full place-items-center font-heading text-7xl font-bold text-white/25"
          style={{ background: COVER_FALLBACK_BACKGROUND }}
        >
          {title.slice(0, FALLBACK_INITIAL_LENGTH).toUpperCase()}
        </div>
      )}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0A1F4D]/35 via-transparent to-transparent" />
    </div>
  )
}
