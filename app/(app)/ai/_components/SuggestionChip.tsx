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
        backgroundColor: hovered ? "#FAFAF9" : "#FFFFFF",
        borderColor: hovered ? "rgba(29,43,100,0.25)" : "#E7E5E2",
        color: "#54525C",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 2px 4px rgba(11,12,15,0.06), 0 12px 24px -10px rgba(11,12,15,0.14)"
          : "0 1px 2px rgba(11,12,15,0.04)",
      }}
    >
      <MessageCircle size={14} color="#1D2B64" className="shrink-0" />
      {text}
    </button>
  );
}
