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
    <div className="overflow-hidden rounded-xl border border-[#E7E5E2] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E7E5E2]">
              <th className="px-5 py-3 text-xs font-medium text-[#84828C]">Task</th>
              <th className="px-5 py-3 text-xs font-medium text-[#84828C]">Goal</th>
              <th className="px-5 py-3 text-xs font-medium text-[#84828C] text-center w-16">Priority</th>
              <th className="px-5 py-3 text-xs font-medium text-[#84828C] w-44">Status</th>
              <th className="px-5 py-3 w-16" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEEDEB]">
            {tasks.map((t) => (
              <TaskRow key={t.task_id} task={t} goal={t.goal_id ? goalById.get(t.goal_id) : undefined} onChanged={onChanged} onEdit={onEdit} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
