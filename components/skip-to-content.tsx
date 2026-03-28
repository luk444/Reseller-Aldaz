"use client";

import { useLanguage } from "@/context/language-context";

export function SkipToContent() {
  const { t } = useLanguage();
  return (
    <a
      href="#main-content"
      className="absolute left-[-10000px] top-4 z-[100] rounded-lg bg-cyan-500 px-4 py-2 text-slate-950 transition focus:left-4 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-cyan-300"
    >
      {t("skip.content")}
    </a>
  );
}
