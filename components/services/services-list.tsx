"use client";

import SectionHeading from "@/components/ui/section-heading";
import ServiceFeature from "./service-feature";
import type { ServiceItem } from "./service-items";

interface ServicesListProps {
  title: string;
  description: string;
  services: ServiceItem[];
}

export default function ServicesList({ title, description, services }: ServicesListProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" style={{ backgroundColor: "var(--page-bg-alt)" }}>
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-[#2563EB]/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-20 h-[28rem] w-[28rem] rounded-full bg-[#E31B23]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-[1450px] px-6 sm:px-10">
        <SectionHeading
          title={title}
          description={description}
          className="mx-auto max-w-2xl text-center"
          titleClassName="font-heading text-4xl font-semibold tracking-tight text-[#0b0d12] sm:text-5xl"
          descriptionClassName="mt-5 text-lg leading-relaxed text-[#5b6472]"
        />

        <div className="mt-16 space-y-32 sm:mt-24 sm:space-y-40">
          {services.map((service, index) => (
            <ServiceFeature key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
