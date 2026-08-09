import Link from "next/link";
import type { Alignment } from "@/lib/types";

export function UnalignedActivity({ tasks }: { tasks: Alignment["unaligned_tasks"] }) {
  return (
    <div className="rounded-xl border border-[#E7E5E2] bg-white p-5">
      <h3 className="text-sm font-semibold text-[#0B0C0F]">Unaligned activity</h3>
      <p className="mt-1 text-[13px] text-[#84828C]">
        Not linked to any sprint goal — worth checking whether they should be, or whether they&apos;re drift.
      </p>

      <ul className="mt-3 divide-y divide-[#EEEDEB] border-t border-[#EEEDEB]">
        {tasks.map((t) => (
          <li key={t.task_id} className="flex items-center justify-between py-2.5">
            <Link
              href={`/team/${t.member_id}`}
              className="text-sm text-[#54525C] transition-colors hover:text-[#1D2B64] truncate max-w-xl"
            >
              {t.title}
            </Link>
            <span className="text-[11px] font-medium text-[#92590A]">Unlinked</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
