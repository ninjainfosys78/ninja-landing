import { StaggerWords, RevealGroup, RevealItem } from "@/components/ui/reveal";
import MemberPortrait from "./member-portrait";
import MemberLinkedInButton from "./member-linkedin-button";
import type { TeamMemberView } from "./team-member-view";

interface FounderSpotlightProps {
  eyebrow: string;
  title: string;
  accent: string;
  member?: TeamMemberView;
}

/** The founder's own row — a large portrait beside bio and LinkedIn, ahead of the leadership grid. */
export default function FounderSpotlight({ eyebrow, title, accent, member }: FounderSpotlightProps) {
  if (!member) return null;

  return (
    <section id="leadership" className="relative z-10 overflow-hidden border-t border-[#d7e4fa] bg-white">
      <div className="mx-auto max-w-[1600px] px-6 pt-20 sm:px-8 lg:px-12 lg:pt-24">
        <div className="mb-10 lg:mb-14">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#0b0d12]/60">{eyebrow}</h2>
          <h3 className="font-heading text-4xl font-normal leading-tight tracking-tight text-[#0b0d12] lg:text-5xl">
            <StaggerWords text={`${title} `} amount={0.5} />
            <span className="font-bold text-[#E31B23]">{accent}</span>
          </h3>
        </div>

        <RevealGroup className="flex flex-row items-start gap-6 overflow-hidden rounded-3xl border border-[#d7e4fa] bg-white p-4 shadow-[0_1px_2px_rgba(10,31,77,0.04),0_14px_34px_-16px_rgba(10,31,77,0.14)] sm:gap-12 sm:p-10 lg:gap-16 lg:p-14">
          <RevealItem className="shrink-0">
            <div className="relative aspect-[4/5] w-28 overflow-hidden rounded-2xl bg-[#dbe8fd] sm:w-56 lg:w-72">
              <MemberPortrait name={member.name} image={member.image} />
            </div>
          </RevealItem>

          <RevealItem className="flex min-w-0 flex-1 flex-col justify-center gap-2 sm:gap-3">
            <h4 className="font-heading text-xl font-bold leading-tight text-[#0b0d12] [overflow-wrap:anywhere] sm:text-3xl lg:text-5xl">
              {member.name}
            </h4>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#0b0d12]/50 [overflow-wrap:anywhere] sm:text-sm">
              {member.role}
            </p>
            {member.bio && (
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#0b0d12]/75 [overflow-wrap:anywhere] sm:line-clamp-6 sm:text-base lg:text-lg">
                {member.bio}
              </p>
            )}
            <MemberLinkedInButton url={member.linkedinUrl} />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
