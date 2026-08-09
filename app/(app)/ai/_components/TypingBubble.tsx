import { AIAvatar } from "@/components/AIAvatar";

export function TypingBubble() {
  return (
    <div className="flex items-start gap-2.5">
      <AIAvatar size={24} iconSize={11} />
      <div
        className="flex items-center gap-1 rounded-2xl rounded-tl-md border px-4 py-3"
        style={{
          borderColor: "#E7E5E2",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 1px 2px rgba(11,12,15,0.04), 0 8px 16px -10px rgba(11,12,15,0.10)",
        }}
      >
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#B4B2AC] [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#B4B2AC] [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#B4B2AC]" />
      </div>
    </div>
  );
}
