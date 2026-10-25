"use client";

import { inputClsRounded, labelCls } from "@/lib/form-styles";
import type { Member, Task } from "@/lib/types";
import { hexToRgba } from "@/lib/color";
import { NOTE_TYPE_META, NOTE_TYPE_OPTIONS } from "../_lib/constants";
import { useAddNote } from "../_hooks/useAddNote";
import { CustomSelect } from "@/components/CustomSelect";

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
                className="rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-150"
                style={
                  active
                    ? { color: meta.color, backgroundColor: meta.bg, borderColor: hexToRgba(meta.color, 0.3) }
                    : { color: "#75728A", backgroundColor: "#FFFFFF", borderColor: "#ECEAF3" }
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
        <button type="button" onClick={onDone} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" disabled={busy || !content.trim()} className="btn-primary">
          {busy && <span className="spinner" />}
          {busy ? "Adding…" : "Add note"}
        </button>
      </div>
    </form>
  );
}
