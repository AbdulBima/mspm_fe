import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { BurndownPoint } from "@/lib/types";
import { CustomChartTooltip, CustomXAxisTick, CustomYAxisTick } from "./ChartTooltip";

export function BurndownChart({ data }: { data: BurndownPoint[] }) {
  return (
    <div className="card p-5 sm:p-6 xl:col-span-2">
      <div className="mb-5">
        <p className="eyebrow mb-1">Velocity</p>
        <h3 className="text-base font-bold tracking-tight text-ink">Burndown</h3>
        <p className="mt-0.5 text-xs text-ink-mute">Tasks left each day, against the pace needed to land on time.</p>
      </div>
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6F01D0" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#6F01D0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#ECEAF3" opacity={0.8} vertical={false} />
            <XAxis dataKey="day" tick={<CustomXAxisTick />} axisLine={false} tickLine={false} />
            <YAxis tick={<CustomYAxisTick />} allowDecimals={false} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ stroke: "#ECEAF3", strokeWidth: 1, strokeDasharray: "2 2" }} content={<CustomChartTooltip />} />
            <Line type="monotone" dataKey="ideal_remaining" stroke="#A8A5BA" strokeWidth={1.5} strokeDasharray="5 5" dot={false} name="Ideal" />
            <Area type="monotone" dataKey="remaining" stroke="none" fill="url(#actualFill)" isAnimationActive={false} legendType="none" />
            <Line
              type="monotone"
              dataKey="remaining"
              stroke="#6F01D0"
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 1.5, fill: "#ffffff", stroke: "#6F01D0" }}
              activeDot={{ r: 4.5, strokeWidth: 2, fill: "#ffffff", stroke: "#6F01D0" }}
              name="Actual"
              connectNulls={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
