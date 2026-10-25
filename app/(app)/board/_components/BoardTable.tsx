import type { Goal, Member, Task } from "@/lib/types";
import { TaskRow } from "./TaskRow";

interface BoardTableProps {
  tasks: Task[];
  memberById: Map<string, Member>;
  goalById: Map<string, Goal>;
  onTaskChanged: () => void;
}

export function BoardTable({ tasks, memberById, goalById, onTaskChanged }: BoardTableProps) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-subtle">
              <th className="px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute">Task</th>
              <th className="px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute w-40">Assignee</th>
              <th className="px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute ">Goal</th>
              <th className="px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute text-center w-16">Priority</th>
              <th className="px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute w-40">Status</th>
              <th className="px-5 py-3 w-10" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {tasks.map((t, i) => (
              <TaskRow
                key={t.task_id}
                task={t}
                member={memberById.get(t.member_id)}
                goal={t.goal_id ? goalById.get(t.goal_id) : undefined}
                striped={i % 2 === 1}
                onChanged={onTaskChanged}
              />
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-sm text-ink-mute">
                  No tasks match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
