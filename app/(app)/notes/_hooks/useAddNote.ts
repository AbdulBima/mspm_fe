"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { NoteType } from "@/lib/types";

/** Owns the add-note form's fields and submit flow, kept separate from the form's layout. */
export function useAddNote(defaultTaskId: string, onDone: () => void) {
  const [taskId, setTaskId] = useState(defaultTaskId);
  const [noteType, setNoteType] = useState<NoteType>("update");
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!taskId) return;
    setBusy(true);
    try {
      await api.tasks.addNote(taskId, content, noteType);
      onDone();
    } finally {
      setBusy(false);
    }
  }

  return { taskId, setTaskId, noteType, setNoteType, content, setContent, busy, submit };
}
