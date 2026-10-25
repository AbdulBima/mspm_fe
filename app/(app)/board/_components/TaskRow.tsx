import { Target, Trash2 } from "lucide-react";
import { initials } from "@/lib/initials";
import type { Goal, Member, Task, TaskStatus } from "@/lib/types";
import { STATUS_META, STATUS_OPTIONS } from "../_lib/constants";
import { useTaskActions } from "@/hooks/useTaskActions";

interface TaskRowProps {
  task: Task;
  member?: Member;
  goal?: Goal;
  striped: boolean;
  onChanged: () => void;
}

export function TaskRow({ task, member, goal, striped, onChanged }: TaskRowProps) {
  const { busy, changeStatus, remove } = useTaskActions(task, onChanged);
  const meta = STATUS_META[task.status];

  return (
    <tr className={`group transition-colors hover:bg-accent-soft/30 ${striped ? "bg-subtle/60" : "bg-white"}`}>
      <td className="px-5 py-3.5">
        <p className="text-sm font-medium text-ink">{task.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {task.is_stale && <span className="text-[11px] font-medium text-[#92590A]">Gone quiet</span>}
          {task.is_overdue && <span className="text-[11px] font-medium text-[#B42318]">Overdue</span>}
        </div>
      </td>
      <td className="px-5 py-3.5">
        {member ? (
          <div className="flex items-center gap-2">
            <div
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-brand"
              style={{ backgroundColor: member.color_tag }}
            >
              {initials(member.name)}
            </div>
            <span className="text-[13px] text-ink-soft">{member.name}</span>
          </div>
        ) : (
          <span className="text-[13px] text-ink-faint">Unassigned</span>
        )}
      </td>
      <td className="px-5 py-3.5">
        {goal ? (
          <span className="inline-flex items-center gap-1 text-[13px] text-ink-soft">
            <Target size={11} className="text-ink-faint" /> {goal.title}
          </span>
        ) : (
          <span className="text-[13px] text-ink-faint">Unlinked</span>
        )}
      </td>
      <td className="px-5 py-3.5 text-center">
        <span className="text-sm tabular-nums text-ink-soft">P{task.priority}</span>
      </td>
      <td className="px-5 py-3.5">
        <select
          value={task.status}
          disabled={busy}
          onChange={(e) => changeStatus(e.target.value as TaskStatus)}
          className={`rounded-full border border-transparent py-1 pl-2.5 pr-2 text-[12px] font-semibold outline-none transition-colors hover:brightness-95 focus:ring-2 focus:ring-accent/20 disabled:opacity-40 ${meta.bg} ${meta.text}`}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {STATUS_META[s].label}
            </option>
          ))}
        </select>
      </td>
      <td className="px-5 py-3.5 text-right">
        <button
          onClick={remove}
          aria-label="Delete task"
          className="rounded-lg p-1.5 text-ink-faint transition-colors lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100 hover:bg-[#FBEAE8] hover:text-[#B42318]"
        >
          <Trash2 size={13} />
        </button>
      </td>
    </tr>
  );
}
