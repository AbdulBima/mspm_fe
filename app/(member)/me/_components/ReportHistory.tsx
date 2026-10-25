"use client";

import { useState } from "react";
import { ChevronDown, Flame } from "lucide-react";
import type { MyReportHistory, ReportDayStatus } from "@/lib/types";
import { FlagBadge } from "@/components/StatusBadge";
import { shortDay, timeOf } from "../_lib/format";

const DOT: Record<ReportDayStatus, string> = {
  submitted: "bg-emerald-500",
  missed: "bg-rose-400",
  open: "bg-gold animate-pulse",
  not_tracked: "bg-line-strong",
};

const LABEL: Record<ReportDayStatus, string> = {
  submitted: "Submitted",
  missed: "Missed",
  open: "Open today",
  not_tracked: "Before you joined",
};

export function ReportHistory({ history }: { history: MyReportHistory }) {
  const [openDate, setOpenDate] = useState<string | null>(null);
  const days = history.timeline;

  return (
    <section className="card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Your record</p>
          <h2 className="mt-1 text-base font-bold text-ink">Last {days.length} working days</h2>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1 text-xs font-bold text-[#A65F00]">
          <Flame size={14} /> {history.stats.streak} day streak
        </div>
      </div>

      <div className="mt-5 flex gap-1.5" aria-hidden>
        {[...days].reverse().map((d) => (
          <span key={d.date} title={`${shortDay(d.date)} · ${LABEL[d.status]}`} className={`h-2 flex-1 rounded-full ${DOT[d.status]}`} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-emerald-50 px-3 py-2.5">
          <p className="text-[11px] font-semibold text-emerald-700/80">Submitted</p>
          <p className="text-xl font-bold text-emerald-700 tabular-nums">{history.stats.submitted}</p>
        </div>
        <div className="rounded-xl bg-rose-50 px-3 py-2.5">
          <p className="text-[11px] font-semibold text-rose-700/80">Missed</p>
          <p className="text-xl font-bold text-rose-700 tabular-nums">{history.stats.missed}</p>
        </div>
      </div>

      <ul className="mt-5 divide-y divide-line">
        {days.map((d) => {
          const expanded = openDate === d.date && d.report;
          return (
            <li key={d.date} className="py-2.5">
              <button
                type="button"
                disabled={!d.report}
                onClick={() => setOpenDate(expanded ? null : d.date)}
                className="flex w-full items-center gap-3 text-left disabled:cursor-default"
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${DOT[d.status]}`} />
                <span className="flex-1 text-sm font-medium text-ink">{shortDay(d.date)}</span>
                <span className="text-xs text-ink-mute">
                  {d.report ? `at ${timeOf(d.report.updated_at)}` : LABEL[d.status]}
                </span>
                {d.report && (
                  <ChevronDown size={14} className={`text-ink-faint transition-transform ${expanded ? "rotate-180" : ""}`} />
                )}
              </button>
              {expanded && d.report && (
                <div className="mt-3 animate-fade-in space-y-2 rounded-xl bg-subtle p-3.5">
                  <FlagBadge flag={d.report.flag} />
                  <p className="text-sm leading-relaxed whitespace-pre-line text-ink-soft">{d.report.summary}</p>
                  {d.report.blockers && (
                    <p className="text-xs text-rose-700">
                      <span className="font-semibold">Blockers:</span> {d.report.blockers}
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
