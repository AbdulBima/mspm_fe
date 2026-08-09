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
    <div className="overflow-hidden rounded-xl border border-[#e3e0d8] bg-white">
      <div className="flex items-center gap-2 border-b border-[#e3e0d8] bg-[#faf9f6] px-5 py-3">
        <History size={13} className="text-[#766f60]" />
        <p className="text-xs font-medium uppercase tracking-wide text-[#766f60]">Recent sessions</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#e3e0d8] bg-[#faf9f6]">
              <th className="px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[#a39c8c]">Date</th>
              <th className="px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[#a39c8c]">Present</th>
              <th className="px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[#a39c8c]">Late</th>
              <th className="px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[#a39c8c]">Absent</th>
              <th className="px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[#a39c8c]">Excused</th>
              <th className="px-5 py-2.5 text-right text-[11px] font-medium uppercase tracking-wide text-[#a39c8c]" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eeece6]">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-[#766f60]">
                  Loading history…
                </td>
              </tr>
            ) : history.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-[#766f60]">
                  No attendance logged yet.
                </td>
              </tr>
            ) : (
              history.map((day) => {
                const c = countByStatus(day);
                const iso = day.attendance_date.slice(0, 10);
                return (
                  <tr key={day.attendance_id} className="transition-colors hover:bg-[#faf9f6]">
                    <td className="px-5 py-3 text-sm font-medium text-[#1c1917]">
                      {formatDate(day.attendance_date)}
                    </td>
                    <td className="px-5 py-3 text-sm tabular-nums text-[#3F7A5C]">{c.present || "—"}</td>
                    <td className="px-5 py-3 text-sm tabular-nums text-[#AD8A3D]">{c.late || "—"}</td>
                    <td className="px-5 py-3 text-sm tabular-nums text-[#9B4A42]">{c.absent || "—"}</td>
                    <td className="px-5 py-3 text-sm tabular-nums text-[#4A6B8A]">{c.excused || "—"}</td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => onSelectDate(iso)}
                        className="text-xs font-medium text-[#ad8a3d] hover:underline"
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
