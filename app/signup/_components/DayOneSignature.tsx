
export function DayOneSignature() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 overflow-hidden bg-linear-to-b from-[#160e02] via-[#3d2712] to-[#0d0701] px-6 py-6 text-white lg:justify-between lg:gap-0 lg:px-12 lg:py-14">
      <p className="hidden text-[11px] font-semibold uppercase tracking-widest text-white/50 lg:block">
        Sprint Ops
      </p>

      <div>
        <div aria-hidden="true" className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
            <span className="motion-safe:absolute motion-safe:inset-0 motion-safe:animate-ping motion-safe:rounded-full motion-safe:bg-[#F2A93B]/40" />
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#F2A93B] text-xs font-bold text-[#160e02]">
              1
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/20" />
            ))}
          </div>
        </div>
        <p className="mt-2.5 text-[11px] font-medium uppercase tracking-widest text-white/40">Day 1 of 10</p>

        <h2 className="mt-4 max-w-xs text-lg font-semibold leading-snug tracking-tight lg:mt-6 lg:text-2xl">
          Every sprint starts on day one.
        </h2>
        <p className="mt-2 hidden max-w-xs text-sm leading-relaxed text-white/60 lg:block">
          So does your workspace. Create your account to start tracking it.
        </p>
      </div>

      <p className="hidden text-[11px] text-white/30 lg:block">Goals · Tasks · Standups · Reports</p>
    </div>
  );
}