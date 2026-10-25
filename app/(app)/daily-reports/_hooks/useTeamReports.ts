"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import type { TeamDailyReports } from "@/lib/types";

export function shiftDate(isoDate: string, days: number) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

export function useTeamReports() {
  const [date, setDate] = useState<string | undefined>(undefined);
  const [today, setToday] = useState<string | null>(null);
  const [data, setData] = useState<TeamDailyReports | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const latest = useRef(0);

  const load = useCallback(async (target?: string) => {
    const requestId = ++latest.current;
    setLoading(true);
    try {
      const result = await api.dailyReports.forDay(target);
      if (requestId !== latest.current) return;
      setData(result);
      setError(null);
      if (!target) setToday(result.report_date);
    } catch (err) {
      if (requestId !== latest.current) return;
      setError(err instanceof api.ApiError ? err.message : "Couldn't load daily reports.");
    } finally {
      if (requestId === latest.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => void load(date), 0);
    return () => clearTimeout(timer);
  }, [date, load]);

  const current = date ?? today ?? data?.report_date ?? "";
  const isToday = Boolean(today && current === today);

  return {
    data,
    loading,
    error,
    current,
    isToday,
    today,
    goPrev: () => current && setDate(shiftDate(current, -1)),
    goNext: () => current && !isToday && setDate(shiftDate(current, 1)),
    goToday: () => setDate(undefined),
    pick: (value: string) => setDate(!value ? undefined : today && value > today ? today : value),
    reload: () => load(date),
  };
}
