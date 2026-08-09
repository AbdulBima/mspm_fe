import { StickyNote } from "lucide-react";
import { CARD_SHADOW } from "@/lib/card-styles";

export function NotesEmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div
      className={`flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-[#E7E5E2] bg-white p-8 text-center ${CARD_SHADOW}`}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-b from-[#F2F1EE] to-[#E7E5E2]">
        <StickyNote size={24} className="text-[#B4B2AC]" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-medium text-[#0B0C0F]">{filtered ? "No notes match this filter" : "No notes yet"}</p>
      <p className="mt-1 text-xs text-[#84828C]">
        {filtered ? "Try a different type or team member." : "Add the first update, blocker, or decision."}
      </p>
    </div>
  );
}
