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

### Netlify

El repo incluye `netlify.toml` y `@netlify/plugin-nextjs` (necesario para Next.js 14 con App Router y `/api/*`). En el panel de Netlify, en **Build settings**:

- **Build command:** `npm run build` (o déjalo vacío si usa el archivo del repo).
- **Publish directory:** lo define `netlify.toml` como **`.next`** (obligatorio para evitar el error *“publish directory cannot be the same as the base directory”* si en la UI tenías la raíz del repo). En el panel puedes **borrar** el valor de “Publish directory” para que mande el archivo del repo, o dejarlo en **`.next`** (debe coincidir).

No uses solo la raíz `/` ni el repo completo como publish en la UI.

## Variables de entorno

Copia `.env.example` a `.env.local` y ajusta:

- `NEXT_PUBLIC_TELEGRAM_URL` — enlace a tu Telegram
- `NEXT_PUBLIC_CARD_PAYMENT_URL` — link de pago con tarjeta
- `NEXT_PUBLIC_PREX_URL` — opcional (PREX / instrucciones)
- `NEXT_PUBLIC_SITE_URL` — URL canónica del sitio (SEO / Open Graph)

## Stack

Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, lucide-react.

Las tasas las resuelve el **servidor** en `GET /api/exchange-rates` (caché en memoria, intervalo configurable con `EXCHANGE_RATE_REFRESH_MS`): bundle global (open.er-api → frankfurter → opcional `exchangerate.host` con `EXCHANGERATE_HOST_ACCESS_KEY`) y **overrides regionales DolarAPI**. Para **ARS** se usa el dólar blue con el campo **`venta`** de [dolarapi.com/v1/dolares/blue](https://dolarapi.com/v1/dolares/blue) (ARS por 1 USD). BRL, CLP, UYU y demás regionales usan sus URLs DolarAPI y el precio de venta (o equivalente) según el endpoint. El navegador solo llama a `/api/exchange-rates` y guarda una copia en `localStorage` con sondeo ~10 min.
