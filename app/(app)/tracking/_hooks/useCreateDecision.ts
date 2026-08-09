"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { CreateDecisionInput } from "../_lib/types";

export function useCreateDecision(sprintId: string, onDone: () => void) {
  const [decision, setDecision] = useState("");
  const [context, setContext] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!decision.trim()) return;
    setBusy(true);
    try {
      const payload = { sprint_id: sprintId, decision, context: context || undefined } satisfies CreateDecisionInput;
      await api.decisions.create(payload);
      onDone();
    } finally {
      setBusy(false);
    }
  }

  return { decision, setDecision, context, setContext, busy, submit };
}
