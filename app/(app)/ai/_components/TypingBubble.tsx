import { AIAvatar } from "@/components/AIAvatar";

export function TypingBubble() {
  return (
    <div className="flex items-start gap-2.5">
      <AIAvatar size={24} iconSize={11} />
      <div
        className="flex items-center gap-1 rounded-2xl rounded-tl-md border px-4 py-3"
        style={{
          borderColor: "#ECEAF3",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 1px 2px rgba(22,18,46,0.04), 0 8px 16px -10px rgba(22,18,46,0.10)",
        }}
      >
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint" />
      </div>
    </div>
  );
}
