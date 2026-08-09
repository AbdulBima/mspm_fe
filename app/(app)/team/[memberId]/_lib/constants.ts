import type { TaskStatus } from "@/lib/types";

export const STATUS_OPTIONS: TaskStatus[] = ["not_started", "in_progress", "blocked", "in_review", "done"];

// Note: this uses raw hex color values rather than the Tailwind bg-/text-
// class strings Board's STATUS_META uses for the same TaskStatus enum —
// two different visual treatments of the same domain concept across the
// app. Preserved as-is; unifying them is a design decision, not a
// mechanical dedup.
export const STATUS_META: Record<TaskStatus, { label: string; color: string; bg: string }> = {
  not_started: { label: "Not started", color: "#475569", bg: "#E2E8F0" },
  in_progress: { label: "In progress", color: "#1D4ED8", bg: "#DBEAFE" },
  blocked: { label: "Blocked", color: "#B91C1C", bg: "#FEE2E2" },
  in_review: { label: "In review", color: "#A16207", bg: "#FEF3C7" },
  done: { label: "Done", color: "#15803D", bg: "#DCFCE7" },
};

export const PAGE_SIZE = 8;
