"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { Alignment, Goal, Member, Task } from "@/lib/types";

export function useGoalsData(sprintId: string | undefined) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [alignment, setAlignment] = useState<Alignment | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const reloadFor = useCallback(async (id: string) => {
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
    } catch (err) {
      notify.error(err, "Couldn't load goal alignment.");
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
