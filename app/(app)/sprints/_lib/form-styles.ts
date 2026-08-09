/**
 * This page uses a genuinely different visual language from the rest of
 * the app — zinc/amber Tailwind tokens and `font-display`/`questrial-regular`
 * type classes, versus the `#0B0C0F`/`#1D2B64`/`#E7E5E2` hex-token system
 * everywhere else (board, goals, notes, reports, standup). That looks like
 * either an older or a deliberately distinct design-system iteration —
 * worth a design decision on your end, not something I should silently
 * merge into the shared @/lib/form-styles during a structural refactor.
 */
export const inputCls =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-300 transition-colors focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15";

export const labelCls = "mb-2 block text-[10px] font-semibold uppercase tracking-widest text-zinc-400";
