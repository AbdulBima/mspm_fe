"use client";

import { useState } from "react";
import { notify } from "@/lib/notify";
import { api } from "@/lib/api";
import type { RiskKind, RiskSeverity } from "@/lib/types";
import type { CreateRiskInput } from "../_lib/types";

export function useCreateRisk(sprintId: string, onDone: () => void) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [kind, setKind] = useState<RiskKind>("risk");
  const [severity, setSeverity] = useState<RiskSeverity>("medium");
  const [ownerId, setOwnerId] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!title.trim()) return;
    setBusy(true);
    try {
      const payload = {
        sprint_id: sprintId,
        title,
        description: description || undefined,
        kind,
        severity,
        owner_member_id: ownerId || undefined,
      } satisfies CreateRiskInput;
      await api.risks.create(payload);
      onDone();
    } catch (err) {
      notify.error(err);
    } finally {
      setBusy(false);
    }
  }

  return { title, setTitle, description, setDescription, kind, setKind, severity, setSeverity, ownerId, setOwnerId, busy, submit };
}
