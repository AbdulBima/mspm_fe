"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { Decision } from "@/lib/types";

export function useDecisions(sprintId: string) {
  const [decisions, setDecisions] = useState<Decision[]>([]);

  const reload = useCallback(async () => {
    try {
      setDecisions(await api.decisions.list(sprintId));
    } catch (err) {
      notify.error(err, "Couldn't load decisions.");
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

  return { decisions, reload };
}
