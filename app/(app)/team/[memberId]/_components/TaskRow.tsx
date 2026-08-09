import { Pencil, Target, Trash2 } from "lucide-react";
import { useTaskActions } from "@/hooks/useTaskActions";
import type { Goal, Task } from "@/lib/types";
import { StatusPillSelect } from "./StatusPillSelect";

interface TaskRowProps {
  task: Task;
  goal?: Goal;
  onChanged: () => void;
  onEdit: (task: Task) => void;
}

export function TaskRow({ task, goal, onChanged, onEdit }: TaskRowProps) {
  const { busy, changeStatus, remove } = useTaskActions(task, onChanged);

  return (
    <tr className="group hover:bg-[#FAFAF9] transition-colors">
      <td className="px-5 py-3.5">
        <p className="text-sm font-medium text-[#0B0C0F]">{task.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {task.is_stale && <span className="text-[11px] font-medium text-[#92590A]">Gone quiet</span>}
          {task.is_overdue && <span className="text-[11px] font-medium text-[#B42318]">Overdue</span>}
        </div>
      </td>
      <td className="px-5 py-3.5">
        {goal ? (
          <span className="inline-flex items-center gap-1 text-[13px] text-[#54525C]">
            <Target size={11} className="text-[#B4B2AC]" /> {goal.title}
          </span>
        ) : (
          <span className="text-[13px] text-[#B4B2AC]">Unlinked</span>
        )}
      </td>
      <td className="px-5 py-3.5 text-center">
        <span className="text-sm tabular-nums text-[#54525C]">P{task.priority}</span>
      </td>
      <td className="px-5 py-3.5">
        <StatusPillSelect status={task.status} busy={busy} onChange={changeStatus} />
      </td>
      <td className="px-5 py-3.5 text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(task)}
            aria-label="Edit task"
            className="rounded-md p-1 text-[#B4B2AC] transition-colors hover:bg-[#EEF0F7] hover:text-[#1D2B64]"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={remove}
            aria-label="Delete task"
            className="rounded-md p-1 text-[#B4B2AC] transition-colors hover:bg-[#FBEAE8] hover:text-[#B42318]"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
}
