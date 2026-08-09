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
          className="block w-full rounded-xl border border-[#E7E5E2] bg-white p-4 text-left transition-colors hover:border-[#1D2B64]/30"
        >
          <p className="text-[11px] font-medium text-[#84828C]">
            {TYPE_LABEL[r.report_type]} · {formatDateTime(r.created_at)}
          </p>
          <p className="mt-1 line-clamp-2 text-sm text-[#54525C]">
            {r.narrative ?? "No narrative — structured data only."}
          </p>
        </button>
      ))}
    </div>
  );
}
