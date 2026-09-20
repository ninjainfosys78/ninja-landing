"use client";
import { useState } from "react";
import { StaggerWords, RevealGroup, RevealItem } from "@/components/ui/reveal";
import LeadershipCard from "./leadership-card";
import MemberModal from "./member-modal";
import type { TeamMemberView } from "./team-member-view";

interface LeadershipSectionProps {
  eyebrow: string;
  title: string;
  accent: string;
  members: TeamMemberView[];
}

export default function LeadershipSection({ eyebrow, title, accent, members }: LeadershipSectionProps) {
  const [selected, setSelected] = useState<TeamMemberView | null>(null);

  if (members.length === 0) return null;

  // Move the first member (index 0) to the third position (index 2)
  const orderedMembers =
    members.length >= 3
      ? [members[1], members[2], members[0], ...members.slice(3)]
      : members;

  return (
    <section id="leadership" className="relative z-10 overflow-hidden border-t border-[#d7e4fa] bg-white">
      <div className="mx-auto max-w-[1600px] px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mb-12 lg:mb-16">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#0b0d12]/60">{eyebrow}</h2>
          <h3 className="font-heading text-4xl font-normal leading-tight tracking-tight text-[#0b0d12] lg:text-5xl">
            <StaggerWords text={`${title} `} amount={0.5} />
            <span className="font-bold text-[#E31B23]">{accent}</span>
          </h3>
        </div>

        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {orderedMembers.map((member, idx) => (
            <RevealItem key={`${member.name}-${idx}`} className="h-full">
              <LeadershipCard member={member} onLearnMore={setSelected} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {selected && <MemberModal member={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
