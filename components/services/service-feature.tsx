"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

import ImageFrame from "@/components/ui/image-frame";
import { useMounted } from "@/components/ui/reveal";
import type { ServiceItem } from "./service-items";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const IMAGE_DURATION_SECONDS = 1.8;
const TEXT_STAGGER_SECONDS = 0.25;
const TEXT_DELAY_CHILDREN_SECONDS = 0.6;
const ITEM_DURATION_SECONDS = 1;

const textContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: TEXT_STAGGER_SECONDS, delayChildren: TEXT_DELAY_CHILDREN_SECONDS },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: ITEM_DURATION_SECONDS, ease: EASE_OUT } },
};

interface ServiceFeatureProps {
  service: ServiceItem;
  index: number;
}

export default function ServiceFeature({ service, index }: ServiceFeatureProps) {
  const isReversed = index % 2 === 1;
  // Framer Motion's SSR output bakes the already-visible "show" state instead
  // of "hidden" for whileInView-driven elements, so on refresh anything
  // already in view never visibly animates. Forcing "hidden" via an explicit
  // `animate` prop until mount guarantees a genuine hidden first paint (see
  // components/ui/reveal.tsx for the fuller explanation).
  const mounted = useMounted();

  return (
    <div id={service.id} className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <motion.div
        className={isReversed ? "lg:order-2" : undefined}
        initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        animate={!mounted ? { opacity: 0, x: isReversed ? 60 : -60 } : undefined}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: IMAGE_DURATION_SECONDS, ease: EASE_OUT }}
      >
        <ImageFrame src={service.image} alt={service.name} accent={service.accent} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        animate={!mounted ? "hidden" : undefined}
        viewport={{ once: true, amount: 0.4 }}
        variants={textContainerVariants}
      >
        <motion.h3
          variants={textItemVariants}
          className="font-heading text-4xl font-semibold tracking-tight text-[#0b0d12] sm:text-5xl"
        >
          {service.name}
        </motion.h3>
        <motion.p variants={textItemVariants} className="mt-6 max-w-xl text-lg leading-relaxed text-[#5b6472]">
          {service.description}
        </motion.p>

        <motion.ul variants={textItemVariants} className="mt-8 space-y-3">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-[15px] text-[#2E3A4E]">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${service.accent}1A`, color: service.accent }}
              >
                <Check size={12} strokeWidth={3} />
              </span>
              {bullet}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={textItemVariants}>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-3 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: service.accent, borderRadius: "6px" }}
          >
            {service.cta}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
