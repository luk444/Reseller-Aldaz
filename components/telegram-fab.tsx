"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function TelegramFab() {
  return (
    <motion.a
      href={siteConfig.telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-accent text-slate-950 shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
      aria-label="Abrir chat de Telegram"
      animate={{ scale: [1, 1.06, 1] }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
    >
      <Send className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden />
    </motion.a>
  );
}
