"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Alignment, BurndownPoint, Checkin, SprintHealth } from "@/lib/types";

/**
 * Loads health, alignment, burndown, and check-ins for a sprint. No
 * cancel-guard here (unlike most other data hooks in this app) — the
 * caller remounts this whole subtree via `key={sprint.sprint_id}` on
 * sprint change instead, which achieves the same "don't apply a stale
 * response" guarantee more simply. Preserved as designed, not "fixed" to
 * match the other hooks' pattern.
 */
export function useSprintDashboardData(sprintId: string) {
  const [health, setHealth] = useState<SprintHealth | null>(null);
  const [alignment, setAlignment] = useState<Alignment | null>(null);
  const [burndown, setBurndown] = useState<BurndownPoint[]>([]);
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.sprints.health(sprintId),
      api.sprints.alignment(sprintId),
      api.sprints.burndown(sprintId),
      api.checkins.list(sprintId),
    ])
      .then(([h, a, b, c]) => {
        setHealth(h);
        setAlignment(a);
        setBurndown(b.series);
        setCheckins(c);
      })
      .finally(() => setLoading(false));
  }, [sprintId]);

  return { health, alignment, burndown, checkins, loading };
}
