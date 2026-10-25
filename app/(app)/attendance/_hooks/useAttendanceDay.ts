"use client";

import { useCallback, useEffect, useState } from "react";
import { notify } from "@/lib/notify";
import { api } from "@/lib/api";
import type { AttendanceStatus, Member } from "@/lib/types";
import { EMPTY_ENTRY, type LocalEntry } from "../_lib/types";
import { nowHHMM } from "../_lib/date";

/**
 * The core of this feature: loads one day's attendance, owns every local
 * edit to it (status, joined-at, plan, attached tasks, note), and persists
 * it. Everything about *how* attendance is fetched and saved lives here —
 * the page and its components only ever see `entries` plus a handful of
 * setter callbacks, never the API shape directly.
 */
export function useAttendanceDay(sprintId: string | undefined, date: string, members: Member[]) {
  const [entries, setEntries] = useState<Record<string, LocalEntry>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (id: string, day: string) => {
    setLoading(true);
    setError(null);
    try {
      const days = await api.attendance.list(id, { attendance_date: day });
      const map: Record<string, LocalEntry> = {};
      for (const e of days[0]?.entries ?? []) {
        map[e.member_id] = {
          status: e.status,
          joinedAt: e.joined_at ?? "",
          todayPlan: e.today_plan ?? "",
          taskIds: e.task_ids ?? [],
          note: e.note ?? "",
        };
      }
      setEntries(map);
      setDirty(false);
    } catch (err) {
      notify.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!sprintId) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) load(sprintId, date);
    });
    return () => {
      cancelled = true;
    };
  }, [sprintId, date, load]);

  const setStatus = useCallback((memberId: string, status: AttendanceStatus) => {
    setEntries((prev) => {
      const existing = prev[memberId] ?? EMPTY_ENTRY;
      const joinsNow = status === "present" || status === "late";
      return {
        ...prev,
        [memberId]: {
          ...existing,
          status,
          // Auto-fill the join time the first time someone's marked present/late; still editable after.
          joinedAt: joinsNow ? existing.joinedAt || nowHHMM() : "",
        },
      };
    });
    setDirty(true);
  }, []);

  const setJoinedAt = useCallback((memberId: string, joinedAt: string) => {
    setEntries((prev) => ({ ...prev, [memberId]: { ...(prev[memberId] ?? EMPTY_ENTRY), joinedAt } }));
    setDirty(true);
  }, []);

  const setTodayPlan = useCallback((memberId: string, todayPlan: string) => {
    setEntries((prev) => ({ ...prev, [memberId]: { ...(prev[memberId] ?? EMPTY_ENTRY), todayPlan } }));
    setDirty(true);
  }, []);

  const toggleTask = useCallback((memberId: string, taskId: string) => {
    setEntries((prev) => {
      const existing = prev[memberId] ?? EMPTY_ENTRY;
      const has = existing.taskIds.includes(taskId);
      const taskIds = has ? existing.taskIds.filter((id) => id !== taskId) : [...existing.taskIds, taskId];
      return { ...prev, [memberId]: { ...existing, taskIds } };
    });
    setDirty(true);
  }, []);

  const setNote = useCallback((memberId: string, note: string) => {
    setEntries((prev) => ({ ...prev, [memberId]: { ...(prev[memberId] ?? EMPTY_ENTRY), note } }));
    setDirty(true);
  }, []);

  const markAllPresent = useCallback(() => {
    const joinedAt = nowHHMM();
    setEntries((prev) => {
      const next: Record<string, LocalEntry> = {};
      for (const m of members) {
        next[m.member_id] = {
          ...EMPTY_ENTRY,
          status: "present",
          joinedAt,
          todayPlan: prev[m.member_id]?.todayPlan ?? "",
          taskIds: prev[m.member_id]?.taskIds ?? [],
        };
      }
      return next;
    });
    setDirty(true);
  }, [members]);

  const save = useCallback(
    async (onSaved?: () => Promise<void> | void) => {
      if (!sprintId) return;
      setSaving(true);
      setError(null);
      try {
        const payloadEntries = members
          .filter((m) => entries[m.member_id]?.status)
          .map((m) => {
            const e = entries[m.member_id];
            return {
              member_id: m.member_id,
              status: e.status as AttendanceStatus,
              joined_at: e.joinedAt || undefined,
              today_plan: e.todayPlan || undefined,
              task_ids: e.taskIds,
              note: e.note || undefined,
            };
          });
        await api.attendance.bulkMark({ sprint_id: sprintId, attendance_date: date, entries: payloadEntries });
        setDirty(false);
        await onSaved?.();
      } catch (err) {
        setError(err instanceof api.ApiError ? err.message : "Couldn't save attendance. Try again.");
      } finally {
        setSaving(false);
      }
    },
    [sprintId, date, members, entries]
  );

  return {
    entries,
    loading,
    saving,
    dirty,
    error,
    setStatus,
    setJoinedAt,
    setTodayPlan,
    toggleTask,
    setNote,
    markAllPresent,
    save,
  };
}
