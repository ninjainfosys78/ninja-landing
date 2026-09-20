"use client";
import { useState } from "react";

interface MemberPortraitProps {
  name: string;
  image: string | null;
}

/** Black and white until the parent `group` is hovered. */
export default function MemberPortrait({ name, image }: MemberPortraitProps) {
  const [broken, setBroken] = useState(false);

  if (image && !broken) {
    return (
      <img
        src={image}
        alt={name}
        onError={() => setBroken(true)}
        className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#dbe8fd] text-[#0b0d12]/40">
      <span className="font-heading text-5xl font-bold select-none">{name.trim()[0] ?? "?"}</span>
    </div>
  );
}
