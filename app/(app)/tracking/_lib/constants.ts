export const TABS = ["Check-ins", "Risks & blockers", "Decisions", "Meetings"] as const;
export type Tab = (typeof TABS)[number];

export const MEETING_TYPES = [
  "standup",
  "sprint_planning",
  "backlog_refinement",
  "kickoff",
  "mid_sprint_review",
  "demo_readiness",
  "sprint_review",
  "retrospective",
  "leadership_update",
  "other",
] as const;

export const triggerBtnCls = "btn-primary";

export const saveBtnCls = "btn-primary flex-1";

export const cancelBtnCls = "btn-secondary flex-1";

export const thCls = "px-5 py-3 text-[11px] font-semibold tracking-wide uppercase text-ink-mute";
