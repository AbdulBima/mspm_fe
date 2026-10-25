import { FlagBadge } from "@/components/StatusBadge";
import { formatDateTime } from "@/lib/sprint-utils";
import type { Checkin } from "@/lib/types";

export function RecentCheckins({ checkins }: { checkins: Checkin[] }) {
  if (checkins.length === 0) return null;

  return (
    <div className="card p-5 sm:p-6">
      <h3 className="mb-4 text-base font-bold text-ink">Recent check-ins</h3>
      <div className="space-y-3">
        {checkins.slice(0, 4).map((c) => (
          <div
            key={c.checkin_id}
            className="flex flex-wrap items-start justify-between gap-2 border-b border-line pb-3 last:border-0 last:pb-0"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-ink-faint">{formatDateTime(c.checkin_date)}</p>
              {c.today_plan && <p className="text-sm text-ink-soft">Today: {c.today_plan}</p>}
              {c.blockers && <p className="text-sm text-[#B42318]">Blocker: {c.blockers}</p>}
            </div>
            <FlagBadge flag={c.flag} />
          </div>
        ))}
      </div>
    </div>
  );
}
