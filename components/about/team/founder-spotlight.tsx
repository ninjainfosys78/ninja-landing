import { StaggerWords, RevealGroup, RevealItem } from "@/components/ui/reveal";
import MemberPortrait from "./member-portrait";
import MemberLinkedInButton from "./member-linkedin-button";
import type { TeamMemberView } from "./team-member-view";

const SLOW_REVEAL_SECONDS = 1.3;
const SLOW_REVEAL_STAGGER_SECONDS = 0.28;
const SLOW_REVEAL_AMOUNT = 0.4;
const SLIDE_DISTANCE_PX = 90;

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
        <RevealGroup amount={SLOW_REVEAL_AMOUNT} stagger={SLOW_REVEAL_STAGGER_SECONDS}>
          <RevealGroup className="mb-10 lg:mb-14" amount={SLOW_REVEAL_AMOUNT} stagger={SLOW_REVEAL_STAGGER_SECONDS}>
            <RevealItem duration={SLOW_REVEAL_SECONDS}>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#0b0d12]/60">{eyebrow}</h2>
            </RevealItem>
            <RevealItem duration={SLOW_REVEAL_SECONDS}>
              <h3 className="font-heading text-4xl font-normal leading-tight tracking-tight text-[#0b0d12] lg:text-5xl">
                <StaggerWords text={`${title} `} amount={0.5} />
                <span className="font-bold text-[#E31B23]">{accent}</span>
              </h3>
            </RevealItem>
          </RevealGroup>

          <RevealGroup
            className="flex max-w-6xl flex-row items-start gap-10 sm:gap-20 lg:gap-24"
            amount={SLOW_REVEAL_AMOUNT}
            stagger={SLOW_REVEAL_STAGGER_SECONDS}
          >
            <RevealItem className="shrink-0" duration={SLOW_REVEAL_SECONDS} x={-SLIDE_DISTANCE_PX}>
              <div className="relative aspect-[4/5] w-32 overflow-hidden rounded-2xl bg-[#dbe8fd] sm:w-72 lg:w-96">
                <MemberPortrait name={member.name} image={member.image} />
              </div>
            </RevealItem>

            <RevealGroup
              className="flex min-w-0 flex-1 flex-col justify-center gap-2 sm:gap-3"
              amount={SLOW_REVEAL_AMOUNT}
              stagger={SLOW_REVEAL_STAGGER_SECONDS}
            >
              <RevealItem duration={SLOW_REVEAL_SECONDS} x={SLIDE_DISTANCE_PX}>
                <h4 className="font-heading text-2xl font-bold leading-tight text-[#0b0d12] [overflow-wrap:anywhere] sm:text-4xl lg:text-5xl">
                  {member.name}
                </h4>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-[#0b0d12]/50 [overflow-wrap:anywhere] sm:text-sm">
                  {member.role}
                </p>
              </RevealItem>

              {member.bio && (
                <RevealItem duration={SLOW_REVEAL_SECONDS} x={SLIDE_DISTANCE_PX}>
                  <p className="mt-2 line-clamp-3 max-w-3xl text-sm leading-relaxed text-[#0b0d12]/75 [overflow-wrap:anywhere] sm:line-clamp-6 sm:text-base lg:text-lg">
                    {member.bio}
                  </p>
                </RevealItem>
              )}

              <RevealItem duration={SLOW_REVEAL_SECONDS} x={SLIDE_DISTANCE_PX}>
                <MemberLinkedInButton url={member.linkedinUrl} />
              </RevealItem>
            </RevealGroup>
          </RevealGroup>
        </RevealGroup>
      </div>
    </section>
  );
}
