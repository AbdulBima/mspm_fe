"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { Goal, Member, Task } from "@/lib/types";

export function useBoardData(sprintId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  const reloadFor = useCallback(async (id: string) => {
    try {
      const [t, m, g] = await Promise.all([api.tasks.list(id), api.members.list(), api.sprints.goals(id)]);
      setTasks(t);
      setMembers(m);
      setGoals(g);
    } catch (err) {
      notify.error(err, "Couldn't load the board.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!sprintId) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) void reloadFor(sprintId);
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
