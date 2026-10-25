import type { AlignmentGoal } from "@/lib/types";

export function GoalBreakdown({ goals }: { goals: AlignmentGoal[] }) {
  const sorted = [...goals].sort((a, b) => a.completion_pct - b.completion_pct);

  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-4">
        <p className="eyebrow mb-1">Objectives</p>
        <h3 className="text-base font-bold tracking-tight text-ink">Goal breakdown</h3>
      </div>
      {sorted.length === 0 ? (
        <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-line">
          <p className="text-xs text-ink-faint">No goals set for this sprint yet.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {sorted.map((g) => (
            <li key={g.goal_id}>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="truncate text-xs font-medium text-ink-soft">{g.title}</span>
                <span className="shrink-0 text-[11px] tabular-nums text-ink-mute">{g.completion_pct}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
                <div className="h-full rounded-full bg-linear-to-r from-accent to-brand transition-all duration-500" style={{ width: `${g.completion_pct}%` }} />
              </div>
              {g.blocked_count > 0 && <p className="mt-1 text-[10px] font-medium text-[#B42318]">{g.blocked_count} blocked</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
