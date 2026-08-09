import { AIAvatar } from "@/components/AIAvatar";

export function AskAIHeader({ sprintName }: { sprintName: string }) {
  return (
    <div className="mb-6 shrink-0 border-b border-[#E7E5E2] pb-6">
      <p className="mb-1.5 text-xs font-medium text-[#1D2B64]">Sprint workspace</p>
      <div className="flex items-center gap-2.5">
        <AIAvatar size={32} iconSize={15} rounded="rounded-xl" />
        <h1 className="text-2xl font-semibold tracking-tight text-[#0B0C0F]">Ask AI</h1>
      </div>
      <p className="mt-2 max-w-md text-sm text-[#84828C]">
        Ask about {sprintName} — grounded in your goals, tasks, members, risks, and check-ins. Nothing here is
        invented.
      </p>
    </div>
  );
}
