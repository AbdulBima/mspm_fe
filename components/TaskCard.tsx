"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Send, Target, Trash2 } from "lucide-react";
import type { Goal, NoteType, Task, TaskStatus } from "@/lib/types";
import { api } from "@/lib/api";
import { formatDateTime } from "@/lib/sprint-utils";

const STATUS_OPTIONS: TaskStatus[] = ["not_started", "in_progress", "blocked", "in_review", "done"];
const NOTE_TYPES: NoteType[] = ["update", "blocker", "question", "decision", "praise"];

interface UpdateTaskGoalInput {
  goal_id: string | null;
}

const selectCls =
  "shrink-0 rounded-lg border border-[#E7E5E2] bg-white px-2 py-1.5 text-[11px] text-[#54525C] outline-none transition-colors focus:border-[#1D2B64] focus:ring-2 focus:ring-[#1D2B64]/10";

export function TaskCard({ task, goals, onChanged }: { task: Task; goals: Goal[]; onChanged: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteType, setNoteType] = useState<NoteType>("update");
  const [busy, setBusy] = useState(false);

  const goal = goals.find((g) => g.goal_id === task.goal_id);

  async function changeStatus(status: TaskStatus) {
    setBusy(true);
    try {
      await api.tasks.update(task.task_id, { status });
      onChanged();
    } finally {
      setBusy(false);
    }
  }

  async function changeGoal(goalId: string) {
    setBusy(true);
    try {
      const payload = { goal_id: goalId || null } satisfies UpdateTaskGoalInput;
      await api.tasks.update(task.task_id, payload);
      onChanged();
    } finally {
      setBusy(false);
    }
  }

  async function submitNote(e: React.FormEvent) {
    e.preventDefault();
    if (!noteText.trim()) return;
    setBusy(true);
    try {
      await api.tasks.addNote(task.task_id, noteText.trim(), noteType);
      setNoteText("");
      onChanged();
    } finally {
      setBusy(false);
    }
  }

  async function removeTask() {
    if (!confirm(`Delete "${task.title}"? This can't be undone.`)) return;
    await api.tasks.remove(task.task_id);
    onChanged();
  }

  const borderCls = task.is_overdue ? "border-[#F0C4BE]" : task.is_stale ? "border-[#E9CFA0]" : "border-[#E7E5E2]";

  return (
    <div className={`rounded-xl border ${borderCls} bg-white p-4 transition-colors`}>
      <div className="flex items-start justify-between gap-3">
        <button onClick={() => setExpanded((v) => !v)} className="flex flex-1 items-start gap-2 text-left">
          {expanded ? (
            <ChevronUp size={15} className="mt-0.5 shrink-0 text-[#B4B2AC]" />
          ) : (
            <ChevronDown size={15} className="mt-0.5 shrink-0 text-[#B4B2AC]" />
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#0B0C0F]">{task.title}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-[#B4B2AC]">P{task.priority}</span>
              {goal ? (
                <span className="inline-flex items-center gap-1 text-[11px] text-[#B4B2AC]">
                  <Target size={11} /> {goal.title}
                </span>
              ) : (
                <span className="text-[11px] font-medium text-[#92590A]">Unaligned — no goal linked</span>
              )}
              {task.is_stale && <span className="text-[11px] font-medium text-[#92590A]">Gone quiet</span>}
              {task.is_overdue && <span className="text-[11px] font-medium text-[#B42318]">Overdue</span>}
            </div>
          </div>
        </button>
        <select value={task.status} disabled={busy} onChange={(e) => changeStatus(e.target.value as TaskStatus)} className={selectCls}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-[#E7E5E2] pt-4">
          <div>
            <p className="mb-1.5 text-[11px] font-medium text-[#84828C]">Sprint goal</p>
            <select
              value={task.goal_id ?? ""}
              disabled={busy}
              onChange={(e) => changeGoal(e.target.value)}
              className="w-full rounded-lg border border-[#E7E5E2] bg-white px-3 py-2 text-sm text-[#0B0C0F] outline-none transition-colors focus:border-[#1D2B64] focus:ring-2 focus:ring-[#1D2B64]/10"
            >
              <option value="">— No goal linked —</option>
              {goals.map((g) => (
                <option key={g.goal_id} value={g.goal_id}>
                  {g.title}
                </option>
              ))}
            </select>
          </div>

          {task.description && (
            <div>
              <p className="mb-1.5 text-[11px] font-medium text-[#84828C]">What it involves</p>
              <p className="text-sm text-[#54525C]">{task.description}</p>
            </div>
          )}
          {task.expectation && (
            <div>
              <p className="mb-1.5 text-[11px] font-medium text-[#84828C]">What &quot;done&quot; looks like</p>
              <p className="text-sm text-[#54525C]">{task.expectation}</p>
            </div>
          )}
          {task.dependency_note && (
            <div>
              <p className="mb-1.5 text-[11px] font-medium text-[#84828C]">Depends on</p>
              <p className="text-sm text-[#54525C]">{task.dependency_note}</p>
            </div>
          )}

          <div>
            <p className="mb-2 text-[11px] font-medium text-[#84828C]">Notes · {task.notes?.length ?? 0}</p>
            <div className="space-y-2">
              {task.notes?.map((n) => (
                <div key={n.note_id} className="rounded-lg border border-[#E7E5E2] bg-[#FAFAF9] px-3 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-[#84828C]">
                      {n.note_type} · {n.author}
                    </span>
                    <span className="text-[10px] text-[#B4B2AC]">{formatDateTime(n.created_at)}</span>
                  </div>
                  <p className="mt-1 text-sm text-[#54525C]">{n.content}</p>
                </div>
              ))}
            </div>

            <form onSubmit={submitNote} className="mt-2 flex items-center gap-2">
              <select
                value={noteType}
                onChange={(e) => setNoteType(e.target.value as NoteType)}
                className="rounded-lg border border-[#E7E5E2] bg-white px-2 py-2 text-[11px] text-[#54525C] outline-none transition-colors focus:border-[#1D2B64] focus:ring-2 focus:ring-[#1D2B64]/10"
              >
                {NOTE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a note…"
                className="flex-1 rounded-lg border border-[#E7E5E2] bg-white px-3 py-2 text-sm text-[#0B0C0F] outline-none transition-colors focus:border-[#1D2B64] focus:ring-2 focus:ring-[#1D2B64]/10"
              />
              <button
                type="submit"
                disabled={busy}
                aria-label="Add note"
                className="rounded-lg bg-[#0B0C0F] p-2 text-white transition-colors hover:bg-[#1D2B64] disabled:opacity-40"
              >
                <Send size={14} />
              </button>
            </form>
          </div>

          <button onClick={removeTask} className="flex items-center gap-1 text-xs text-[#B4B2AC] transition-colors hover:text-[#B42318]">
            <Trash2 size={12} /> Delete task
          </button>
        </div>
      )}
    </div>
  );
}