/** Fecha legible para UI (tasas, footer). */
export function formatDisplayDate(d: Date | null, empty = "—"): string {
  if (!d) return empty;
  return new Intl.DateTimeFormat("es", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}
