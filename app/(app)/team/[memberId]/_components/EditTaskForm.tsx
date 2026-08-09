import { inputCls, labelCls } from "@/lib/form-styles";
import type { Goal, Task, TaskStatus } from "@/lib/types";
import { STATUS_META, STATUS_OPTIONS } from "../_lib/constants";
import { useEditTask } from "../_hooks/useEditTask";

interface EditTaskFormProps {
  task: Task;
  goals: Goal[];
  onDone: () => void;
}

export function EditTaskForm({ task, goals, onDone }: EditTaskFormProps) {
  const {
    title,
    setTitle,
    description,
    setDescription,
    expectation,
    setExpectation,
    goalId,
    setGoalId,
    priority,
    setPriority,
    status,
    setStatus,
    dueDate,
    setDueDate,
    busy,
    submit,
  } = useEditTask(task, onDone);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="space-y-5"
    >
      <div>
        <span className={labelCls}>Title</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className={inputCls} />
      </div>

      <div>
        <span className={labelCls}>What it involves</span>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className={inputCls} />
      </div>

      <div>
        <span className={labelCls}>What &quot;done&quot; looks like (expectation)</span>
        <textarea value={expectation} onChange={(e) => setExpectation(e.target.value)} rows={2} className={inputCls} />
      </div>

      <div>
        <span className={labelCls}>Status</span>
        <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)} className={inputCls}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {STATUS_META[s].label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="min-w-40 flex-1">
          <span className={labelCls}>Sprint goal</span>
          <select value={goalId} onChange={(e) => setGoalId(e.target.value)} className={inputCls}>
            <option value="">— No goal linked —</option>
            {goals.map((g) => (
              <option key={g.goal_id} value={g.goal_id}>
                {g.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className={labelCls}>Priority</span>
          <select value={priority} onChange={(e) => setPriority(Number(e.target.value))} className={`${inputCls} w-24`}>
            {[1, 2, 3, 4, 5].map((p) => (
              <option key={p} value={p}>
                P{p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className={labelCls}>Due date</span>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={inputCls} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={onDone}
          className="rounded-lg border border-[#E7E5E2] px-4 py-2.5 text-sm font-medium text-[#54525C] transition-colors hover:bg-[#FAFAF9]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-[#0B0C0F] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D2B64] disabled:opacity-40"
        >
          {busy ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
