import TeamMarqueeRow from "./team-marquee-row";
import type { TeamMemberView } from "./team-member-view";

interface TeamMarqueeSectionProps {
  title: string;
  accent: string;
  subtitle: string;
  members: TeamMemberView[];
}

export default function TeamMarqueeSection({ title, accent, subtitle, members }: TeamMarqueeSectionProps) {
  if (members.length === 0) return null;

  return (
    <section id="team" className="relative z-10 overflow-hidden pb-16 lg:pb-24" style={{ backgroundColor: "var(--page-bg-alt)" }}>
      <div className="mx-auto max-w-2xl px-6 py-16 text-center lg:py-24">
        <h3 className="font-heading text-4xl font-normal leading-tight tracking-tight text-[#0b0d12] lg:text-5xl">
          {title} <span className="font-bold text-[#E31B23]">{accent}</span>
        </h3>
        <p className="mt-5 text-base leading-relaxed text-[#0b0d12]/70">{subtitle}</p>
      </div>

      <TeamMarqueeRow members={members} />
    </section>
  );
}
