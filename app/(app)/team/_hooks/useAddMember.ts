"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { Discipline } from "@/lib/types";

export function useAddMember(onDone: () => void) {
  const [name, setName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [discipline, setDiscipline] = useState<Discipline>("frontend");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!name.trim() || !roleTitle.trim()) return;
    setBusy(true);
    try {
      await api.members.create({ name, role_title: roleTitle, discipline });
      onDone();
    } finally {
      setBusy(false);
    }
  }

  return { name, setName, roleTitle, setRoleTitle, discipline, setDiscipline, busy, submit };
}
