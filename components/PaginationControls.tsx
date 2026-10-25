import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const BTN =
  "inline-flex items-center gap-1 rounded-xl border border-line-strong bg-white px-3.5 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40";

export function PaginationControls({
  page,
  totalPages,
  onPageChange,
  className = "flex items-center justify-between pt-1",
}: PaginationControlsProps) {
  return (
    <div className={className}>
      <p className="text-xs font-medium text-ink-mute">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1} className={BTN}>
          <ChevronLeft size={13} /> Prev
        </button>
        <button onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages} className={BTN}>
          Next <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}
