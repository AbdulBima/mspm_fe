"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { api } from "./api";
import type { Sprint } from "./types";
import { useAuth } from "./auth-context";

interface SprintContextValue {
  sprint: Sprint | null;
  sprints: Sprint[];
  loading: boolean;
  selectSprint: (sprintId: string) => void;
  refresh: () => Promise<void>;
}

const SprintContext = createContext<SprintContextValue | null>(null);

export function SprintProvider({ children }: { children: ReactNode }) {
  const { manager, loading: authLoading } = useAuth();
  const [sprint, setSprint] = useState<Sprint | null>(null);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await api.sprints.list();
      setSprints(list);
      const active = list.find((s) => s.status === "active") || list[0] || null;
      setSprint((current) => (current ? list.find((s) => s.sprint_id === current.sprint_id) || active : active));
    } catch {
      setSprints([]);
      setSprint(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!manager) {
      let cancelled = false;
      queueMicrotask(() => {
        if (cancelled) return;
        setSprints([]);
        setSprint(null);
        setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }
    let cancelled = false;
    const timer = setTimeout(() => {
      if (!cancelled) void load();
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [manager, authLoading, load]);

  function selectSprint(sprintId: string) {
    const found = sprints.find((s) => s.sprint_id === sprintId);
    if (found) setSprint(found);
  }

  return (
    <SprintContext.Provider value={{ sprint, sprints, loading, selectSprint, refresh: load }}>
      {children}
    </SprintContext.Provider>
  );
}

export function useSprint() {
  const ctx = useContext(SprintContext);
  if (!ctx) throw new Error("useSprint must be used within SprintProvider");
  return ctx;
}