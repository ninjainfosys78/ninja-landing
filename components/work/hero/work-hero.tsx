import Link from "next/link";
import { ChevronRight } from "lucide-react";

import SectionHeading from "@/components/ui/section-heading";

interface WorkHeroProps {
  title: string;
  lead: string;
  crumbSelf: string;
  bannerUrl: string;
}

export default function WorkHero({
  title,
  lead,
  crumbSelf,
  bannerUrl,
}: WorkHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-fixed grayscale blur-[8px] scale-110"
        style={{ backgroundImage: `url('${bannerUrl}')` }}
      />
      <div className="hero-dark-overlay absolute inset-0 -z-10" />

      <div className="mx-auto max-w-[1450px] px-6 pb-20 pt-36 sm:px-10 lg:pb-28 lg:pt-44">
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.2em] text-white/70">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Ninja Infosys
              </Link>
            </li>
            <ChevronRight aria-hidden size={14} className="text-white/50" />
            <li className="text-white">{crumbSelf}</li>
          </ol>
        </nav>

        <SectionHeading
          as="h1"
          title={title}
          description={lead}
          className="mt-8"
          titleClassName="max-w-3xl font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          descriptionClassName="mt-6 max-w-2xl text-lg leading-relaxed text-white/75"
        />
      </div>
    </section>
  );
}
