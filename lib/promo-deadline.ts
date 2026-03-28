/** Duración visible de la oferta por “ventana” (ms). */
export const PROMO_COUNTDOWN_MS = 16 * 60 * 60 * 1000;

export const PROMO_DEADLINE_STORAGE_KEY = "aldaz-promo-deadline-v1";

/** Devuelve timestamp límite; si no existe o ya pasó, crea una nueva ventana de 16h. */
export function getOrCreatePromoDeadline(): number {
  if (typeof window === "undefined") {
    return Date.now() + PROMO_COUNTDOWN_MS;
  }
  try {
    const raw = localStorage.getItem(PROMO_DEADLINE_STORAGE_KEY);
    const parsed = raw != null ? Number(raw) : NaN;
    const now = Date.now();
    if (!Number.isFinite(parsed) || parsed <= now) {
      const next = now + PROMO_COUNTDOWN_MS;
      localStorage.setItem(PROMO_DEADLINE_STORAGE_KEY, String(next));
      return next;
    }
    return parsed;
  } catch {
    return Date.now() + PROMO_COUNTDOWN_MS;
  }
}
