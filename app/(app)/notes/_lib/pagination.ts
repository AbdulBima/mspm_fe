/**
 * The original computed `safePage` (clamped) for display but had the
 * Prev/Next buttons operate on the raw, unclamped `page` state via a
 * functional setState updater. That meant the internal page number could
 * drift away from what was ever actually shown (e.g. after a filter
 * shrinks the result count) — invisible to the user today since display
 * always re-clamps, but a footgun for any future change that reads `page`
 * directly. This version makes `safePage` the only value anything ever
 * operates on, so the internal state can't drift from what's displayed.
 */
export interface PaginationResult<T> {
  totalPages: number;
  safePage: number;
  pageItems: T[];
}

export function paginate<T>(items: T[], page: number, pageSize: number): PaginationResult<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageItems = items.slice((safePage - 1) * pageSize, safePage * pageSize);
  return { totalPages, safePage, pageItems };
}
