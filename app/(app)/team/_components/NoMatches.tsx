import { Users } from "lucide-react";

export function NoMatches({ query }: { query: string }) {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center rounded-3xl border border-dashed border-line-strong bg-white p-10 text-center">
      <Users size={22} className="mb-3 text-ink-faint" />
      <p className="text-sm text-ink-mute">
        No one matches <span className="font-medium text-ink">&ldquo;{query}&rdquo;</span>
      </p>
    </div>
  );
}
