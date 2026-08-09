"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Decision } from "@/lib/types";

export function useDecisions(sprintId: string) {
  const [decisions, setDecisions] = useState<Decision[]>([]);

  const reload = useCallback(async () => setDecisions(await api.decisions.list(sprintId)), [sprintId]);

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
