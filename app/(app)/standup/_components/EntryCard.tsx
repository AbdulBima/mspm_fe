import Link from "next/link";
import { FlagBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/sprint-utils";
import type { AccountabilityEntry } from "@/lib/types";
import { CARD_SHADOW } from "@/lib/card-styles";
import { STATUS_META } from "../_lib/constants";

export function EntryCard({ entry }: { entry: AccountabilityEntry }) {
  return (
    <div className={`rounded-2xl border border-[#E7E5E2] bg-white p-5 ${CARD_SHADOW}`}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-[#0B0C0F]"
            style={{ backgroundColor: entry.member_color ?? "#E7E5E2" }}
          >
            {entry.member_name.slice(0, 1).toUpperCase()}
          </span>
          <Link href={`/team/${entry.member_id}`} className="text-sm font-medium text-[#0B0C0F] transition-colors hover:text-[#1D2B64]">
            {entry.member_name}
          </Link>
          <span className="text-xs text-[#B4B2AC]">{formatDate(entry.checkin_date)}</span>
        </div>
        <FlagBadge flag={entry.flag} />
      </div>

      {entry.today_plan && <p className="mb-3 text-sm leading-relaxed text-[#54525C]">{entry.today_plan}</p>}

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
