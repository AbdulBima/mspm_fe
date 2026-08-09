import type { TaskStatus } from "@/lib/types";

export const STATUS_OPTIONS: TaskStatus[] = ["not_started", "in_progress", "blocked", "in_review", "done"];

export const STATUS_META: Record<TaskStatus, { label: string; bg: string; text: string }> = {
  not_started: { label: "Not started", bg: "bg-[#EDECE9]", text: "text-[#6B6971]" },
  in_progress: { label: "In progress", bg: "bg-[#E3E9FB]", text: "text-[#2848C9]" },
  blocked: { label: "Blocked", bg: "bg-[#FBE3E1]", text: "text-[#C1291B]" },
  in_review: { label: "In review", bg: "bg-[#FBEFD6]", text: "text-[#A6690A]" },
  done: { label: "Done", bg: "bg-[#DFF3E9]", text: "text-[#15803D]" },
};
