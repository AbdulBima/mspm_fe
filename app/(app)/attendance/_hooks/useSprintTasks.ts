"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import type { Task } from "@/lib/types";

/**
 * Loads every task in the sprint and derives the two lookups the roster's
 * "attach a task" picker needs: open (non-done) tasks grouped by member, and
 * a flat task_id -> task map for rendering attached-task chips. One fetch
 * for the whole sprint rather than one call per member.
 */
export function useSprintTasks(sprintId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const reload = useCallback(async (id: string) => {
    const list = await api.tasks.list(id);
    setTasks(list);
  }, []);

  useEffect(() => {
    if (!sprintId) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) reload(sprintId);
    });
    return () => {
      cancelled = true;
    };
  }, [sprintId, reload]);

  const openTasksByMember = useMemo(() => {
    const map: Record<string, Task[]> = {};
    for (const t of tasks) {
      if (t.status === "done") continue;
      (map[t.member_id] ??= []).push(t);
    }
    return map;
  }, [tasks]);

  const taskById = useMemo(() => {
    const map: Record<string, Task> = {};
    for (const t of tasks) map[t.task_id] = t;
    return map;
  }, [tasks]);

  return { tasks, openTasksByMember, taskById };
}
