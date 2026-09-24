"use client";
import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useMounted } from "@/components/ui/reveal";

interface WhoWeAreFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface WhoWeAreSectionProps {
  who: string;
  whoDesc: string;
  features: WhoWeAreFeature[];
  imageUrl: string | null;
}

const featureGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

const featureCardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function WhoWeAreSection({ who, whoDesc, features, imageUrl }: WhoWeAreSectionProps) {
  // Framer Motion's SSR output bakes the already-visible "show" state instead
  // of "hidden" for whileInView-driven elements, so on refresh anything
  // already in view never visibly animates. Forcing "hidden" via an explicit
  // `animate` prop until mount guarantees a genuine hidden first paint (see
  // components/ui/reveal.tsx for the fuller explanation).
  const mounted = useMounted();
  return (
    <section id="who-we-are" className="relative isolate overflow-hidden" style={{ backgroundColor: "var(--page-bg)" }}>
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid gap-12 md:grid-cols-12 items-center">
          <motion.div
            className="md:col-span-6"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            animate={!mounted ? { opacity: 0, x: -60 } : undefined}
            viewport={{ once: true, amount: 0.3, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="relative h-[420px] overflow-hidden rounded-3xl border border-[#d7e4fa] shadow-[0_30px_70px_-30px_rgba(10,31,77,0.35)] bg-[#e8f1ff]">
              {imageUrl && (
                <img src={imageUrl} alt="Who we are" className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0b0d12]/60 via-transparent to-[#2563EB]/10" />
            </div>
          </motion.div>

          <div className="md:col-span-6 flex flex-col justify-center gap-6">
            <motion.h2
              className="text-[32px] lg:text-[40px] font-heading font-bold text-left text-[#0b0d12] leading-tight"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              animate={!mounted ? { opacity: 0, x: 60 } : undefined}
              viewport={{ once: true, amount: 0.3, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {who}
            </motion.h2>

            <motion.p
              className="mt-0 leading-relaxed text-[#0b0d12]/60"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={!mounted ? { opacity: 0, y: 30 } : undefined}
              viewport={{ once: true, amount: 0.3, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
            >
              {whoDesc}
            </motion.p>

            <motion.div
              className="mt-6 grid grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              animate={!mounted ? "hidden" : undefined}
              viewport={{ once: true, amount: 0.3, margin: "-100px" }}
              variants={featureGridVariants}
            >
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className="card-premium group flex items-start gap-3 p-4"
                    variants={featureCardVariants}
                  >
                    <span className="icon-tile h-9 w-9 flex-shrink-0 !rounded-lg">
                      <Icon size={16} />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-[#0b0d12]">{feature.title}</div>
                      <div className="text-xs text-[#0b0d12]/60">{feature.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
