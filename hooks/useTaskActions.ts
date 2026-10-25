"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { Task, TaskStatus } from "@/lib/types";

export function useTaskActions(task: Task, onChanged: () => void) {
  const [busy, setBusy] = useState(false);

  async function changeStatus(status: TaskStatus) {
    if (busy) return;
    setBusy(true);
    try {
      await api.tasks.update(task.task_id, { status });
      onChanged();
    } catch (err) {
      notify.error(err, "Couldn't update the task.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (busy || !confirm(`Delete "${task.title}"? This can't be undone.`)) return;
    setBusy(true);
    try {
      await api.tasks.remove(task.task_id);
      notify.success("Task deleted.");
      onChanged();
    } catch (err) {
      notify.error(err, "Couldn't delete the task.");
    } finally {
      setBusy(false);
    }
  }

  return { busy, changeStatus, remove };
}
