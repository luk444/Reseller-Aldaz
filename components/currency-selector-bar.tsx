"use client";

import { LayoutGroup, motion } from "framer-motion";
import { Coins } from "lucide-react";
import { useSelectedCurrency } from "@/context/currency-context";
import { CURRENCY_SELECTOR_OPTIONS } from "@/utils/currency";

/**
 * Barra sticky con botones de moneda; el precio en cada tarjeta sigue esta selección.
 */
export function CurrencySelectorBar() {
  const { currency, setCurrency } = useSelectedCurrency();

  return (
    <div
      className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f19]/85 px-4 py-3 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0b0f19]/70"
      role="region"
      aria-label="Seleccionar moneda para ver precios"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Coins className="h-4 w-4 shrink-0 text-cyan-400/90" aria-hidden />
          <span className="font-medium text-slate-300">Ver precios en</span>
        </div>
        <LayoutGroup id="currency-tabs">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Monedas disponibles"
        >
          {CURRENCY_SELECTOR_OPTIONS.map((opt) => {
            const selected = currency === opt.code;
            return (
              <motion.button
                key={opt.code}
                type="button"
                onClick={() => setCurrency(opt.code)}
                aria-pressed={selected}
                aria-label={`${opt.hint} (${opt.label})`}
                title={opt.hint}
                whileTap={{ scale: 0.97 }}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                  selected
                    ? "text-slate-950 shadow-glow-sm"
                    : "border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/25 hover:bg-white/10 hover:text-white"
                }`}
              >
                {selected ? (
                  <motion.span
                    layoutId="currency-pill-bg"
                    className="absolute inset-0 rounded-lg bg-gradient-accent"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    aria-hidden
                  />
                ) : null}
                <span className="relative z-10">{opt.label}</span>
              </motion.button>
            );
          })}
        </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
