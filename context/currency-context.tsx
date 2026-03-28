"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { SupportedCurrency } from "@/utils/currency";
import { DISPLAY_CURRENCIES } from "@/utils/currency";

const STORAGE_KEY = "aldaz-selected-currency-v1";

type CurrencyContextValue = {
  currency: SupportedCurrency;
  setCurrency: (c: SupportedCurrency) => void;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function readStoredCurrency(): SupportedCurrency | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    if (DISPLAY_CURRENCIES.includes(raw as SupportedCurrency)) {
      return raw as SupportedCurrency;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>("USD");

  useEffect(() => {
    const stored = readStoredCurrency();
    if (stored) setCurrencyState(stored);
  }, []);

  const setCurrency = useCallback((c: SupportedCurrency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ currency, setCurrency }),
    [currency, setCurrency]
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useSelectedCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useSelectedCurrency debe usarse dentro de CurrencyProvider");
  }
  return ctx;
}
