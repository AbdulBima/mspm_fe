import Link from "next/link";
import type { Contributor } from "../_lib/types";
import { firstInitial } from "../_lib/first-initial";

export function ContributorList({ contributors }: { contributors: Contributor[] }) {
  if (contributors.length === 0) {
    return (
      <div className="divide-y divide-[#EEEDEB] rounded-lg border border-[#E7E5E2] bg-white">
        <p className="px-4 py-3 text-[13px] text-[#84828C]">No tasks linked to this goal yet.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#EEEDEB] rounded-lg border border-[#E7E5E2] bg-white">
      {contributors.map(({ member, taskCount, doneCount, blockedCount }) => (
        <Link
          key={member.member_id}
          href={`/team/${member.member_id}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-between gap-3 px-4 py-2.5 transition-colors hover:bg-[#FAFAF9]"
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-[#0B0C0F]"
              style={{ backgroundColor: member.color_tag }}
            >
              {firstInitial(member.name)}
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#0B0C0F]">{member.name}</p>
              <p className="text-[11px] text-[#84828C]">{member.role_title}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-[#54525C]">
              {taskCount} task{taskCount !== 1 ? "s" : ""}
            </span>
            {doneCount > 0 && <span className="font-medium text-[#16794D]">{doneCount} done</span>}
            {blockedCount > 0 && <span className="font-medium text-[#B42318]">{blockedCount} blocked</span>}
          </div>
        </Link>
      ))}
    </div>
  );
}
