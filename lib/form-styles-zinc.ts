/**
 * Form field styles for the zinc/amber design-system pages (sprints, team)
 * — a different visual language from the hex-token system used everywhere
 * else (@/lib/form-styles). Kept in its own file rather than merged into
 * that one: these are two distinct design systems, not size variants of
 * the same one.
 */
export const inputCls =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-300 transition-colors focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15";

export const labelCls = "mb-2 block text-[10px] font-semibold uppercase tracking-widest text-zinc-400";
