import { Sparkles } from "lucide-react";
import { inputCls, labelCls } from "@/lib/form-styles";
import type { ReportType } from "@/lib/types";
import { TYPE_LABEL } from "../_lib/constants";

interface GenerateReportPanelProps {
  reportType: ReportType;
  setReportType: (t: ReportType) => void;
  periodStart: string;
  setPeriodStart: (v: string) => void;
  periodEnd: string;
  setPeriodEnd: (v: string) => void;
  notes: string;
  setNotes: (v: string) => void;
  includeAi: boolean;
  setIncludeAi: (v: boolean) => void;
  generating: boolean;
  generate: () => void;
}

// Props here are intentionally the exact shape useGenerateReport() returns —
// this panel exists purely to render that hook's state, so page.tsx spreads
// the hook's result straight in rather than re-listing every field twice.
export function GenerateReportPanel({
  reportType,
  setReportType,
  periodStart,
  setPeriodStart,
  periodEnd,
  setPeriodEnd,
  notes,
  setNotes,
  includeAi,
  setIncludeAi,
  generating,
  generate,
}: GenerateReportPanelProps) {
  return (
    <div className="rounded-xl border border-[#E7E5E2] bg-white p-6 lg:col-span-1">
      <h3 className="mb-4 text-sm font-semibold text-[#0B0C0F]">Generate a report</h3>
      <div className="space-y-4">
        <div className="flex gap-1 rounded-lg border border-[#E7E5E2] bg-[#FAFAF9] p-1">
          {(["daily", "weekly", "sprint"] as ReportType[]).map((t) => (
            <button
              key={t}
              onClick={() => setReportType(t)}
              className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
                reportType === t ? "bg-white text-[#0B0C0F] shadow-sm" : "text-[#84828C] hover:text-[#0B0C0F]"
              }`}
            >
              {TYPE_LABEL[t]}
            </button>
          ))}
        </div>

        {reportType !== "sprint" && (
          <div>
            <span className={labelCls}>{reportType === "daily" ? "Date" : "Week starting"}</span>
            <input
              type="date"
              value={periodStart}
              onChange={(e) => setPeriodStart(e.target.value)}
              className={inputCls}
            />
          </div>
        )}
        {reportType === "weekly" && (
          <div>
            <span className={labelCls}>Week ending (optional, defaults to +7 days)</span>
            <input type="date" value={periodEnd} onChange={(e) => setPeriodEnd(e.target.value)} className={inputCls} />
          </div>
        )}

        <div>
          <span className={labelCls}>Your own notes to fold in</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className={inputCls}
            placeholder="Anything leadership should hear directly from you"
          />
        </div>

        <label className="flex items-center gap-2 text-xs text-[#54525C]">
          <input
            type="checkbox"
            checked={includeAi}
            onChange={(e) => setIncludeAi(e.target.checked)}
            className="accent-[#1D2B64]"
          />
          Include an AI-written narrative summary
        </label>

        <button
          onClick={generate}
          disabled={generating}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#0B0C0F] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D2B64] disabled:opacity-40"
        >
          <Sparkles size={14} /> {generating ? "Compiling…" : "Generate report"}
        </button>
      </div>
    </div>
  );
}
