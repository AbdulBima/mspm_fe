import { History } from "lucide-react";
import { formatDate } from "@/lib/sprint-utils";
import type { AttendanceDay, AttendanceStatus } from "@/lib/types";

interface AttendanceHistoryTableProps {
  history: AttendanceDay[];
  loading: boolean;
  onSelectDate: (iso: string) => void;
}

function countByStatus(day: AttendanceDay): Record<AttendanceStatus, number> {
  const c = { present: 0, late: 0, absent: 0, excused: 0 };
  for (const e of day.entries) c[e.status]++;
  return c;
}

export function AttendanceHistoryTable({ history, loading, onSelectDate }: AttendanceHistoryTableProps) {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line bg-subtle px-5 py-3">
        <History size={13} className="text-ink-mute" />
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-mute">Recent sessions</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-subtle">
              <th className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-mute">Date</th>
              <th className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-mute">Present</th>
              <th className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-mute">Late</th>
              <th className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-mute">Absent</th>
              <th className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-mute">Excused</th>
              <th className="px-5 py-2.5 text-right text-[11px] font-semibold uppercase tracking-wide text-ink-mute" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-ink-mute">
                  Loading history…
                </td>
              </tr>
            ) : history.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-ink-mute">
                  No attendance logged yet.
                </td>
              </tr>
            ) : (
              history.map((day) => {
                const c = countByStatus(day);
                const iso = day.attendance_date.slice(0, 10);
                return (
                  <tr key={day.attendance_id} className="transition-colors hover:bg-subtle">
                    <td className="px-5 py-3 text-sm font-semibold text-ink">
                      {formatDate(day.attendance_date)}
                    </td>
                    <td className="px-5 py-3 text-sm tabular-nums text-[#3F7A5C]">{c.present || "—"}</td>
                    <td className="px-5 py-3 text-sm tabular-nums text-accent">{c.late || "—"}</td>
                    <td className="px-5 py-3 text-sm tabular-nums text-[#9B4A42]">{c.absent || "—"}</td>
                    <td className="px-5 py-3 text-sm tabular-nums text-[#4A6B8A]">{c.excused || "—"}</td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => onSelectDate(iso)}
                        className="text-xs font-medium text-accent hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
