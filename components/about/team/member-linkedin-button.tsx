import { Linkedin } from "lucide-react";

const ICON_BASE = "mt-4 inline-flex h-11 w-11 items-center justify-center self-start transition-colors";

/** Always rendered so every profile looks alike; inert until a LinkedIn URL is authored in DCM. */
export default function MemberLinkedInButton({ url }: { url?: string | null }) {
  if (!url) {
    return (
      <span aria-disabled="true" className={`${ICON_BASE} cursor-not-allowed text-[#0A66C2]/30`}>
        <Linkedin size={26} />
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className={`${ICON_BASE} text-[#0A66C2] hover:text-[#084d94]`}
    >
      <Linkedin size={26} />
    </a>
  );
}
