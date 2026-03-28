import { Bitcoin, CreditCard, IdCard, Landmark, Wallet } from "lucide-react";
import { siteConfig } from "@/lib/config";

const methods = [
  {
    name: "Binance",
    description: "P2P y transferencias",
    icon: Bitcoin,
    href: "https://www.binance.com",
  },
  {
    name: "PayPal",
    description: "Pagos internacionales",
    icon: Wallet,
    href: "https://www.paypal.com",
  },
  {
    name: "Crypto Wallet",
    description: "Dirección on-chain",
    icon: Landmark,
    href: siteConfig.telegramUrl,
    hint: "Solicita dirección por Telegram",
  },
  {
    name: "PREX",
    description: "Tarjeta y app",
    icon: IdCard,
    href: siteConfig.prexInfoUrl,
  },
  {
    name: "Tarjeta Crédito / Débito",
    description: "Link de pago seguro",
    icon: CreditCard,
    href: siteConfig.cardPaymentUrl,
  },
] as const;

export function PaymentMethods() {
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
          Métodos de pago
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-400 sm:text-base">
          Iconos orientativos; confirma siempre el medio disponible al contactar.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {methods.map((m) => {
            const Icon = m.icon;
            return (
              <li key={m.name}>
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col items-center rounded-2xl border border-white/10 bg-slate-900/35 p-8 text-center backdrop-blur-md transition hover:border-cyan-400/25 hover:shadow-glow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                  aria-label={`${m.name}: ${m.description}. Abre en nueva pestaña.`}
                >
                  <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-accent/20 text-cyan-300 ring-1 ring-cyan-400/20">
                    <Icon className="h-9 w-9" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="text-base font-semibold text-slate-100">
                    {m.name}
                  </span>
                  <span className="mt-1 text-sm text-slate-400">
                    {m.description}
                  </span>
                  {"hint" in m && m.hint ? (
                    <span className="mt-3 text-xs text-cyan-300/80">{m.hint}</span>
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
