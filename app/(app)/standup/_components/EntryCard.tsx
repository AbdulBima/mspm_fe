import Link from "next/link";
import { initials } from "@/lib/initials";
import { FlagBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/sprint-utils";
import type { AccountabilityEntry } from "@/lib/types";
import { STATUS_META } from "../_lib/constants";

export function EntryCard({ entry }: { entry: AccountabilityEntry }) {
  return (
    <div className="card p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2.5">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-brand"
            style={{ backgroundColor: entry.member_color ?? "#ECEAF3" }}
          >
            {initials(entry.member_name)}
          </span>
          <Link href={`/team/${entry.member_id}`} className="text-sm font-semibold text-ink transition-colors hover:text-accent">
            {entry.member_name}
          </Link>
          <span className="text-xs text-ink-faint">{formatDate(entry.checkin_date)}</span>
        </div>
        <FlagBadge flag={entry.flag} />
      </div>

      {entry.today_plan && <p className="mb-3 text-sm leading-relaxed text-ink-soft">{entry.today_plan}</p>}

      {entry.committed_tasks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {entry.committed_tasks.map((t) => {
            const meta = STATUS_META[t.status];
            return (
              <span
                key={t.task_id}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
                style={{ color: meta.color, backgroundColor: meta.bg }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
                {t.title}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
