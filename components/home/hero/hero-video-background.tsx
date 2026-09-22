"use client"

import { useEffect, useRef } from "react"

const HERO_VIDEO_SRC = "/videos/hero-luminous-network.mp4"
const PLAYBACK_RATE = 0.4
const TONE_DOWN = "brightness(0.6) contrast(0.95) saturate(1.2)"
const READABILITY_OVERLAY =
  "linear-gradient(90deg, rgba(3,9,28,0.82) 0%, rgba(4,12,36,0.6) 42%, rgba(4,12,36,0.4) 100%)"

export default function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // The video can start playing before React hydrates, so its own events are
  // missed. Set the speed on mount, and re-apply it whenever the browser
  // resets it (some do when a looping video restarts).
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const applySlowMotion = () => {
      if (video.playbackRate !== PLAYBACK_RATE) video.playbackRate = PLAYBACK_RATE
    }
    applySlowMotion()
    video.addEventListener("play", applySlowMotion)
    video.addEventListener("seeked", applySlowMotion)
    video.addEventListener("loadedmetadata", applySlowMotion)
    return () => {
      video.removeEventListener("play", applySlowMotion)
      video.removeEventListener("seeked", applySlowMotion)
      video.removeEventListener("loadedmetadata", applySlowMotion)
    }
  }, [])

  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden bg-[#050D24]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        style={{ filter: TONE_DOWN }}
        src={HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0" style={{ background: READABILITY_OVERLAY }} />
    </div>
  )
}
