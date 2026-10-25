export interface TaskSummary {
  title: string;
  member_name: string;
}

export interface RiskSummary {
  title: string;
  severity: string;
}

export interface DecisionSummary {
  decision: string;
}

export interface ActionItemSummary {
  text: string;
}

export interface ReportTotals {
  total_tasks: number;
  done_tasks: number;
  blocked_tasks: number;
  open_risks: number;
  daily_reports_filed?: number;
}

export interface MemberDailyReportSummary {
  member_name: string;
  date: string;
  flag?: string | null;
  summary: string;
  blockers?: string | null;
}

export interface ReportData {
  sprint_name: string;
  totals: ReportTotals;
  tasks_completed?: TaskSummary[];
  tasks_blocked_now?: TaskSummary[];
  risks_raised_this_period?: RiskSummary[];
  risks_resolved_this_period?: { title: string }[];
  decisions_this_period?: DecisionSummary[];
  open_action_items?: ActionItemSummary[];
  member_daily_reports?: MemberDailyReportSummary[];
}
