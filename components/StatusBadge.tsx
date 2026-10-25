import type { CheckinFlag, RiskSeverity, TaskStatus } from "@/lib/types";

const PILL = "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold";

const TASK_STATUS_STYLE: Record<TaskStatus, { label: string; cls: string; dot: string }> = {
  not_started: { label: "Not started", cls: "bg-zinc-100 text-zinc-600", dot: "bg-zinc-400" },
  in_progress: { label: "In progress", cls: "bg-sky-50 text-sky-700", dot: "bg-sky-500" },
  blocked: { label: "Blocked", cls: "bg-rose-50 text-rose-700", dot: "bg-rose-500" },
  in_review: { label: "In review", cls: "bg-violet-50 text-violet-700", dot: "bg-violet-500" },
  done: { label: "Done", cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const s = TASK_STATUS_STYLE[status] ?? TASK_STATUS_STYLE.not_started;
  return (
    <span className={`${PILL} ${s.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

const SEVERITY_STYLE: Record<RiskSeverity, string> = {
  low: "bg-zinc-100 text-zinc-600",
  medium: "bg-sky-50 text-sky-700",
  high: "bg-amber-50 text-amber-700",
  critical: "bg-rose-50 text-rose-700",
};

export function SeverityBadge({ severity }: { severity: RiskSeverity }) {
  return <span className={`${PILL} capitalize ${SEVERITY_STYLE[severity] ?? SEVERITY_STYLE.low}`}>{severity}</span>;
}

const FLAG_STYLE: Record<CheckinFlag, { label: string; cls: string; dot: string }> = {
  on_track: { label: "On track", cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  at_risk: { label: "At risk", cls: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  blocked: { label: "Blocked", cls: "bg-rose-50 text-rose-700", dot: "bg-rose-500" },
  no_update: { label: "No update", cls: "bg-zinc-100 text-zinc-600", dot: "bg-zinc-400" },
};

export function FlagBadge({ flag }: { flag: CheckinFlag }) {
  const s = FLAG_STYLE[flag] ?? FLAG_STYLE.no_update;
  return (
    <span className={`${PILL} ${s.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
