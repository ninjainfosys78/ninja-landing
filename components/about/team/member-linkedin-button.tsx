import { Linkedin } from "lucide-react";

const BUTTON_BASE =
  "mt-5 inline-flex w-fit items-center gap-2 self-start rounded-full border px-5 py-2.5 text-sm font-semibold transition-all";

/** Always rendered so every profile looks alike; inert until a LinkedIn URL is authored in DCM. */
export default function MemberLinkedInButton({ url }: { url?: string | null }) {
  if (!url) {
    return (
      <span
        aria-disabled="true"
        className={`${BUTTON_BASE} cursor-not-allowed border-[#0A66C2]/20 text-[#0A66C2]/40`}
      >
        <Linkedin size={20} strokeWidth={2.25} />
        LinkedIn
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn profile"
      className={`${BUTTON_BASE} border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:shadow-md hover:shadow-[#0A66C2]/20`}
    >
      <Linkedin size={20} strokeWidth={2.25} />
      LinkedIn
    </a>
  );
}
