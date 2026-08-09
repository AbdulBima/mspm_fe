"use client";

import { Drawer } from "@/components/Drawer";
import { inputCls, labelCls } from "@/lib/form-styles";
import { useCreateGoal } from "../_hooks/useCreateGoal";

interface NewGoalDrawerProps {
  sprintId: string;
  onClose: () => void;
  onDone: () => void;
}

export function NewGoalDrawer({ sprintId, onClose, onDone }: NewGoalDrawerProps) {
  const { title, setTitle, description, setDescription, busy, submit } = useCreateGoal(sprintId, onDone);

  return (
    <Drawer
      title="Add goal"
      onClose={onClose}
      footer={
        <>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-[#E7E5E2] py-2.5 text-sm font-medium text-[#54525C] transition-colors hover:bg-[#FAFAF9]"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={busy || !title.trim()}
            className="flex-1 rounded-lg bg-[#0B0C0F] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D2B64] disabled:opacity-40"
          >
            {busy ? "Adding…" : "Add goal"}
          </button>
        </>
      }
    >
      <div>
        <span className={labelCls}>Goal title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g. Enterprise Resource Library works end-to-end"
          className={inputCls}
        />
      </div>
      <div>
        <span className={labelCls}>Description (optional)</span>
        <input value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} />
      </div>
    </Drawer>
  );
}
