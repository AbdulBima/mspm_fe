import { formatDateTime } from "@/lib/sprint-utils";
import type { Report } from "@/lib/types";
import { TYPE_LABEL } from "../_lib/constants";

interface ReportsListPanelProps {
  reports: Report[];
  onSelect: (report: Report) => void;
}

export function ReportsListPanel({ reports, onSelect }: ReportsListPanelProps) {
  return (
    <div className="space-y-2">
      {reports.map((r) => (
        <button
          key={r.report_id}
          onClick={() => onSelect(r)}
          className="card block w-full p-4 text-left transition-all hover:-translate-y-px hover:border-accent/30 hover:shadow-pop"
        >
          <p className="text-[11px] font-semibold text-accent">
            {TYPE_LABEL[r.report_type]} · {formatDateTime(r.created_at)}
          </p>
          <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
            {r.narrative ?? "No narrative — structured data only."}
          </p>
        </button>
      ))}
    </div>
  );
}
