"use client";

import { DownloadsSection } from "@/components/downloads-section";
import { PaymentMethods } from "@/components/payment-methods";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { TelegramFab } from "@/components/telegram-fab";
import { useLanguage } from "@/context/language-context";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import { formatDisplayDate } from "@/utils/format";

/**
 * Un solo hook de tasas para la grilla, el aviso en sección y el footer.
 */
export function PricingShell() {
  const { rates, loading, error, lastUpdated, refresh } = useExchangeRates();
  const { locale, t } = useLanguage();

  const ratesUpdatedLabel = formatDisplayDate(
    lastUpdated,
    t("common.syncing"),
    locale
  );

  return (
    <>
      <ServicesSection
        rates={rates}
        loading={loading}
        error={error}
        lastUpdated={lastUpdated}
        refresh={refresh}
      />
      <PaymentMethods />
      <DownloadsSection />
      <SiteFooter ratesUpdatedLabel={ratesUpdatedLabel} />
      <TelegramFab />
    </>
  );
}
