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
  // report.data is typed Record<string, unknown> on the real Report type —
  // deliberately, per that file's own comment, since the backend's report
  // payload shape isn't tracked in the shared type file. This cast is the
  // narrowing step: ReportData (app/reports/_lib/types.ts) mirrors the
  // actual backend response shape from app.api.v1.reports.
  // _compile_report_data, confirmed earlier in this project — not a guess.
  const d = report.data as unknown as ReportData;
  return (
    <div className="rounded-xl border border-[#E7E5E2] bg-white p-6">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-medium text-[#84828C]">
            {TYPE_LABEL[report.report_type]} report · {formatDate(report.period_start)} –{" "}
            {formatDate(report.period_end)}
          </p>
          <h3 className="mt-1 text-base font-semibold text-[#0B0C0F]">{d.sprint_name}</h3>
        </div>
        <button onClick={onClose} className="text-xs text-[#84828C] transition-colors hover:text-[#0B0C0F]">
          Back to list
        </button>
      </div>

      {report.narrative && (
        <div className="mb-5 rounded-lg border border-[#E7E5E2] bg-[#FAFAF9] p-4">
          <p className="mb-1 text-[11px] font-medium text-[#1D2B64]">Summary</p>
          <p className="whitespace-pre-line text-sm text-[#54525C]">{report.narrative}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MiniStat label="Total tasks" value={d.totals.total_tasks} />
        <MiniStat label="Done" value={d.totals.done_tasks} />
        <MiniStat label="Blocked" value={d.totals.blocked_tasks} />
        <MiniStat label="Open risks" value={d.totals.open_risks} />
      </div>

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
