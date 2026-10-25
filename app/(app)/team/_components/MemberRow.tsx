import { AlertTriangle, ChevronRight, Clock } from "lucide-react";
import type { Member } from "@/lib/types";
import { healthOf, RING_COLOR, type Rollup } from "../_lib/health";
import { AvatarRing } from "./AvatarRing";
import { LoginBadge } from "./LoginBadge";

interface MemberRowProps {
  member: Member;
  rollup?: Rollup;
  healthLoading: boolean;
  onSelect: () => void;
}

export function MemberRow({ member: m, rollup, healthLoading, onSelect }: MemberRowProps) {
  const status = healthOf(rollup);
  const pct = rollup && rollup.task_count > 0 ? rollup.done_count / rollup.task_count : 0;

  return (
    <tr
      role="link"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect();
      }}
      className="group cursor-pointer border-b border-line transition-colors last:border-0 hover:bg-accent-soft/40 focus-visible:bg-accent-soft/60 focus-visible:outline-none"
    >
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <AvatarRing name={m.name} color={m.color_tag} rollup={rollup} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{m.name}</p>
            <p className="truncate text-xs text-ink-mute">{m.role_title}</p>
          </div>
        </div>
      </td>
      <td className="hidden px-4 py-3.5 md:table-cell">
        {healthLoading ? (
          <div className="h-2 w-24 animate-pulse rounded-full bg-line" />
        ) : rollup ? (
          <div className="flex items-center gap-2">
            <span className="text-xs whitespace-nowrap text-ink-mute tabular-nums">
              <span className="font-semibold text-ink">{rollup.done_count}</span>/{rollup.task_count}
            </span>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full" style={{ width: `${pct * 100}%`, backgroundColor: RING_COLOR[status] }} />
            </div>
          </div>
        ) : (
          <span className="text-xs text-ink-faint">No tasks this sprint</span>
        )}
      </td>
      <td className="hidden px-4 py-3.5 lg:table-cell">
        <LoginBadge status={m.login_status} />
      </td>
      <td className="px-4 py-3.5">
        <div className="flex items-center justify-end gap-1.5">
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {rollup && rollup.blocked_count > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-600">
                <AlertTriangle size={10} /> {rollup.blocked_count} blocked
              </span>
            )}
            {rollup && rollup.stale_count > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                <Clock size={10} /> {rollup.stale_count} quiet
              </span>
            )}
            {rollup && rollup.blocked_count === 0 && rollup.stale_count === 0 && (
              <span className="text-[11px] font-medium text-emerald-600">On track</span>
            )}
          </div>
          <ChevronRight size={16} className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5" />
        </div>
      </td>
    </tr>
  );
}
