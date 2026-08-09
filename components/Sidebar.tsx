"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  LayoutGrid,
  Target,
  ClipboardList,
  CalendarCheck,
  FileBarChart,
  Rocket,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";



const NAV = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/team", label: "Team", icon: Users },
  { href: "/board", label: "Board", icon: LayoutGrid },
  { href: "/goals", label: "Goal alignment", icon: Target },
  { href: "/tracking", label: "Tracking", icon: ClipboardList },
  { href: "/attendance", label: "Attendance", icon: CalendarCheck },
  { href: "/reports", label: "Reports", icon: FileBarChart },
  { href: "/sprints", label: "Sprints", icon: Rocket },
];

export function Sidebar() {
  const pathname = usePathname();
  const { manager, logout } = useAuth();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#1c1917] px-4 py-5">
      <div className="mb-9 flex items-center gap-3 px-2">
        <div>
  
          <p className="text-base font-bold leading-tight text-white">Sprint Ops</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex items-center gap-3 rounded-md py-2.5 pl-3 pr-3 text-base transition-colors ${
                active ? "bg-[#ad8a3d]/15 font-medium text-white" : "text-white/55 hover:bg-white/5 hover:text-white"
              }`}
            >
              {active && <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-[#ad8a3d]" />}
              <Icon size={18} strokeWidth={2} className={active ? "text-[#ad8a3d]" : "text-white/40"} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-4">
        <div className="flex items-center justify-between px-2">
          <div className="min-w-0">
            <p className="truncate text-base text-white">{manager?.name}</p>
          </div>
          <button
            onClick={logout}
            aria-label="Sign out"
            className="rounded-md p-2 text-white/45 transition-colors hover:bg-white/5 hover:text-[#e0897c]"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </aside>
  );
}
