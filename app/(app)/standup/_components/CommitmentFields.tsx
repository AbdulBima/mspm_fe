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
          <p className="rounded-xl border border-dashed border-line px-3.5 py-3 text-xs text-ink-mute">
            No open tasks for this person — add one from their task page first.
          </p>
        ) : (
          <div className="max-h-56 divide-y divide-line overflow-y-auto rounded-xl border border-line-strong">
            {memberTasks.map((t) => {
              const checked = selectedTaskIds.includes(t.task_id);
              return (
                <button
                  key={t.task_id}
                  type="button"
                  onClick={() => toggleTask(t.task_id)}
                  className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm transition-colors"
                  style={{ backgroundColor: checked ? "#F4EAFD" : "#FFFFFF", color: "#16122E" }}
                >
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded"
                    style={{
                      border: `1.5px solid ${checked ? "#6F01D0" : "#DCD8E8"}`,
                      backgroundColor: checked ? "#6F01D0" : "#FFFFFF",
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
                className="rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-150"
                style={
                  active
                    ? { color: "#6F01D0", backgroundColor: "#F4EAFD", borderColor: "rgba(111,1,208,0.35)" }
                    : { color: "#75728A", backgroundColor: "#FFFFFF", borderColor: "#ECEAF3" }
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
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={busy || !memberId}
          className="btn-primary"
        >
          {busy ? "Saving…" : "Save commitment"}
        </button>
      </div>
    </form>
  );
}
