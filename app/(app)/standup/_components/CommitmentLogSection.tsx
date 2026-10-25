import { CalendarCheck } from "lucide-react";
import { PaginationControls } from "@/components/PaginationControls";
import { CARD_SHADOW } from "@/lib/card-styles";
import type { AccountabilityEntry } from "@/lib/types";
import { EntryCard } from "./EntryCard";

interface CommitmentLogSectionProps {
  filteredCount: number;
  pagedEntries: AccountabilityEntry[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CommitmentLogSection({ filteredCount, pagedEntries, page, totalPages, onPageChange }: CommitmentLogSectionProps) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-bold text-ink">Commitment log · {filteredCount}</h2>
      {filteredCount === 0 ? (
        <div className={`rounded-2xl border border-dashed border-line-strong bg-white p-8 text-center ${CARD_SHADOW}`}>
          <CalendarCheck size={26} className="mx-auto mb-3 text-line-strong" strokeWidth={1.5} />
          <p className="text-sm font-bold text-ink">No commitments logged yet</p>
          <p className="mt-1 text-xs text-ink-mute">Log the first standup commitment to start tracking follow-through.</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {pagedEntries.map((e) => (
              <EntryCard key={e.checkin_id} entry={e} />
            ))}
          </div>

          {totalPages > 1 && (
            <PaginationControls
              page={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
              className="mt-3 flex items-center justify-between"
            />
          )}
        </>
      )}
    </div>
  );
}
