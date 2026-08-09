import { healthOf, RING_COLOR, type Rollup } from "../_lib/health";

export function AvatarRing({ name, color, rollup }: { name: string; color: string; rollup?: Rollup }) {
  const size = 36;
  const stroke = 2;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = rollup && rollup.task_count > 0 ? Math.min(1, rollup.done_count / rollup.task_count) : 0;
  const status = healthOf(rollup);
  const dash = c * pct;

  return (
    <div className="relative h-9 w-9 shrink-0">
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e4e4e7" strokeWidth={stroke} />
        {pct > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={RING_COLOR[status]}
            strokeWidth={stroke}
            strokeDasharray={`${dash} ${c - dash}`}
            strokeLinecap="round"
          />
        )}
      </svg>
      <div
        className="absolute inset-[2.5px] flex items-center justify-center rounded-full font-display text-[11px] font-semibold text-zinc-900"
        style={{ backgroundColor: color }}
      >
        {name.slice(0, 1).toUpperCase()}
      </div>
    </div>
  );
}
