import { Check, Clock, Minus, X } from "lucide-react";
import type { AttendanceStatus } from "@/lib/types";

/**
 * Display metadata per attendance status. Literal hex rather than theme
 * tokens on purpose — matches StatusBadge.tsx's convention elsewhere in the
 * app, so status colors stay visually consistent across pages without
 * coupling this feature to a shared token file.
 */
export const STATUS_META: Record<
  AttendanceStatus,
  { label: string; icon: typeof Check; color: string; bg: string }
> = {
  present: { label: "Present", icon: Check, color: "#3F7A5C", bg: "rgba(63,122,92,0.10)" },
  late: { label: "Late", icon: Clock, color: "#6F01D0", bg: "rgba(111,1,208,0.14)" },
  absent: { label: "Absent", icon: X, color: "#9B4A42", bg: "rgba(155,74,66,0.10)" },
  excused: { label: "Excused", icon: Minus, color: "#4A6B8A", bg: "rgba(74,107,138,0.10)" },
};

export const STATUS_ORDER: AttendanceStatus[] = ["present", "late", "absent", "excused"];

/** How many recent sessions the history table shows. */
export const RECENT_SESSIONS_LIMIT = 10;
