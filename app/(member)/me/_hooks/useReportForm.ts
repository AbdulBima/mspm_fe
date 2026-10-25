"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { CheckinFlag, MyDailyReport } from "@/lib/types";

interface Draft {
  summary: string;
  taskIds: string[];
  blockers: string;
  planTomorrow: string;
  flag: CheckinFlag;
  baseRevision?: number;
}

const EMPTY: Draft = { summary: "", taskIds: [], blockers: "", planTomorrow: "", flag: "on_track" };

function draftKey(memberId: string, date: string) {
  return `sprint-ops:report-draft:${memberId}:${date}`;
}

function readDraft(key: string, revision: number): Draft | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const draft = { ...EMPTY, ...(JSON.parse(raw) as Partial<Draft>) };
    if ((draft.baseRevision ?? 0) !== revision) {
      window.localStorage.removeItem(key);
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

function fromReport(today: MyDailyReport): Draft {
  const r = today.report;
  if (!r) return EMPTY;
  return {
    summary: r.summary,
    taskIds: r.task_ids,
    blockers: r.blockers ?? "",
    planTomorrow: r.plan_tomorrow ?? "",
    flag: r.flag,
  };
}

export function useReportForm(memberId: string, today: MyDailyReport, onSaved: (next: MyDailyReport) => void) {
  const key = draftKey(memberId, today.report_date);
  const revision = today.report?.revision ?? 0;
  const [draft, setDraft] = useState<Draft>(
    () => (typeof window !== "undefined" && readDraft(key, revision)) || fromReport(today)
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dirty = useRef(false);

  useEffect(() => {
    if (!dirty.current) return;
    try {
      window.localStorage.setItem(key, JSON.stringify({ ...draft, baseRevision: revision }));
    } catch {
      /* storage unavailable */
    }
  }, [draft, key, revision]);

  function update<K extends keyof Draft>(field: K, value: Draft[K]) {
    dirty.current = true;
    setError(null);
    setDraft((d) => ({ ...d, [field]: value }));
  }

  function toggleTask(taskId: string) {
    update(
      "taskIds",
      draft.taskIds.includes(taskId) ? draft.taskIds.filter((id) => id !== taskId) : [...draft.taskIds, taskId]
    );
  }

  async function submit() {
    if (saving) return;
    if (draft.summary.trim().length < 10) {
      setError("Tell us a bit more about what you did today (at least 10 characters).");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const next = await api.me.submitReport({
        report_date: today.report_date,
        summary: draft.summary.trim(),
        task_ids: draft.taskIds,
        blockers: draft.blockers.trim() || undefined,
        plan_tomorrow: draft.planTomorrow.trim() || undefined,
        flag: draft.flag,
      });
      dirty.current = false;
      try {
        window.localStorage.removeItem(key);
      } catch {
        /* storage unavailable */
      }
      notify.success(today.report ? "Report updated. Your manager can see the changes." : "Report submitted. Nice work today.");
      onSaved(next);
    } catch (err) {
      setError(err instanceof api.ApiError ? err.message : "Couldn't save your report. Try again.");
    } finally {
      setSaving(false);
    }
  }

  const changed = JSON.stringify({ ...draft, baseRevision: undefined }) !== JSON.stringify(fromReport(today));

  return { draft, update, toggleTask, submit, saving, error, changed };
}
