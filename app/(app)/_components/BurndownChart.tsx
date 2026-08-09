import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { BurndownPoint } from "@/lib/types";
import { CustomChartTooltip, CustomXAxisTick, CustomYAxisTick } from "./ChartTooltip";

export function BurndownChart({ data }: { data: BurndownPoint[] }) {
  return (
    <div className="rounded-xl border border-[#E7E5E2] bg-white p-6 lg:col-span-2">
      <div className="mb-5">
        <p className="text-xs font-medium text-[#1D2B64] mb-1">Velocity</p>
        <h3 className="text-sm font-semibold tracking-tight text-[#0B0C0F]">Burndown</h3>
        <p className="mt-0.5 text-xs text-[#84828C]">Tasks left each day, against the pace needed to land on time.</p>
      </div>
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1D2B64" stopOpacity={0.16} />
                <stop offset="100%" stopColor="#1D2B64" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#E7E5E2" opacity={0.8} vertical={false} />
            <XAxis dataKey="day" tick={<CustomXAxisTick />} axisLine={false} tickLine={false} />
            <YAxis tick={<CustomYAxisTick />} allowDecimals={false} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ stroke: "#E7E5E2", strokeWidth: 1, strokeDasharray: "2 2" }} content={<CustomChartTooltip />} />
            <Line type="monotone" dataKey="ideal_remaining" stroke="#B4B2AC" strokeWidth={1.5} strokeDasharray="5 5" dot={false} name="Ideal" />
            <Area type="monotone" dataKey="remaining" stroke="none" fill="url(#actualFill)" isAnimationActive={false} legendType="none" />
            <Line
              type="monotone"
              dataKey="remaining"
              stroke="#1D2B64"
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 1.5, fill: "#ffffff", stroke: "#1D2B64" }}
              activeDot={{ r: 4.5, strokeWidth: 2, fill: "#ffffff", stroke: "#1D2B64" }}
              name="Actual"
              connectNulls={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
