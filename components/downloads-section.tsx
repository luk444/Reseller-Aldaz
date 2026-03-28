"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Download, ExternalLink, HardDrive } from "lucide-react";
import { downloadItems } from "@/data/downloads";

function formatDownloads(n: number): string {
  return n.toLocaleString("es");
}

export function DownloadsSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyLink = useCallback(async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 2000);
    } catch {
      setCopiedId(null);
    }
  }, []);

  return (
    <section
      className="px-4 py-16"
      aria-labelledby="downloads-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="downloads-heading"
          className="text-center text-2xl font-bold text-white sm:text-3xl"
        >
          Descargas — copiar enlace
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-400 sm:text-base">
          Nombres y datos alineados con tu carpeta de Mediafire (tamaño, descargas
          y fecha de subida como referencia). Copia el enlace o ábrelo en una
          pestaña nueva.
        </p>

        <ul className="mt-10 space-y-3">
          {downloadItems.map((item, index) => {
            const copied = copiedId === item.id;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.4) }}
              >
                <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-xl transition hover:border-cyan-400/20 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-100">{item.label}</p>
                    {(item.size != null ||
                      item.downloads != null ||
                      item.uploadedAt != null) && (
                      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        {item.size ? (
                          <span className="inline-flex items-center gap-1">
                            <HardDrive
                              className="h-3.5 w-3.5 text-cyan-500/60"
                              aria-hidden
                            />
                            {item.size}
                          </span>
                        ) : null}
                        {item.downloads != null ? (
                          <span>
                            {formatDownloads(item.downloads)} descargas
                          </span>
                        ) : null}
                        {item.uploadedAt ? (
                          <span className="text-slate-600">
                            Subido: {item.uploadedAt}
                          </span>
                        ) : null}
                      </p>
                    )}
                    <p className="mt-1.5 truncate font-mono text-[0.7rem] text-slate-600 sm:text-xs">
                      {item.url}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                      aria-label={`Abrir descarga en Mediafire: ${item.label}`}
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden />
                      Abrir
                    </a>
                    <button
                      type="button"
                      onClick={() => void copyLink(item.id, item.url)}
                      className="inline-flex min-w-[8.5rem] items-center justify-center gap-2 rounded-xl bg-gradient-accent px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-glow-sm transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                      aria-label={`Copiar enlace de ${item.label}`}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                          <motion.span
                            key="ok"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex items-center gap-2"
                          >
                            <Check className="h-4 w-4" aria-hidden />
                            ¡Copiado!
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex items-center gap-2"
                          >
                            <Copy className="h-4 w-4" aria-hidden />
                            Copiar link
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
          <Download className="h-4 w-4 shrink-0 text-cyan-500/70" aria-hidden />
          Los archivos están alojados en Mediafire; verifica siempre el enlace
          antes de enviarlo.
        </p>
      </div>
    </section>
  );
}
