"use client";

import { useSprint } from "@/lib/sprint-context";

import { AskAIHeader } from "./_components/AskAIHeader";
import { ChatInputForm } from "./_components/ChatInputForm";
import { ConversationView } from "./_components/ConversationView";
import { NoActiveSprintState } from "./_components/NoActiveSprintState";

import { useAIChat } from "./_hooks/useAIChat";

export default function AIAssistantPage() {
  const { sprint, loading: sprintLoading } = useSprint();
  // useAIChat must be called unconditionally (rules of hooks); an empty
  // sprintId just means send() no-ops via its own guard until a real
  // sprint is loaded, matching the original's `!sprint` check inside send.
  const { messages, input, setInput, busy, send } = useAIChat(sprint?.sprint_id ?? "");

  if (sprintLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#E7E5E2] border-t-[#1D2B64]" />
        <p className="text-xs text-[#84828C]">Loading</p>
      </div>
    );
  }

  if (!sprint) {
    return <NoActiveSprintState />;
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-2.5rem)] max-w-3xl flex-col p-6 md:p-8">
      <AskAIHeader sprintName={sprint.name} />
      <ConversationView messages={messages} busy={busy} onSuggestionClick={send} />
      <ChatInputForm input={input} onInputChange={setInput} onSubmit={() => send(input)} disabled={busy} />
    </div>
  );
}
