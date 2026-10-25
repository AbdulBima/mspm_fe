"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Checkin, Goal, Member, Task } from "@/lib/types";

export function useMemberDashboard(memberId: string, sprintId: string | undefined) {
  const [member, setMember] = useState<Member | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reloadFor = useCallback(
    async (id: string) => {
      try {
        const [dashboard, goalList] = await Promise.all([api.members.dashboard(memberId, id), api.sprints.goals(id)]);
        setMember(dashboard.member);
        setTasks(dashboard.tasks);
        setCheckins(dashboard.recent_checkins);
        setGoals(goalList);
        setError(null);
      } catch (err) {
        setError(err instanceof api.ApiError ? err.message : "Couldn't load this team member.");
      } finally {
        setLoading(false);
      }
    },
    [memberId]
  );

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

  return { member, tasks, checkins, goals, loading, error, reload };
}
