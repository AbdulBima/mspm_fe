"use client";

import { localISODate } from "@/lib/dates";
import { useState } from "react";
import { api } from "@/lib/api";
import type { StandupDaySummaryResponse } from "@/lib/types";

export function useDaySummary(sprintId: string) {
  const [day, setDay] = useState(() => localISODate());
  const [result, setResult] = useState<StandupDaySummaryResponse | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function changeDay(v: string) {
    setDay(v);
    setResult(null);
    setError(null);
  }

  async function generate() {
    setBusy(true);
    setError(null);
    try {
      const res = await api.ai.standupDaySummary(sprintId, day);
      setResult(res);
    } catch (err) {
      setError(err instanceof api.ApiError ? err.message : "Couldn't generate the summary just now.");
      setResult(null);
    } finally {
      setBusy(false);
    }
  }

  return { day, changeDay, result, busy, error, generate };
}
