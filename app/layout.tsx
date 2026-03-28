import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aldaz-activator-tool.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteConfig.name} | Pricing & services`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Professional pricing for bypass, activation, and iPhone/iPad digital services. Live exchange rates for USD, ARS, UYU, CLP, and BRL.",
  keywords: [
    "Aldaz",
    "Activator",
    "bypass",
    "iPhone",
    "iPad",
    "MDM",
    "FMI",
    "pricing",
    "digital services",
  ],
  authors: [{ name: "Aldaz Activator Tool" }],
  creator: "Aldaz Activator Tool",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Price list`,
    description:
      "Premium digital services: bypass, activation, and more. Automatic conversion to multiple currencies.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Price list`,
    description:
      "Premium digital services with live multi-currency pricing.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0f19",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-surface`}>
        {children}
      </body>
    </html>
  );
}
