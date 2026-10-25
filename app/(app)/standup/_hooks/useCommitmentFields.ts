"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { AccountabilityEntry, CheckinFlag } from "@/lib/types";

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
    if (busy || !memberId || !date) return;
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
      notify.success("Commitment saved.");
      onDone();
    } catch (err) {
      notify.error(err, "Couldn't save the commitment.");
    } finally {
      setBusy(false);
    }
  }

  return { selectedTaskIds, toggleTask, todayPlan, setTodayPlan, flag, setFlag, busy, submit };
}
