"use client";

import { useEffect, useState, startTransition } from "react";
import { createPortal } from "react-dom";
import { ArrowRightCircle, X } from "lucide-react";
import { api } from "@/lib/api";
import type { Handover, Sprint } from "@/lib/types";
import { SeverityBadge, TaskStatusBadge } from "@/components/StatusBadge";

const GOLD = "#AD8A3D";
const GREEN = "#3F7A5C";

export function HandoverPanel({
  sprint,
  otherSprints,
  onClose,
  onCarried,
}: {
  sprint: Sprint;
  otherSprints: Sprint[];
  onClose: () => void;
  onCarried: () => void;
}) {
  const [handover, setHandover] = useState<Handover | null>(null);
  const [loading, setLoading] = useState(true);
  const [targetSprintId, setTargetSprintId] = useState(otherSprints[0]?.sprint_id ?? "");
  const [carryRisks, setCarryRisks] = useState(true);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    startTransition(() => setLoading(true));
    api.sprints.handover(sprint.sprint_id).then(setHandover).finally(() => setLoading(false));
  }, [sprint.sprint_id]);

  async function carryOver() {
    if (!targetSprintId) return;
    setBusy(true);
    setResult(null);
    try {
      const res = await api.sprints.carryOver(sprint.sprint_id, {
        to_sprint_id: targetSprintId,
        carry_open_risks: carryRisks,
      });
      setResult(`Carried ${res.tasks_carried} task(s)${carryRisks ? ` and ${res.risks_carried} risk(s)` : ""} into ${res.to_sprint}.`);
      const refreshed = await api.sprints.handover(sprint.sprint_id);
      setHandover(refreshed);
      onCarried();
    } finally {
      setBusy(false);
    }
  }

  const isEmpty =
    !!handover &&
    handover.incomplete_tasks.length === 0 &&
    handover.open_risks.length === 0 &&
    handover.open_action_items.length === 0;

  return createPortal(
    <>
      <div className="fixed inset-0 z-40 bg-zinc-900/20 backdrop-blur-[2px]" onClick={onClose} />

      <div className="fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-xl flex-col overflow-hidden bg-white shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-zinc-100 px-6 py-5">
          <div>
            <p className="mb-1 questrial-regular text-[9px] uppercase tracking-widest" style={{ color: GOLD }}>
              Sprint handover
            </p>
            <h2 className="font-display text-base font-semibold text-zinc-900">{sprint.name}</h2>
            <p className="mt-1 max-w-sm text-xs text-zinc-500">
              Everything still open when this sprint ends — carry what&apos;s still relevant into the next one.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-50 text-zinc-400 transition-colors hover:bg-zinc-100"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center gap-3 py-8">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-200 border-t-amber-600" />
              <p className="questrial-regular text-xs text-zinc-400">Loading…</p>
            </div>
          ) : !handover ? null : isEmpty ? (
            <div className="flex flex-col items-center py-10 text-center">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mb-4">
                <circle cx="32" cy="32" r="26" stroke="#d4d4d8" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M22 33 L29 40 L43 24" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-display text-sm font-semibold text-zinc-900">Nothing to hand over</p>
              <p className="mt-1 max-w-xs text-sm text-zinc-500">Every task is done, no open risks, no open action items.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {handover.incomplete_tasks.length > 0 && (
                <div>
                  <p className="mb-2 questrial-regular text-[10px] uppercase tracking-wide text-zinc-400">
                    Incomplete tasks · {handover.incomplete_tasks.length}
                  </p>
                  <div className="space-y-1.5">
                    {handover.incomplete_tasks.map((t) => (
                      <div
                        key={t.task_id}
                        className="flex items-center justify-between gap-2 rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2"
                      >
                        <span className="truncate text-sm text-zinc-700">
                          {t.title} <span className="questrial-regular text-[11px] text-zinc-400">· {t.member_name}</span>
                        </span>
                        <TaskStatusBadge status={t.status} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {handover.open_risks.length > 0 && (
                <div>
                  <p className="mb-2 questrial-regular text-[10px] uppercase tracking-wide text-zinc-400">
                    Open risks · {handover.open_risks.length}
                  </p>
                  <div className="space-y-1.5">
                    {handover.open_risks.map((r) => (
                      <div
                        key={r.risk_id}
                        className="flex items-center justify-between gap-2 rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2"
                      >
                        <span className="truncate text-sm text-zinc-700">{r.title}</span>
                        <SeverityBadge severity={r.severity} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {handover.open_action_items.length > 0 && (
                <div>
                  <p className="mb-2 questrial-regular text-[10px] uppercase tracking-wide text-zinc-400">
                    Open action items · {handover.open_action_items.length}
                  </p>
                  <ul className="space-y-1">
                    {handover.open_action_items.map((a, i) => (
                      <li key={i} className="text-sm text-zinc-700">
                        · {a.text} {a.owner && <span className="questrial-regular text-[11px] text-zinc-400">— {a.owner}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {handover.incomplete_tasks.length > 0 && (
                <div className="border-t border-zinc-100 pt-5">
                  {otherSprints.length === 0 ? (
                    <p className="text-xs text-zinc-500">Create another sprint to carry this work into it.</p>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <div>
                          <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                            Carry incomplete tasks into
                          </span>
                          <select
                            value={targetSprintId}
                            onChange={(e) => setTargetSprintId(e.target.value)}
                            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 transition-colors focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15"
                          >
                            {otherSprints.map((s) => (
                              <option key={s.sprint_id} value={s.sprint_id}>
                                {s.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <label className="flex items-center gap-2 text-xs text-zinc-600">
                          <input
                            type="checkbox"
                            checked={carryRisks}
                            onChange={(e) => setCarryRisks(e.target.checked)}
                            className="accent-amber-600"
                          />
                          Carry open risks too
                        </label>
                        <button
                          onClick={carryOver}
                          disabled={busy}
                          className="flex w-full items-center justify-center gap-1.5 rounded-full bg-zinc-900 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-zinc-800 disabled:opacity-40"
                        >
                          <ArrowRightCircle size={14} className="text-amber-400" /> {busy ? "Carrying over…" : "Carry over"}
                        </button>
                      </div>
                      {result && (
                        <p className="mt-3 text-xs" style={{ color: GREEN }}>
                          {result}
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}