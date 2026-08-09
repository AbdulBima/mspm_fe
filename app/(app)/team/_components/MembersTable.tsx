import { Fragment } from "react";
import type { Discipline, Member } from "@/lib/types";
import { DISCIPLINE_LABEL } from "../_lib/constants";
import type { Rollup } from "../_lib/health";
import { MemberRow } from "./MemberRow";

interface MembersTableProps {
  grouped: [Discipline, Member[]][];
  rollupByMember: Map<string, Rollup>;
  healthLoading: boolean;
  onSelectMember: (memberId: string) => void;
}

export function MembersTable({ grouped, rollupByMember, healthLoading, onSelectMember }: MembersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-white">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-zinc-100">
            <th className="questrial-regular w-[45%] px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Member</th>
            <th className="questrial-regular w-[30%] px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Progress</th>
            <th className="questrial-regular px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Status</th>
          </tr>
        </thead>
        <tbody>
          {grouped.map(([discipline, list]) => {
            const groupDone = list.reduce((sum, m) => sum + (rollupByMember.get(m.member_id)?.done_count ?? 0), 0);
            const groupTotal = list.reduce((sum, m) => sum + (rollupByMember.get(m.member_id)?.task_count ?? 0), 0);
            return (
              <Fragment key={discipline}>
                <tr className="bg-zinc-50/60">
                  <td colSpan={3} className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <span className="questrial-regular text-[10px] uppercase tracking-widest text-zinc-400">
                        {DISCIPLINE_LABEL[discipline]} · {list.length}
                      </span>
                      {groupTotal > 0 && (
                        <div className="h-1 w-24 overflow-hidden rounded-full bg-zinc-200">
                          <div
                            className="h-full rounded-full bg-amber-500"
                            style={{ width: `${Math.min(100, (groupDone / groupTotal) * 100)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                {list.map((m) => (
                  <MemberRow key={m.member_id} member={m} rollup={rollupByMember.get(m.member_id)} healthLoading={healthLoading} onSelect={() => onSelectMember(m.member_id)} />
                ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
