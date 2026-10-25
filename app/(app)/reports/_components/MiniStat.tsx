export function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-line bg-subtle p-3">
      <p className="text-[11px] font-semibold text-ink-mute">{label}</p>
      <p className="mt-1 text-xl font-bold tabular-nums text-ink">{value}</p>
    </div>
  );
}
