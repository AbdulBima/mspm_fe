import type { AlignmentGoal } from "@/lib/types";

export function GoalBreakdown({ goals }: { goals: AlignmentGoal[] }) {
  const sorted = [...goals].sort((a, b) => a.completion_pct - b.completion_pct);

  return (
    <div className="rounded-xl border border-[#E7E5E2] bg-white p-6">
      <div className="mb-4">
        <p className="text-xs font-medium text-[#1D2B64] mb-1">Objectives</p>
        <h3 className="text-sm font-semibold tracking-tight text-[#0B0C0F]">Goal breakdown</h3>
      </div>
      {sorted.length === 0 ? (
        <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-[#E7E5E2]">
          <p className="text-xs text-[#B4B2AC]">No goals set for this sprint yet.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {sorted.map((g) => (
            <li key={g.goal_id}>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="truncate text-xs font-medium text-[#54525C]">{g.title}</span>
                <span className="shrink-0 text-[11px] tabular-nums text-[#84828C]">{g.completion_pct}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EEEDEB]">
                <div className="h-full rounded-full bg-[#1D2B64] transition-all duration-500" style={{ width: `${g.completion_pct}%` }} />
              </div>
              {g.blocked_count > 0 && <p className="mt-1 text-[10px] font-medium text-[#B42318]">{g.blocked_count} blocked</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
