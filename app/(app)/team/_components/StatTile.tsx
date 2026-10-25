export function StatTile({ label, value, tone }: { label: string; value: number; tone: "neutral" | "rose" | "amber" }) {
  const toneCls = tone === "rose" ? "text-rose-600" : tone === "amber" ? "text-amber-700" : "text-ink";
  return (
    <div className="card min-w-0 flex-1 px-4 py-3.5 sm:px-5 sm:py-4">
      <p className={`text-2xl font-bold tabular-nums ${toneCls}`}>{value}</p>
      <p className="mt-0.5 text-xs font-semibold text-ink-mute">{label}</p>
    </div>
  );
}
