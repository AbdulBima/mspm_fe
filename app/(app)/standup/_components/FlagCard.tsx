import Link from "next/link";
import { formatDate } from "@/lib/sprint-utils";
import type { AccountabilityFlag } from "@/lib/types";
import { CARD_SHADOW } from "@/lib/card-styles";
import { hexToRgba } from "@/lib/color";
import { STATUS_META } from "../_lib/constants";

export function FlagCard({ flag }: { flag: AccountabilityFlag }) {
  const meta = STATUS_META[flag.latest_status];
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#E7E5E2] bg-white p-5 pl-6 transition-all duration-200 ${CARD_SHADOW}`}
      style={{ backgroundImage: `linear-gradient(to right, ${hexToRgba(meta.color, 0.05)}, transparent 12%)` }}
    >
      <span className="absolute left-0 top-0 h-full w-0.75" style={{ backgroundColor: meta.color }} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-[#0B0C0F]"
            style={{ backgroundColor: flag.member_color ?? "#E7E5E2" }}
          >
            {flag.member_name.slice(0, 1).toUpperCase()}
          </span>
          <Link href={`/team/${flag.member_id}`} className="text-sm font-medium text-[#0B0C0F] transition-colors hover:text-[#1D2B64]">
            {flag.member_name}
          </Link>
          <span className="text-sm text-[#54525C]">— {flag.task_title}</span>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
          style={{ color: meta.color, backgroundColor: meta.bg }}
        >
          {meta.label}
        </span>
      </div>
      <p className="mt-2 text-xs text-[#84828C]">
        Committed <span className="font-medium text-[#54525C]">{flag.times_committed}×</span> since{" "}
        {formatDate(flag.first_committed)}
      </p>
    </div>
  );
}
