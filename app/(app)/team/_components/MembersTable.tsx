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

const TH = "px-4 py-3 text-[11px] font-semibold tracking-wide text-ink-mute uppercase";

export function MembersTable({ grouped, rollupByMember, healthLoading, onSelectMember }: MembersTableProps) {
  return (
    <div className="card overflow-hidden">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            <th className={TH}>Member</th>
            <th className={`${TH} hidden md:table-cell`}>Progress</th>
            <th className={`${TH} hidden lg:table-cell`}>Login</th>
            <th className={`${TH} text-right`}>Status</th>
          </tr>
        </thead>
        <tbody>
          {grouped.map(([discipline, list]) => {
            const groupDone = list.reduce((sum, m) => sum + (rollupByMember.get(m.member_id)?.done_count ?? 0), 0);
            const groupTotal = list.reduce((sum, m) => sum + (rollupByMember.get(m.member_id)?.task_count ?? 0), 0);
            return (
              <Fragment key={discipline}>
                <tr className="bg-subtle">
                  <td colSpan={4} className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-semibold tracking-wide text-ink-mute uppercase">
                        {DISCIPLINE_LABEL[discipline]} · {list.length}
                      </span>
                      {groupTotal > 0 && (
                        <div className="h-1 w-24 overflow-hidden rounded-full bg-line-strong">
                          <div
                            className="h-full rounded-full bg-accent"
                            style={{ width: `${Math.min(100, (groupDone / groupTotal) * 100)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                {list.map((m) => (
                  <MemberRow
                    key={m.member_id}
                    member={m}
                    rollup={rollupByMember.get(m.member_id)}
                    healthLoading={healthLoading}
                    onSelect={() => onSelectMember(m.member_id)}
                  />
                ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
