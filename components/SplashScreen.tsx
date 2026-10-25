import { RefreshCw, WifiOff } from "lucide-react";
import { MentlyLogo } from "@/components/brand/Logo";

export function SplashScreen({ label = "Loading your workspace" }: { label?: string }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-canvas">
      <MentlyLogo className="h-8 w-auto animate-pulse" />
      <div className="flex items-center gap-2.5 text-xs font-medium text-ink-mute">
        <span className="spinner h-3.5 w-3.5 text-accent" />
        {label}
      </div>
    </div>
  );
}

export function OfflineScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-canvas px-6 text-center">
      <MentlyLogo className="h-8 w-auto" />
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
        <WifiOff size={20} />
      </div>
      <div>
        <p className="text-base font-bold text-ink">Can&apos;t reach the server</p>
        <p className="mt-1 max-w-xs text-sm text-ink-mute">Check your connection. You&apos;re still signed in.</p>
      </div>
      <button onClick={onRetry} className="btn-primary">
        <RefreshCw size={15} /> Try again
      </button>
    </div>
  );
}
