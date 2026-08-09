export type Tone = "neutral" | "good" | "warn" | "bad";

export const TONE_BAR: Record<Tone, string> = {
  neutral: "bg-[#E7E5E2]",
  good: "bg-[#16794D]",
  warn: "bg-[#92590A]",
  bad: "bg-[#B42318]",
};

export const TONE_TEXT: Record<Tone, string> = {
  neutral: "text-[#0B0C0F]",
  good: "text-[#16794D]",
  warn: "text-[#92590A]",
  bad: "text-[#B42318]",
};

export const TAG_STYLE: Record<string, string> = {
  Blocked: "bg-[#FBEAE8] text-[#B42318]",
  Overdue: "bg-[#FBEAE8] text-[#B42318]",
  Stale: "bg-[#FBF1E1] text-[#92590A]",
  "In review": "bg-[#EEF0F7] text-[#1D2B64]",
};

export const TAG_RANK: Record<string, number> = { Blocked: 0, Overdue: 1, Stale: 2, "In review": 3 };
