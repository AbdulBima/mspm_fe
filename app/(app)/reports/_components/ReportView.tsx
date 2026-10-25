import { formatDate } from "@/lib/sprint-utils";
import type { Report } from "@/lib/types";
import { TYPE_LABEL } from "../_lib/constants";
import type { ActionItemSummary, DecisionSummary, ReportData, RiskSummary, TaskSummary } from "../_lib/types";
import { MiniStat } from "./MiniStat";
import { ReportSection } from "./ReportSection";

interface ReportViewProps {
  report: Report;
  onClose: () => void;
}

export function ReportView({ report, onClose }: ReportViewProps) {
  const d = report.data as unknown as ReportData;
  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium text-ink-mute">
            {TYPE_LABEL[report.report_type]} report · {formatDate(report.period_start)} –{" "}
            {formatDate(report.period_end)}
          </p>
          <h3 className="mt-1 text-lg font-bold text-ink">{d.sprint_name}</h3>
        </div>
        <button onClick={onClose} className="btn-secondary px-3 py-2 text-xs">
          Back to list
        </button>
      </div>

      {report.narrative && (
        <div className="mb-5 rounded-2xl border border-accent/15 bg-accent-soft/50 p-4">
          <p className="eyebrow mb-1">Summary</p>
          <p className="whitespace-pre-line text-sm text-ink-soft">{report.narrative}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MiniStat label="Total tasks" value={d.totals.total_tasks} />
        <MiniStat label="Done" value={d.totals.done_tasks} />
        <MiniStat label="Blocked" value={d.totals.blocked_tasks} />
        <MiniStat label="Open risks" value={d.totals.open_risks} />
      </div>
      {d.member_daily_reports && d.member_daily_reports.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-[11px] font-semibold tracking-wide text-ink-mute uppercase">
            Team daily reports · {d.member_daily_reports.length}
          </p>
          <ul className="space-y-2">
            {d.member_daily_reports.map((r, i) => (
              <li key={i} className="rounded-xl border border-line bg-subtle p-3">
                <p className="text-xs font-bold text-ink">
                  {r.member_name} <span className="font-medium text-ink-mute">· {formatDate(r.date)}</span>
                </p>
                <p className="mt-1 line-clamp-3 text-sm text-ink-soft">{r.summary}</p>
                {r.blockers && <p className="mt-1 text-xs text-rose-700">Blockers: {r.blockers}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <ReportSection
        title="Completed this period"
        items={d.tasks_completed?.map((t: TaskSummary) => `${t.title} — ${t.member_name}`)}
      />
      <ReportSection
        title="Currently blocked"
        items={d.tasks_blocked_now?.map((t: TaskSummary) => `${t.title} — ${t.member_name}`)}
        tone="danger"
      />
      <ReportSection
        title="Risks raised"
        items={d.risks_raised_this_period?.map((r: RiskSummary) => `${r.title} (${r.severity})`)}
        tone="signal"
      />
      <ReportSection
        title="Risks resolved"
        items={d.risks_resolved_this_period?.map((r) => r.title)}
        tone="track"
      />
      <ReportSection title="Decisions" items={d.decisions_this_period?.map((x: DecisionSummary) => x.decision)} />
      <ReportSection
        title="Open action items"
        items={d.open_action_items?.map((a: ActionItemSummary) => a.text)}
        tone="signal"
      />
    </div>
  );
}
