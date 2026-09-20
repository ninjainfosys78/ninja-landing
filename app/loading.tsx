export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--page-bg)" }}
    >
      <div className="w-10 h-10 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
