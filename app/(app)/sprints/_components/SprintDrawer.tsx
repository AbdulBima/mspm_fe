"use client";

import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { Sprint } from "@/lib/types";
import { inputCls, labelCls } from "@/lib/form-styles-zinc";
import { useSprintForm } from "../_hooks/useSprintForm";

// This page's own drawer shell — kept local rather than the shared
// @/components/Drawer since this page's zinc/amber visual language is
// genuinely different (see _lib/form-styles.ts). Handles both create and
// edit in one component so the two never structurally diverge; only the
// fields shown change based on mode.

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

  return createPortal(
    <>
      <div className="fixed inset-0 z-40 bg-zinc-900/20 backdrop-blur-[2px]" onClick={onClose} />

      <div className="fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-xl flex-col overflow-hidden bg-white shadow-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 px-6 py-5">
          <div>
            <p className="mb-1 questrial-regular text-[9px] uppercase tracking-widest text-amber-700">Sprint workspace</p>
            <h2 className="font-display text-base font-semibold text-zinc-900">
              {isEdit ? `Editing ${existing?.name}` : "New Sprint"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-50 text-zinc-400 transition-colors hover:bg-zinc-100"
          >
            <X size={15} />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          {!isEdit && (
            <>
              <div>
                <span className={labelCls}>Name *</span>
                <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Sprint 36" className={inputCls} />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <span className={labelCls}>Start date</span>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <span className={labelCls}>Working days</span>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={workingDays}
                    onChange={(e) => setWorkingDays(Number(e.target.value))}
                    className={`${inputCls} w-24`}
                  />
                </div>
              </div>
              <div>
                <span className={labelCls}>Theme</span>
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
            <span className={labelCls}>Success measures (one per line)</span>
            <textarea value={successMeasures} onChange={(e) => setSuccessMeasures(e.target.value)} rows={3} className={inputCls} />
          </div>
          <div>
            <span className={labelCls}>Critical path (ordered, one per line — the &quot;do not block&quot; chain)</span>
            <textarea value={criticalPath} onChange={(e) => setCriticalPath(e.target.value)} rows={3} className={inputCls} />
          </div>
          <div>
            <span className={labelCls}>Out of scope (one per line)</span>
            <textarea value={outOfScope} onChange={(e) => setOutOfScope(e.target.value)} rows={2} className={inputCls} />
          </div>
        </div>

        <div className="flex shrink-0 gap-3 border-t border-zinc-100 px-6 py-5">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-zinc-200 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-500 transition-colors hover:bg-zinc-50"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={busy || (!isEdit && !name.trim())}
            className="flex-1 rounded-xl bg-zinc-900 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-zinc-800 disabled:opacity-40"
          >
            {busy ? (isEdit ? "Saving…" : "Creating…") : isEdit ? "Save changes" : "Create sprint"}
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
