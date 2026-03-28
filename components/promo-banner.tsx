"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Sparkles, Timer } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/context/language-context";
import {
  getOrCreatePromoDeadline,
  PROMO_COUNTDOWN_MS,
  PROMO_DEADLINE_STORAGE_KEY,
} from "@/lib/promo-deadline";

function splitRemaining(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return { h, m, sec };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function PromoBanner() {
  const { t } = useLanguage();
  const [deadline, setDeadline] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    setDeadline(getOrCreatePromoDeadline());
  }, []);

  useEffect(() => {
    if (deadline == null) return;

    const tick = () => {
      const now = Date.now();
      let left = deadline - now;
      if (left <= 0) {
        const next = now + PROMO_COUNTDOWN_MS;
        try {
          localStorage.setItem(PROMO_DEADLINE_STORAGE_KEY, String(next));
        } catch {
          /* ignore */
        }
        setDeadline(next);
        left = PROMO_COUNTDOWN_MS;
      }
      setRemaining(left);
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [deadline]);

  const { h, m, sec } = splitRemaining(remaining);
  const units = [
    { value: pad(h), label: t("promo.unitH") },
    { value: pad(m), label: t("promo.unitM") },
    { value: pad(sec), label: t("promo.unitS") },
  ];
  const ready = deadline != null;

  return (
    <section
      className="relative border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 px-4 py-4"
      aria-labelledby="promo-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/5 via-transparent to-transparent" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 lg:flex-row lg:justify-between lg:gap-6">
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-amber-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-100">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {t("promo.badge")}
          </div>
          <h2
            id="promo-heading"
            className="text-lg font-bold text-white sm:text-xl"
          >
            {t("promo.title")}
          </h2>
          <p className="mt-1 max-w-xl text-sm text-amber-100/85 sm:text-base">
            {t("promo.body")}
          </p>
        </div>

        <div className="flex w-full max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center lg:w-auto lg:max-w-none lg:flex-col lg:items-end">
          <div className="flex items-center gap-2 text-amber-200/90">
            <Timer className="h-4 w-4 shrink-0" aria-hidden />
            <span className="text-xs font-medium uppercase tracking-wide sm:text-sm">
              {t("promo.endsIn")}
            </span>
          </div>
          {ready ? (
            <div
              className="flex gap-2 font-mono text-slate-950 sm:gap-3"
              role="timer"
              aria-live="polite"
              aria-atomic="true"
              aria-label={`${t("promo.endsIn")}: ${h} ${t("promo.unitH")}, ${m} ${t("promo.unitM")}, ${sec} ${t("promo.unitS")}`}
            >
              {units.map((u) => (
                <div
                  key={u.label}
                  className="flex min-w-[3.25rem] flex-col items-center rounded-xl border border-amber-300/40 bg-gradient-to-b from-amber-200 to-amber-400 px-2.5 py-2 shadow-lg shadow-amber-900/20 sm:min-w-[3.75rem] sm:px-3"
                >
                  <span className="text-xl font-bold tabular-nums sm:text-2xl">
                    {u.value}
                  </span>
                  <span className="text-[0.65rem] font-semibold uppercase text-slate-800/80">
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex gap-2 sm:gap-3"
              aria-hidden
            >
              {[1, 2, 3].map((k) => (
                <div
                  key={k}
                  className="h-[4.25rem] min-w-[3.25rem] animate-pulse rounded-xl bg-amber-200/30 sm:min-w-[3.75rem]"
                />
              ))}
            </div>
          )}
          <a
            href={siteConfig.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-slate-900/80 px-5 py-2.5 text-sm font-semibold text-amber-100 shadow-md backdrop-blur-sm transition hover:border-amber-400/40 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:w-auto"
            aria-label={t("promo.ctaAria")}
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
            {t("promo.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
