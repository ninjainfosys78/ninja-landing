import Link from "next/link"

interface OfficeMapProps {
  city: string
  caption: string
  mapQuery: string
  getDirection: string
  mapTitle: string
}

export default function OfficeMap({ city, caption, mapQuery, getDirection, mapTitle }: OfficeMapProps) {
  const encodedQuery = encodeURIComponent(mapQuery)

  return (
    <div>
      <h4 className="font-heading text-2xl font-bold text-[#0b0d12] mb-2">{city}</h4>
      <p className="text-sm text-[#0b0d12]/60 mb-4">{caption}</p>
      <Link
        href={`https://www.google.com/maps?q=${encodedQuery}`}
        className="inline-flex items-center gap-2 text-sm text-[#2563EB] hover:underline mb-6"
      >
        <span>{getDirection}</span>
      </Link>
      <iframe
        title={mapTitle}
        src={`https://www.google.com/maps?q=${encodedQuery}&output=embed`}
        className="w-full h-[380px] block"
        loading="lazy"
      />
    </div>
  )
}
