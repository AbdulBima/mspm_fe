import { FlagBadge } from "@/components/StatusBadge";
import { formatDateTime } from "@/lib/sprint-utils";
import type { Checkin } from "@/lib/types";

export function RecentCheckins({ checkins }: { checkins: Checkin[] }) {
  if (checkins.length === 0) return null;

  return (
    <div className="rounded-xl border border-[#E7E5E2] bg-white p-6">
      <h3 className="mb-4 text-sm font-semibold text-[#0B0C0F]">Recent check-ins</h3>
      <div className="space-y-3">
        {checkins.slice(0, 4).map((c) => (
          <div
            key={c.checkin_id}
            className="flex flex-wrap items-start justify-between gap-2 border-b border-[#EEEDEB] pb-3 last:border-0 last:pb-0"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-[#B4B2AC]">{formatDateTime(c.checkin_date)}</p>
              {c.today_plan && <p className="text-sm text-[#54525C]">Today: {c.today_plan}</p>}
              {c.blockers && <p className="text-sm text-[#B42318]">Blocker: {c.blockers}</p>}
            </div>
            <FlagBadge flag={c.flag} />
          </div>
        ))}
      </div>
    </div>
  );
}
