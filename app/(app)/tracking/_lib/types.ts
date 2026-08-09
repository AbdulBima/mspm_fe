import type { ActionItem, CheckinFlag, MeetingType, RiskKind, RiskSeverity } from "@/lib/types";

export interface CreateCheckinInput {
  sprint_id: string;
  member_id: string;
  checkin_date: string;
  yesterday?: string;
  today_plan?: string;
  blockers?: string;
  needs_from_pm?: string;
  flag: CheckinFlag;
}

export interface CreateRiskInput {
  sprint_id: string;
  title: string;
  description?: string;
  kind: RiskKind;
  severity: RiskSeverity;
  owner_member_id?: string;
}

export interface CreateDecisionInput {
  sprint_id: string;
  decision: string;
  context?: string;
}

export interface CreateMeetingInput {
  sprint_id: string;
  meeting_type: MeetingType;
  meeting_date: string;
  notes?: string;
  action_items: ActionItem[];
}
