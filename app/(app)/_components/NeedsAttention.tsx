import { useMemo } from "react";
import type { SprintHealth } from "@/lib/types";
import { TAG_STYLE } from "../_lib/constants";
import { buildNeedsAttentionList } from "../_lib/needs-attention";

export function NeedsAttention({ health }: { health: SprintHealth }) {
  const items = useMemo(() => buildNeedsAttentionList(health), [health]);

  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <p className="eyebrow mb-1">Focus</p>
          <h3 className="text-base font-bold tracking-tight text-ink">Needs attention</h3>
        </div>
        <span className="text-[11px] tabular-nums text-ink-faint">
          {items.length} task{items.length === 1 ? "" : "s"}
        </span>
      </div>
      {items.length === 0 ? (
        <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-line">
          <p className="text-xs text-ink-faint">Nothing blocked, stale, overdue, or waiting on review.</p>
        </div>
      ) : (
        <ul className="divide-y divide-line">
          {items.slice(0, 8).map((it) => (
            <li key={it.id} className="flex items-center justify-between gap-3 py-2.5">
              <span className="truncate text-xs text-ink-soft">{it.title}</span>
              <div className="flex shrink-0 gap-1.5">
                {it.tags.map((tag) => (
                  <span key={tag} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${TAG_STYLE[tag]}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
      {items.length > 8 && <p className="mt-3 text-right text-[11px] text-ink-faint">+{items.length - 8} more</p>}
    </div>
  );
}
