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
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={busy || !title.trim()}
            className="btn-primary flex-1"
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
