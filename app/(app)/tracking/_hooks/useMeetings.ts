"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Meeting } from "@/lib/types";

export function useMeetings(sprintId: string) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const reload = useCallback(async () => setMeetings(await api.meetings.list(sprintId)), [sprintId]);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) reload();
    });
    return () => {
      cancelled = true;
    };
  }, [reload]);

  return { meetings, reload };
}
