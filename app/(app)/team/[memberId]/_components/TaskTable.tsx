import type { Goal, Task } from "@/lib/types";
import { TaskRow } from "./TaskRow";

interface TaskTableProps {
  tasks: Task[];
  goalById: Map<string, Goal>;
  onChanged: () => void;
  onEdit: (task: Task) => void;
}

export function TaskTable({ tasks, goalById, onChanged, onEdit }: TaskTableProps) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute">Task</th>
              <th className="px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute">Goal</th>
              <th className="px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute text-center w-16">Priority</th>
              <th className="px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute w-44">Status</th>
              <th className="px-5 py-3 w-16" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {tasks.map((t) => (
              <TaskRow key={t.task_id} task={t} goal={t.goal_id ? goalById.get(t.goal_id) : undefined} onChanged={onChanged} onEdit={onEdit} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
