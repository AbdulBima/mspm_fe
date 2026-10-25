"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { Meeting } from "@/lib/types";

export function useMeetings(sprintId: string) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const reload = useCallback(async () => {
    try {
      setMeetings(await api.meetings.list(sprintId));
    } catch (err) {
      notify.error(err, "Couldn't load meetings.");
    }
  }, [sprintId]);

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
