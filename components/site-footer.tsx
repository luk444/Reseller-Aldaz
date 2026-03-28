import { siteConfig } from "@/lib/config";

type SiteFooterProps = {
  /** Texto ya formateado de última actualización de tasas */
  ratesUpdatedLabel: string;
};

export function SiteFooter({ ratesUpdatedLabel }: SiteFooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-t border-white/10 px-4 py-10"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-sm text-slate-500 sm:flex-row sm:text-left">
        <p>
          © {year} Aldaz Activator Tool — {siteConfig.name}
        </p>
        <p className="text-slate-400">
          Tasas: <span className="text-slate-300">{ratesUpdatedLabel}</span>
        </p>
      </div>
    </footer>
  );
}
