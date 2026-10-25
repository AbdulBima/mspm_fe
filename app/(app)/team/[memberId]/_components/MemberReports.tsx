"use client";

import { useEffect, useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { api } from "@/lib/api";
import type { DailyReport } from "@/lib/types";
import { FlagBadge } from "@/components/StatusBadge";

function day(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
}

export function MemberReports({ memberId }: { memberId: string }) {
  const [reports, setReports] = useState<DailyReport[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    api.dailyReports
      .forMember(memberId, 10)
      .then((r) => !cancelled && setReports(r))
      .catch(() => !cancelled && setReports([]));
    return () => {
      cancelled = true;
    };
  }, [memberId]);

  return (
    <section className="card p-5 sm:p-6">
      <p className="eyebrow">Daily reports</p>
      <h3 className="mt-1 text-base font-bold text-ink">Last two weeks</h3>
      {reports === null ? (
        <div className="mt-4 space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-subtle" />
          ))}
        </div>
      ) : reports.length === 0 ? (
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-subtle px-4 py-3 text-sm text-ink-mute">
          <ClipboardCheck size={16} className="text-ink-faint" /> No reports filed yet.
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {reports.map((r) => (
            <li key={r.report_id} className="rounded-xl border border-line p-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-ink">{day(r.report_date)}</span>
                <FlagBadge flag={r.flag} />
              </div>
              <p className="mt-2 line-clamp-4 text-sm leading-relaxed whitespace-pre-line text-ink-soft">{r.summary}</p>
              {r.blockers && <p className="mt-2 text-xs text-rose-700">Blockers: {r.blockers}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
