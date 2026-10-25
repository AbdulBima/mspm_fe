"use client";

import { AlertTriangle, Check, CheckCircle2, Lock, Send } from "lucide-react";
import type { CheckinFlag, MyDailyReport, MyTask } from "@/lib/types";
import { TaskStatusBadge } from "@/components/StatusBadge";
import { useReportForm } from "../_hooks/useReportForm";

const FLAGS: { value: CheckinFlag; label: string; hint: string; active: string }[] = [
  { value: "on_track", label: "On track", hint: "Moving as planned", active: "border-emerald-300 bg-emerald-50 text-emerald-700" },
  { value: "at_risk", label: "At risk", hint: "Might slip", active: "border-amber-300 bg-amber-50 text-amber-700" },
  { value: "blocked", label: "Blocked", hint: "Need help", active: "border-rose-300 bg-rose-50 text-rose-700" },
];

const AREA =
  "w-full resize-y rounded-xl border border-line-strong bg-white px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-ink-faint transition-all outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 disabled:bg-subtle disabled:text-ink-mute";

export function DailyReportForm({
  memberId,
  today,
  tasks,
  closed,
  onSaved,
}: {
  memberId: string;
  today: MyDailyReport;
  tasks: MyTask[];
  closed: boolean;
  onSaved: (next: MyDailyReport) => void;
}) {
  const { draft, update, toggleTask, submit, saving, error, changed } = useReportForm(memberId, today, onSaved);
  const submitted = Boolean(today.report);
  const openTasks = tasks.filter((t) => t.status !== "done" || draft.taskIds.includes(t.task_id));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="card overflow-hidden"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-5 py-5 sm:px-6">
        <div>
          <p className="eyebrow">End-of-day report</p>
          <h2 className="mt-1 text-lg font-bold text-ink">What did you get done today?</h2>
        </div>
        {submitted && !changed && !closed && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <CheckCircle2 size={14} /> Saved
          </span>
        )}
      </div>

      {closed ? (
        <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-subtle text-ink-mute">
            <Lock size={20} />
          </div>
          <p className="text-sm font-semibold text-ink">Today&apos;s window has closed</p>
          <p className="max-w-sm text-sm text-ink-mute">
            Reports can only be filed before midnight. A fresh report for the new day is opening now.
          </p>
        </div>
      ) : (
        <fieldset disabled={saving} className="space-y-6 px-5 py-6 sm:px-6">
          <div>
            <label htmlFor="summary" className="mb-2 flex items-center justify-between text-sm font-semibold text-ink">
              Summary of your day <span className="text-xs font-medium text-ink-faint">{draft.summary.trim().length}/5000</span>
            </label>
            <textarea
              id="summary"
              rows={6}
              maxLength={5000}
              value={draft.summary}
              onChange={(e) => update("summary", e.target.value)}
              placeholder="e.g. Shipped the onboarding email flow, reviewed two PRs, paired with design on the dashboard empty states…"
              className={AREA}
              required
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-ink">
              Tasks you worked on <span className="font-medium text-ink-faint">(optional)</span>
            </p>
            {openTasks.length === 0 ? (
              <p className="rounded-xl border border-dashed border-line-strong px-4 py-3 text-xs text-ink-mute">
                No tasks are assigned to you in the current sprint yet.
              </p>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {openTasks.map((t) => {
                  const checked = draft.taskIds.includes(t.task_id);
                  return (
                    <button
                      key={t.task_id}
                      type="button"
                      onClick={() => toggleTask(t.task_id)}
                      aria-pressed={checked}
                      className={`flex items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-all ${
                        checked
                          ? "border-accent/50 bg-accent-soft ring-2 ring-accent/10"
                          : "border-line hover:border-line-strong hover:bg-subtle"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border-[1.5px] transition-colors ${
                          checked ? "border-accent bg-accent text-white" : "border-line-strong bg-white"
                        }`}
                      >
                        {checked && <Check size={12} strokeWidth={3} />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-2 text-sm font-medium text-ink">{t.title}</span>
                        <span className="mt-1.5 block">
                          <TaskStatusBadge status={t.status} />
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-ink">How are things going?</p>
            <div className="grid grid-cols-3 gap-2">
              {FLAGS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => update("flag", f.value)}
                  aria-pressed={draft.flag === f.value}
                  className={`rounded-xl border px-3 py-2.5 text-left transition-all ${
                    draft.flag === f.value ? f.active : "border-line text-ink-soft hover:bg-subtle"
                  }`}
                >
                  <span className="block text-sm font-semibold">{f.label}</span>
                  <span className="hidden text-[11px] opacity-75 sm:block">{f.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="blockers" className="mb-2 block text-sm font-semibold text-ink">
                Blockers <span className="font-medium text-ink-faint">(optional)</span>
              </label>
              <textarea
                id="blockers"
                rows={3}
                maxLength={2000}
                value={draft.blockers}
                onChange={(e) => update("blockers", e.target.value)}
                placeholder="Anything slowing you down?"
                className={AREA}
              />
            </div>
            <div>
              <label htmlFor="plan" className="mb-2 block text-sm font-semibold text-ink">
                Plan for tomorrow <span className="font-medium text-ink-faint">(optional)</span>
              </label>
              <textarea
                id="plan"
                rows={3}
                maxLength={2000}
                value={draft.planTomorrow}
                onChange={(e) => update("planTomorrow", e.target.value)}
                placeholder="What's next on your list?"
                className={AREA}
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink-mute">
              {submitted && !changed
                ? "Saved. Your manager can see it. You can still edit until midnight."
                : changed
                  ? "Draft saved on this device until you submit."
                  : "You can edit your report until midnight."}
            </p>
            <button type="submit" disabled={saving || (submitted && !changed)} className="btn-primary w-full sm:w-auto">
              {saving ? <span className="spinner" /> : <Send size={15} />}
              {saving ? "Saving…" : submitted ? "Update report" : "Submit report"}
            </button>
          </div>
        </fieldset>
      )}
    </form>
  );
}
