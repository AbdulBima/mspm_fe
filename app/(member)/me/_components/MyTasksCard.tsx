import type { MyTask } from "@/lib/types";
import { TaskStatusBadge } from "@/components/StatusBadge";

export function MyTasksCard({ tasks }: { tasks: MyTask[] }) {
  const open = tasks.filter((t) => t.status !== "done");
  const done = tasks.length - open.length;

  return (
    <section className="card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">This sprint</p>
          <h2 className="mt-1 text-base font-bold text-ink">Your tasks</h2>
        </div>
        <span className="text-xs font-semibold text-ink-mute">
          {done}/{tasks.length} done
        </span>
      </div>
      {tasks.length > 0 && (
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(done / tasks.length) * 100}%` }} />
        </div>
      )}
      {open.length === 0 ? (
        <p className="mt-4 text-sm text-ink-mute">
          {tasks.length === 0 ? "Nothing assigned to you yet." : "All your tasks are done. Nice work."}
        </p>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {open.slice(0, 8).map((t) => (
            <li key={t.task_id} className="rounded-xl border border-line p-3">
              <p className="text-sm font-medium text-ink">{t.title}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <TaskStatusBadge status={t.status} />
                <span className="text-[11px] font-semibold text-ink-faint">P{t.priority}</span>
                {t.is_overdue && <span className="text-[11px] font-semibold text-rose-600">Overdue</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
