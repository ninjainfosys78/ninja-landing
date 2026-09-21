interface ProjectFilterChipsProps {
  options: { value: string; label: string }[];
  active: string;
  onChange: (value: string) => void;
}

export default function ProjectFilterChips({ options, active, onChange }: ProjectFilterChipsProps) {
  return (
    <div role="tablist" className="flex flex-wrap gap-2">
      {options.map(({ value, label }) => {
        const isActive = value === active;
        return (
          <button
            key={value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(value)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 ${
              isActive
                ? "border-[#0A1F4D] bg-[#0A1F4D] text-white shadow-md"
                : "border-[#D7E4FA] bg-white text-[#2E3A4E] hover:border-[#2563EB]/50 hover:text-[#2563EB]"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
