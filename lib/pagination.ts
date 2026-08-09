/**
 * The original notes page computed `safePage` (clamped) for display but
 * had Prev/Next operate on the raw, unclamped `page` state via a
 * functional setState updater — invisible today since display always
 * re-clamps, but a footgun for any future code reading `page` directly.
 * This makes `safePage` the only value anything ever operates on.
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
