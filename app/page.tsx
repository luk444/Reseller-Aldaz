import { CurrencySelectorBar } from "@/components/currency-selector-bar";
import { HeroSection } from "@/components/hero-section";
import { PromoBanner } from "@/components/promo-banner";
import { PricingShell } from "@/components/pricing-shell";
import { SkipToContent } from "@/components/skip-to-content";
import { CurrencyProvider } from "@/context/currency-context";
import { LanguageProvider } from "@/context/language-context";

export default function HomePage() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <main className="relative min-h-screen">
          <SkipToContent />
          <CurrencySelectorBar />
          <PromoBanner />
          <HeroSection />
          <PricingShell />
        </main>
      </CurrencyProvider>
    </LanguageProvider>
  );
}
