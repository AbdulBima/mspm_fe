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
    <text x={x} y={(y ?? 0) + 14} textAnchor="middle" className="fill-ink-faint text-[10px] tracking-tight">
      {payload?.value}
    </text>
  );
}

export function CustomYAxisTick({ x, y, payload }: AxisTickProps) {
  return (
    <text x={(x ?? 0) - 8} y={(y ?? 0) + 3} textAnchor="end" className="fill-ink-faint text-[10px]">
      {payload?.value}
    </text>
  );
}

export function CustomChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-lg border border-line bg-white p-3 shadow-lg shadow-black/5">
      <p className="text-[11px] font-medium text-ink-mute mb-2">Day {label}</p>
      <div className="space-y-1.5">
        {payload
          .filter((entry) => entry.name)
          .map((entry) => (
            <div key={entry.name} className="flex items-center gap-2 text-xs">
              <span className={`h-1.5 w-1.5 rounded-full ${entry.name === "Ideal" ? "bg-ink-faint" : "bg-accent"}`} />
              <span className="text-ink-mute">{entry.name}:</span>
              <span className="font-medium tabular-nums text-ink">{entry.value}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
