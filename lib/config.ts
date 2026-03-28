/**
 * URLs públicas — sustituí por tus enlaces reales (pago, Telegram, etc.).
 */
export const siteConfig = {
  name: "Aldaz Activator Tool Services",
  telegramUrl:
    process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/marciano_unlock",
  /** Enlace genérico para pago con tarjeta (reemplazar en producción) */
  cardPaymentUrl:
    process.env.NEXT_PUBLIC_CARD_PAYMENT_URL ?? "https://example.com/pago",
  /** Texto / enlace PREX si aplica */
  prexInfoUrl: process.env.NEXT_PUBLIC_PREX_URL ?? "https://prexcard.com",
} as const;
