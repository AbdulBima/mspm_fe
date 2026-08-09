"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Member, NoteType, Task, TaskNoteWithContext } from "@/lib/types";

/**
 * Loads notes filtered by type + member, plus a second unfiltered-by-type
 * "counts source" (still scoped to the member filter) so the type chips'
 * counts stay accurate no matter which chip is currently active. Unlike
 * the board's task filters, which are applied client-side against an
 * already-loaded list, notes filtering happens server-side — this hook
 * re-fetches whenever typeFilter or memberFilter changes, not just sprint.
 */
export function useNotesData(sprintId: string | undefined, typeFilter: NoteType | "all", memberFilter: string) {
  const [notes, setNotes] = useState<TaskNoteWithContext[]>([]);
  const [countsSource, setCountsSource] = useState<TaskNoteWithContext[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const reloadFor = useCallback(async (id: string, type: NoteType | "all", member: string) => {
    setLoading(true);
    try {
      const memberParam = member === "all" ? undefined : member;
      const [n, countsSrc, t, m] = await Promise.all([
        api.tasks.notes(id, { note_type: type === "all" ? undefined : type, member_id: memberParam }),
        api.tasks.notes(id, { member_id: memberParam }),
        api.tasks.list(id),
        api.members.list(),
      ]);
      setNotes(n);
      setCountsSource(countsSrc);
      setTasks(t);
      setMembers(m);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!sprintId) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) reloadFor(sprintId, typeFilter, memberFilter);
    });
    return () => {
      cancelled = true;
    };
  }, [sprintId, typeFilter, memberFilter, reloadFor]);

  const reload = useCallback(() => {
    if (sprintId) return reloadFor(sprintId, typeFilter, memberFilter);
  }, [sprintId, typeFilter, memberFilter, reloadFor]);

  const removeNote = useCallback(
    async (noteId: string) => {
      if (!confirm("Delete this note? This can't be undone.")) return;
      await api.tasks.removeNote(noteId);
      await reload();
    },
    [reload]
  );

  return { notes, countsSource, tasks, members, loading, reload, removeNote };
}
