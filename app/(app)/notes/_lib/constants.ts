import type { NoteType } from "@/lib/types";

export const NOTE_TYPE_OPTIONS: NoteType[] = ["update", "blocker", "question", "decision", "praise"];

export const NOTE_TYPE_META: Record<NoteType, { label: string; color: string; bg: string }> = {
  update: { label: "Update", color: "#1D4ED8", bg: "#DBEAFE" },
  blocker: { label: "Blocker", color: "#B91C1C", bg: "#FEE2E2" },
  question: { label: "Question", color: "#7C3AED", bg: "#EDE9FE" },
  decision: { label: "Decision", color: "#0F766E", bg: "#CCFBF1" },
  praise: { label: "Praise", color: "#BE185D", bg: "#FCE7F3" },
};

export const PAGE_SIZE = 10;

export const CARD_SHADOW_HOVER = "hover:shadow-[0_2px_4px_rgba(22,18,46,0.06),0_16px_28px_-12px_rgba(22,18,46,0.16)]";
