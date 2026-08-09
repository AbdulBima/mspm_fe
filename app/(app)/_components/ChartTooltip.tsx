interface AxisTickProps {
  x?: number;
  y?: number;
  payload?: { value: string | number };
}

interface TooltipPayloadEntry {
  name?: string;
  value?: number | string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string | number;
}

export function CustomXAxisTick({ x, y, payload }: AxisTickProps) {
  return (
    <text x={x} y={(y ?? 0) + 14} textAnchor="middle" className="fill-[#B4B2AC] text-[10px] tracking-tight">
      {payload?.value}
    </text>
  );
}

export function CustomYAxisTick({ x, y, payload }: AxisTickProps) {
  return (
    <text x={(x ?? 0) - 8} y={(y ?? 0) + 3} textAnchor="end" className="fill-[#B4B2AC] text-[10px]">
      {payload?.value}
    </text>
  );
}

export function CustomChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-lg border border-[#E7E5E2] bg-white p-3 shadow-lg shadow-black/5">
      <p className="text-[11px] font-medium text-[#84828C] mb-2">Day {label}</p>
      <div className="space-y-1.5">
        {payload
          .filter((entry) => entry.name)
          .map((entry) => (
            <div key={entry.name} className="flex items-center gap-2 text-xs">
              <span className={`h-1.5 w-1.5 rounded-full ${entry.name === "Ideal" ? "bg-[#B4B2AC]" : "bg-[#1D2B64]"}`} />
              <span className="text-[#84828C]">{entry.name}:</span>
              <span className="font-medium tabular-nums text-[#0B0C0F]">{entry.value}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
