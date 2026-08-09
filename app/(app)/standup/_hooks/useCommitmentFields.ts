"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { AccountabilityEntry, CheckinFlag } from "@/lib/types";

/**
 * Owns one member+date commitment's field state and submit flow. Seeded
 * from any existing commitment for that member/day (via `existing`) so
 * re-opening the form for the same day picks up what was already saved
 * instead of starting blank.
 */
export function useCommitmentFields(
  sprintId: string,
  memberId: string,
  date: string,
  existing: AccountabilityEntry | undefined,
  onDone: () => void
) {
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>(
    () => existing?.committed_tasks.map((t) => t.task_id) ?? []
  );
  const [todayPlan, setTodayPlan] = useState(() => existing?.today_plan ?? "");
  const [flag, setFlag] = useState<CheckinFlag>(() => existing?.flag ?? "on_track");
  const [busy, setBusy] = useState(false);

  function toggleTask(taskId: string) {
    setSelectedTaskIds((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]));
  }

  async function submit() {
    if (!memberId || !date) return;
    setBusy(true);
    try {
      await api.checkins.create({
        sprint_id: sprintId,
        member_id: memberId,
        checkin_date: date,
        committed_task_ids: selectedTaskIds,
        today_plan: todayPlan.trim() || null,
        flag,
      });
      onDone();
    } finally {
      setBusy(false);
    }
  }

  return { selectedTaskIds, toggleTask, todayPlan, setTodayPlan, flag, setFlag, busy, submit };
}
