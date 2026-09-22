"use client";
import { useState } from "react";
import { UserRound } from "lucide-react";

interface MemberPortraitProps {
  name: string;
  image: string | null;
}

export default function MemberPortrait({ name, image }: MemberPortraitProps) {
  const [broken, setBroken] = useState(false);

  if (image && !broken) {
    return (
      <img
        src={image}
        alt={name}
        onError={() => setBroken(true)}
        className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
      />
    );
  }

  // No photo uploaded yet — a generic avatar icon reads better than a bare
  // letter, and scales with the portrait box since it's sized in %, not px.
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#dbe8fd]">
      <UserRound aria-hidden="true" strokeWidth={1.25} className="h-2/5 w-2/5 text-[#0b0d12]/25" />
      <span className="sr-only">{name}</span>
    </div>
  );
}
