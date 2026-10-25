"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { SprintHealth } from "@/lib/types";

export function useSprintHealth(sprintId: string | undefined) {
  const [health, setHealth] = useState<SprintHealth | null>(null);
  const [loadedFor, setLoadedFor] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!sprintId) return;
    let cancelled = false;
    api.sprints
      .health(sprintId)
      .then((h) => !cancelled && setHealth(h))
      .catch(() => !cancelled && setHealth(null))
      .finally(() => !cancelled && setLoadedFor(sprintId));
    return () => {
      cancelled = true;
    };
  }, [sprintId]);

  return { health: sprintId ? health : null, loading: Boolean(sprintId) && loadedFor !== sprintId };
}
