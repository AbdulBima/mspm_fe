import type { LucideIcon } from "lucide-react";

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
  tone?: "default" | "signal" | "danger" | "track";
  hint?: string;
  className?: string; 
}) {
  const toneColor = {
    default: "text-zinc-900",
    signal: "text-amber-700",
    danger: "text-rose-600",
    track: "text-emerald-600",
  }[tone];

  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-zinc-300 flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <p className="questrial-regular text-[10px] uppercase tracking-wider text-zinc-400 truncate">
            {label}
          </p>
          {Icon && (
            <Icon size={13} className="text-zinc-400 shrink-0" />
          )}
        </div>

        <p className={`mt-3 font-sans text-2xl font-semibold tracking-tight tabular-nums ${toneColor}`}>
          {value}
        </p>
      </div>

      {hint && (
        <div className="mt-2 pt-2 border-t border-zinc-100">
          <p className="questrial-regular text-[10px] text-zinc-400 truncate" title={hint}>
            ↓ {hint}
          </p>
        </div>
      )}
    </div>
  );
}