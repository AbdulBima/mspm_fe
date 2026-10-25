"use client";

import { useState } from "react";
import { downloadBlob } from "@/lib/download";
import { notify } from "@/lib/notify";

export function useBlobDownload() {
  const [downloading, setDownloading] = useState(false);

  async function download(fetchBlob: () => Promise<Blob>, filename: string) {
    if (downloading) return;
    setDownloading(true);
    try {
      downloadBlob(await fetchBlob(), filename);
    } catch {
      notify.error("Couldn't generate the PDF. Try again in a moment.");
    } finally {
      setDownloading(false);
    }
  }

  return { downloading, download };
}
