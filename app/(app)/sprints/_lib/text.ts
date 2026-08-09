/** Splits textarea content into trimmed, non-empty lines. */
export function splitLines(v: string): string[] {
  return v
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}
