"use client";

import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { services } from "@/data/services";
import type { UseExchangeRatesResult } from "@/hooks/useExchangeRates";
import { ServiceCard } from "@/components/service-card";
import { useSelectedCurrency } from "@/context/currency-context";
import { formatDisplayDate } from "@/utils/format";
import { CURRENCY_SELECTOR_OPTIONS } from "@/utils/currency";

export type ServicesSectionProps = Pick<
  UseExchangeRatesResult,
  "rates" | "loading" | "error" | "lastUpdated" | "refresh"
>;

export function ServicesSection({
  rates,
  loading,
  error,
  lastUpdated,
  refresh,
}: ServicesSectionProps) {
  const { currency } = useSelectedCurrency();
  const currencyHint =
    CURRENCY_SELECTOR_OPTIONS.find((o) => o.code === currency)?.hint ?? currency;

  return (
    <section
      id="contenido-principal"
      className="scroll-mt-24 px-4 pb-8"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.h2
              id="services-heading"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Servicios y precios
            </motion.h2>
            <p className="mt-2 max-w-xl text-sm text-slate-400 sm:text-base">
              Precios mostrados en{" "}
              <span className="font-medium text-cyan-200/90">{currency}</span>{" "}
              <span className="text-slate-500">({currencyHint})</span>. Tasas
              vía <span className="text-slate-300">/api/exchange-rates</span>{" "}
              (servidor: open.er / frankfurter + DolarAPI regional); caché local
              y sondeo cada ~10 min.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <p className="text-xs text-slate-500 sm:text-right">
              <span className="text-slate-400">Última actualización: </span>
              <time dateTime={lastUpdated?.toISOString()}>
                {formatDisplayDate(lastUpdated)}
              </time>
            </p>
            <button
              type="button"
              onClick={() => void refresh()}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 backdrop-blur-sm transition hover:border-cyan-400/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              aria-label="Actualizar tasas de cambio ahora"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
                aria-hidden
              />
              Actualizar tasas
            </button>
          </div>
        </div>
        {error ? (
          <p
            className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100"
            role="status"
          >
            {error}
          </p>
        ) : null}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.name}
              service={service}
              index={index}
              rates={rates}
              loading={loading}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
