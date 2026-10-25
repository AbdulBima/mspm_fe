"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { NoteType } from "@/lib/types";

/** Owns the add-note form's fields and submit flow, kept separate from the form's layout. */
export function useAddNote(defaultTaskId: string, onDone: () => void) {
  const [taskId, setTaskId] = useState(defaultTaskId);
  const [noteType, setNoteType] = useState<NoteType>("update");
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (busy || !taskId || !content.trim()) return;
    setBusy(true);
    try {
      await api.tasks.addNote(taskId, content.trim(), noteType);
      notify.success("Note added.");
      onDone();
    } catch (err) {
      notify.error(err, "Couldn't add the note.");
    } finally {
      setBusy(false);
    }
  }

  return { taskId, setTaskId, noteType, setNoteType, content, setContent, busy, submit };
}
