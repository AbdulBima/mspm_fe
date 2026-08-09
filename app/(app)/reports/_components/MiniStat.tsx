export function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[#E7E5E2] bg-[#FAFAF9] p-3">
      <p className="text-[11px] font-medium text-[#84828C]">{label}</p>
      <p className="mt-1 text-lg font-semibold tabular-nums text-[#0B0C0F]">{value}</p>
    </div>
  );
}
