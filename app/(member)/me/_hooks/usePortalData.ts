"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { MyDailyReport, MyProfile, MyReportHistory, MyTask } from "@/lib/types";

export function usePortalData() {
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [today, setToday] = useState<MyDailyReport | null>(null);
  const [tasks, setTasks] = useState<MyTask[]>([]);
  const [history, setHistory] = useState<MyReportHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [p, t, tk, h] = await Promise.all([
        api.me.profile(),
        api.me.todaysReport(),
        api.me.tasks(),
        api.me.history(14),
      ]);
      setProfile(p);
      setToday(t);
      setTasks(tk);
      setHistory(h);
      setError(null);
    } catch (err) {
      setError(err instanceof api.ApiError ? err.message : "Couldn't load your workspace.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);

  const refreshHistory = useCallback(async () => {
    try {
      setHistory(await api.me.history(14));
    } catch {
      /* history is secondary — keep the last good copy */
    }
  }, []);

  return { profile, today, setToday, tasks, history, loading, error, reload: load, refreshHistory };
}
