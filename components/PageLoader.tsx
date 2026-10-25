export function PageLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-3" role="status">
      <span className="spinner h-5 w-5 text-accent" />
      <p className="text-xs font-medium text-ink-mute">{label}</p>
    </div>
  );
}
