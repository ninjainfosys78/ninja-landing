interface BannerSubtitleProps {
  children: React.ReactNode
}

export default function BannerSubtitle({ children }: BannerSubtitleProps) {
  return <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{children}</p>
}
