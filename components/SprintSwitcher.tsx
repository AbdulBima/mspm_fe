"use client";

import { useSprint } from "@/lib/sprint-context";
import { ChevronDown } from "lucide-react";

const STATUS_DOT: Record<string, string> = {
  active: "bg-emerald-500",
  planning: "bg-gold",
  completed: "bg-ink-faint",
};

export function SprintSwitcher() {
  const { sprint, sprints, selectSprint } = useSprint();

  if (!sprint) return null;

  return (
    <label className="relative flex items-center">
      <span className="sr-only">Sprint</span>
      <span className={`pointer-events-none absolute left-3 h-2 w-2 rounded-full ${STATUS_DOT[sprint.status] ?? "bg-ink-faint"}`} />
      <select
        value={sprint.sprint_id}
        onChange={(e) => selectSprint(e.target.value)}
        className="max-w-[46vw] appearance-none truncate rounded-xl border border-line-strong bg-white py-2 pr-9 pl-7 text-xs font-semibold text-ink-soft transition-colors outline-none hover:border-accent/40 focus:ring-4 focus:ring-accent/10 sm:max-w-xs sm:text-xs"
      >
        {sprints.map((s) => (
          <option key={s.sprint_id} value={s.sprint_id}>
            {s.name} · {s.status}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-3 text-ink-mute" />
    </label>
  );
}
