"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import type { Service } from "@/data/services";
import { useLanguage } from "@/context/language-context";
import { useSelectedCurrency } from "@/context/currency-context";
import { scrollToDownloadRow } from "@/lib/scroll-to-download";
import {
  formatPriceLine,
  hasRateForSelection,
  type ExchangeRatesMap,
} from "@/utils/currency";

type ServiceCardProps = {
  service: Service;
  index: number;
  rates: ExchangeRatesMap;
  loading: boolean;
};

function PriceSkeleton() {
  return (
    <div
      className="mt-4 h-8 w-36 max-w-[70%] animate-pulse rounded-md bg-slate-700/50"
      aria-hidden
      role="presentation"
    />
  );
}

export function ServiceCard({
  service,
  index,
  rates,
  loading,
}: ServiceCardProps) {
  const { currency } = useSelectedCurrency();
  const { t } = useLanguage();
  const ready = hasRateForSelection(currency, rates);
  const showSkeleton = loading && !ready;

  const goToDownload = useCallback(() => {
    scrollToDownloadRow(service.downloadId ?? undefined);
  }, [service.downloadId]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        goToDownload();
      }
    },
    [goToDownload]
  );

  return (
    <motion.article
      layout
      role="button"
      tabIndex={0}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.35) }}
      whileHover={{ y: -4 }}
      onClick={goToDownload}
      onKeyDown={onKeyDown}
      aria-label={t("service.cardAria")}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-6 shadow-glow-sm backdrop-blur-xl transition-shadow hover:border-cyan-400/30 hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-400/15"
        aria-hidden
      />
      <div className="relative flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-left text-base font-semibold leading-snug text-slate-100 sm:text-lg">
            {service.name}
          </h3>
          {service.popular ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-purple-400/30 bg-purple-500/15 px-2.5 py-0.5 text-xs font-medium text-purple-200">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
              {t("service.popular")}
            </span>
          ) : null}
        </div>
        {showSkeleton ? (
          <PriceSkeleton />
        ) : (
          <motion.p
            key={`${currency}-${service.name}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 font-mono text-lg font-semibold tabular-nums tracking-tight text-cyan-200/95 sm:text-xl"
          >
            {formatPriceLine(service.price, currency, rates)}
          </motion.p>
        )}
        <p className="text-xs font-medium text-cyan-400/80 transition group-hover:text-cyan-300">
          {t("service.goDownload")} →
        </p>
        <p className="text-[0.7rem] leading-snug text-slate-500">
          {t("service.clickHint")}
        </p>
      </div>
    </motion.article>
  );
}
