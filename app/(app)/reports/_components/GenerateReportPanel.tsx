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
    <div className="card p-5 sm:p-6 lg:col-span-1 lg:self-start">
      <h3 className="mb-4 text-base font-bold text-ink">Generate a report</h3>
      <div className="space-y-4">
        <div className="flex gap-1 rounded-xl border border-line bg-subtle p-1">
          {(["daily", "weekly", "sprint"] as ReportType[]).map((t) => (
            <button
              key={t}
              onClick={() => setReportType(t)}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
                reportType === t ? "bg-brand text-white shadow-sm" : "text-ink-mute hover:text-ink"
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

        <label className="flex items-center gap-2 text-xs text-ink-soft">
          <input
            type="checkbox"
            checked={includeAi}
            onChange={(e) => setIncludeAi(e.target.checked)}
            className="h-4 w-4 accent-accent"
          />
          Include an AI-written narrative summary
        </label>

        <button
          onClick={generate}
          disabled={generating}
          className="btn-primary w-full"
        >
          {generating ? <span className="spinner" /> : <Sparkles size={15} />} {generating ? "Compiling…" : "Generate report"}
        </button>
      </div>
    </div>
  );
}
