export function SkeletonTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-white">
      <table className="w-full border-collapse">
        <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
            <tr key={i} className="border-b border-zinc-100 last:border-0">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-zinc-100" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-3 w-32 animate-pulse rounded-full bg-zinc-100" />
                    <div className="h-2.5 w-24 animate-pulse rounded-full bg-zinc-100" />
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="h-2 w-24 animate-pulse rounded-full bg-zinc-100" />
              </td>
              <td className="px-4 py-3">
                <div className="ml-auto h-4 w-16 animate-pulse rounded-full bg-zinc-100" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
