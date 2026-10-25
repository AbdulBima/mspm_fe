import type { SprintStatus } from "@/lib/types";

export const STATUS_LABEL: Record<SprintStatus, string> = { planning: "Planning", active: "Active", completed: "Completed" };

export const STATUS_TONE: Record<SprintStatus, { dot: string; pill: string }> = {
  planning: { dot: "bg-gold", pill: "bg-gold-soft text-[#A65F00]" },
  active: { dot: "bg-emerald-500", pill: "bg-emerald-50 text-emerald-700" },
  completed: { dot: "bg-ink-faint", pill: "bg-zinc-100 text-zinc-600" },
};
