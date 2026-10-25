"use client";

import { useEffect, useState } from "react";

export function useCountdown(closesAt: string | undefined, serverNow: string | undefined) {
  const [offset, setOffset] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!serverNow) return;
    const skew = new Date(serverNow).getTime() - Date.now();
    queueMicrotask(() => setOffset(skew));
  }, [serverNow]);

  useEffect(() => {
    if (!closesAt) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [closesAt]);

  if (!closesAt) return { remainingMs: 0, closed: true };
  const remainingMs = Math.max(0, new Date(closesAt).getTime() - (now + offset));
  return { remainingMs, closed: remainingMs <= 0 };
}
