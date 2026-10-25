"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Alignment, BurndownPoint, Checkin, SprintHealth } from "@/lib/types";

/** The caller remounts this via `key={sprint.sprint_id}`, so a stale response can't land on a new sprint. */
export function useSprintDashboardData(sprintId: string) {
  const [health, setHealth] = useState<SprintHealth | null>(null);
  const [alignment, setAlignment] = useState<Alignment | null>(null);
  const [burndown, setBurndown] = useState<BurndownPoint[]>([]);
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [h, a, b, c] = await Promise.all([
        api.sprints.health(sprintId),
        api.sprints.alignment(sprintId),
        api.sprints.burndown(sprintId),
        api.checkins.list(sprintId),
      ]);
      setHealth(h);
      setAlignment(a);
      setBurndown(b.series);
      setCheckins(c);
      setError(null);
    } catch (err) {
      setError(err instanceof api.ApiError ? err.message : "Couldn't load the sprint overview.");
    } finally {
      setLoading(false);
    }
  }, [sprintId]);

  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, [load]);

  return { health, alignment, burndown, checkins, loading, error, reload: load };
}
