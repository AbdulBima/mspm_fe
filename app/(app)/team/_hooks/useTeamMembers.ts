"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Member } from "@/lib/types";

export function useTeamMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setMembers(await api.members.list());
  }, []);

  useEffect(() => {
    api.members
      .list()
      .then(setMembers)
      .finally(() => setLoading(false));
  }, []);

  return { members, loading, refresh };
}
