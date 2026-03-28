/**
 * Tasas USD en caché (servidor). Los clientes solo llaman GET /api/exchange-rates.
 *
 * Bundle global: open.er-api → frankfurter → exchangerate.host (si hay access_key).
 * Overrides regionales (DolarAPI): ARS blue, BRL, MXN, COP, CLP, UYU, BOB, VES.
 */

import type { ExchangeRatesApiSnapshot, RegionalFxEntry } from "./types";

const REFRESH_MS = (() => {
  const n = Number.parseInt(process.env.EXCHANGE_RATE_REFRESH_MS ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : 15 * 60 * 1000;
})();

const ER_HOST_KEY = process.env.EXCHANGERATE_HOST_ACCESS_KEY;

const DOLARAPI_REGIONAL: Record<string, string> = {
  /**
   * ARS: dólar blue — se usa el campo JSON `venta` (ARS por 1 USD), no `compra`.
   * @see https://dolarapi.com/v1/dolares/blue
   */
  ARS:
    process.env.DOLAR_BLUE_API_URL ?? "https://dolarapi.com/v1/dolares/blue",
  BRL:
    process.env.DOLARAPI_BR_URL ?? "https://br.dolarapi.com/v1/cotacoes/usd",
  MXN:
    process.env.DOLARAPI_MX_URL ?? "https://mx.dolarapi.com/v1/cotizaciones/usd",
  COP:
    process.env.DOLARAPI_CO_URL ?? "https://co.dolarapi.com/v1/cotizaciones",
  CLP:
    process.env.DOLARAPI_CL_URL ?? "https://cl.dolarapi.com/v1/cotizaciones/usd",
  UYU:
    process.env.DOLARAPI_UY_URL ?? "https://uy.dolarapi.com/v1/cotizaciones/usd",
  BOB:
    process.env.DOLARAPI_BO_URL ?? "https://bo.dolarapi.com/v1/dolares",
  VES:
    process.env.DOLARAPI_VE_URL ?? "https://ve.dolarapi.com/v1/dolares",
};

const FETCH_TIMEOUT_MAIN_MS = 20_000;
const FETCH_TIMEOUT_REGIONAL_MS = 15_000;

type MainRatesResult = {
  base: string;
  rates: Record<string, number>;
  updatedAt: string;
  source: string;
};

let cache: {
  base: string;
  rates: Record<string, number> | null;
  updatedAt: string | null;
  source: string | null;
  stale: boolean;
  error: string | null;
  regionalFx: Record<string, RegionalFxEntry> | null;
} = {
  base: "USD",
  rates: null,
  updatedAt: null,
  source: null,
  stale: false,
  error: null,
  regionalFx: null,
};

let lastFetchCompleted = 0;
let fetchPromise: Promise<void> | null = null;

async function fetchWithTimeout(
  url: string,
  ms: number,
  init?: RequestInit
): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, {
      ...init,
      signal: ctrl.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(t);
  }
}

function normalizeOpenEr(data: unknown): MainRatesResult | null {
  const d = data as {
    result?: string;
    base_code?: string;
    rates?: Record<string, number>;
    time_last_update_utc?: string;
  };
  if (d?.result !== "success" || !d.rates) return null;
  return {
    base: d.base_code || "USD",
    rates: d.rates,
    updatedAt: d.time_last_update_utc || new Date().toISOString(),
    source: "open.er-api.com",
  };
}

function normalizeErHost(data: unknown): MainRatesResult | null {
  const d = data as {
    success?: boolean;
    base?: string;
    rates?: Record<string, number>;
    date?: string;
  };
  if (!d?.success || !d.rates) return null;
  return {
    base: d.base || "USD",
    rates: d.rates,
    updatedAt: d.date ? `${d.date}T12:00:00.000Z` : new Date().toISOString(),
    source: "exchangerate.host",
  };
}

function normalizeFrankfurter(data: unknown): MainRatesResult | null {
  const d = data as {
    base?: string;
    rates?: Record<string, number>;
    date?: string;
  };
  if (!d?.rates) return null;
  return {
    base: d.base || "USD",
    rates: d.rates,
    updatedAt: d.date ? `${d.date}T12:00:00.000Z` : new Date().toISOString(),
    source: "frankfurter.app",
  };
}

async function fetchErHost(): Promise<MainRatesResult | null> {
  if (!ER_HOST_KEY) return null;
  const url = `https://api.exchangerate.host/latest?access_key=${encodeURIComponent(ER_HOST_KEY)}&base=USD`;
  const res = await fetchWithTimeout(url, FETCH_TIMEOUT_MAIN_MS);
  if (!res.ok) throw new Error(`exchangerate.host HTTP ${res.status}`);
  const data = await res.json();
  return normalizeErHost(data);
}

async function fetchOpenEr(): Promise<MainRatesResult | null> {
  const res = await fetchWithTimeout(
    "https://open.er-api.com/v6/latest/USD",
    FETCH_TIMEOUT_MAIN_MS
  );
  if (!res.ok) throw new Error(`open.er-api HTTP ${res.status}`);
  const data = await res.json();
  return normalizeOpenEr(data);
}

async function fetchFrankfurter(): Promise<MainRatesResult | null> {
  const res = await fetchWithTimeout(
    "https://api.frankfurter.app/latest?from=USD",
    FETCH_TIMEOUT_MAIN_MS
  );
  if (!res.ok) throw new Error(`frankfurter HTTP ${res.status}`);
  const data = await res.json();
  return normalizeFrankfurter(data);
}

function metaFromUrl(url: string): string {
  try {
    return url.replace(/^https?:\/\//, "").split("/")[0] ?? "dolarapi.com";
  } catch {
    return "dolarapi.com";
  }
}

type VentaRow = Record<string, unknown> | null | undefined;

function parseVentaRow(row: VentaRow): {
  rate: number;
  updatedAt: string;
} | null {
  if (!row || typeof row !== "object") return null;
  const raw =
    (row.venta as number | string | undefined) ??
    (row.venda as number | string | undefined) ??
    (row.promedio as number | string | undefined);
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return null;
  const updatedAt =
    (row.fechaActualizacion as string | undefined) ??
    (row.dataAtualizacion as string | undefined) ??
    (row.fechaActualización as string | undefined) ??
    new Date().toISOString();
  return { rate: n, updatedAt: String(updatedAt) };
}

async function fetchRegionalQuote(
  currency: string,
  url: string
): Promise<(RegionalFxEntry & { currency: string }) | null> {
  const sourceHost = metaFromUrl(url);
  const res = await fetchWithTimeout(url, FETCH_TIMEOUT_REGIONAL_MS);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: unknown = await res.json();

  if (currency === "COP" && Array.isArray(data)) {
    const usd = data.find(
      (r) => String((r as VentaRow)?.moneda ?? "").toUpperCase() === "USD"
    ) as VentaRow;
    const parsed = parseVentaRow(usd);
    if (parsed) {
      return {
        currency,
        rate: parsed.rate,
        updatedAt: parsed.updatedAt,
        source: `${sourceHost} (TRM)`,
      };
    }
    const res2 = await fetchWithTimeout(
      "https://co.dolarapi.com/v1/cotizaciones/usd",
      FETCH_TIMEOUT_REGIONAL_MS
    );
    if (!res2.ok) return null;
    const fallback: unknown = await res2.json();
    const fb = parseVentaRow(fallback as VentaRow);
    if (!fb) return null;
    return {
      currency,
      rate: fb.rate,
      updatedAt: fb.updatedAt,
      source: sourceHost,
    };
  }

  if (currency === "BOB") {
    if (!Array.isArray(data)) return null;
    const oficial =
      (data.find((d) => (d as { casa?: string }).casa === "oficial") as VentaRow) ??
      (data[0] as VentaRow);
    const parsed = parseVentaRow(oficial);
    if (!parsed) return null;
    return {
      currency,
      rate: parsed.rate,
      updatedAt: parsed.updatedAt,
      source: `${sourceHost} (oficial)`,
    };
  }

  if (currency === "VES") {
    if (!Array.isArray(data)) return null;
    const paralelo =
      (data.find(
        (d) =>
          (d as { fuente?: string }).fuente === "paralelo" ||
          /paralelo/i.test(String((d as { nombre?: string }).nombre ?? ""))
      ) as VentaRow) ?? (data[0] as VentaRow);
    const parsed = parseVentaRow(paralelo);
    if (!parsed) return null;
    return {
      currency,
      rate: parsed.rate,
      updatedAt: parsed.updatedAt,
      source: `${sourceHost} (paralelo)`,
    };
  }

  const parsed = parseVentaRow(data as VentaRow);
  if (!parsed) return null;
  return {
    currency,
    rate: parsed.rate,
    updatedAt: parsed.updatedAt,
    source: sourceHost,
  };
}

async function fetchAllRegionalQuotes(
  prevRegional: Record<string, RegionalFxEntry> | null
): Promise<Record<string, RegionalFxEntry> | null> {
  const pairs = Object.entries(DOLARAPI_REGIONAL);
  const results = await Promise.all(
    pairs.map(async ([currency, url]) => {
      try {
        const q = await fetchRegionalQuote(currency, url);
        if (q) {
          return [
            currency,
            {
              rate: q.rate,
              updatedAt: q.updatedAt,
              source: q.source,
            } satisfies RegionalFxEntry,
          ] as const;
        }
      } catch (e) {
        console.warn(
          `[exchange-rates] DolarAPI ${currency}:`,
          e instanceof Error ? e.message : e
        );
      }
      const prev = prevRegional?.[currency];
      if (prev?.rate) {
        return [
          currency,
          {
            rate: prev.rate,
            updatedAt: prev.updatedAt,
            source: prev.source,
          },
        ] as const;
      }
      return null;
    })
  );

  const out: Record<string, RegionalFxEntry> = {};
  for (const r of results) {
    if (r) out[r[0]] = r[1];
  }
  return Object.keys(out).length ? out : null;
}

async function fetchMainRates(): Promise<MainRatesResult | null> {
  const chain: Array<() => Promise<MainRatesResult | null>> = [];
  if (ER_HOST_KEY) chain.push(fetchErHost);
  chain.push(fetchOpenEr, fetchFrankfurter);

  for (const fn of chain) {
    try {
      const result = await fn();
      if (result?.rates && Object.keys(result.rates).length) {
        return result;
      }
    } catch (e) {
      console.warn(
        "[exchange-rates] Proveedor principal falló:",
        e instanceof Error ? e.message : e
      );
    }
  }
  return null;
}

function applyRegionalOverlays(
  rates: Record<string, number> | null,
  regionalFx: Record<string, RegionalFxEntry> | null
): Record<string, number> | null {
  if (!rates || !regionalFx) return rates;
  const out = { ...rates };
  for (const [code, meta] of Object.entries(regionalFx)) {
    if (
      meta?.rate != null &&
      Number.isFinite(meta.rate) &&
      meta.rate > 0
    ) {
      out[code] = meta.rate;
    }
  }
  return out;
}

export async function refreshRates(): Promise<void> {
  const prevRegional = cache.regionalFx;

  const [merged, regionalFx] = await Promise.all([
    fetchMainRates(),
    fetchAllRegionalQuotes(prevRegional),
  ]);

  if (merged) {
    const rates = applyRegionalOverlays(merged.rates, regionalFx);
    cache = {
      base: merged.base,
      rates,
      updatedAt: merged.updatedAt,
      source: merged.source,
      stale: false,
      error: null,
      regionalFx: regionalFx ?? prevRegional,
    };
    const nRegional = regionalFx ? Object.keys(regionalFx).length : 0;
    console.info(
      `[exchange-rates] Caché actualizada (${cache.source}), ${rates ? Object.keys(rates).length : 0} monedas` +
        (nRegional ? `, DolarAPI regional: ${nRegional}` : "")
    );
    return;
  }

  if (cache.rates) {
    const nextRates = applyRegionalOverlays(
      cache.rates,
      regionalFx ?? prevRegional
    );
    cache = {
      ...cache,
      rates: nextRates,
      stale: true,
      error: "refresh_failed",
      regionalFx: regionalFx ?? prevRegional,
    };
    console.warn("[exchange-rates] Refresco falló; sirviendo tasas anteriores");
    return;
  }

  if (regionalFx) {
    cache = {
      base: "USD",
      rates: applyRegionalOverlays({ USD: 1 }, regionalFx),
      updatedAt: new Date().toISOString(),
      source: "dolarapi.com (regional only)",
      stale: false,
      error: null,
      regionalFx,
    };
    console.info(
      `[exchange-rates] Solo DolarAPI regional (${Object.keys(regionalFx).length} monedas)`
    );
    return;
  }

  cache = {
    base: "USD",
    rates: null,
    updatedAt: null,
    source: null,
    stale: false,
    error: "unavailable",
    regionalFx: null,
  };
  console.error("[exchange-rates] Sin tasas y sin caché");
}

export function getSnapshot(): ExchangeRatesApiSnapshot {
  const ars = cache.regionalFx?.ARS;
  return {
    ok: Boolean(cache.rates),
    base: cache.base,
    rates: cache.rates,
    updatedAt: cache.updatedAt,
    source: cache.source,
    stale: cache.stale,
    error: cache.error,
    regionalFx: cache.regionalFx,
    arsBlue: ars
      ? { venta: ars.rate, updatedAt: ars.updatedAt, source: ars.source }
      : null,
  };
}

/**
 * Evita martillar proveedores: si hay datos y no pasó REFRESH_MS, no refresca.
 * Si no hay datos, refresca siempre (reintentos en cada request).
 */
export async function ensureRatesFresh(): Promise<void> {
  const hasData = Boolean(cache.rates && Object.keys(cache.rates).length > 0);
  const now = Date.now();
  if (hasData && now - lastFetchCompleted < REFRESH_MS) {
    return;
  }

  if (!fetchPromise) {
    fetchPromise = (async () => {
      await refreshRates();
      lastFetchCompleted = Date.now();
    })().finally(() => {
      fetchPromise = null;
    });
  }
  await fetchPromise;
}
