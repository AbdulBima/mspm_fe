/**
 * Small date/time helpers scoped to this feature. None of these are
 * attendance-specific in what they compute — if another page ends up
 * needing "today as YYYY-MM-DD" or "shift an ISO date by N days," it's
 * worth hoisting these to a shared `@/lib/date.ts` at that point rather
 * than duplicating them. Left local for now since this is the only
 * consumer.
 */

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function nowHHMM(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function shiftIsoDate(iso: string, deltaDays: number): string {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + deltaDays);
  return d.toISOString().slice(0, 10);
}
