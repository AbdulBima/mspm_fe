import { BarChart3 } from "lucide-react";
import type { AttendanceStats } from "@/lib/types";

export function AttendanceRateTable({ stats }: { stats: AttendanceStats }) {
  const rows = [...stats.per_member].sort((a, b) => (a.attendance_rate ?? 101) - (b.attendance_rate ?? 101));

  return (
    <div className="overflow-hidden rounded-xl border border-[#e3e0d8] bg-white">
      <div className="flex items-center gap-2 border-b border-[#e3e0d8] bg-[#faf9f6] px-5 py-3">
        <BarChart3 size={13} className="text-[#766f60]" />
        <p className="text-xs font-medium uppercase tracking-wide text-[#766f60]">
          Attendance by member — {stats.sessions_logged} session{stats.sessions_logged === 1 ? "" : "s"} logged
        </p>
      </div>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#e3e0d8]">
            <th className="px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[#a39c8c]">Member</th>
            <th className="px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[#a39c8c]">Sessions</th>
            <th className="px-5 py-2.5 text-right text-[11px] font-medium uppercase tracking-wide text-[#a39c8c]">
              Rate
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eeece6]">
          {rows.map((row) => {
            const rate = row.attendance_rate;
            const rateColor =
              rate === null ? "#a39c8c" : rate >= 90 ? "#3F7A5C" : rate >= 70 ? "#AD8A3D" : "#9B4A42";
            return (
              <tr key={row.member_id} className="transition-colors hover:bg-[#faf9f6]">
                <td className="px-5 py-3 text-sm font-medium text-[#1c1917]">{row.name}</td>
                <td className="px-5 py-3 text-sm text-[#766f60]">{row.sessions}</td>
                <td className="px-5 py-3 text-right text-sm font-semibold tabular-nums" style={{ color: rateColor }}>
                  {rate === null ? "—" : `${rate}%`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
