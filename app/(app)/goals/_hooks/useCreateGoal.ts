"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";

/** Owns the new-goal form's fields and submit flow, kept separate from the drawer's chrome/layout. */
export function useCreateGoal(sprintId: string, onDone: () => void) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (busy || !title.trim()) return;
    setBusy(true);
    try {
      await api.sprints.createGoal(sprintId, { title: title.trim(), description: description.trim() || undefined });
      notify.success("Goal added.");
      onDone();
    } catch (err) {
      notify.error(err, "Couldn't add the goal.");
    } finally {
      setBusy(false);
    }
  }

  return { title, setTitle, description, setDescription, busy, submit };
}
