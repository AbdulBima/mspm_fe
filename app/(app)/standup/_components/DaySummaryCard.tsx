import { Sparkles } from "lucide-react";
import { useDaySummary } from "../_hooks/useDaySummary";

export function DaySummaryCard({ sprintId }: { sprintId: string }) {
  const { day, changeDay, result, busy, error, generate } = useDaySummary(sprintId);

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg, #1F0954, #6F01D0)", boxShadow: "0 2px 8px -2px rgba(31,9,84,0.5)" }}
          >
            <Sparkles size={15} color="#FFFFFF" />
          </div>
          <div>
            <p className="text-base font-bold text-ink">AI day summary</p>
            <p className="text-xs text-ink-mute">What the whole team committed to on a given day, in one read</p>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <input
            type="date"
            value={day}
            onChange={(e) => changeDay(e.target.value)}
            className="min-w-0 flex-1 rounded-xl border border-line-strong bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-4 focus:ring-accent/10 sm:flex-none"
          />
          <button
            onClick={generate}
            disabled={busy}
            className="btn-primary"
          >
            {busy ? "Summarizing…" : "Generate summary"}
          </button>
        </div>
      </div>

      {busy && (
        <div className="mt-4 flex items-center gap-2 text-xs text-ink-mute">
          <span className="spinner h-3 w-3 text-accent" />
          Reading that day&apos;s commitments…
        </div>
      )}

      {error && !busy && (
        <div
          className="mt-4 rounded-xl border px-4 py-3 text-sm"
          style={{ borderColor: "#FECDD3", backgroundColor: "#FFF1F2", color: "#BE123C" }}
        >
          {error}
        </div>
      )}

      {result && !busy && (
        <div
          className="mt-4 whitespace-pre-line rounded-xl border border-line p-4 text-sm leading-relaxed"
          style={{ backgroundColor: "#F6F4FB", color: result.checkin_count === 0 ? "#75728A" : "#16122E" }}
        >
          {result.summary}
        </div>
      )}
    </div>
  );
}
