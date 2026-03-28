const SECTION_ID = "descargas";

/** Scroll a la sección de descargas y, si hay id, resalta la fila `dl-{downloadId}`. */
export function scrollToDownloadRow(downloadId?: string | null): void {
  const targetId = downloadId ? `dl-${downloadId}` : SECTION_ID;
  const el = document.getElementById(targetId);
  const fallback = document.getElementById(SECTION_ID);
  const scrollTarget = el ?? fallback;
  scrollTarget?.scrollIntoView({ behavior: "smooth", block: "center" });

  if (el && downloadId) {
    el.classList.add(
      "ring-2",
      "ring-cyan-400/70",
      "ring-offset-2",
      "ring-offset-[#0b0f19]",
      "transition-[box-shadow]"
    );
    window.setTimeout(() => {
      el.classList.remove(
        "ring-2",
        "ring-cyan-400/70",
        "ring-offset-2",
        "ring-offset-[#0b0f19]",
        "transition-[box-shadow]"
      );
    }, 2600);
  }
}
