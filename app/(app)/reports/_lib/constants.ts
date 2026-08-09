import type { ReportType } from "@/lib/types";

export const TYPE_LABEL: Record<ReportType, string> = { daily: "Daily", weekly: "Weekly", sprint: "Sprint" };

export const TONE_CLASS = {
  danger: "text-[#B42318]",
  signal: "text-[#92590A]",
  track: "text-[#16794D]",
} as const;
