"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { AttendanceDay, AttendanceStats } from "@/lib/types";
import { RECENT_SESSIONS_LIMIT } from "../_lib/constants";

/** Loads the recent-sessions table and the per-member attendance-rate table's data. */
export function useAttendanceHistory(sprintId: string | undefined) {
  const [history, setHistory] = useState<AttendanceDay[]>([]);
  const [stats, setStats] = useState<AttendanceStats | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const [days, s] = await Promise.all([api.attendance.list(id), api.attendance.stats(id)]);
      setHistory(days.slice(0, RECENT_SESSIONS_LIMIT));
      setStats(s);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!sprintId) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) reload(sprintId);
    });
    return () => {
      cancelled = true;
    };
  }, [sprintId, reload]);

  return { history, stats, loading, reload };
}
