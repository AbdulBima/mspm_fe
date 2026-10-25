"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { Discipline, Member } from "@/lib/types";

export function useAddMember(onCreated: (member: Member) => void) {
  const [name, setName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [email, setEmail] = useState("");
  const [discipline, setDiscipline] = useState<Discipline>("frontend");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (busy || !name.trim() || !roleTitle.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const member = await api.members.create({
        name: name.trim(),
        role_title: roleTitle.trim(),
        discipline,
        email: email.trim() || undefined,
      });
      onCreated(member);
    } catch (err) {
      setError(err instanceof api.ApiError ? err.message : "Couldn't add this member.");
    } finally {
      setBusy(false);
    }
  }

  return { name, setName, roleTitle, setRoleTitle, email, setEmail, discipline, setDiscipline, busy, error, submit };
}
