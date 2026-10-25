import { StickyNote } from "lucide-react";
import { CARD_SHADOW } from "@/lib/card-styles";

export function NotesEmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div
      className={`flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-line-strong bg-white p-8 text-center ${CARD_SHADOW}`}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft">
        <StickyNote size={24} className="text-accent" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-bold text-ink">{filtered ? "No notes match this filter" : "No notes yet"}</p>
      <p className="mt-1 text-xs text-ink-mute">
        {filtered ? "Try a different type or team member." : "Add the first update, blocker, or decision."}
      </p>
    </div>
  );
}
