/**
 * These mirror pieces of app.api.v1.reports._compile_report_data's real
 * response shape on the backend (built earlier in this project) — not
 * guessed purely from how this page happens to use them.
 */
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
}

/** The full report payload shape — matches app.api.v1.reports._compile_report_data's return value exactly. */
export interface ReportData {
  sprint_name: string;
  totals: ReportTotals;
  tasks_completed?: TaskSummary[];
  tasks_blocked_now?: TaskSummary[];
  risks_raised_this_period?: RiskSummary[];
  risks_resolved_this_period?: { title: string }[];
  decisions_this_period?: DecisionSummary[];
  open_action_items?: ActionItemSummary[];
}
