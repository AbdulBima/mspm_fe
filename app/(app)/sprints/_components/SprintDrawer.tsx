"use client";

import type { Sprint } from "@/lib/types";
import { Drawer } from "@/components/Drawer";
import { inputCls, labelCls } from "@/lib/form-styles";
import { useSprintForm } from "../_hooks/useSprintForm";

type SprintDrawerProps =
  | { mode: "create"; sprint?: undefined; onClose: () => void; onDone: () => void }
  | { mode: "edit"; sprint: Sprint; onClose: () => void; onDone: () => void };

export function SprintDrawer(props: SprintDrawerProps) {
  const { mode, onClose, onDone } = props;
  const form = useSprintForm(mode === "edit" ? { mode: "edit", sprint: props.sprint } : { mode: "create" }, onDone);
  const {
    isEdit,
    existing,
    name,
    setName,
    theme,
    setTheme,
    startDate,
    setStartDate,
    workingDays,
    setWorkingDays,
    successMeasures,
    setSuccessMeasures,
    criticalPath,
    setCriticalPath,
    outOfScope,
    setOutOfScope,
    busy,
    submit,
  } = form;

  return (
    <Drawer
      eyebrow="Sprints"
      title={isEdit ? `Edit ${existing?.name}` : "New sprint"}
      onClose={onClose}
      maxWidthCls="max-w-xl"
      footer={
        <>
          <button onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>
          <button onClick={submit} disabled={busy || (!isEdit && !name.trim())} className="btn-primary flex-1">
            {busy && <span className="spinner" />}
            {busy ? (isEdit ? "Saving…" : "Creating…") : isEdit ? "Save changes" : "Create sprint"}
          </button>
        </>
      }
    >
      {!isEdit && (
        <>
          <div>
            <label className={labelCls}>Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Sprint 36" className={inputCls} autoFocus />
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <div>
              <label className={labelCls}>Start date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Working days</label>
              <input
                type="number"
                min={1}
                max={30}
                value={workingDays}
                onChange={(e) => setWorkingDays(Math.max(1, Math.min(30, Number(e.target.value) || 1)))}
                className={`${inputCls} w-24`}
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>Theme</label>
            <input
              value={theme ?? ""}
              onChange={(e) => setTheme(e.target.value)}
              className={inputCls}
              placeholder="e.g. Enterprise Operations & Unified Program Foundations"
            />
          </div>
        </>
      )}
      <div>
        <label className={labelCls}>Success measures (one per line)</label>
        <textarea value={successMeasures} onChange={(e) => setSuccessMeasures(e.target.value)} rows={3} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Critical path (ordered, one per line: the &quot;do not block&quot; chain)</label>
        <textarea value={criticalPath} onChange={(e) => setCriticalPath(e.target.value)} rows={3} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Out of scope (one per line)</label>
        <textarea value={outOfScope} onChange={(e) => setOutOfScope(e.target.value)} rows={2} className={inputCls} />
      </div>
    </Drawer>
  );
}
