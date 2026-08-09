export function StatTile({ label, value, tone }: { label: string; value: number; tone: "neutral" | "rose" | "amber" }) {
  const toneCls = tone === "rose" ? "text-rose-600" : tone === "amber" ? "text-amber-700" : "text-zinc-900";
  return (
    <div className="flex-1 min-w-27.5 rounded-2xl border border-zinc-100 bg-white px-5 py-4">
      <p className={`font-display text-2xl font-semibold tabular-nums ${toneCls}`}>{value}</p>
      <p className="questrial-regular mt-0.5 text-[10px] uppercase tracking-widest text-zinc-400">{label}</p>
    </div>
  );
}
