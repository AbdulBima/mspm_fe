import type { SprintHealth } from "@/lib/types";
import { MetricCard } from "./MetricCard";

interface MetricsRowProps {
  health: SprintHealth;
  alignmentScore: number;
}

export function MetricsRow({ health, alignmentScore }: MetricsRowProps) {
  const doneCount = health.status_counts["done"] ?? 0;
  const inReviewCount = health.status_counts["in_review"] ?? 0;
  const inProgressCount = health.status_counts["in_progress"] ?? 0;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <MetricCard label="Total tasks" value={health.total_tasks} caption="Every task logged against this sprint." />
      <MetricCard label="Done" value={doneCount} caption="Tasks marked complete." tone="good" />
      <MetricCard label="In review" value={inReviewCount} caption="Finished, waiting on sign-off." />
      <MetricCard label="In progress" value={inProgressCount} caption="Actively being worked right now." />
      <MetricCard
        label="Open risks"
        value={health.open_risks}
        caption="Flagged risks without a resolution yet."
        tone={health.open_risks > 0 ? "warn" : "neutral"}
      />
      <MetricCard
        label="Completion"
        value={`${health.completion_pct}%`}
        caption="Share of this sprint's tasks done or in review — review counts as done since the work itself is finished."
        tone={health.completion_pct >= 80 ? "good" : health.completion_pct >= 50 ? "neutral" : "warn"}
      />
      <MetricCard
        label="Goal alignment"
        value={`${alignmentScore}%`}
        caption="Completed work tied to a stated sprint goal."
        tone={alignmentScore < 80 ? "warn" : "good"}
      />
      <MetricCard
        label="Blocked"
        value={health.blocked_tasks.length}
        caption="Tasks stuck waiting on someone else."
        tone={health.blocked_tasks.length > 0 ? "bad" : "neutral"}
      />
    </div>
  );
}
