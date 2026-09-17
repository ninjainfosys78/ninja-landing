import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen text-[#0b0d12] flex items-center justify-center px-6" style={{ backgroundColor: "#F7F6F2" }}>
      <div className="max-w-2xl text-center">
        <h1 className="text-8xl sm:text-9xl font-heading font-bold mb-6 text-[#2563EB]">404</h1>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 text-[#0b0d12]">Page Not Found</h2>
        <p className="text-xl py-8 text-[#0b0d12]/70 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E31B23] text-white text-base font-semibold rounded-lg hover:brightness-110 transition-all hover:gap-3 group"
        >
          Back to home
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </main>
  )
}
