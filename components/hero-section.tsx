"use client";

import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { useLanguage } from "@/context/language-context";

export function HeroSection() {
  const { t } = useLanguage();
  return (
    <header
      className="relative overflow-hidden px-4 pb-16 pt-20 sm:pb-20 sm:pt-28"
      aria-labelledby="hero-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-4 py-1.5 text-sm text-cyan-200/90 backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4 text-cyan-400" aria-hidden />
          <span>{t("hero.badge")}</span>
        </motion.div>
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="bg-gradient-accent bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl"
        >
          {siteConfig.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-base text-slate-400 sm:text-lg"
        >
          {t("hero.subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-10"
        >
          <a
            href={siteConfig.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-accent px-8 py-3.5 text-base font-semibold text-slate-950 shadow-glow transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            aria-label={t("hero.ctaAria")}
          >
            <MessageCircle
              className="h-5 w-5 transition group-hover:scale-110"
              aria-hidden
            />
            {t("hero.cta")}
          </a>
        </motion.div>
      </div>
    </header>
  );
}
