const BASE_GRADIENT =
  "linear-gradient(180deg, #FFFFFF 0%, #F0F6FF 30%, #E3EDFF 62%, #F4F8FF 85%, #FFFFFF 100%)";
const RING_STROKE = "rgba(37,99,235,0.16)";
const RING_SIZES_REM = [30, 44, 58];

export default function StoryBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: BASE_GRADIENT }} />

      <div
        className="absolute -left-48 top-[8%] h-[38rem] w-[38rem] rounded-full bg-[#60A5FA]/30 blur-[130px]"
        style={{ animation: "ambient-drift-a 26s ease-in-out infinite" }}
      />
      <div
        className="absolute -right-40 top-[38%] h-[34rem] w-[34rem] rounded-full bg-[#2563EB]/20 blur-[130px]"
        style={{ animation: "ambient-drift-b 30s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-[4%] left-[22%] h-[26rem] w-[26rem] rounded-full bg-[#E31B23]/[0.09] blur-[120px]"
        style={{ animation: "ambient-drift-a 34s ease-in-out infinite" }}
      />

      <div className="absolute -right-[18rem] top-[14%] flex items-center justify-center">
        {RING_SIZES_REM.map((size) => (
          <span
            key={size}
            className="absolute rounded-full border"
            style={{ width: `${size}rem`, height: `${size}rem`, borderColor: RING_STROKE }}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#E31B23] via-[#2563EB] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
