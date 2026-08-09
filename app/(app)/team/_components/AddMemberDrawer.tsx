"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { inputCls, labelCls } from "@/lib/form-styles-zinc";
import type { Discipline } from "@/lib/types";
import { DISCIPLINE_LABEL } from "../_lib/constants";
import { useAddMember } from "../_hooks/useAddMember";

// Kept as its own bespoke drawer rather than the shared @/components/Drawer
// — this is the only drawer in the app with framer-motion enter/exit
// animation. Even within this page's own zinc/amber family, SprintDrawer
// (no animation) and this one (animated) already diverge, so folding this
// into the shared static Drawer would either lose the animation here or
// require threading motion support through a component every other caller
// doesn't need.

interface AddMemberDrawerProps {
  onClose: () => void;
  onDone: () => void;
}

export function AddMemberDrawer({ onClose, onDone }: AddMemberDrawerProps) {
  const { name, setName, roleTitle, setRoleTitle, discipline, setDiscipline, busy, submit } = useAddMember(onDone);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-40 bg-zinc-900/20 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 px-6 py-5">
          <div>
            <p className="questrial-regular mb-1 text-[9px] uppercase tracking-widest text-amber-700">Sprint workspace</p>
            <h2 className="font-display text-base font-semibold text-zinc-900">Add member</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-50 text-zinc-400 transition-colors hover:bg-zinc-100"
          >
            <X size={15} />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <div>
            <span className={labelCls}>Name *</span>
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)} required className={inputCls} placeholder="Ada Chen" />
          </div>
          <div>
            <span className={labelCls}>Role title *</span>
            <input value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} required placeholder="Backend Engineer" className={inputCls} />
          </div>
          <div>
            <span className={labelCls}>Discipline</span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(DISCIPLINE_LABEL).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDiscipline(value as Discipline)}
                  className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                    discipline === value
                      ? "border-amber-600 bg-amber-50 text-amber-800"
                      : "border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 gap-3 border-t border-zinc-100 px-6 py-5">
          <button onClick={onClose} className="flex-1 rounded-xl border border-zinc-200 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-500 transition-colors hover:bg-zinc-50">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={busy || !name.trim() || !roleTitle.trim()}
            className="flex-1 rounded-xl bg-zinc-900 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-zinc-800 disabled:opacity-40"
          >
            {busy ? "Adding…" : "Add member"}
          </button>
        </div>
      </motion.div>
    </>,
    document.body
  );
}
