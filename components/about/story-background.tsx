// Beetech-inspired treatment: a crisp white base, one dominant blurred
// accent glow (their mission/vision "spotlight" motif), a faint structural
// dot grid standing in for their boxed/grid layouts, and a bold top edge —
// swapped for a single flat line instead of layered blobs + concentric rings.
const DOT_GRID =
  "radial-gradient(rgba(10,31,77,0.12) 1px, transparent 1px)";

export default function StoryBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{ backgroundImage: DOT_GRID, backgroundSize: "28px 28px" }}
      />

      <div
        className="absolute left-1/2 top-[20%] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[#2563EB]/[0.14] blur-[130px]"
        style={{ animation: "ambient-drift-a 28s ease-in-out infinite" }}
      />
      <div
        className="absolute -right-32 bottom-[6%] h-[20rem] w-[20rem] rounded-full bg-[#E31B23]/[0.08] blur-[120px]"
        style={{ animation: "ambient-drift-b 32s ease-in-out infinite" }}
      />

      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#E31B23] via-[#2563EB] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
