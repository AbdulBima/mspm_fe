"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { Task, TaskStatus } from "@/lib/types";

/**
 * Owns the edit-task form's field state and submit flow. Cleared fields are
 * sent as `null` rather than omitted — the backend's PATCH uses
 * exclude_unset, so a null actually unsets the field, while omitting it
 * would leave the previous value untouched.
 */
export function useEditTask(task: Task, onDone: () => void) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [expectation, setExpectation] = useState(task.expectation ?? "");
  const [goalId, setGoalId] = useState(task.goal_id ?? "");
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [dueDate, setDueDate] = useState(task.due_date ? task.due_date.slice(0, 10) : "");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    try {
      await api.tasks.update(task.task_id, {
        title,
        description: description || null,
        expectation: expectation || null,
        goal_id: goalId || null,
        priority,
        status,
        due_date: dueDate || null,
      });
      onDone();
    } finally {
      setBusy(false);
    }
  }

  return {
    title,
    setTitle,
    description,
    setDescription,
    expectation,
    setExpectation,
    goalId,
    setGoalId,
    priority,
    setPriority,
    status,
    setStatus,
    dueDate,
    setDueDate,
    busy,
    submit,
  };
}
