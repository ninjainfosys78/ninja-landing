import SectionHeading from "@/components/ui/section-heading";
export interface CaseStudy {
  eyebrow: string;
  title: string;
  problem: string;
  approach: string;
  result: string[];
}

interface FeaturedCaseStudiesProps {
  title: string;
  problemLabel: string;
  approachLabel: string;
  studies: CaseStudy[];
}

export default function FeaturedCaseStudies({
  title,
  problemLabel,
  approachLabel,
  studies,
}: FeaturedCaseStudiesProps) {
  return (
    <section className="relative overflow-hidden bg-[#0A1F4D] py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#2563EB]/20 blur-3xl" />
      <div className="relative mx-auto max-w-[1450px] px-6 sm:px-10">
        <SectionHeading
          title={title}
          titleClassName="max-w-2xl font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {studies.map((study) => (
            <article
              key={study.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.07] sm:p-10"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7FA8FF]">
                {study.eyebrow}
              </span>
              <h3 className="mt-4 font-heading text-2xl font-semibold leading-snug text-white">
                {study.title}
              </h3>
              <dl className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/70">
                <div>
                  <dt className="font-semibold text-white">{problemLabel}</dt>
                  <dd className="mt-1">{study.problem}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">{approachLabel}</dt>
                  <dd className="mt-1">{study.approach}</dd>
                </div>
              </dl>
              <ul className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                {study.result.map((r) => (
                  <li
                    key={r}
                    className="rounded-full bg-[#2563EB]/20 px-4 py-1.5 text-sm font-medium text-[#B9CFFF]"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
