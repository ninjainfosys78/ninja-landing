import type { LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";

export interface ProcessStep {
  title: string;
  description: string;
  Icon: LucideIcon;
}

interface ProcessStepsProps {
  title: string;
  steps: ProcessStep[];
}

export default function ProcessSteps({ title, steps }: ProcessStepsProps) {
  return (
    <section className="py-20 sm:py-28" style={{ backgroundColor: "var(--page-bg-alt)" }}>
      <div className="mx-auto max-w-[1450px] px-6 sm:px-10">
        <SectionHeading
          title={title}
          titleClassName="font-heading text-4xl font-semibold tracking-tight text-[#0b0d12] sm:text-5xl"
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title: stepTitle, description, Icon }, index) => (
            <li
              key={stepTitle}
              className="group relative overflow-hidden rounded-2xl border border-[#D7E4FA] bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_24px_-16px_rgba(10,31,77,0.22)]"
            >
              <span className="absolute right-5 top-3 font-heading text-6xl font-semibold text-[#2563EB]/[0.07]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] transition-colors duration-300 group-hover:bg-[#2563EB] group-hover:text-white">
                <Icon size={20} />
              </span>
              <h3 className="mt-6 font-heading text-lg font-semibold text-[#0b0d12]">
                {stepTitle}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#5b6472]">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
