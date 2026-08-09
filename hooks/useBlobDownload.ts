"use client";

import { useState } from "react";
import { downloadBlob } from "@/lib/download";

/**
 * Wraps a blob-producing async call with busy state, the browser download,
 * and a generic error alert. Two real call sites (member "open tasks" PDF,
 * team "in review" PDF) had this exact flow duplicated — only the fetch
 * call and filename differed.
 */
export function useBlobDownload() {
  const [downloading, setDownloading] = useState(false);

  async function download(fetchBlob: () => Promise<Blob>, filename: string) {
    setDownloading(true);
    try {
      const blob = await fetchBlob();
      downloadBlob(blob, filename);
    } catch {
      alert("Couldn't generate the PDF — try again in a moment.");
    } finally {
      setDownloading(false);
    }
  }

  return { downloading, download };
}
