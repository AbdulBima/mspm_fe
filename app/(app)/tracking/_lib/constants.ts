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

export const triggerBtnCls =
  "inline-flex items-center gap-1.5 rounded-lg bg-[#0B0C0F] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D2B64] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D2B64]";

export const saveBtnCls =
  "flex-1 rounded-lg bg-[#0B0C0F] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D2B64] disabled:opacity-40";

export const cancelBtnCls =
  "flex-1 rounded-lg border border-[#E7E5E2] py-2.5 text-sm font-medium text-[#54525C] transition-colors hover:bg-[#FAFAF9]";

export const thCls = "px-5 py-3 text-xs font-medium text-[#6B6971]";
