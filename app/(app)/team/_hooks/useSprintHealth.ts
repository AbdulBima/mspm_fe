"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { SprintHealth } from "@/lib/types";

export function useSprintHealth(sprintId: string | undefined) {
  const [health, setHealth] = useState<SprintHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sprintId) return;
    api.sprints
      .health(sprintId)
      .then(setHealth)
      .finally(() => setLoading(false));
  }, [sprintId]);

  return { health, loading };
}
