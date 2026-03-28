"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ExchangeRatesApiSnapshot } from "@/lib/exchange-rates/types";
import type { ExchangeRatesMap, SupportedCurrency } from "@/utils/currency";

/**
 * Intervalo de sondeo del cliente hacia nuestra API (el servidor tiene su propio REFRESH_MS).
 */
export const REFRESH_MS = 10 * 60 * 1000;

const CLIENT_CACHE_KEY = "aldaz-exchange-rates-v3";

const TARGETS: SupportedCurrency[] = ["USD", "ARS", "UYU", "CLP", "BRL"];

const FETCH_API_TIMEOUT_MS = 15_000;

const STATIC_FALLBACK: ExchangeRatesMap = {
  USD: 1,
  ARS: 1000,
  UYU: 40,
  CLP: 950,
  BRL: 5.5,
};

type CachePayload = {
  rates: ExchangeRatesMap;
  savedAt: number;
  apiDate?: string;
};

function readCache(): CachePayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CLIENT_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachePayload;
    if (!parsed?.rates || typeof parsed.savedAt !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(payload: CachePayload) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CLIENT_CACHE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

/** Convierte el mapa del servidor (mayúsculas) al subconjunto que muestra la UI. */
function snapshotToDisplayRates(
  rates: Record<string, number> | null
): ExchangeRatesMap | null {
  if (!rates) return null;
  const out: ExchangeRatesMap = { USD: 1 };
  for (const code of TARGETS) {
    if (code === "USD") continue;
    const u = rates[code];
    const l = rates[code.toLowerCase()];
    const v =
      typeof u === "number" && Number.isFinite(u)
        ? u
        : typeof l === "number" && Number.isFinite(l)
          ? l
          : undefined;
    if (typeof v === "number" && v > 0) {
      out[code] = v;
    }
  }
  if (
    out.ARS == null ||
    out.UYU == null ||
    out.CLP == null ||
    out.BRL == null
  ) {
    return null;
  }
  return out;
}

async function fetchExchangeRatesApi(): Promise<{
  rates: ExchangeRatesMap;
  apiDate?: string;
  stale: boolean;
} | null> {
  const ctrl = new AbortController();
  const t = window.setTimeout(() => ctrl.abort(), FETCH_API_TIMEOUT_MS);
  try {
    const res = await fetch("/api/exchange-rates", {
      cache: "no-store",
      signal: ctrl.signal,
    });
    if (!res.ok) return null;
    const snap = (await res.json()) as ExchangeRatesApiSnapshot;
    const map = snapshotToDisplayRates(snap.rates);
    if (!map) return null;
    return {
      rates: map,
      apiDate: snap.updatedAt ?? undefined,
      stale: Boolean(snap.stale),
    };
  } catch {
    return null;
  } finally {
    window.clearTimeout(t);
  }
}

/** Claves para `t(\`errors.${key}\`)` en la UI. */
export type ExchangeErrorKey = "ratesStale" | "ratesApiFailed";

export type UseExchangeRatesResult = {
  rates: ExchangeRatesMap;
  loading: boolean;
  error: ExchangeErrorKey | null;
  lastUpdated: Date | null;
  usedFallback: boolean;
  refresh: () => Promise<void>;
};

export function useExchangeRates(): UseExchangeRatesResult {
  const [rates, setRates] = useState<ExchangeRatesMap>({ USD: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ExchangeErrorKey | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);
  const mounted = useRef(true);

  const applyLive = useCallback(
    (
      nextRates: ExchangeRatesMap,
      apiDate: string | undefined,
      fromCache: boolean,
      meta?: { stale?: boolean }
    ) => {
      if (!mounted.current) return;
      setRates(nextRates);
      setUsedFallback(Boolean(meta?.stale));
      if (apiDate) {
        const d = new Date(apiDate);
        setLastUpdated(Number.isNaN(d.getTime()) ? new Date() : d);
      } else {
        setLastUpdated(new Date());
      }
      if (!fromCache) {
        writeCache({
          rates: nextRates,
          savedAt: Date.now(),
          apiDate,
        });
      }
    },
    []
  );

  const applyStaticFallback = useCallback(() => {
    if (!mounted.current) return;
    setRates({ ...STATIC_FALLBACK });
    setUsedFallback(true);
    setLastUpdated(new Date());
  }, []);

  const runFetch = useCallback(
    async (opts?: { silent?: boolean }) => {
      const silent = opts?.silent ?? false;
      if (!silent) {
        setLoading(true);
        setError(null);
      }
      try {
        const live = await fetchExchangeRatesApi();
        if (live) {
          applyLive(live.rates, live.apiDate, false, { stale: live.stale });
          if (silent) {
            if (!live.stale) setError(null);
          } else {
            setError(null);
            if (live.stale) {
              setError("ratesStale");
            }
          }
        } else if (silent) {
          /* conservar tasas en pantalla */
        } else {
          applyStaticFallback();
          setError("ratesApiFailed");
        }
      } catch {
        if (!silent) {
          setError("ratesApiFailed");
          applyStaticFallback();
        }
      } finally {
        if (mounted.current) setLoading(false);
      }
    },
    [applyLive, applyStaticFallback]
  );

  useEffect(() => {
    mounted.current = true;
    const cached = readCache();
    const now = Date.now();
    const cacheFresh =
      cached && now - cached.savedAt < REFRESH_MS && cached.rates.ARS;

    if (cacheFresh && cached) {
      const stamp =
        cached.apiDate ?? new Date(cached.savedAt).toISOString();
      applyLive(cached.rates, stamp, true);
      setLoading(false);
      setError(null);
      void runFetch({ silent: true });
    } else {
      void runFetch({ silent: false });
    }

    const id = window.setInterval(() => {
      void runFetch({ silent: true });
    }, REFRESH_MS);

    return () => {
      mounted.current = false;
      window.clearInterval(id);
    };
  }, [applyLive, runFetch]);

  const refresh = useMemo(
    () => async () => {
      await runFetch({ silent: false });
    },
    [runFetch]
  );

  return {
    rates,
    loading,
    error,
    lastUpdated,
    usedFallback,
    refresh,
  };
}
