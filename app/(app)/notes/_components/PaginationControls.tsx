import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({ page, totalPages, onPageChange }: PaginationControlsProps) {
  return (
    <div className="flex items-center justify-between pt-1">
      <p className="text-xs text-[#84828C]">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="inline-flex items-center gap-1 rounded-full border border-[#E7E5E2] bg-white px-3.5 py-1.5 text-xs font-medium text-[#54525C] transition-colors hover:bg-[#FAFAF9] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={13} /> Prev
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="inline-flex items-center gap-1 rounded-full border border-[#E7E5E2] bg-white px-3.5 py-1.5 text-xs font-medium text-[#54525C] transition-colors hover:bg-[#FAFAF9] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}
