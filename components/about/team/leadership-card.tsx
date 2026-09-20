"use client";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import MemberPortrait from "./member-portrait";
import type { TeamMemberView } from "./team-member-view";

interface LeadershipCardProps {
  member: TeamMemberView;
  onLearnMore: (member: TeamMemberView) => void;
}

export default function LeadershipCard({ member, onLearnMore }: LeadershipCardProps) {
  const { language } = useLanguage();

  return (
    <article className="card-premium group flex h-full flex-col gap-6 overflow-hidden p-5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#dbe8fd]">
        <MemberPortrait name={member.name} image={member.image} />
      </div>

      <div className="flex flex-1 flex-col gap-2 px-1 min-h-0">
        <h4 className="text-xl font-medium text-[#0b0d12]">{member.name}</h4>
        <p className="text-sm text-[#0b0d12]/50">{member.role}</p>
        {member.bio && <p className="mt-3 line-clamp-4 text-[15px] leading-relaxed text-[#0b0d12]/75 overflow-hidden">{member.bio}</p>}
      </div>

      <button
        type="button"
        onClick={() => onLearnMore(member)}
        className="mb-1 flex items-center gap-2 self-start px-1 text-sm font-bold text-[#E31B23] transition-all hover:gap-3"
      >
        {language === "en" ? "Learn More" : "थप जान्नुहोस्"}
        <ArrowRight size={14} />
      </button>
    </article>
  );
}
