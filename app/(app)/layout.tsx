"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { loginPathFor, useAuth } from "@/lib/auth-context";
import { useSprint } from "@/lib/sprint-context";
import { Sidebar } from "@/components/Sidebar";
import { SprintSwitcher } from "@/components/SprintSwitcher";
import { OfflineScreen, SplashScreen } from "@/components/SplashScreen";
import { MentlyLogo } from "@/components/brand/Logo";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { status, role, endReason, retry } = useAuth();
  const { sprint } = useSprint();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (status === "guest" && endReason !== "logout") router.replace(loginPathFor(pathname, endReason));
    else if (status === "authenticated" && role === "member") router.replace("/me");
  }, [status, role, endReason, router, pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  if (status === "offline") return <OfflineScreen onRetry={retry} />;
  if (status !== "authenticated" || role !== "manager") return <SplashScreen />;

  return (
    <div className="flex h-dvh bg-canvas">
      <div className="hidden shrink-0 lg:block">
        <Sidebar />
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 animate-fade-in bg-brand/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 animate-slide-in-left shadow-pop">
            <Sidebar onNavigate={() => setMenuOpen(false)} onClose={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-line bg-white/80 px-4 backdrop-blur-md sm:px-6">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink-soft transition-colors hover:bg-subtle lg:hidden"
          >
            <Menu size={18} />
          </button>
          <MentlyLogo className="h-5 w-auto sm:hidden" />
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-semibold text-ink">{sprint ? sprint.name : "No sprint selected"}</p>
            {sprint?.theme && <p className="truncate text-[11px] text-ink-mute">{sprint.theme}</p>}
          </div>
          <div className="ml-auto">
            <SprintSwitcher />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div key={pathname} className="mx-auto w-full max-w-[1400px] animate-fade-up px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
