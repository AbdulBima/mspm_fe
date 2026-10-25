"use client";

import { CalendarDays, ChevronLeft, ChevronRight, ClipboardCheck, Clock3, RefreshCw } from "lucide-react";
import { PageLoader } from "@/components/PageLoader";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { EmptyState } from "@/components/EmptyState";
import { MissingList } from "./_components/MissingList";
import { SubmittedReportCard } from "./_components/SubmittedReportCard";
import { useTeamReports } from "./_hooks/useTeamReports";

function readableDate(isoDate: string) {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
}

function closesLabel(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export default function DailyReportsPage() {
  const { data, loading, error, current, isToday, today, goPrev, goNext, goToday, pick, reload } = useTeamReports();
  const rate = data && data.totals.expected ? Math.round((data.totals.submitted / data.totals.expected) * 100) : 0;
  const closed = data ? !data.is_open : false;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="People"
        title="Daily reports"
        description="What each team member says they got done. Reports close at midnight and can't be filed late."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-xl border border-line-strong bg-white p-1">
              <button onClick={goPrev} aria-label="Previous day" className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-subtle">
                <ChevronLeft size={16} />
              </button>
              <label className="relative flex items-center gap-2 px-2 text-xs font-semibold text-ink">
                <CalendarDays size={14} className="text-accent" />
                <input
                  type="date"
                  value={current}
                  max={today ?? undefined}
                  onChange={(e) => pick(e.target.value)}
                  className="w-[8.5rem] bg-transparent text-xs font-semibold outline-none"
                  aria-label="Report date"
                />
              </label>
              <button
                onClick={goNext}
                disabled={isToday}
                aria-label="Next day"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-subtle disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            {!isToday && (
              <button onClick={goToday} className="btn-secondary h-10 py-0 text-xs">
                Today
              </button>
            )}
          </div>
        }
      />

      {loading && !data ? (
        <PageLoader label="Loading reports" />
      ) : error ? (
        <EmptyState
          icon={RefreshCw}
          title="Couldn't load daily reports"
          description={error}
          action={
            <button onClick={() => void reload()} className="btn-secondary">
              Try again
            </button>
          }
        />
      ) : data ? (
        <div className={`space-y-6 transition-opacity ${loading ? "opacity-60" : ""}`}>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-bold text-ink">{readableDate(data.report_date)}</span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                closed ? "bg-subtle text-ink-mute" : "bg-gold-soft text-[#A65F00]"
              }`}
            >
              <Clock3 size={12} />
              {closed ? "Closed" : `Open until ${closesLabel(data.closes_at)}`}
            </span>
            {!data.is_working_day && (
              <span className="rounded-full bg-subtle px-2.5 py-1 text-[11px] font-semibold text-ink-mute">Weekend</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard label="Expected" value={data.totals.expected} hint="Active team members" />
            <StatCard label="Submitted" value={data.totals.submitted} tone="track" />
            <StatCard label={closed ? "Missed" : "Pending"} value={data.totals.missing} tone={data.totals.missing ? "danger" : "default"} />
            <StatCard label="Report rate" value={`${rate}%`} tone={rate >= 80 ? "track" : rate >= 50 ? "signal" : "danger"} />
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-3">
              {data.submitted.length === 0 ? (
                <EmptyState
                  icon={ClipboardCheck}
                  title={closed ? "No reports were filed" : "No reports yet today"}
                  description={
                    closed
                      ? "Nobody submitted a report for this day before midnight."
                      : "Reports appear here as soon as team members submit them."
                  }
                />
              ) : (
                data.submitted.map((item) => <SubmittedReportCard key={item.report_id} item={item} />)
              )}
            </div>
            <div className="lg:sticky lg:top-6 lg:self-start">
              <MissingList members={data.missing} closed={closed} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
