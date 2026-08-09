"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { AIChatTurn } from "@/lib/types";
import type { Message } from "../_lib/types";

/**
 * Owns the whole chat exchange. `input` lives here (not in the page) so
 * that `send()` can clear it as one atomic step regardless of where it was
 * triggered from — the form's submit button or a suggestion chip click —
 * matching the original's single send() that always cleared the textarea.
 */
export function useAIChat(sprintId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  async function send(question: string) {
    const q = question.trim();
    if (!q || !sprintId || busy) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setBusy(true);

    try {
      // Only real conversational turns go back to the model — error
      // messages shown to the user aren't part of the actual exchange.
      const history: AIChatTurn[] = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

      const res = await api.ai.ask(sprintId, q, history);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: res.answer }]);
    } catch (err) {
      const message = err instanceof api.ApiError ? err.message : "Something went wrong. Try again.";
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "error", content: message }]);
    } finally {
      setBusy(false);
    }
  }

  return { messages, input, setInput, busy, send };
}
