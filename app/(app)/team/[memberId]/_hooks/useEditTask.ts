"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { Task, TaskStatus } from "@/lib/types";

/** Cleared fields are sent as null so the backend's exclude_unset PATCH actually clears them. */
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
    if (busy || !title.trim()) return;
    setBusy(true);
    try {
      await api.tasks.update(task.task_id, {
        title: title.trim(),
        description: description || null,
        expectation: expectation || null,
        goal_id: goalId || null,
        priority,
        status,
        due_date: dueDate || null,
      });
      notify.success("Task updated.");
      onDone();
    } catch (err) {
      notify.error(err, "Couldn't save the task.");
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
