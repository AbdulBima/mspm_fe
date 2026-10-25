export type SprintStatus = "planning" | "active" | "completed";

export type Discipline =
  | "product"
  | "design"
  | "frontend"
  | "backend"
  | "qa"
  | "mobile"
  | "intern"
  | "leadership"
  | "other";

export type TaskStatus = "not_started" | "in_progress" | "blocked" | "in_review" | "done";

export type NoteType = "update" | "blocker" | "question" | "decision" | "praise";

export type RiskKind = "risk" | "blocker";
export type RiskSeverity = "low" | "medium" | "high" | "critical";
export type RiskStatus = "open" | "mitigated" | "resolved";

export type CheckinFlag = "on_track" | "at_risk" | "blocked" | "no_update";

export type AttendanceStatus = "present" | "late" | "absent" | "excused";

export type MeetingType =
  | "standup"
  | "sprint_planning"
  | "backlog_refinement"
  | "kickoff"
  | "mid_sprint_review"
  | "demo_readiness"
  | "sprint_review"
  | "retrospective"
  | "leadership_update"
  | "other";

export type ReportType = "daily" | "weekly" | "sprint";

export interface Manager {
  manager_id: string;
  name: string;
  email: string;
}

export interface Sprint {
  sprint_id: string;
  name: string;
  theme?: string | null;
  start_date: string;
  working_days: number;
  status: SprintStatus;
  success_measures: string[];
  critical_path: string[];
  out_of_scope: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Goal {
  goal_id: string;
  sprint_id: string;
  title: string;
  description?: string | null;
  order: number;
}

export type Role = "manager" | "member";

export type LoginStatus = "none" | "pending" | "expired" | "active";

export interface Member {
  member_id: string;
  name: string;
  role_title: string;
  discipline: Discipline;
  email?: string | null;
  color_tag: string;
  active: boolean;
  login_status?: LoginStatus;
  access_code_expires_at?: string | null;
  last_login_at?: string | null;
  access_code?: string;
}

export interface MemberProfile {
  member_id: string;
  name: string;
  email?: string | null;
  role_title?: string | null;
  discipline?: Discipline | null;
  color_tag?: string | null;
}

export type SessionUser = Manager | MemberProfile;

export interface AuthSession {
  token: string;
  role: Role;
  user: SessionUser;
}

export interface MemberAccess {
  member_id: string;
  email?: string | null;
  login_status: LoginStatus;
  access_code_expires_at?: string | null;
  access_code: string;
}

export interface ReportWindow {
  report_date: string;
  timezone: string;
  opens_at: string;
  closes_at: string;
  server_now: string;
  is_open: boolean;
  is_working_day: boolean;
}

export interface DailyReportTask {
  task_id: string;
  title: string;
  status: TaskStatus;
}

export interface DailyReport {
  report_id: string;
  member_id: string;
  report_date: string;
  sprint_id?: string | null;
  summary: string;
  task_ids: string[];
  tasks?: DailyReportTask[];
  blockers?: string | null;
  plan_tomorrow?: string | null;
  flag: CheckinFlag;
  submitted_at: string;
  updated_at: string;
  revision?: number;
}

export interface DailyReportInput {
  summary: string;
  task_ids: string[];
  blockers?: string;
  plan_tomorrow?: string;
  flag: CheckinFlag;
  report_date?: string;
}

export interface MyDailyReport extends ReportWindow {
  report: DailyReport | null;
}

export type ReportDayStatus = "submitted" | "missed" | "open" | "not_tracked";

export interface MyReportHistory {
  timeline: { date: string; status: ReportDayStatus; report: DailyReport | null }[];
  weekend_reports: DailyReport[];
  stats: { submitted: number; missed: number; streak: number };
}

export interface DailyReportMember {
  member_id: string;
  name: string;
  role_title?: string | null;
  discipline?: Discipline | null;
  color_tag?: string | null;
  login_status: LoginStatus;
}

export interface TeamDailyReports extends ReportWindow {
  submitted: (DailyReport & { member: DailyReportMember })[];
  missing: DailyReportMember[];
  totals: { expected: number; submitted: number; missing: number };
}

export interface MemberSprintBrief {
  sprint_id: string;
  name: string;
  theme?: string | null;
  status: SprintStatus;
  day_number: number;
  working_days: number;
}

export interface MyProfile extends MemberProfile {
  sprint: MemberSprintBrief | null;
}

export interface MyTask {
  task_id: string;
  title: string;
  status: TaskStatus;
  priority: number;
  due_date?: string | null;
  expectation?: string | null;
  description?: string | null;
  goal_id?: string | null;
  is_stale?: boolean;
  is_overdue?: boolean;
}

export interface TaskNote {
  note_id: string;
  task_id: string;
  author: string;
  note_type: NoteType;
  content: string;
  created_at: string;
}

export interface Task {
  task_id: string;
  sprint_id: string;
  member_id: string;
  goal_id?: string | null;
  title: string;
  description?: string | null;
  expectation?: string | null;
  priority: number;
  status: TaskStatus;
  dependency_note?: string | null;
  blocked_reason?: string | null;
  due_date?: string | null;
  status_history: { status: TaskStatus; changed_at: string }[];
  last_progress_at?: string;
  created_at: string;
  updated_at: string;
  notes?: TaskNote[];
  is_stale?: boolean;
  is_overdue?: boolean;
}


export interface Risk {
  risk_id: string;
  sprint_id: string;
  title: string;
  description?: string | null;
  kind: RiskKind;
  severity: RiskSeverity;
  owner_member_id?: string | null;
  related_task_id?: string | null;
  status: RiskStatus;
  raised_at: string;
  resolved_at?: string | null;
  days_open?: number | null;
}

export interface Decision {
  decision_id: string;
  sprint_id: string;
  decision: string;
  context?: string | null;
  made_by?: string | null;
  related_goal_id?: string | null;
  decided_on: string;
}

export interface ActionItem {
  text: string;
  owner?: string | null;
  done: boolean;
}

export interface Meeting {
  meeting_id: string;
  sprint_id: string;
  meeting_type: MeetingType;
  meeting_date: string;
  notes?: string | null;
  action_items: ActionItem[];
}

export interface SprintHealth {
  sprint_id: string;
  day_number: number;
  working_days: number;
  status: SprintStatus;
  total_tasks: number;
  completion_pct: number;
  status_counts: Record<string, number>;
  open_risks: number;
  stale_tasks: TaskBrief[];
  overdue_tasks: TaskBrief[];
  blocked_tasks: TaskBrief[];
  waiting_review_tasks: TaskBrief[];
  per_member: MemberRollup[];
}

export interface TaskBrief {
  task_id: string;
  title: string;
  member_id: string;
  status: TaskStatus;
}

export interface AlignmentGoal {
  goal_id: string;
  title: string;
  task_count: number;
  done_count: number;
  in_review_count: number;   // ← new
  blocked_count: number;
  status_breakdown: Record<string, number>;
  completion_pct: number;
}

export interface Alignment {
  goals: AlignmentGoal[];
  unaligned_tasks: { task_id: string; title: string; member_id: string }[];
  alignment_score: number;
}

export interface BurndownPoint {
  day: number;
  date: string;
  remaining: number | null;
  ideal_remaining: number;
}

export interface HandoverTask {
  task_id: string;
  title: string;
  status: TaskStatus;
  member_id: string;
  member_name: string;
  goal_id?: string | null;
  is_stale: boolean;
  is_overdue: boolean;
}

export interface Handover {
  sprint_id: string;
  sprint_name: string;
  incomplete_tasks: HandoverTask[];
  open_risks: { risk_id: string; title: string; severity: RiskSeverity; kind: RiskKind }[];
  open_action_items: { text: string; owner?: string | null; done: boolean; meeting_id: string; meeting_type: string; meeting_date: string }[];
}

export interface Report {
  report_id: string;
  sprint_id: string;
  report_type: ReportType;
  period_start: string;
  period_end: string;
  // Use unknown to avoid permissive `any` while allowing arbitrary data shapes.
  data: Record<string, unknown>;
  narrative?: string | null;
  pm_notes?: string | null;
  generated_by?: string;
  created_at: string;
}

export interface TaskNoteWithContext extends TaskNote {
  task_title: string;
  member_id?: string | null;
  member_name: string;
  member_color?: string | null;
}

export interface AIChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface AIAskResponse {
  answer: string;
  sprint_id: string;
}

export interface Checkin {
  checkin_id: string;
  sprint_id: string;
  member_id: string;
  checkin_date: string;
  yesterday?: string | null;
  today_plan?: string | null;
  blockers?: string | null;
  needs_from_pm?: string | null;
  flag: CheckinFlag;
  committed_task_ids?: string[];
}

export interface AttendanceEntry {
  member_id: string;
  status: AttendanceStatus;
  joined_at?: string | null;
  today_plan?: string | null;
  task_ids?: string[];
  note?: string | null;
  marked_at: string;
}

export interface AttendanceDay {
  attendance_id: string;
  sprint_id: string;
  attendance_date: string;
  entries: AttendanceEntry[];
  created_at: string;
  updated_at?: string;
}

export interface AttendanceMemberStat {
  member_id: string;
  name: string;
  present: number;
  late: number;
  absent: number;
  excused: number;
  sessions: number;
  attendance_rate: number | null;
}

export interface AttendanceStats {
  sessions_logged: number;
  per_member: AttendanceMemberStat[];
}

export type CommitmentStatus = "done" | "blocked" | "progressing" | "too_soon" | "stale" | "task_deleted";

export interface CommittedTaskRef {
  task_id: string;
  title: string;
  status: CommitmentStatus;
}

export interface AccountabilityEntry {
  checkin_id: string;
  member_id: string;
  member_name: string;
  member_color?: string | null;
  checkin_date: string;
  today_plan?: string | null;
  flag: CheckinFlag;
  committed_tasks: CommittedTaskRef[];
}

export interface AccountabilityFlag {
  member_id: string;
  member_name: string;
  member_color?: string | null;
  task_id: string;
  task_title: string;
  times_committed: number;
  first_committed: string;
  latest_status: CommitmentStatus;
}

export interface AccountabilityResponse {
  entries: AccountabilityEntry[];
  flags: AccountabilityFlag[];
}

export interface StandupDaySummaryResponse {
  summary: string;
  date: string;
  sprint_id: string;
  checkin_count: number;
}

export interface MemberRollup {
  member_id: string;
  name: string;
  role_title: string;
  task_count: number;
  done_count: number;
  in_review_count: number;
  blocked_count: number;
  stale_count: number;
  overdue_count: number;
}