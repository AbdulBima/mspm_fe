import { ListChecks, X } from "lucide-react";
import type { Task } from "@/lib/types";

interface TaskAttachmentPickerProps {
  attachedTaskIds: string[];
  openTasks: Task[];
  taskById: Record<string, Task>;
  isOpen: boolean;
  onToggleOpen: () => void;
  onToggleTask: (taskId: string) => void;
}

export function TaskAttachmentPicker({
  attachedTaskIds,
  openTasks,
  taskById,
  isOpen,
  onToggleOpen,
  onToggleTask,
}: TaskAttachmentPickerProps) {
  if (openTasks.length === 0) return null;

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={onToggleOpen}
          className="inline-flex items-center gap-1 rounded-md border border-dashed border-line-strong px-2 py-1 text-[11px] font-medium text-ink-mute transition-colors hover:border-accent hover:text-accent"
        >
          <ListChecks size={11} />
          {attachedTaskIds.length > 0
            ? `${attachedTaskIds.length} task${attachedTaskIds.length === 1 ? "" : "s"} attached`
            : "Attach a task"}
        </button>
        {attachedTaskIds.map((tid) => {
          const t = taskById[tid];
          if (!t) return null;
          return (
            <span
              key={tid}
              className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-[11px] font-medium text-accent"
            >
              {t.title}
              <button
                onClick={() => onToggleTask(tid)}
                aria-label={`Remove ${t.title}`}
                className="text-accent/60 hover:text-[#9B4A42]"
              >
                <X size={10} />
              </button>
            </span>
          );
        })}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1.5 max-h-56 w-72 overflow-y-auto rounded-lg border border-line bg-white p-2 shadow-lg">
          {openTasks.map((t) => {
            const checked = attachedTaskIds.includes(t.task_id);
            return (
              <label
                key={t.task_id}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs text-brand hover:bg-subtle"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleTask(t.task_id)}
                  className="accent-accent"
                />
                <span className="truncate">{t.title}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
