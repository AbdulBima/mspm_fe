"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Alignment, Goal, Member, Task } from "@/lib/types";

/**
 * Loads the four data sources this page needs for a sprint: its goals, the
 * computed alignment breakdown, its tasks, and the team roster. A failed
 * sync is logged, not surfaced as an error state — the page just keeps
 * showing whatever it last had. That's the original behavior; preserved
 * as-is rather than "fixed," since I can't tell from the code alone
 * whether silent-stale-on-failure was a deliberate call.
 */
export function useGoalsData(sprintId: string | undefined) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [alignment, setAlignment] = useState<Alignment | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const reloadFor = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const [g, a, t, m] = await Promise.all([
        api.sprints.goals(id),
        api.sprints.alignment(id),
        api.tasks.list(id),
        api.members.list(),
      ]);
      setGoals(g);
      setAlignment(a);
      setTasks(t);
      setMembers(m);
    } catch (error) {
      console.error("Failed to sync sprint metrics:", error);
    } finally {
      setLoading(false);
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

  const reload = useCallback(() => {
    if (sprintId) return reloadFor(sprintId);
  }, [sprintId, reloadFor]);

  return { goals, alignment, tasks, members, loading, reload };
}
