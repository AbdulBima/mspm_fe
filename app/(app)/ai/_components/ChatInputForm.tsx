"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { DARK_GRADIENT } from "@/lib/gradients";

interface ChatInputFormProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export function ChatInputForm({ input, onInputChange, onSubmit, disabled }: ChatInputFormProps) {
  const [inputFocused, setInputFocused] = useState(false);
  const canSend = !disabled && input.trim().length > 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="shrink-0 border-t border-[#E7E5E2] pt-4"
    >
      <div
        className="flex items-end gap-2 rounded-2xl border p-2 transition-all duration-200"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: inputFocused ? "#1D2B64" : "#E7E5E2",
          boxShadow: inputFocused
            ? "0 0 0 3px rgba(29,43,100,0.10), 0 4px 14px -6px rgba(11,12,15,0.18)"
            : "0 1px 2px rgba(11,12,15,0.04)",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
          rows={1}
          placeholder="Ask about this sprint…"
          className="max-h-32 flex-1 resize-none bg-transparent px-2.5 py-1.5 text-sm outline-none"
          style={{ color: "#0B0C0F" }}
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
          style={{
            background: canSend ? DARK_GRADIENT : "#EEEDEB",
            color: canSend ? "#FFFFFF" : "#B4B2AC",
            boxShadow: canSend ? "0 1px 2px rgba(11,12,15,0.08), 0 8px 16px -6px rgba(11,12,15,0.4)" : "none",
          }}
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </form>
  );
}
