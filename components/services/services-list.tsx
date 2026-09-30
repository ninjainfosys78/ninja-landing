"use client";

import ServiceFeature from "./service-feature";
import type { ServiceItem } from "./service-items";

interface ServicesListProps {
  services: ServiceItem[];
}

export default function ServicesList({ services }: ServicesListProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" style={{ backgroundColor: "var(--page-bg-alt)" }}>
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-[#2563EB]/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-20 h-[28rem] w-[28rem] rounded-full bg-[#E31B23]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-[1450px] px-6 sm:px-10">
        <div className="space-y-32 sm:space-y-40">
          {services.map((service, index) => (
            <ServiceFeature key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
