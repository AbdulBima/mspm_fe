"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { Member, NoteType, Task, TaskNoteWithContext } from "@/lib/types";

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
    } catch (err) {
      notify.error(err, "Couldn't load notes.");
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
      try {
        await api.tasks.removeNote(noteId);
        notify.success("Note deleted.");
        await reload();
      } catch (err) {
        notify.error(err, "Couldn't delete the note.");
      }
    },
    [reload]
  );

  return { notes, countsSource, tasks, members, loading, reload, removeNote };
}
