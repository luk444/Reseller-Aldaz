/** Respuesta de GET /api/exchange-rates (compartida con el cliente). */
export type RegionalFxEntry = {
  rate: number;
  updatedAt: string;
  source: string;
};

export type ExchangeRatesApiSnapshot = {
  ok: boolean;
  base: string;
  rates: Record<string, number> | null;
  updatedAt: string | null;
  source: string | null;
  stale: boolean;
  error: string | null;
  regionalFx: Record<string, RegionalFxEntry> | null;
  /** Compat: mismo dato que regionalFx.ARS */
  arsBlue: {
    venta: number;
    updatedAt: string;
    source: string;
  } | null;
};
