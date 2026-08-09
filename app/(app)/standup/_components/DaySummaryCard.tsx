import { Sparkles } from "lucide-react";
import { CARD_SHADOW } from "@/lib/card-styles";
import { useDaySummary } from "../_hooks/useDaySummary";

export function DaySummaryCard({ sprintId }: { sprintId: string }) {
  const { day, changeDay, result, busy, error, generate } = useDaySummary(sprintId);

  return (
    <div className={`rounded-2xl border border-[#E7E5E2] bg-white p-5 ${CARD_SHADOW}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg, #1D2B64, #35479E)", boxShadow: "0 2px 8px -2px rgba(29,43,100,0.5)" }}
          >
            <Sparkles size={15} color="#FFFFFF" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0B0C0F]">AI day summary</p>
            <p className="text-xs text-[#84828C]">What the whole team committed to on a given day, in one read</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={day}
            onChange={(e) => changeDay(e.target.value)}
            className="rounded-xl border border-[#E7E5E2] bg-white px-3 py-2 text-sm text-[#0B0C0F] outline-none transition-colors focus:border-[#1D2B64] focus:ring-2 focus:ring-[#1D2B64]/10"
          />
          <button
            onClick={generate}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-xl bg-linear-to-b from-[#16171B] to-[#0B0C0F] px-4 py-2 text-sm font-medium text-white shadow-[0_1px_2px_rgba(11,12,15,0.08),0_8px_16px_-6px_rgba(11,12,15,0.4)] transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            {busy ? "Summarizing…" : "Generate summary"}
          </button>
        </div>
      </div>

      {busy && (
        <div className="mt-4 flex items-center gap-2 text-xs text-[#84828C]">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-[#E7E5E2] border-t-[#1D2B64]" />
          Reading that day&apos;s commitments…
        </div>
      )}

      {error && !busy && (
        <div
          className="mt-4 rounded-xl border px-4 py-3 text-sm"
          style={{ borderColor: "#F5C4B3", backgroundColor: "#FAECE7", color: "#992B0E" }}
        >
          {error}
        </div>
      )}

      {result && !busy && (
        <div
          className="mt-4 whitespace-pre-line rounded-xl border border-[#E7E5E2] p-4 text-sm leading-relaxed"
          style={{ backgroundColor: "#FAFAF9", color: result.checkin_count === 0 ? "#84828C" : "#0B0C0F" }}
        >
          {result.summary}
        </div>
      )}
    </div>
  );
}
