import type { CheckinFlag, CommitmentStatus, TaskStatus } from "@/lib/types";

export const STATUS_META: Record<CommitmentStatus, { label: string; color: string; bg: string }> = {
  done: { label: "Done", color: "#15803D", bg: "#DCFCE7" },
  progressing: { label: "Progressing", color: "#1D4ED8", bg: "#DBEAFE" },
  blocked: { label: "Blocked", color: "#B45309", bg: "#FEF3C7" },
  too_soon: { label: "Too soon to tell", color: "#75728A", bg: "#F2F1EE" },
  stale: { label: "No progress since", color: "#B91C1C", bg: "#FEE2E2" },
  task_deleted: { label: "Task removed", color: "#75728A", bg: "#F2F1EE" },
};

export const TASK_STATUS_DOT: Record<TaskStatus, string> = {
  not_started: "#94A3B8",
  in_progress: "#1D4ED8",
  blocked: "#B91C1C",
  in_review: "#B45309",
  done: "#15803D",
};

export const CHECKIN_FLAG_OPTIONS: CheckinFlag[] = ["on_track", "at_risk", "blocked", "no_update"];

export const CHECKIN_FLAG_LABEL: Record<CheckinFlag, string> = {
  on_track: "On track",
  at_risk: "At risk",
  blocked: "Blocked",
  no_update: "No update",
};

export const PAGE_SIZE = 10;
