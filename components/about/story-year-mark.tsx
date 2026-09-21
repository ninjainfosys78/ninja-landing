interface StoryYearMarkProps {
  year: string;
  index: number;
  isActive: boolean;
}

export default function StoryYearMark({ year, index, isActive }: StoryYearMarkProps) {
  const milestone = String(index + 1).padStart(2, "0");

  return (
    <div className="mb-6 flex items-baseline gap-4">
      <span
        className={`text-xs font-semibold tracking-[0.3em] transition-colors duration-500 ${
          isActive ? "text-[#E31B23]" : "text-[#0A1F4D]/40"
        }`}
      >
        {milestone}
      </span>
      {year && (
        <>
          <span
            className={`h-px self-center bg-[#0A1F4D]/25 transition-all duration-700 ${
              isActive ? "w-16" : "w-8"
            }`}
          />
          <span className="font-heading text-3xl font-light tracking-[0.14em] text-[#0A1F4D] lg:text-4xl">
            {year}
          </span>
        </>
      )}
    </div>
  );
}
