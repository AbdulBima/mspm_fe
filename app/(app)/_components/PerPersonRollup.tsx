import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { initials } from "@/lib/initials";
import type { SprintHealth } from "@/lib/types";

export function PerPersonRollup({ perMember }: { perMember: SprintHealth["per_member"] }) {
  return (
    <div className="overflow-hidden card p-5 sm:p-6 xl:col-span-2">
      <div className="mb-4">
        <p className="eyebrow mb-1">Resourcing</p>
        <h3 className="text-base font-bold tracking-tight text-ink">Per-person rollup</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-line text-[11px] font-medium text-ink-mute">
              <th className="pb-3 font-medium">Team member</th>
              <th className="pb-3 pr-4 text-right font-medium">Tasks</th>
              <th className="pb-3 pr-4 text-right font-medium">Done</th>
              <th className="pb-3 pr-4 text-right font-medium">In review</th>
              <th className="pb-3 text-right font-medium">Flags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {perMember.map((m) => (
              <tr key={m.member_id} className="group transition-colors hover:bg-subtle">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-subtle text-[10px] font-semibold text-ink-soft">
                      {initials(m.name)}
                    </div>
                    <Link
                      href={`/team/${m.member_id}`}
                      className="inline-flex items-center gap-0.5 text-xs font-medium text-ink-soft transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand group-hover:text-brand rounded"
                    >
                      {m.name}
                      <ArrowUpRight size={10} className="text-brand opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </div>
                </td>
                <td className="py-3 pr-4 text-right">
                  <span className="font-semibold tabular-nums text-ink">{m.task_count}</span>
                </td>
                <td className="py-3 pr-4 text-right">
                  <span className="tabular-nums text-ink-soft">{m.done_count}</span>
                </td>
                <td className="py-3 pr-4 text-right">
                  <span className="tabular-nums text-brand">{m.in_review_count}</span>
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
                      <span className="text-[11px] text-ink-faint">On track</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {perMember.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-xs text-ink-faint">
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
