import type { AttendanceStatus } from "@/lib/types";

/**
 * One member's in-progress, unsaved edits for the selected day. Mirrors the
 * shape the roster UI needs (camelCase, always-defined strings/arrays)
 * rather than the API's shape (snake_case, optional fields) — converted at
 * the useAttendanceDay hook's load/save boundary.
 */
export type LocalEntry = {
  status: AttendanceStatus | null;
  joinedAt: string;
  todayPlan: string;
  taskIds: string[];
  note: string;
};

export const EMPTY_ENTRY: LocalEntry = {
  status: null,
  joinedAt: "",
  todayPlan: "",
  taskIds: [],
  note: "",
};
