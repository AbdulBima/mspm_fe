"use client";

import { useEffect, useRef } from "react";
import type { Message } from "../_lib/types";
import { EmptyConversation } from "./EmptyConversation";
import { MessageBubble } from "./MessageBubble";
import { TypingBubble } from "./TypingBubble";

interface ConversationViewProps {
  messages: Message[];
  busy: boolean;
  onSuggestionClick: (text: string) => void;
}

export function ConversationView({ messages, busy, onSuggestionClick }: ConversationViewProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  return (
    <div className="flex-1 space-y-4 overflow-y-auto pb-4">
      {messages.length === 0 ? (
        <EmptyConversation onSuggestionClick={onSuggestionClick} />
      ) : (
        messages.map((m) => <MessageBubble key={m.id} message={m} />)
      )}
      {busy && <TypingBubble />}
      <div ref={bottomRef} />
    </div>
  );
}
