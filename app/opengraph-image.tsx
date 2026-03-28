import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const runtime = "edge";

export const alt = `${siteConfig.name} — Lista de precios`;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #0b0f19 0%, #111827 45%, #1e1b4b 100%)",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: "linear-gradient(90deg, #22d3ee, #a78bfa)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 16,
          }}
        >
          Aldaz Activator Tool
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#f8fafc",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#94a3b8",
            maxWidth: 800,
          }}
        >
          Precios en USD, ARS, UYU, CLP y BRL — actualización automática.
        </div>
      </div>
    ),
    { ...size }
  );
}
