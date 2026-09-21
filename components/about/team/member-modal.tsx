"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import MemberLinkedInButton from "./member-linkedin-button";
import type { TeamMemberView } from "./team-member-view";

interface MemberModalProps {
  member: TeamMemberView;
  onClose: () => void;
}

export default function MemberModal({ member, onClose }: MemberModalProps) {
  const { language } = useLanguage();

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={member.name}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative grid max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-[0_40px_120px_-30px_rgba(10,31,77,0.6)] md:grid-cols-5"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label={language === "en" ? "Close" : "बन्द गर्नुहोस्"}
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow text-[#0b0d12]/60 transition-colors hover:text-[#E31B23]"
        >
          <X size={18} />
        </button>

        {member.image && (
          <img src={member.image} alt={member.name} className="aspect-[4/5] w-full object-cover md:col-span-2 md:h-full md:min-h-[560px]" />
        )}
        <div className={`flex min-w-0 flex-col justify-center gap-4 p-8 sm:p-12 lg:p-16 ${member.image ? "md:col-span-3" : "md:col-span-5"}`}>
          <h4 className="font-heading text-4xl font-bold leading-tight text-[#0b0d12] lg:text-5xl [overflow-wrap:anywhere]">{member.name}</h4>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E31B23] [overflow-wrap:anywhere]">{member.role}</p>
          <div className="my-2 h-[3px] w-14 bg-gradient-to-r from-[#E31B23] to-[#2563EB]" />
          {member.bio && <p className="text-base leading-[1.9] text-[#0b0d12]/75 lg:text-lg [overflow-wrap:anywhere]">{member.bio}</p>}
          <MemberLinkedInButton url={member.linkedinUrl} />
        </div>
      </div>
    </div>
  );
}
