/**
 * Formateo de montos por moneda para la región LATAM + USD.
 * Los símbolos siguen el estilo solicitado en el brief.
 */

export type SupportedCurrency = "USD" | "ARS" | "UYU" | "CLP" | "BRL";

export type ExchangeRatesMap = Partial<Record<SupportedCurrency, number>>;

/**
 * Convierte un monto en USD a la moneda destino usando la tasa (1 USD = rate unidades).
 */
export function convertFromUsd(
  amountUsd: number,
  currency: SupportedCurrency,
  rates: ExchangeRatesMap
): number {
  if (currency === "USD") return amountUsd;
  const rate = rates[currency];
  if (rate == null || !Number.isFinite(rate)) return amountUsd;
  return amountUsd * rate;
}

/**
 * Formatea según el patrón del producto:
 * USD $20 | ARS $xxxxx | UYU $xxxx | CLP $xxxxx | BRL R$ xxxx
 */
export function formatPriceLine(
  amountUsd: number,
  currency: SupportedCurrency,
  rates: ExchangeRatesMap
): string {
  const converted = convertFromUsd(amountUsd, currency, rates);

  switch (currency) {
    case "USD": {
      const n = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(converted);
      return `USD $${n}`;
    }
    case "ARS": {
      const n = new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Math.round(converted));
      return `ARS $${n}`;
    }
    case "UYU": {
      const n = new Intl.NumberFormat("es-UY", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Math.round(converted));
      return `UYU $${n}`;
    }
    case "CLP": {
      const n = new Intl.NumberFormat("es-CL", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Math.round(converted));
      return `CLP $${n}`;
    }
    case "BRL": {
      const n = new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(converted);
      return `BRL R$ ${n}`;
    }
    default:
      return `${currency} ${converted}`;
  }
}

/** Lista de monedas a mostrar en cada card (USD primero). */
export const DISPLAY_CURRENCIES: SupportedCurrency[] = [
  "USD",
  "ARS",
  "UYU",
  "CLP",
  "BRL",
];

/** Opciones del selector superior (etiqueta corta + accesible). */
export const CURRENCY_SELECTOR_OPTIONS: {
  code: SupportedCurrency;
  label: string;
  hint: string;
}[] = [
  { code: "USD", label: "USD", hint: "Dólar estadounidense" },
  { code: "ARS", label: "ARS", hint: "Peso argentino" },
  { code: "UYU", label: "UYU", hint: "Peso uruguayo" },
  { code: "CLP", label: "CLP", hint: "Peso chileno" },
  { code: "BRL", label: "BRL", hint: "Real brasileño" },
];

export function hasRateForSelection(
  currency: SupportedCurrency,
  rates: ExchangeRatesMap
): boolean {
  if (currency === "USD") return true;
  const r = rates[currency];
  return typeof r === "number" && Number.isFinite(r) && r > 0;
}
