import { BarChart3 } from "lucide-react";
import type { AttendanceStats } from "@/lib/types";

export function AttendanceRateTable({ stats }: { stats: AttendanceStats }) {
  const rows = [...stats.per_member].sort((a, b) => (a.attendance_rate ?? 101) - (b.attendance_rate ?? 101));

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line bg-subtle px-5 py-3">
        <BarChart3 size={13} className="text-ink-mute" />
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-mute">
          Attendance by member — {stats.sessions_logged} session{stats.sessions_logged === 1 ? "" : "s"} logged
        </p>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            <th className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-mute">Member</th>
            <th className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-mute">Sessions</th>
            <th className="px-5 py-2.5 text-right text-[11px] font-semibold uppercase tracking-wide text-ink-mute">
              Rate
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row) => {
            const rate = row.attendance_rate;
            const rateColor =
              rate === null ? "#A8A5BA" : rate >= 90 ? "#3F7A5C" : rate >= 70 ? "#6F01D0" : "#9B4A42";
            return (
              <tr key={row.member_id} className="transition-colors hover:bg-subtle">
                <td className="px-5 py-3 text-sm font-semibold text-ink">{row.name}</td>
                <td className="px-5 py-3 text-sm text-ink-mute">{row.sessions}</td>
                <td className="px-5 py-3 text-right text-sm font-semibold tabular-nums" style={{ color: rateColor }}>
                  {rate === null ? "—" : `${rate}%`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
