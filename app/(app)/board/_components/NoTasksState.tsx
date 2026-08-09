export function NoTasksState() {
  return (
    <div className="flex min-h-70 flex-col items-center justify-center rounded-xl border border-[#DEDCD8] bg-white p-10 text-center">
      <svg width="120" height="52" viewBox="0 0 120 52" fill="none" className="mb-5">
        <rect x="3" y="3" width="32" height="46" rx="6" stroke="#DEDCD8" strokeWidth="1.5" />
        <rect x="44" y="3" width="32" height="46" rx="6" stroke="#DEDCD8" strokeWidth="1.5" />
        <rect x="85" y="3" width="32" height="46" rx="6" stroke="#DEDCD8" strokeWidth="1.5" />
        <rect x="50" y="11" width="20" height="12" rx="3" fill="#1D2B64" />
      </svg>
      <h3 className="text-lg font-semibold tracking-tight text-[#0B0C0F]">No tasks yet</h3>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-[#84828C]">
        Add tasks from a team member&apos;s page to see them here.
      </p>
    </div>
  );
}
