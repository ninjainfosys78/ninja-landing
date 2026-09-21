const HERO_VIDEO_SRC = "/videos/hero-team-working.mp4"
const VIDEO_GRADE = "saturate(0.85) contrast(1.05)"
const BLUE_WASH = "linear-gradient(110deg, rgba(10,42,107,0.85) 0%, rgba(10,42,107,0.55) 45%, rgba(10,31,77,0.3) 100%)"
const BOTTOM_FADE = "linear-gradient(to top, rgba(5,13,36,0.55) 0%, transparent 30%)"

export default function HeroVideoBackground() {
  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden bg-[#0A1F4D]">
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        style={{ filter: VIDEO_GRADE }}
        src={HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0" style={{ background: BLUE_WASH }} />
      <div className="absolute inset-0" style={{ background: BOTTOM_FADE }} />
    </div>
  )
}
