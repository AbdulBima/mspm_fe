import Link from "next/link";
import type { Alignment } from "@/lib/types";

export function UnalignedActivity({ tasks }: { tasks: Alignment["unaligned_tasks"] }) {
  return (
    <div className="card p-5">
      <h3 className="text-base font-bold text-ink">Unaligned activity</h3>
      <p className="mt-1 text-[13px] text-ink-mute">
        Not linked to any sprint goal — worth checking whether they should be, or whether they&apos;re drift.
      </p>

      <ul className="mt-3 divide-y divide-line border-t border-line">
        {tasks.map((t) => (
          <li key={t.task_id} className="flex items-center justify-between gap-3 py-2.5">
            <Link
              href={`/team/${t.member_id}`}
              className="text-sm text-ink-soft transition-colors hover:text-accent truncate"
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
