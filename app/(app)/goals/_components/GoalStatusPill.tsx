import { AlertCircle, CheckCircle2, Circle } from "lucide-react";
import { resolveGoalStatus, type GoalStatusKind } from "../_lib/goal-status";

const ICON_BY_KIND: Record<GoalStatusKind, typeof AlertCircle> = {
  blocked: AlertCircle,
  no_activity: Circle,
  on_track: CheckCircle2,
};

export function GoalStatusPill({ taskCount, blockedCount }: { taskCount: number; blockedCount: number }) {
  const status = resolveGoalStatus({ task_count: taskCount, blocked_count: blockedCount });
  const Icon = ICON_BY_KIND[status.kind];

  return (
    <div className="flex items-center gap-1.5">
      <Icon size={13} className={`shrink-0 ${status.textClass}`} />
      <span className={`text-[13px] font-medium ${status.textClass}`}>{status.label}</span>
    </div>
  );
}
