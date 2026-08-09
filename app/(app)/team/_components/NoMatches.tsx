import { Users } from "lucide-react";

export function NoMatches({ query }: { query: string }) {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-white p-10 text-center">
      <Users size={22} className="mb-3 text-zinc-300" />
      <p className="text-sm text-zinc-500">
        No one matches <span className="font-medium text-zinc-700">&ldquo;{query}&rdquo;</span>
      </p>
    </div>
  );
}
