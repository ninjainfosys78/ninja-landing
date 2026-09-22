interface StoryYearMarkProps {
  year: string;
  index: number;
  isActive: boolean;
}

export default function StoryYearMark({ year, index, isActive }: StoryYearMarkProps) {
  const milestone = String(index + 1).padStart(2, "0");

  return (
    <div className="mb-6 flex items-baseline gap-4">
      <span className="relative inline-flex items-center">
        {isActive && (
          <span
            aria-hidden
            className="absolute -left-3.5 h-1.5 w-1.5 animate-pulse rounded-full bg-[#E31B23]"
          />
        )}
        <span
          className={`text-xs font-semibold tracking-[0.3em] transition-colors duration-500 ${
            isActive ? "text-[#E31B23]" : "text-[#0A1F4D]/55"
          }`}
        >
          {milestone}
        </span>
      </span>
      {year && (
        <>
          <span
            className={`h-px self-center transition-all duration-700 ${
              isActive ? "w-16 bg-[#E31B23]/60" : "w-8 bg-[#0A1F4D]/25"
            }`}
          />
          <span className="font-heading text-3xl font-medium tracking-[0.14em] text-[#0A1F4D] lg:text-4xl">
            {year}
          </span>
        </>
      )}
    </div>
  );
}
