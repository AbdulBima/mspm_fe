import type { CheckinFlag, RiskSeverity, TaskStatus } from "@/lib/types";

// Colors below are the literal hex equivalents of this file's own original
// rgba() backgrounds (e.g. rgba(63,122,92) -> #3F7A5C), used directly as text
// color instead of var(--color-x). The var() refs were replaced because we
// can't see how those custom properties resolve outside a dark surface —
// deriving from this file's own already-tuned rgba values keeps the badge
// internally consistent without guessing at unseen tokens.

const TASK_STATUS_STYLE: Record<TaskStatus, { label: string; color: string; bg: string }> = {
  not_started: { label: "Not started", color: "#766F60", bg: "rgba(118,111,96,0.10)" },
  in_progress: { label: "In progress", color: "#4A6B8A", bg: "rgba(74,107,138,0.10)" },
  blocked: { label: "Blocked", color: "#9B4A42", bg: "rgba(155,74,66,0.10)" },
  in_review: { label: "In review", color: "#7A5C8A", bg: "rgba(122,92,138,0.10)" },
  done: { label: "Done", color: "#3F7A5C", bg: "rgba(63,122,92,0.10)" },
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const s = TASK_STATUS_STYLE[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] questrial-regular font-medium uppercase tracking-wide"
      style={{ color: s.color, backgroundColor: s.bg }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
      {s.label}
    </span>
  );
}

const SEVERITY_STYLE: Record<RiskSeverity, { color: string; bg: string }> = {
  low: { color: "#766F60", bg: "rgba(86,83,74,0.08)" },
  medium: { color: "#4A6B8A", bg: "rgba(74,107,138,0.10)" },
  high: { color: "#AD8A3D", bg: "rgba(173,138,61,0.14)" },
  critical: { color: "#9B4A42", bg: "rgba(155,74,66,0.14)" },
};

export function SeverityBadge({ severity }: { severity: RiskSeverity }) {
  const s = SEVERITY_STYLE[severity];
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] questrial-regular font-medium uppercase tracking-wide"
      style={{ color: s.color, backgroundColor: s.bg }}
    >
      {severity}
    </span>
  );
}

const FLAG_STYLE: Record<CheckinFlag, { label: string; color: string; bg: string }> = {
  on_track: { label: "On track", color: "#3F7A5C", bg: "rgba(63,122,92,0.10)" },
  at_risk: { label: "At risk", color: "#AD8A3D", bg: "rgba(173,138,61,0.14)" },
  blocked: { label: "Blocked", color: "#9B4A42", bg: "rgba(155,74,66,0.10)" },
  no_update: { label: "No update", color: "#766F60", bg: "rgba(118,111,96,0.10)" },
};

export function FlagBadge({ flag }: { flag: CheckinFlag }) {
  const s = FLAG_STYLE[flag];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] questrial-regular font-medium uppercase tracking-wide"
      style={{ color: s.color, backgroundColor: s.bg }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
      {s.label}
    </span>
  );
}