"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  ClipboardCheck,
  ClipboardList,
  FileBarChart,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Megaphone,
  NotebookPen,
  Rocket,
  Sparkles,
  Target,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { initials } from "@/lib/initials";
import { MentlyLogo, ProductMark } from "@/components/brand/Logo";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "Workspace",
    items: [
      { href: "/", label: "Overview", icon: LayoutDashboard },
      { href: "/sprints", label: "Sprints", icon: Rocket },
      { href: "/goals", label: "Goal alignment", icon: Target },
      { href: "/board", label: "Board", icon: LayoutGrid },
    ],
  },
  {
    title: "People",
    items: [
      { href: "/team", label: "Team", icon: Users },
      { href: "/daily-reports", label: "Daily reports", icon: ClipboardCheck },
      { href: "/standup", label: "Standup", icon: Megaphone },
      { href: "/attendance", label: "Attendance", icon: CalendarCheck },
    ],
  },
  {
    title: "Insight",
    items: [
      { href: "/tracking", label: "Tracking", icon: ClipboardList },
      { href: "/notes", label: "Notes", icon: NotebookPen },
      { href: "/reports", label: "Reports", icon: FileBarChart },
      { href: "/ai", label: "Ask AI", icon: Sparkles },
    ],
  },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ onNavigate, onClose }: { onNavigate?: () => void; onClose?: () => void }) {
  const pathname = usePathname();
  const { manager, logout } = useAuth();

  return (
    <aside className="relative flex h-full w-72 flex-col overflow-hidden bg-brand text-white lg:w-64">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative flex items-center justify-between px-5 pt-6 pb-7">
        <Link href="/" onClick={onNavigate} className="flex items-center gap-2.5 rounded-lg">
          <MentlyLogo variant="white" className="h-6 w-auto" />
          <ProductMark tone="light" />
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="relative flex-1 space-y-6 overflow-y-auto px-3 pb-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.14em] text-white/35 uppercase">
              {group.title}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                      active
                        ? "bg-white text-brand shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]"
                        : "text-white/65 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    <Icon
                      size={17}
                      strokeWidth={2}
                      className={active ? "text-accent" : "text-white/45 transition-colors group-hover:text-white/80"}
                    />
                    {label}
                    {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="relative border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-brand">
            {initials(manager?.name ?? "")}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{manager?.name}</p>
            <p className="truncate text-[11px] text-white/50">{manager?.email}</p>
          </div>
          <button
            onClick={logout}
            aria-label="Sign out"
            title="Sign out"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
