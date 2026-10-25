"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

export function SuggestionChip({ text, onClick }: { text: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-left text-sm transition-all duration-200"
      style={{
        backgroundColor: hovered ? "#F6F4FB" : "#FFFFFF",
        borderColor: hovered ? "rgba(111,1,208,0.3)" : "#ECEAF3",
        color: "#4A4763",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 2px 4px rgba(22,18,46,0.06), 0 12px 24px -10px rgba(22,18,46,0.14)"
          : "0 1px 2px rgba(22,18,46,0.04)",
      }}
    >
      <MessageCircle size={14} color="#6F01D0" className="shrink-0" />
      {text}
    </button>
  );
}
