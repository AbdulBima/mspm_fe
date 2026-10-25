import type { TaskStatus } from "@/lib/types";

export const STATUS_OPTIONS: TaskStatus[] = ["not_started", "in_progress", "blocked", "in_review", "done"];

export const STATUS_META: Record<TaskStatus, { label: string; color: string; bg: string }> = {
  not_started: { label: "Not started", color: "#5A566F", bg: "#F0EEF6" },
  in_progress: { label: "In progress", color: "#0369A1", bg: "#E0F2FE" },
  blocked: { label: "Blocked", color: "#BE123C", bg: "#FFF1F2" },
  in_review: { label: "In review", color: "#5C00AD", bg: "#F7F0FE" },
  done: { label: "Done", color: "#047857", bg: "#ECFDF5" },
};

export const PAGE_SIZE = 8;
