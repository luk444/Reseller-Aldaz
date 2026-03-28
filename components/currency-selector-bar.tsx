"use client";

import { LayoutGroup, motion } from "framer-motion";
import { Coins, Languages } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useSelectedCurrency } from "@/context/currency-context";
import { CURRENCY_SELECTOR_OPTIONS } from "@/utils/currency";

/**
 * Sticky bar: language EN/ES + currency pills.
 */
export function CurrencySelectorBar() {
  const { currency, setCurrency } = useSelectedCurrency();
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f19]/85 px-4 py-3 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0b0f19]/70"
      role="region"
      aria-label={t("currency.barAria")}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2 py-1"
            role="group"
            aria-label={t("lang.switch")}
          >
            <Languages
              className="h-4 w-4 shrink-0 text-slate-500"
              aria-hidden
            />
            {(["en", "es"] as const).map((code) => {
              const active = locale === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  aria-pressed={active}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                    active
                      ? "bg-cyan-500/20 text-cyan-200"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {t(`lang.${code}`)}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Coins className="h-4 w-4 shrink-0 text-cyan-400/90" aria-hidden />
            <span className="font-medium text-slate-300">
              {t("currency.showIn")}
            </span>
          </div>
        </div>
        <LayoutGroup id="currency-tabs">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label={t("currency.currenciesAria")}
          >
            {CURRENCY_SELECTOR_OPTIONS.map((opt) => {
              const selected = currency === opt.code;
              const hint = t(`currency.hint.${opt.code}`);
              return (
                <motion.button
                  key={opt.code}
                  type="button"
                  onClick={() => setCurrency(opt.code)}
                  aria-pressed={selected}
                  aria-label={`${hint} (${opt.label})`}
                  title={hint}
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
