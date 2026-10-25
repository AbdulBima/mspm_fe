"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { loginPathFor, useAuth } from "@/lib/auth-context";
import { initials } from "@/lib/initials";
import { OfflineScreen, SplashScreen } from "@/components/SplashScreen";
import { MentlyLogo, ProductMark } from "@/components/brand/Logo";

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  const { status, role, member, logout, endReason, retry } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "guest" && endReason !== "logout") router.replace(loginPathFor(pathname, endReason));
    else if (status === "authenticated" && role === "manager") router.replace("/");
  }, [status, role, endReason, router, pathname]);

  if (status === "offline") return <OfflineScreen onRetry={retry} />;
  if (status !== "authenticated" || role !== "member" || !member) return <SplashScreen />;

  return (
    <div className="min-h-dvh bg-canvas">
      <header className="sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Link href="/me" className="flex items-center gap-2.5">
            <MentlyLogo className="h-6 w-auto" />
            <span className="hidden sm:inline">
              <ProductMark />
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-ink">{member.name}</p>
              {member.role_title && <p className="text-[11px] text-ink-mute">{member.role_title}</p>}
            </div>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-brand"
              style={{ backgroundColor: member.color_tag || "#F19A0D" }}
            >
              {initials(member.name)}
            </div>
            <button
              onClick={logout}
              className="flex h-9 items-center gap-1.5 rounded-xl border border-line px-3 text-xs font-semibold text-ink-soft transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl animate-fade-up px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
