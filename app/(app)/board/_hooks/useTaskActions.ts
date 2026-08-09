"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { Task, TaskStatus } from "@/lib/types";

/**
 * Per-row task mutations. Owns the row's "busy" state so the status
 * dropdown and delete button can disable themselves mid-request without
 * the parent table needing to track which row is in flight.
 */
export function useTaskActions(task: Task, onChanged: () => void) {
  const [busy, setBusy] = useState(false);

  async function changeStatus(status: TaskStatus) {
    setBusy(true);
    try {
      await api.tasks.update(task.task_id, { status });
      onChanged();
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm(`Delete "${task.title}"? This can't be undone.`)) return;
    await api.tasks.remove(task.task_id);
    onChanged();
  }

  return { busy, changeStatus, remove };
}
