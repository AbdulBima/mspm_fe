export function BoardHeader({ sprintName }: { sprintName: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-[#1D2B64] mb-1.5">Sprint workspace</p>
      <h1 className="text-2xl font-semibold tracking-tight text-[#0B0C0F]">Board</h1>
      <p className="mt-1.5 text-sm text-[#84828C]">All activity for {sprintName}.</p>
    </div>
  );
}
