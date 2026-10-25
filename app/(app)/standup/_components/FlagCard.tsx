import Link from "next/link";
import { initials } from "@/lib/initials";
import { formatDate } from "@/lib/sprint-utils";
import type { AccountabilityFlag } from "@/lib/types";
import { CARD_SHADOW } from "@/lib/card-styles";
import { hexToRgba } from "@/lib/color";
import { STATUS_META } from "../_lib/constants";

export function FlagCard({ flag }: { flag: AccountabilityFlag }) {
  const meta = STATUS_META[flag.latest_status];
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-line bg-white p-5 pl-6 transition-all duration-200 ${CARD_SHADOW}`}
      style={{ backgroundImage: `linear-gradient(to right, ${hexToRgba(meta.color, 0.05)}, transparent 12%)` }}
    >
      <span className="absolute left-0 top-0 h-full w-0.75" style={{ backgroundColor: meta.color }} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2.5">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-brand"
            style={{ backgroundColor: flag.member_color ?? "#ECEAF3" }}
          >
            {initials(flag.member_name)}
          </span>
          <Link href={`/team/${flag.member_id}`} className="text-sm font-semibold text-ink transition-colors hover:text-accent">
            {flag.member_name}
          </Link>
          <span className="text-sm text-ink-soft">— {flag.task_title}</span>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
          style={{ color: meta.color, backgroundColor: meta.bg }}
        >
          {meta.label}
        </span>
      </div>
      <p className="mt-2 text-xs text-ink-mute">
        Committed <span className="font-medium text-ink-soft">{flag.times_committed}×</span> since{" "}
        {formatDate(flag.first_committed)}
      </p>
    </div>
  );
}
