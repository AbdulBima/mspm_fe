"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Sidebar } from "@/components/Sidebar";
import { SprintSwitcher } from "@/components/SprintSwitcher";
import { useSprint } from "@/lib/sprint-context";


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { manager, loading } = useAuth();
  const { sprint } = useSprint();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !manager) router.replace("/login");
  }, [loading, manager, router]);

  if (loading) {
    return (
      <div className="flex h-screen questrial-regular items-center justify-center bg-base-900">
        <p className="text-xs uppercase tracking-widest text-ink-mute">Loading console…</p>
      </div>
    );
  }

  if (!manager) return null;

  return (
    <div className="flex h-screen questrial-regular bg-base-900">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-line border-b-gray-100 px-6">
          <p className="text-xs uppercase tracking-widest text-ink-mute">
            {sprint ? `${sprint.name} · Day tracker` : "No sprint selected"}
          </p>
          <SprintSwitcher />
        </header>
        <main className="flex-1 overflow-y-auto px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
