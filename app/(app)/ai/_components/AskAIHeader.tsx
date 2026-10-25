import { AIAvatar } from "@/components/AIAvatar";

export function AskAIHeader({ sprintName }: { sprintName: string }) {
  return (
    <div className="mb-5 shrink-0 border-b border-line pb-5">
      <p className="eyebrow">Insight</p>
      <div className="mt-1 flex items-center gap-2.5">
        <AIAvatar size={32} iconSize={15} rounded="rounded-xl" />
        <h1 className="text-2xl font-bold tracking-tight text-ink">Ask AI</h1>
      </div>
      <p className="mt-2 max-w-lg text-sm text-ink-mute">
        Ask about {sprintName}. Answers come only from your goals, tasks, members, risks, check-ins and daily reports.
      </p>
    </div>
  );
}
