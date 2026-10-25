import type { ReportType } from "@/lib/types";

export const TYPE_LABEL: Record<ReportType, string> = { daily: "Daily", weekly: "Weekly", sprint: "Sprint" };

export const TONE_CLASS = {
  danger: "text-rose-700",
  signal: "text-amber-700",
  track: "text-emerald-700",
} as const;
