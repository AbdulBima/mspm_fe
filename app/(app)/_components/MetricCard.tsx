import type { Tone } from "../_lib/constants";
import { TONE_BAR, TONE_TEXT } from "../_lib/constants";

interface MetricCardProps {
  label: string;
  value: string | number;
  caption: string;
  tone?: Tone;
}

export function MetricCard({ label, value, caption, tone = "neutral" }: MetricCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#E7E5E2] bg-white p-5">
      <div className={`absolute inset-x-0 top-0 h-0.75 ${TONE_BAR[tone]}`} />
      <p className="text-[11px] font-medium text-[#84828C]">{label}</p>
      <p className={`mt-2 text-3xl font-semibold tabular-nums ${TONE_TEXT[tone]}`}>{value}</p>
      <p className="mt-1.5 text-[11px] leading-snug text-[#84828C]">{caption}</p>
    </div>
  );
}
