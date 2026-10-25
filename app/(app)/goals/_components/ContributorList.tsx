import Link from "next/link";
import type { Contributor } from "../_lib/types";
import { firstInitial } from "../_lib/first-initial";

export function ContributorList({ contributors }: { contributors: Contributor[] }) {
  if (contributors.length === 0) {
    return (
      <div className="divide-y divide-line rounded-lg border border-line bg-white">
        <p className="px-4 py-3 text-[13px] text-ink-mute">No tasks linked to this goal yet.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-white">
      {contributors.map(({ member, taskCount, doneCount, blockedCount }) => (
        <Link
          key={member.member_id}
          href={`/team/${member.member_id}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-between gap-3 px-4 py-2.5 transition-colors hover:bg-subtle"
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-brand"
              style={{ backgroundColor: member.color_tag }}
            >
              {firstInitial(member.name)}
            </div>
            <div>
              <p className="text-[13px] font-medium text-ink">{member.name}</p>
              <p className="text-[11px] text-ink-mute">{member.role_title}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-ink-soft">
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
