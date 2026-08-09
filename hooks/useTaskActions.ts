"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { Task, TaskStatus } from "@/lib/types";

/**
 * Per-task mutations: inline status change and delete-with-confirm, each
 * owning a shared "busy" flag. Originally lived in app/board/_hooks — moved
 * here once the member-detail page needed the exact same logic verbatim.
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
