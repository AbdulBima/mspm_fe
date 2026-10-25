import type { LucideIcon } from "lucide-react";

const TONE = {
  default: { text: "text-ink", bar: "bg-line-strong" },
  signal: { text: "text-amber-700", bar: "bg-amber-400" },
  danger: { text: "text-rose-600", bar: "bg-rose-400" },
  track: { text: "text-emerald-600", bar: "bg-emerald-400" },
};

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "default",
  hint,
  className = "",
}: {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  tone?: keyof typeof TONE;
  hint?: string;
  className?: string;
}) {
  const t = TONE[tone];
  return (
    <div className={`card relative flex flex-col justify-between overflow-hidden p-4 sm:p-5 ${className}`}>
      <span className={`absolute inset-x-0 top-0 h-0.5 ${t.bar}`} />
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-xs font-semibold text-ink-mute">{label}</p>
        {Icon && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <Icon size={14} />
          </span>
        )}
      </div>
      <p className={`mt-3 text-2xl font-bold tracking-tight tabular-nums sm:text-[1.7rem] ${t.text}`}>{value}</p>
      {hint && (
        <p className="mt-1 truncate text-[11px] text-ink-mute" title={hint}>
          {hint}
        </p>
      )}
    </div>
  );
}
