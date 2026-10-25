import { DARK_GRADIENT } from "@/lib/gradients";
import type { Message } from "../_lib/types";
import { AIAvatar } from "@/components/AIAvatar";

export function MessageBubble({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[88%] sm:max-w-[80%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm leading-relaxed"
          style={{
            background: DARK_GRADIENT,
            color: "#FFFFFF",
            boxShadow: "0 1px 2px rgba(22,18,46,0.08), 0 8px 16px -8px rgba(22,18,46,0.4)",
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  if (message.role === "error") {
    return (
      <div className="flex items-start gap-2.5">
        <AIAvatar size={24} iconSize={11} />
        <div
          className="max-w-[88%] sm:max-w-[80%] rounded-2xl rounded-tl-md border px-4 py-2.5 text-sm leading-relaxed"
          style={{ borderColor: "#FECDD3", backgroundColor: "#FFF1F2", color: "#BE123C" }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5">
      <AIAvatar size={24} iconSize={11} />
      <div
        className="max-w-[88%] sm:max-w-[80%] whitespace-pre-line rounded-2xl rounded-tl-md border px-4 py-3 text-sm leading-relaxed"
        style={{
          borderColor: "#ECEAF3",
          backgroundColor: "#FFFFFF",
          color: "#16122E",
          boxShadow: "0 1px 2px rgba(22,18,46,0.04), 0 8px 16px -10px rgba(22,18,46,0.10)",
        }}
      >
        {message.content}
      </div>
    </div>
  );
}
