"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { AIChatTurn } from "@/lib/types";
import type { Message } from "../_lib/types";

let counter = 0;
const makeId = () => `${Date.now().toString(36)}-${(counter++).toString(36)}`;

export function useAIChat(sprintId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  async function send(question: string) {
    const q = question.trim();
    if (!q || !sprintId || busy) return;

    const userMsg: Message = { id: makeId(), role: "user", content: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setBusy(true);

    try {
      const history: AIChatTurn[] = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

      const res = await api.ai.ask(sprintId, q, history);
      setMessages((prev) => [...prev, { id: makeId(), role: "assistant", content: res.answer }]);
    } catch (err) {
      const message = err instanceof api.ApiError ? err.message : "Something went wrong. Try again.";
      setMessages((prev) => [...prev, { id: makeId(), role: "error", content: message }]);
    } finally {
      setBusy(false);
    }
  }

  return { messages, input, setInput, busy, send };
}
