import type { SprintStatus } from "@/lib/types";

export const STATUS_LABEL: Record<SprintStatus, string> = { planning: "Planning", active: "Active", completed: "Completed" };

export const STATUS_TONE: Record<SprintStatus, { dot: string; text: string }> = {
  planning: { dot: "bg-zinc-400", text: "text-zinc-500" },
  active: { dot: "bg-amber-500", text: "text-amber-700" },
  completed: { dot: "bg-emerald-500", text: "text-emerald-700" },
};
