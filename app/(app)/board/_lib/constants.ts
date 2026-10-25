import type { TaskStatus } from "@/lib/types";

export const STATUS_OPTIONS: TaskStatus[] = ["not_started", "in_progress", "blocked", "in_review", "done"];

export const STATUS_META: Record<TaskStatus, { label: string; bg: string; text: string }> = {
  not_started: { label: "Not started", bg: "bg-zinc-100", text: "text-zinc-600" },
  in_progress: { label: "In progress", bg: "bg-sky-50", text: "text-sky-700" },
  blocked: { label: "Blocked", bg: "bg-rose-50", text: "text-rose-700" },
  in_review: { label: "In review", bg: "bg-violet-50", text: "text-violet-700" },
  done: { label: "Done", bg: "bg-emerald-50", text: "text-emerald-700" },
};
