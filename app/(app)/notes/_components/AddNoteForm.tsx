"use client";

import { inputClsRounded, labelCls } from "@/lib/form-styles";
import type { Member, Task } from "@/lib/types";
import { hexToRgba } from "@/lib/color";
import { NOTE_TYPE_META, NOTE_TYPE_OPTIONS } from "../_lib/constants";
import { useAddNote } from "../_hooks/useAddNote";
import { CustomSelect } from "./CustomSelect";

interface AddNoteFormProps {
  tasks: Task[];
  members: Member[];
  onDone: () => void;
}

export function AddNoteForm({ tasks, members, onDone }: AddNoteFormProps) {
  const memberById = new Map(members.map((m) => [m.member_id, m]));
  const { taskId, setTaskId, noteType, setNoteType, content, setContent, busy, submit } = useAddNote(
    tasks[0]?.task_id ?? "",
    onDone
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="space-y-5"
    >
      <div>
        <span className={labelCls}>Task</span>
        <CustomSelect
          value={taskId}
          onChange={setTaskId}
          placeholder="Select a task"
          variant="field"
          options={tasks.map((t) => {
            const member = memberById.get(t.member_id);
            return {
              value: t.task_id,
              label: t.title,
              subLabel: member?.name ?? "Unassigned",
              color: member?.color_tag,
            };
          })}
        />
      </div>

      <div>
        <span className={labelCls}>Type</span>
        <div className="flex flex-wrap gap-2">
          {NOTE_TYPE_OPTIONS.map((t) => {
            const meta = NOTE_TYPE_META[t];
            const active = noteType === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setNoteType(t)}
                className="rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-150"
                style={
                  active
                    ? { color: meta.color, backgroundColor: meta.bg, borderColor: hexToRgba(meta.color, 0.3) }
                    : { color: "#84828C", backgroundColor: "#FFFFFF", borderColor: "#E7E5E2" }
                }
              >
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <span className={labelCls}>Note</span>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          required
          placeholder="What happened, what's blocking, what was decided…"
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
          disabled={busy}
          className="rounded-xl bg-linear-to-b from-[#16171B] to-[#0B0C0F] px-5 py-2.5 text-sm font-medium text-white shadow-[0_1px_2px_rgba(11,12,15,0.08),0_8px_16px_-6px_rgba(11,12,15,0.4)] transition-all duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none"
        >
          {busy ? "Adding…" : "Add note"}
        </button>
      </div>
    </form>
  );
}
