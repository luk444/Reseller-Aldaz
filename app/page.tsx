import { CurrencySelectorBar } from "@/components/currency-selector-bar";
import { HeroSection } from "@/components/hero-section";
import { PricingShell } from "@/components/pricing-shell";
import { CurrencyProvider } from "@/context/currency-context";

export default function HomePage() {
  return (
    <CurrencyProvider>
      <main className="relative min-h-screen">
        <CurrencySelectorBar />
        <HeroSection />
        <PricingShell />
      </main>
    </CurrencyProvider>
  );
}
