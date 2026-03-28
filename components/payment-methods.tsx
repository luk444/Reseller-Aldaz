"use client";

import { Bitcoin, CreditCard, IdCard, Landmark, Wallet } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/context/language-context";

const methods = [
  {
    id: "binance" as const,
    icon: Bitcoin,
    href: "https://www.binance.com",
  },
  {
    id: "paypal" as const,
    icon: Wallet,
    href: "https://www.paypal.com",
  },
  {
    id: "crypto" as const,
    icon: Landmark,
    href: siteConfig.telegramUrl,
  },
  {
    id: "prex" as const,
    icon: IdCard,
    href: siteConfig.prexInfoUrl,
  },
  {
    id: "card" as const,
    icon: CreditCard,
    href: siteConfig.cardPaymentUrl,
  },
];

export function PaymentMethods() {
  const { t } = useLanguage();
  return (
    <section
      className="px-4 py-16"
      aria-labelledby="payments-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="payments-heading"
          className="text-center text-2xl font-bold text-white sm:text-3xl"
        >
          {t("payments.title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-400 sm:text-base">
          {t("payments.intro")}
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {methods.map((m) => {
            const Icon = m.icon;
            const name = t(`payments.${m.id}`);
            const desc = t(`payments.${m.id}Desc`);
            return (
              <li key={m.id}>
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col items-center rounded-2xl border border-white/10 bg-slate-900/35 p-8 text-center backdrop-blur-md transition hover:border-cyan-400/25 hover:shadow-glow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                  aria-label={`${name}: ${desc}. ${t("payments.linkAria")}`}
                >
                  <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-accent/20 text-cyan-300 ring-1 ring-cyan-400/20">
                    <Icon className="h-9 w-9" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="text-base font-semibold text-slate-100">
                    {name}
                  </span>
                  <span className="mt-1 text-sm text-slate-400">{desc}</span>
                  {m.id === "crypto" ? (
                    <span className="mt-3 text-xs text-cyan-300/80">
                      {t("payments.cryptoHint")}
                    </span>
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
