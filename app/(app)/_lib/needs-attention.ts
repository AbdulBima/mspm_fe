import type { SprintHealth } from "@/lib/types";
import { TAG_RANK } from "./constants";

export interface NeedsAttentionItem {
  id: string;
  title: string;
  tags: string[];
}

/**
 * One task can be blocked AND overdue AND stale at once — this collapses
 * the four separate task lists health returns into one de-duplicated,
 * ranked list (worst tag first) instead of four lists that would silently
 * repeat the same task.
 */
export function buildNeedsAttentionList(health: SprintHealth): NeedsAttentionItem[] {
  const map = new Map<string, { title: string; tags: string[] }>();
  const add = (list: { task_id: string; title: string }[], tag: string) => {
    list.forEach((t) => {
      const entry = map.get(t.task_id) ?? { title: t.title, tags: [] };
      if (!entry.tags.includes(tag)) entry.tags.push(tag);
      map.set(t.task_id, entry);
    });
  };
  add(health.blocked_tasks, "Blocked");
  add(health.overdue_tasks, "Overdue");
  add(health.stale_tasks, "Stale");
  add(health.waiting_review_tasks, "In review");
  return Array.from(map.entries())
    .map(([id, v]) => ({ id, ...v }))
    .sort((a, b) => Math.min(...a.tags.map((t) => TAG_RANK[t])) - Math.min(...b.tags.map((t) => TAG_RANK[t])));
}
