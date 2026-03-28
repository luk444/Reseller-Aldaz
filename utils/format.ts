import type { Locale } from "@/lib/i18n/translations";

/** Fecha legible para UI (tasas, footer). */
export function formatDisplayDate(
  d: Date | null,
  empty = "—",
  locale: Locale = "en"
): string {
  if (!d) return empty;
  const loc = locale === "es" ? "es" : "en";
  return new Intl.DateTimeFormat(loc, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}
