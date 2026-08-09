"use client";

import { Check } from "lucide-react";
import { inputClsRounded, labelCls } from "@/lib/form-styles";
import type { AccountabilityEntry, Task } from "@/lib/types";
import { CHECKIN_FLAG_LABEL, CHECKIN_FLAG_OPTIONS, TASK_STATUS_DOT } from "../_lib/constants";
import { useCommitmentFields } from "../_hooks/useCommitmentFields";

interface CommitmentFieldsProps {
  sprintId: string;
  memberId: string;
  date: string;
  tasks: Task[];
  entries: AccountabilityEntry[];
  onDone: () => void;
}

export function CommitmentFields({ sprintId, memberId, date, tasks, entries, onDone }: CommitmentFieldsProps) {
  const existing = entries.find((e) => e.member_id === memberId && e.checkin_date.slice(0, 10) === date);
  const { selectedTaskIds, toggleTask, todayPlan, setTodayPlan, flag, setFlag, busy, submit } = useCommitmentFields(
    sprintId,
    memberId,
    date,
    existing,
    onDone
  );

  const memberTasks = tasks.filter((t) => t.member_id === memberId && t.status !== "done");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="space-y-5"
    >
      <div>
        <span className={labelCls}>Committing to</span>
        {memberTasks.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[#E7E5E2] px-3.5 py-3 text-xs text-[#84828C]">
            No open tasks for this person — add one from their task page first.
          </p>
        ) : (
          <div className="max-h-56 divide-y divide-[#EEEDEB] overflow-y-auto rounded-xl border border-[#E7E5E2]">
            {memberTasks.map((t) => {
              const checked = selectedTaskIds.includes(t.task_id);
              return (
                <button
                  key={t.task_id}
                  type="button"
                  onClick={() => toggleTask(t.task_id)}
                  className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm transition-colors"
                  style={{ backgroundColor: checked ? "rgba(29,43,100,0.06)" : "#FFFFFF", color: "#0B0C0F" }}
                >
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded"
                    style={{
                      border: `1.5px solid ${checked ? "#1D2B64" : "#D4D2CC"}`,
                      backgroundColor: checked ? "#1D2B64" : "#FFFFFF",
                    }}
                  >
                    {checked && <Check size={10} color="#FFFFFF" />}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{t.title}</span>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: TASK_STATUS_DOT[t.status] }} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <span className={labelCls}>Status</span>
        <div className="flex flex-wrap gap-2">
          {CHECKIN_FLAG_OPTIONS.map((f) => {
            const active = flag === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFlag(f)}
                className="rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-150"
                style={
                  active
                    ? { color: "#1D2B64", backgroundColor: "rgba(29,43,100,0.08)", borderColor: "rgba(29,43,100,0.3)" }
                    : { color: "#84828C", backgroundColor: "#FFFFFF", borderColor: "#E7E5E2" }
                }
              >
                {CHECKIN_FLAG_LABEL[f]}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <span className={labelCls}>Notes (optional)</span>
        <textarea
          value={todayPlan}
          onChange={(e) => setTodayPlan(e.target.value)}
          rows={3}
          placeholder="Any context worth keeping alongside the tasks above…"
          className={inputClsRounded}
        />
      </div>

      <div className="flex justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={onDone}
          className="rounded-xl border border-[#E7E5E2] px-4 py-2.5 text-sm font-medium text-[#54525C] transition-colors hover:bg-[#FAFAF9]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={busy || !memberId}
          className="rounded-xl bg-linear-to-b from-[#16171B] to-[#0B0C0F] px-5 py-2.5 text-sm font-medium text-white shadow-[0_1px_2px_rgba(11,12,15,0.08),0_8px_16px_-6px_rgba(11,12,15,0.4)] transition-all duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none"
        >
          {busy ? "Saving…" : "Save commitment"}
        </button>
      </div>
    </form>
  );
}
