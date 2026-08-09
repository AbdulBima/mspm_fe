"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Goal, Member, Task } from "@/lib/types";

/**
 * Loads the board's three data sources for a sprint in parallel: its tasks,
 * the team roster, and its goals. `reload` is pre-bound to the current
 * sprint so deeply-nested callers (a single task row's status change or
 * delete) don't need to know the sprint id to trigger a refresh.
 */
export function useBoardData(sprintId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  const reloadFor = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const [t, m, g] = await Promise.all([api.tasks.list(id), api.members.list(), api.sprints.goals(id)]);
      setTasks(t);
      setMembers(m);
      setGoals(g);
    } finally {
      setLoading(false);
    }
  }, []);

  // Deferred to a microtask so the initial setLoading(true) doesn't fire
  // synchronously within the effect body itself (avoids the cascading
  // synchronous-render warning React raises for setState-in-effect).
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

  return { tasks, members, goals, loading, reload };
}
