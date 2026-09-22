const DATE_LOCALE = "en-GB"

export function formatPostDate(raw?: string): string {
  if (!raw) return ""
  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) return raw
  return parsed.toLocaleDateString(DATE_LOCALE, { day: "numeric", month: "short", year: "numeric" })
}
