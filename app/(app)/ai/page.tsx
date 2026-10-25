"use client";

import { useSprint } from "@/lib/sprint-context";
import { PageLoader } from "@/components/PageLoader";

import { AskAIHeader } from "./_components/AskAIHeader";
import { ChatInputForm } from "./_components/ChatInputForm";
import { ConversationView } from "./_components/ConversationView";
import { NoActiveSprintState } from "./_components/NoActiveSprintState";

import { useAIChat } from "./_hooks/useAIChat";

export default function AIAssistantPage() {
  const { sprint, loading: sprintLoading } = useSprint();
  const { messages, input, setInput, busy, send } = useAIChat(sprint?.sprint_id ?? "");

  if (sprintLoading) {
    return (
      <PageLoader label="Loading" />
    );
  }

  if (!sprint) {
    return <NoActiveSprintState />;
  }

  return (
    <div className="mx-auto flex h-[calc(100dvh-7rem)] max-w-3xl flex-col lg:h-[calc(100dvh-8rem)]">
      <AskAIHeader sprintName={sprint.name} />
      <ConversationView messages={messages} busy={busy} onSuggestionClick={send} />
      <ChatInputForm input={input} onInputChange={setInput} onSubmit={() => send(input)} disabled={busy} />
    </div>
  );
}
