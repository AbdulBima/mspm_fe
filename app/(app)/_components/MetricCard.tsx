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
    <div className="card relative overflow-hidden p-4 sm:p-5">
      <div className={`absolute inset-x-0 top-0 h-0.75 ${TONE_BAR[tone]}`} />
      <p className="text-xs font-semibold text-ink-mute">{label}</p>
      <p className={`mt-2 text-2xl font-bold sm:text-3xl tabular-nums ${TONE_TEXT[tone]}`}>{value}</p>
      <p className="mt-1.5 text-[11px] leading-snug text-ink-mute">{caption}</p>
    </div>
  );
}
