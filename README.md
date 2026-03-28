# Reseller-Aldaz

**Aldaz Activator Tool Services** — web profesional (Next.js 14 App Router) para mostrar precios de servicios digitales con conversión automática a USD, ARS, UYU, CLP y BRL.

## Requisitos

- Node.js 18.18 o superior (recomendado LTS)

## Instalación y desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Producción

```bash
npm run build
npm start
```

## Variables de entorno

Copia `.env.example` a `.env.local` y ajusta:

- `NEXT_PUBLIC_TELEGRAM_URL` — enlace a tu Telegram
- `NEXT_PUBLIC_CARD_PAYMENT_URL` — link de pago con tarjeta
- `NEXT_PUBLIC_PREX_URL` — opcional (PREX / instrucciones)
- `NEXT_PUBLIC_SITE_URL` — URL canónica del sitio (SEO / Open Graph)

## Stack

Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, lucide-react.

Las tasas las resuelve el **servidor** en `GET /api/exchange-rates` (caché en memoria, intervalo configurable con `EXCHANGE_RATE_REFRESH_MS`): bundle global (open.er-api → frankfurter → opcional `exchangerate.host` con `EXCHANGERATE_HOST_ACCESS_KEY`) y **overrides regionales DolarAPI** (ARS blue, BRL, CLP, UYU, etc.). El navegador solo llama a `/api/exchange-rates` y guarda una copia en `localStorage` con sondeo ~10 min.
