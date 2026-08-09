import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { initials } from "@/lib/initials";
import type { SprintHealth } from "@/lib/types";

export function PerPersonRollup({ perMember }: { perMember: SprintHealth["per_member"] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E7E5E2] bg-white p-6 lg:col-span-2">
      <div className="mb-4">
        <p className="text-xs font-medium text-[#1D2B64] mb-1">Resourcing</p>
        <h3 className="text-sm font-semibold tracking-tight text-[#0B0C0F]">Per-person rollup</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[#E7E5E2] text-[11px] font-medium text-[#84828C]">
              <th className="pb-3 font-medium">Team member</th>
              <th className="pb-3 pr-4 text-right font-medium">Tasks</th>
              <th className="pb-3 pr-4 text-right font-medium">Done</th>
              <th className="pb-3 pr-4 text-right font-medium">In review</th>
              <th className="pb-3 text-right font-medium">Flags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEEDEB]">
            {perMember.map((m) => (
              <tr key={m.member_id} className="group transition-colors hover:bg-[#FAFAF9]">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E7E5E2] bg-[#FAFAF9] text-[10px] font-semibold text-[#54525C]">
                      {initials(m.name)}
                    </div>
                    <Link
                      href={`/team/${m.member_id}`}
                      className="inline-flex items-center gap-0.5 text-xs font-medium text-[#54525C] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2B64] group-hover:text-[#1D2B64] rounded"
                    >
                      {m.name}
                      <ArrowUpRight size={10} className="text-[#1D2B64] opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </div>
                </td>
                <td className="py-3 pr-4 text-right">
                  <span className="font-semibold tabular-nums text-[#0B0C0F]">{m.task_count}</span>
                </td>
                <td className="py-3 pr-4 text-right">
                  <span className="tabular-nums text-[#54525C]">{m.done_count}</span>
                </td>
                <td className="py-3 pr-4 text-right">
                  <span className="tabular-nums text-[#1D2B64]">{m.in_review_count}</span>
                </td>
                <td className="py-3 text-right">
                  <div className="flex flex-wrap items-center justify-end gap-1.5">
                    {m.blocked_count > 0 && (
                      <span className="rounded-full bg-[#FBEAE8] px-2 py-0.5 text-[10px] font-medium text-[#B42318]">{m.blocked_count} blocked</span>
                    )}
                    {m.overdue_count > 0 && (
                      <span className="rounded-full bg-[#FBEAE8] px-2 py-0.5 text-[10px] font-medium text-[#B42318]">{m.overdue_count} overdue</span>
                    )}
                    {m.stale_count > 0 && (
                      <span className="rounded-full bg-[#FBF1E1] px-2 py-0.5 text-[10px] font-medium text-[#92590A]">{m.stale_count} stale</span>
                    )}
                    {m.blocked_count === 0 && m.stale_count === 0 && m.overdue_count === 0 && (
                      <span className="text-[11px] text-[#B4B2AC]">On track</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {perMember.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-xs text-[#B4B2AC]">
                  No active tasks logged for this team loop.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
