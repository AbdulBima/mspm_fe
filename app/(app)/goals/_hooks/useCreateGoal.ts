"use client";

import { useState } from "react";
import { api } from "@/lib/api";

/** Owns the new-goal form's fields and submit flow, kept separate from the drawer's chrome/layout. */
export function useCreateGoal(sprintId: string, onDone: () => void) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!title.trim()) return;
    setBusy(true);
    try {
      await api.sprints.createGoal(sprintId, { title, description: description || undefined });
      onDone();
    } finally {
      setBusy(false);
    }
  }

  return { title, setTitle, description, setDescription, busy, submit };
}
