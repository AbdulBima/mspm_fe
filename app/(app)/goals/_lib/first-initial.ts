/**
 * Single-letter avatar initial. This is this page's existing convention
 * (ContributorStack and the expanded contributor list both used
 * `name.slice(0,1)` in the original) — deliberately NOT merged with the
 * two-letter `initials()` helper shared by the board and attendance pages,
 * since that would silently change what every avatar here displays. If a
 * one-letter-vs-two-letter mismatch between pages wasn't intentional,
 * that's a design question worth raising separately, not something to
 * paper over during a restructuring pass.
 */
export function firstInitial(name: string): string {
  return name.slice(0, 1).toUpperCase();
}
