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
    default: `${siteConfig.name} | Precios y servicios`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Precios profesionales para bypass, activación y servicios digitales iPhone/iPad. Tasas de cambio actualizadas automáticamente en USD, ARS, UYU, CLP y BRL.",
  keywords: [
    "Aldaz",
    "Activator",
    "bypass",
    "iPhone",
    "iPad",
    "MDM",
    "FMI",
    "precios",
    "servicios digitales",
  ],
  authors: [{ name: "Aldaz Activator Tool" }],
  creator: "Aldaz Activator Tool",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: baseUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Lista de precios`,
    description:
      "Servicios digitales premium: bypass, activación y más. Conversión automática a múltiples monedas.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Lista de precios`,
    description:
      "Servicios digitales premium con precios en tiempo real en varias monedas.",
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
    <html lang="es" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-surface`}>
        <a
          href="#contenido-principal"
          className="absolute left-[-10000px] top-4 z-[100] rounded-lg bg-cyan-500 px-4 py-2 text-slate-950 transition focus:left-4 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-cyan-300"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
