"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { Report } from "@/lib/types";

export function useReportsList(sprintId: string | undefined) {
  const [reports, setReports] = useState<Report[]>([]);

  const reloadFor = useCallback(async (id: string) => {
    try {
      setReports(await api.reports.list(id));
    } catch (err) {
      notify.error(err, "Couldn't load reports.");
    }
  }, []);

  useEffect(() => {
    if (!sprintId) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) reloadFor(sprintId);
    });
    return () => {
      cancelled = true;
    };
  }, [sprintId, reloadFor]);

  const refresh = useCallback(() => {
    if (sprintId) return reloadFor(sprintId);
  }, [sprintId, reloadFor]);

  return { reports, refresh };
}
