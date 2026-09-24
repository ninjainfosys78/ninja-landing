"use client";
import MemberPortrait from "./member-portrait";
import type { TeamMemberView } from "./team-member-view";

interface LeadershipCardProps {
  member: TeamMemberView;
  onLearnMore: (member: TeamMemberView) => void;
}

// Full bio/LinkedIn still live in MemberModal — the whole card opens it
// (no separate "Learn More" button taking up space underneath).
export default function LeadershipCard({ member, onLearnMore }: LeadershipCardProps) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onLearnMore(member)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onLearnMore(member);
        }
      }}
      className="card-premium card-premium--soft-shadow group flex h-full cursor-pointer flex-col gap-4 overflow-hidden p-4"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#dbe8fd]">
        <MemberPortrait name={member.name} image={member.image} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1 px-1 min-h-0">
        <h4 className="text-xl font-medium text-[#0b0d12] [overflow-wrap:anywhere]">{member.name}</h4>
        <p className="text-sm text-[#0b0d12]/50 [overflow-wrap:anywhere]">{member.role}</p>
      </div>
    </article>
  );
}
