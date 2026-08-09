"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { Goal } from "@/lib/types";

const inputCls =
  "w-full rounded-lg border border-[#E7E5E2] bg-white px-3.5 py-2.5 text-sm text-[#0B0C0F] placeholder:text-[#B4B2AC] transition-colors focus:outline-none focus:border-[#1D2B64] focus:ring-2 focus:ring-[#1D2B64]/10";

const labelCls = "mb-1.5 block text-[11px] font-medium text-[#84828C]";

interface CreateTaskInput {
  sprint_id: string;
  member_id: string;
  title: string;
  description?: string;
  expectation?: string;
  goal_id?: string;
  priority: number;
  due_date?: string;
}

export function NewTaskForm({
  sprintId,
  memberId,
  goals,
  onDone,
}: {
  sprintId: string;
  memberId: string;
  goals: Goal[];
  onDone: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expectation, setExpectation] = useState("");
  const [goalId, setGoalId] = useState("");
  const [priority, setPriority] = useState(2);
  const [dueDate, setDueDate] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = {
        sprint_id: sprintId,
        member_id: memberId,
        title,
        description: description || undefined,
        expectation: expectation || undefined,
        goal_id: goalId || undefined,
        priority,
        due_date: dueDate || undefined,
      } satisfies CreateTaskInput;
      await api.tasks.create(payload);
      onDone();
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <span className={labelCls}>Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g. Wire Resource Library upload endpoint to R2"
          className={inputCls}
        />
      </div>

      <div>
        <span className={labelCls}>What it involves</span>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className={inputCls} />
      </div>

      <div>
        <span className={labelCls}>What &quot;done&quot; looks like (expectation)</span>
        <textarea value={expectation} onChange={(e) => setExpectation(e.target.value)} rows={2} className={inputCls} />
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="min-w-40 flex-1">
          <span className={labelCls}>Sprint goal</span>
          <select value={goalId} onChange={(e) => setGoalId(e.target.value)} className={inputCls}>
            <option value="">— No goal linked —</option>
            {goals.map((g) => (
              <option key={g.goal_id} value={g.goal_id}>
                {g.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className={labelCls}>Priority</span>
          <select
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className={`${inputCls} w-24`}
          >
            {[1, 2, 3, 4, 5].map((p) => (
              <option key={p} value={p}>
                P{p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className={labelCls}>Due date</span>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={inputCls} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={onDone}
          className="rounded-lg border border-[#E7E5E2] px-4 py-2.5 text-sm font-medium text-[#54525C] transition-colors hover:bg-[#FAFAF9]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-[#0B0C0F] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D2B64] disabled:opacity-40"
        >
          {busy ? "Adding…" : "Add task"}
        </button>
      </div>
    </form>
  );
}