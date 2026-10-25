"use client";

import { useEffect, useState } from "react";
import { ArrowRightCircle, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { notify } from "@/lib/notify";
import type { Handover, Sprint } from "@/lib/types";
import { Drawer } from "@/components/Drawer";
import { PageLoader } from "@/components/PageLoader";
import { SeverityBadge, TaskStatusBadge } from "@/components/StatusBadge";
import { inputCls, labelCls } from "@/lib/form-styles";

const SECTION = "mb-2 text-[11px] font-semibold tracking-wide text-ink-mute uppercase";
const ROW = "flex items-center justify-between gap-3 rounded-xl border border-line bg-subtle px-3.5 py-2.5";

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
  const [error, setError] = useState<string | null>(null);
  const [targetSprintId, setTargetSprintId] = useState(otherSprints[0]?.sprint_id ?? "");
  const [carryRisks, setCarryRisks] = useState(true);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api.sprints
      .handover(sprint.sprint_id)
      .then((h) => !cancelled && setHandover(h))
      .catch((err) => !cancelled && setError(err instanceof Error ? err.message : "Couldn't load the handover."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [sprint.sprint_id]);

  async function carryOver() {
    if (!targetSprintId || busy) return;
    setBusy(true);
    setResult(null);
    try {
      const res = await api.sprints.carryOver(sprint.sprint_id, {
        to_sprint_id: targetSprintId,
        carry_open_risks: carryRisks,
      });
      setResult(`Carried ${res.tasks_carried} task(s)${carryRisks ? ` and ${res.risks_carried} risk(s)` : ""} into ${res.to_sprint}.`);
      setHandover(await api.sprints.handover(sprint.sprint_id));
      onCarried();
    } catch (err) {
      notify.error(err, "Couldn't carry the work over.");
    } finally {
      setBusy(false);
    }
  }

  const isEmpty =
    !!handover &&
    handover.incomplete_tasks.length === 0 &&
    handover.open_risks.length === 0 &&
    handover.open_action_items.length === 0;

  return (
    <Drawer eyebrow="Sprint handover" title={sprint.name} onClose={onClose} maxWidthCls="max-w-xl">
      <p className="-mt-1 text-sm text-ink-mute">
        Everything still open when this sprint ends. Carry what&apos;s still relevant into the next one.
      </p>

      {loading ? (
        <PageLoader label="Loading handover" />
      ) : error ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
      ) : !handover ? null : isEmpty ? (
        <div className="flex flex-col items-center py-10 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={26} />
          </div>
          <p className="text-sm font-bold text-ink">Nothing to hand over</p>
          <p className="mt-1 max-w-xs text-sm text-ink-mute">Every task is done, with no open risks or action items.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {handover.incomplete_tasks.length > 0 && (
            <div>
              <p className={SECTION}>Incomplete tasks · {handover.incomplete_tasks.length}</p>
              <div className="space-y-1.5">
                {handover.incomplete_tasks.map((t) => (
                  <div key={t.task_id} className={ROW}>
                    <span className="min-w-0 text-sm text-ink">
                      <span className="line-clamp-1">{t.title}</span>
                      <span className="text-[11px] text-ink-mute">{t.member_name}</span>
                    </span>
                    <TaskStatusBadge status={t.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {handover.open_risks.length > 0 && (
            <div>
              <p className={SECTION}>Open risks · {handover.open_risks.length}</p>
              <div className="space-y-1.5">
                {handover.open_risks.map((r) => (
                  <div key={r.risk_id} className={ROW}>
                    <span className="truncate text-sm text-ink">{r.title}</span>
                    <SeverityBadge severity={r.severity} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {handover.open_action_items.length > 0 && (
            <div>
              <p className={SECTION}>Open action items · {handover.open_action_items.length}</p>
              <ul className="space-y-1.5">
                {handover.open_action_items.map((a, i) => (
                  <li key={i} className="flex gap-2 text-sm text-ink-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      {a.text} {a.owner && <span className="text-[11px] text-ink-mute">· {a.owner}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {handover.incomplete_tasks.length > 0 && (
            <div className="rounded-2xl border border-accent/15 bg-accent-soft/50 p-4">
              {otherSprints.length === 0 ? (
                <p className="text-sm text-ink-soft">Create another sprint to carry this work into it.</p>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className={labelCls}>Carry incomplete tasks into</label>
                    <select value={targetSprintId} onChange={(e) => setTargetSprintId(e.target.value)} className={inputCls}>
                      {otherSprints.map((s) => (
                        <option key={s.sprint_id} value={s.sprint_id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-ink-soft">
                    <input
                      type="checkbox"
                      checked={carryRisks}
                      onChange={(e) => setCarryRisks(e.target.checked)}
                      className="h-4 w-4 accent-accent"
                    />
                    Carry open risks too
                  </label>
                  <button onClick={carryOver} disabled={busy} className="btn-primary w-full">
                    {busy ? <span className="spinner" /> : <ArrowRightCircle size={16} />}
                    {busy ? "Carrying over…" : "Carry over"}
                  </button>
                  {result && <p className="text-sm font-medium text-emerald-700">{result}</p>}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Drawer>
  );
}
